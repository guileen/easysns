var http = require('http')

var server = http.createServer(function(req, res) {
  res.end('hello world\n')
})

server.listen(3000)
