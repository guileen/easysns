;(function (root, factory) {
  root.UI = factory()
}(this, function () {
  var ui = {}

  // 添加一个通知
  ui.addNotice = function (data) {
    var tpl = '<div class="alert alert-info alert-dismissible" role="alert">' +
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
      data.content +
      '</div>'
    $('#notice').prepend(tpl)
  }

  // 添加一个用户
  ui.addUser = function (data, append) {
    var tpl = '<div class="user">' +
      '<div class="avatar">' +
      '<img src="' + data.avatar + '">' +
      '</div>' +
      '<div class="nickname">' + data.nickname + '</div>' +
      '<div class="follow" data-userid="' + data._id + '" data-isfollow="' + (data.isFollowing ? '1' : '0') + '"">' + (data.isFollowing ? '已关注' : '+ 关注') + '</div>' +
      '</div>'
    if (append) {
      $('#userlist').append(tpl)
    } else {
      $('#userlist').prepend(tpl)
    }
  }

  // 添加一片文章
  ui.addContent = function (data, append) {
    var tpl = '<div class="list-item">' +
      '<div class="list-user">' +
      '<div class="avatar">' +
      '<img src="' + data.user.avatar + '">' +
      '</div>' +
      '<div class="nickname">' + data.user.nickname + '</div>' +
      '</div>' +
      '<div class="list-content">' + data.content + '</div>' +
      '</div>'

    if (append) {
      $('#list').append(tpl)
    } else {
      $('#list').prepend(tpl)
    }
  }

  return ui
}))
