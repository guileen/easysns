const send = require('../utils/send')
const parseBody = require('../utils/parseBody')
const models = require('../models')

exports.login = function (req, res) {
  parseBody(req, function (err, body) {
    if (err) {
      send.sendError(err, res)
      return
    }
    // login(body.email, body.password)
    models.user.getByEmail(body.email, function (err, user) {
      if (err) {
        return send.sendError(err, res)
      }
      if (!user) {
        return send.redirect('/?err=no_user', res)
      }
      if (body.password !== user.password) {
        return send.redirect('/?err=invalid_pass', res)
      }
      // login(user)
      send.redirect('/', res)
    })
  })
}

exports.register = function (req, res) {
  parseBody(req, function (err, body) {
    if (err) {
      send.sendError(err, res)
      return
    }
    var user = {
      email: body.email,
      password: body.password,
      nickname: body.nickname
    }
    // save(user)
    models.user.create(user, function (err) {
      if (err) {
        return send.sendError(err, res)
      }
      // loginWithUser(user)
      send.redirect('/', res)
    })
  })
}
