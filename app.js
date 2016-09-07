var http = require('http')
var controllers = require('./controllers')
var parseUrl = require('url').parse
const authorize = require('./middlewares/authorize')

const rules = [
  {path: '/play', controller: controllers.play},
  {path: '/', controller: controllers.home},
  {path: '/user', controller: controllers.user.user},
  {path: '/my/avatar', controller: controllers.user.myavatar},
  {path: '/auth/register', controller: controllers.auth.register, method: 'post'},
  {path: '/auth/login', controller: controllers.auth.login, method: 'post'},
  {path: /^\/static(\/.*)/, controller: controllers.static},
  {path: /^\/upload(\/.*)/, controller: controllers.static.upload}
]

function notFoundController (req, res) {
  res.writeHead(404)
  res.end('Not found')
}

function find (ary, match) {
  for (var i = 0; i < ary.length; i++) {
    if (match(ary[i])) return ary[i]
  }
}

var server = http.createServer(function (req, res) {
  var urlInfo = parseUrl(req.url)
  var rule = find(rules, function (rule) {
    if (rule.method) {
      if (rule.method.toLowerCase() !== req.method.toLowerCase()) {
        return false
      }
    }
    if (rule.path instanceof RegExp) {
      var matchResult = urlInfo.pathname.match(rule.path)
      if (matchResult) {
        req.params = matchResult
      }
      return matchResult
    }
    return rule.path === urlInfo.pathname
  })
  var controller = rule && rule.controller || notFoundController
  controller = authorize(controller)
  controller(req, res)
})

server.listen(3000)
