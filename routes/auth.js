const models = require('../models')
const router = require('koa-router')()

module.exports = router

router.get('/', async (ctx) => {
  ctx.body = 'hello auth'
})

// POST /auth/register
router.post('/register', async (ctx) => {
  const body = ctx.request.body
  const user = {
    email: body.email,
    password: body.password,
    nickname: body.nickname
  }
  const id = await models.user.create(user)
  ctx.session.userId = id
  ctx.redirect('/')
})

router.post('/login', async (ctx) => {
  const body = ctx.request.body
  const user = await models.user.getByEmail(body.email)
  if (!user) {
    ctx.redirect('/?err=no_user')
    return
  }
  if (body.password !== user.password) {
    ctx.redirect('/?err=invalid_pass')
    return
  }
  ctx.session.userId = user._id
  ctx.redirect('/')
})

router.get('/logout', async (ctx) => {
  ctx.session = null
  ctx.redirect('/')
})
