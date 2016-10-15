class WSManager {

  constructor () {
    // Map compare to Object
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Objects_and_maps_compared/
    this.wsMap = new Map()
  }

  put (userId, ws) {
    let ary = this.wsMap[userId]
    if (ary == null) {
      ary = this.wsMap[userId] = []
    }
    ary.push(ws)
  }

  remove (userId, ws) {
    let ary = this.wsMap[userId]
    if (ary == null) return
    let index = ary.indexOf(ws)
    if (index >= 0) {
      ary.splice(index, 1)
    }
    return ary
  }

  // send(1234, {content: 'xxx', type: 'at'})
  send (userId, message) {
    let ary = this.wsMap[userId]
    if (ary) {
      for (let ws of ary) {
        ws.send(JSON.stringify(message), {mark: true})
      }
    }
  }

}

module.exports = WSManager
