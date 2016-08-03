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

  // 上传头像
  api.upload = function (file, callback) {
    console.dir(file)
    var formdata = new FormData()
    formdata.append('file', file)
    callback(null, 'http://static.thel.co/app/avatar/3568/e1f7c695ef00c8876ed65e8bb17e0b26.jpg')
  }

  // 发布一篇文章
  api.publish = function (content, callback) {
    var req = {}
    req.content = content
    console.dir(req)
    callback(null, {
      avatar: 'http://static.thel.co/app/avatar/3568/e1f7c695ef00c8876ed65e8bb17e0b26.jpg',
      nickName: '桂林',
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

  // 获取微博列表
  api.getTimeline = function (page, limit, callback) {
    var req = {page: page, limit: limit}
    console.dir(req)
    callback(null, [
      {
        avatar: 'http://static.thel.co/app/avatar/3568/e1f7c695ef00c8876ed65e8bb17e0b26.jpg',
        nickName: 'xxx',
        content: 'testtest .... testtest'
      },
      {
        avatar: 'http://static.thel.co/app/avatar/3568/e1f7c695ef00c8876ed65e8bb17e0b26.jpg',
        nickName: 'xxx',
        content: 'testtest .... testtest'
      },
      {
        avatar: 'http://static.thel.co/app/avatar/3568/e1f7c695ef00c8876ed65e8bb17e0b26.jpg',
        nickName: 'xxx',
        content: 'testtest .... testtest'
      }
    ])
  }

  // 获取最近注册用户
  api.getRecentUser = function (page, limit) {}

  return api
}))
