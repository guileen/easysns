(function () {
  reglogTabChange();
  // register();
  // login();
  logout();
  publish();
  follow();
  editAvatar();
  uploadAvatar();

  // 注册登录选项卡切换
  function reglogTabChange(){
    var li = $('.nav-tabs').find('li');
    var reg = $('#reg');
    var log = $('#log');
    li.click(function () {
      li.removeClass('active');
      $(this).addClass('active');
      var index = $(this).index();
      if (index == '0') {
        reg.addClass('cur');
        log.removeClass('cur');
      } else {
        reg.removeClass('cur');
        log.addClass('cur');
      }
    })
  }

  // 注册
  function register(){
    $('#register').click(function () {
      var userName = $('#reg_userName').val();
      var password = $('#reg_password').val();
      var confirmpassword = $('#reg_confirmpassword').val();
      if (password !== confirmpassword) {
        return alert('两次密码不一致！');
      }
      var nickName = $('#reg_nickName').val();
      API.register(userName, password, nickName, function (err, data) {
        if (err) {
          alert('注册失败');
        } else {
          window.location.href = './index.html';
        }
      });
    });
  }

  // 登录
  function login(){
    $('#login').click(function () {
      var userName = $('#log_userName').val();
      var password = $('#log_password').val();
      API.login(userName, password, function (err, data) {
        if (err) {
          alert('登录失败');
        } else {
          window.location.href = './index.html';
        }
      })
    });
  }

  // 注销
  function logout(){
    $('#logout').click(function () {
      API.logout(function (err, data) {
        if (err) {
          alert('注销失败');
        } else {
          window.location.href = './reglog.html';
        }
      });
    });
  }

  // 发布文章
  function publish(){
    $('#publish').click(function () {
      var content = $('#content').val();
      API.publish(content, function (err, data) {
        if (err) {
          alert('发布失败');
        } else {
          UI.addContent(data);
        }
      });
    })
  }

  // 关注
  function follow(){
    $('.follow').click(function () {
      var _this = $(this)
      var userId = _this.attr('data-userId');
      var isFollow = _this.attr('data-isfollow');
      if (!isFollow || isFollow == '0') {
        API.follow(userId, function (err, data) {
          if (err) {
            alert('关注失败');
          } else {
            _this.text('已关注').attr('data-isfollow', '1');
          }
        });
      } else if (isFollow == '1') {
        API.unfollow(userId, function (err, data) {
          if (err) {
            alert('取消关注失败');
          } else {
            _this.text('+ 关注').attr('data-isfollow', '0');
          }
        });
      }
    });
  }

  // 编辑头像
  function editAvatar(){
    $('#cover').click(function () {
      $(this).hide();
      $(this).next().hide();
    });

    $('#naviAvatar').click(function (){
      $('#cover').show();
      $('#cover').next().show();
    });
  }

  // 上传头像
  function uploadAvatar(){
    $('#upload').click(function () {
      var file = $('#uploadfile')[0].files[0];
      API.upload(file, function (err, data) {
        if (err) {
          alert('上传失败');
        } else {
          $('#uploadAvatar').find('img').attr('src', data);
          $('#naviAvatar').find('img').attr('src', data);
        }
      });
    })
  }
})();
