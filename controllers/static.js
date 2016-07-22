const mime = require('mime')
const fs = require('fs')
const joinPath = require('path').join
const publicPath = joinPath(__dirname, '../public')

module.exports = function(req, res) {
  var path = req.params[1]
  path = joinPath(publicPath, path)
  fs.readFile(path, function(err, data) {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404)
        res.end('Not found')
        return
      }
      res.writeHead(500)
      res.end(err.message)
      return
    }
    var mimeType = mime.lookup(path)
    var charset = mime.charsets.lookup(mimeType)
    console.log('mimeType', mimeType, 'charset', charset)
    res.setHeader('Content-Type', mimeType + (charset ? '; charset='+charset : ''))
    res.end(data)
  })
}
