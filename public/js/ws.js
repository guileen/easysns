;(function () {
  var ws = new WebSocket('ws://localhost:3000')
  ws.onopen = function () {
    console.log('ws opened')
  }

  ws.onmessage = function (evt) {
    const msg = JSON.parse(evt.data)
    if (msg.type === 'at') {
      UI.addNotice({
        content: '有人@了你'
      })
    }
  }

  ws.onclose = function () {
    console.log('ws closed')
  }
})()
