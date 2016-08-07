const sendFile = require('../utils/send').sendFile
const joinPath = require('path').join
const viewPath = joinPath(__dirname, '../views')
const authorize = require('../middlewares/authorize')

module.exports = authorize(function (req, res) {
  var isLogin = !!req.userId
  console.log('isLogin', isLogin)
  var view = isLogin ? 'home.html' : 'welcome.html'
  sendFile(joinPath(viewPath, view), res)
})
