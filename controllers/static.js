const sendFile = require('../utils/send').sendFile
const joinPath = require('path').join
const publicPath = joinPath(__dirname, '../public')
const uploadDir = joinPath(__dirname, '../data/upload')

var exports = module.exports = function (req, res) {
  var path = req.params[1]
  path = joinPath(publicPath, path)
  sendFile(path, res)
}

exports.upload = function (req, res) {
  var path = req.params[1]
  path = joinPath(uploadDir, path)
  sendFile(path, res)
}
