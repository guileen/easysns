const router = module.exports = require('koa-router')()
const models = require('../models')

// GET /user/  当前用户信息
router.get('/', async (ctx) => {
  const userId = ctx.session.userId
  const user = await models.user.get(userId)
  ctx.body = user || {}
})
