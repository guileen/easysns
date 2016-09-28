/* global API UI alert */
;(function () {
  /*
  // 注册
  function register () {
    $('#register').click(function () {
      var userName = $('#reg_userName').val()
      var password = $('#reg_password').val()
      var confirmpassword = $('#reg_confirmpassword').val()
      if (password !== confirmpassword) {
        return alert('两次密码不一致！')
      }
      var nickname = $('#reg_nickname').val()
      API.register(userName, password, nickname, function (err, data) {
        if (err) {
          alert('注册失败')
        } else {
          window.location.href = './index.html'
        }
      })
    })
  }

  // 登录
  function login () {
    $('#login').click(function () {
      var userName = $('#log_userName').val()
      var password = $('#log_password').val()
      API.login(userName, password, function (err, data) {
        if (err) {
          alert('登录失败')
        } else {
          window.location.href = './index.html'
        }
      })
    })
  }
  */

  // 注销
  function logout () {
    $('#logout').click(function () {
      API.logout(function (err, data) {
        if (err) {
          alert('注销失败')
        } else {
          window.location.href = '/'
        }
      })
    })
  }

  function currentUser () {
    API.getCurrentUser(function (err, data) {
      if (err) {
        console.error(err)
      } else {
        $('#naviNickName').html('<a href="#">' + data.nickname + '</a>')
        $('#naviAvatar').find('img').attr('src', data.avatar)
      }
    })
  }

  // 发布文章
  function publish () {
    $('#publish').click(function () {
      var content = $('#content').val()
      API.publish(content, function (err, data) {
        if (err) {
          alert('发布失败')
        } else {
          UI.addContent(data)
        }
      })
    })
  }

  // 关注
  function follow () {
    $('.follow').click(function () {
      var _this = $(this)
      var userId = _this.attr('data-userId')
      var isFollow = _this.attr('data-isfollow')
      if (!isFollow || isFollow === '0') {
        API.follow(userId, function (err, data) {
          if (err) {
            alert('关注失败')
          } else {
            _this.text('已关注').attr('data-isfollow', '1')
          }
        })
      } else if (isFollow === '1') {
        API.unfollow(userId, function (err, data) {
          if (err) {
            alert('取消关注失败')
          } else {
            _this.text('+ 关注').attr('data-isfollow', '0')
          }
        })
      }
    })
  }

  // 编辑头像
  function editAvatar () {
    $('#cover').click(function () {
      $(this).hide()
      $(this).next().hide()
    })

    $('#naviAvatar').click(function () {
      $('#cover').show()
      $('#cover').next().show()
    })
  }

  // 上传头像
  function uploadAvatar () {
    $('#upload').click(function () {
      var file = $('#uploadfile')[0].files[0]
      API.upload(file, function (err, data) {
        if (err) {
          alert('上传失败')
        } else {
          $('#uploadAvatar').find('img').attr('src', data)
          $('#naviAvatar').find('img').attr('src', data)
        }
      })
    })
  }

  // 获取列表
  var page = 1
  var limit = 10
  function getTimeline () {
    API.getTimeline(page, limit, function (err, data) {
      if (err) {
        console.error('获取失败')
      } else {
        data.forEach(function (item) {
          UI.addContent(item, true)
        })
      }
    })
  }

  // 加载更多
  function loadmore () {
    $('#loadmore').click(function () {
      page++
      getTimeline()
    })
  }

  // 获取用户
  function getNewUsers () {
    API.getNewUsers({}, function (err, data) {
      if (err) {
        console.error(err)
      } else {
        data.forEach(function (item) {
          UI.addUser(item, true)
        })
        follow()
      }
    })
  }

  // register()
  // login()
  logout()
  currentUser()
  publish()
  editAvatar()
  uploadAvatar()
  getTimeline()
  getNewUsers()
  loadmore()
})()
