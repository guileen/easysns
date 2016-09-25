const router = module.exports = require('koa-router')()
const services = require('../services')

// GET /user/  当前用户信息
router.get('/', async (ctx) => {
  const userId = ctx.session.userId
  const user = await services.user.getCache(userId)
  ctx.body = user || {}
})
