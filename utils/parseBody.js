const getRawBody = require('./getRawBody')
const qs = require('querystring')

module.exports = function (req, callback) {
  getRawBody(req, function (err, rawBody) {
    if (err) {
      return callback(err)
    }
    var type = req.headers['content-type'] || ''
    type = type.split(';')[0]
    console.log('type', type, 'rawBody', rawBody)
    if (type === 'application/x-www-form-urlencoded') {
      var body = qs.parse(rawBody)
      callback(null, body)
      return
    }
    callback()
  })
}
