const router = module.exports = require('koa-router')()
const services = require('../services')

// GET /activities/
router.get('/', async (ctx) => {
  const page = parseInt(ctx.query.page, 10)
  ctx.body = await services.activity.getTimeline(ctx.session.userId, page, 3)
})

// POST /activities/  发布一篇日志
router.post('/', async (ctx) => {
  const body = ctx.request.body
  const activity = {
    userId: ctx.session.userId,
    content: body.content
  }
  ctx.body = await services.activity.publish(activity)
})
