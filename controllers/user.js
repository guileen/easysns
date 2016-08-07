const send = require('../utils/send')
const models = require('../models')
const authorize = require('../middlewares/authorize')

module.exports = authorize(function (req, res) {
  models.user.get(req.userId, function (err, user) {
    if (err) {
      return send.sendError(err, res)
    }
    res.end(JSON.stringify(user))
  })
})

