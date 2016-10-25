const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const mount = require('koa-mount')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const session = require('koa-generic-session')
const redisSessionStore = require('koa-redis')
const logger = require('koa-logger')

const router = require('./routes').router

app.keys = ['abcde12345']
app.use(mount('/static', require('koa-static')(__dirname + '/public')))
app.use(mount('/upload', require('koa-static')(__dirname + '/data/upload')))

// middlewares
app.use(logger())
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(bodyparser())
app.use(json())
// old
/*
app.use(session({
  store: redisSessionStore({
    // options
  })
}))
*/
// new
const sessionStore = redisSessionStore({
  // options
})
app.use(session({
  store: sessionStore
}))

app.use(views(__dirname + '/views', {
  extension: 'html'
}))

app.use(router.routes(), router.allowedMethods())
// response

app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

// old
// app.listen(3000)
// new
const http = require('http')
const server = http.createServer(app.callback())
server.listen(3000)

// init wsapp
require('./ws_app')(server, sessionStore, app.keys)

process.on('SIGUSR2', function() {
    let profiler = require('v8-profiler')
    let heapdump = require('heapdump')
    let fs = require('fs')

    let name = 'node.' + process.pid
    heapdump.writeSnapshot(__dirname + '/' + name + '.heapsnapshot')

    profiler.startProfiling(name, true)
    setTimeout(function() {
        let profile = profiler.stopProfiling()
        profile.export()
        .pipe(fs.createWriteStream(__dirname + '/' + name + '.cpuprofile'))
        .on('finish', function() {
            profile.delete()
        })
    }, 30000)
})

module.exports = app
