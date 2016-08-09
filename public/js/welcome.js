
;(function () {
  reglogTabChange()
  // 注册登录选项卡切换
  function reglogTabChange () {
    var li = $('.nav-tabs').find('li')
    var reg = $('#reg')
    var log = $('#log')
    li.click(function () {
      li.removeClass('active')
      $(this).addClass('active')
      var index = $(this).index()
      if (index === '0' || index === 0) {
        reg.addClass('cur')
        log.removeClass('cur')
      } else {
        reg.removeClass('cur')
        log.addClass('cur')
      }
    })
  }
})()
