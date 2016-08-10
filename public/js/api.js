/* global FormData */
;(function (root, factory) {
  root.API = factory()
}(this, function () {
  var api = {}

  // 注册
  api.register = function (userName, password, nickName, callback) {
    var req = {}
    req.userName = userName
    req.password = password
    req.nickName = nickName
    console.dir(req)
    callback(null, req)
  }

  // 登录
  api.login = function (userName, password, callback) {
    var req = {}
    req.userName = userName
    req.password = password
    console.dir(req)
    callback(null, req)
  }

  // 注销
  api.logout = function (callback) {
    callback(null, '')
  }

  api.getCurrentUser = function (callback) {
    callback(null, {
      nickName: '',
      avatar: ''
    })
  }

  // 上传头像
  api.upload = function (file, callback) {
    console.dir(file)
    var formdata = new FormData()
    formdata.append('file', file)
    callback(null, 'http://localhost:3000/static/img/nodejs.png')
  }

  // 发布一篇文章
  api.publish = function (content, callback) {
    var req = {}
    req.content = content
    console.dir(req)
    callback(null, {
      avatar: 'http://localhost:3000/static/img/nodejs.png',
      nickName: 'Demo User',
      content: content
    })
  }

  // 关注一个用户
  api.follow = function (userId, callback) {
    var req = {}
    req.userId = userId
    console.dir(req)
    callback(null, req)
  }

  // 取消关注
  api.unfollow = function (userId, callback) {
    var req = {}
    req.userId = userId
    console.dir(req)
    callback(null, req)
  }

  // 获取文章列表
  api.getTimeline = function (page, limit, callback) {
    var req = {}
    req.page = page
    req.limit = limit
    console.dir(req)
    callback(null, [/*{
      avatar: 'http://localhost:3000/static/img/nodejs.png',
      nickName: 'User 1',
      content: '内容1'
    }, {
      avatar: 'http://localhost:3000/static/img/nodejs.png',
      nickName: 'User 2',
      content: '内容2'
    }*/])
  }

  // 获取用户列表
  api.getNewUsers = function (req, callback) {
    console.dir(req)
    callback(null, [/*{
      avatar: 'http://localhost:3000/static/img/nodejs.png',
      nickName: 'User a',
      userId: '3',
      isFollow: true
    }, {
      avatar: 'http://localhost:3000/static/img/nodejs.png',
      nickName: 'User b',
      userId: '4',
      isFollow: false
    }*/])
  }

  return api
}))
