const router = module.exports = require('koa-router')()
const models = require('../models')
const services = require('../services')
const ObjectID = require('mongodb').ObjectID

router.get('/', async (ctx) => {
  var before = ctx.query.before || new ObjectID(Date.now())
  var rows = await models.user.findBefore(before).toArray()
  ctx.body = await services.user.normalizedList(rows, ctx.session.userId)
})
