const co = require('co')
const ws = require('ws')
const Cookies = require('cookies')
const wsManager = require('./services').wsManager

module.exports = (httpServer, sessionStore, keys) => {
  const wss = ws.createServer({
    server: httpServer
  })

  wss.on('connection', (ws) => {
    const cookies = new Cookies(ws.upgradeReq, null, {
      keys: keys
    })
    const sid = cookies.get('koa.sid')
    co(sessionStore.get('koa:sess:' + sid)).then(session => {
      const userId = session.userId
      console.log('ws userId:', userId)
      ws.userId = userId
      wsManager.put(userId, ws)
    }).catch(err => {
      console.error(err)
    })

    ws.on('message', (message) => {
      wsManager.emit(ws.userId, message)
    })

    ws.on('close', () => {
      wsManager.remove(ws.userId, ws)
    })
  })
}
