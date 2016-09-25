/* global FormData fetch*/
;(function (root, factory) {
  root.API = factory()
}(this, function () {
  function makeQuery (obj) {
    return Object.keys(obj).map(
      k => `${k}=${encodeURIComponent(obj[k])}`
    ).join('&')
  }

  // convert fetch to node style
  function fetchJson (path, opts) {
    opts = opts || {}
    opts.credentials = opts.credentials || 'same-origin'
    if (opts.body && !(opts.body instanceof FormData)) {
      opts.body = JSON.stringify(opts.body)
      opts.headers = opts.headers || new Headers()
      opts.headers.set('Content-Type', 'application/json; charset=UTF-8')
    }
    return function (callback) {
      fetch(path, opts).then(function (res) {
        return res.json()
      }).then(function (json) {
        callback(null, json)
      }).catch(function (err) {
        callback(err)
      })
    }
  }

  var api = {}

  // 注册
  api.register = function (userName, password, nickname, callback) {
    var req = {}
    req.userName = userName
    req.password = password
    req.nickname = nickname
    callback(null, req)
  }

  // 登录
  api.login = function (userName, password, callback) {
    var req = {}
    req.userName = userName
    req.password = password
    callback(null, req)
  }

  // 注销
  api.logout = function (callback) {
    callback(null, '')
  }

  // 获取当前登录用户
  api.getCurrentUser = function (callback) {
    fetchJson('/user')(callback)
    /*
    callback(null, {
      nickname: '',
      avatar: ''
    })
    */
  }

  // 上传头像
  api.upload = function (file, callback) {
    var formdata = new FormData()
    formdata.append('file', file)
    fetchJson('/my/avatar', {
      method: 'POST',
      body: formdata
    })(function (err, data) {
      if (err) return callback(err)
      callback(null, data && data.avatar)
    })
    // callback(null, 'http://localhost:3000/static/img/nodejs.png')
  }

  // 发布一篇文章
  api.publish = function (content, callback) {
    fetchJson('/activities/', {
      method: 'POST',
      body: {content: content}
    })(callback)
  }

  // 关注一个用户
  api.follow = function (userId, callback) {
    fetchJson('/rel/follow', {
      method: 'POST',
      body: {id: userId}
    })(callback)
  }

  // 取消关注
  api.unfollow = function (userId, callback) {
    fetchJson('/rel/unfollow', {
      method: 'POST',
      body: {id: userId}
    })(callback)
  }

  // 获取文章列表
  api.getTimeline = function (page, limit, callback) {
    fetchJson('/activities/?' + makeQuery({page: page, limit: limit}))(callback)
  }

  // 获取用户列表
  api.getNewUsers = function (req, callback) {
    fetchJson('/users')(callback)
  }

  return api
}))
