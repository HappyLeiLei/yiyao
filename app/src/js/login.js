// 通过sessionStorage 判断用户是否存在
let storage = window.sessionStorage
let uid = storage.getItem('uid')
let uadmin = storage.getItem('uadmin')
if (uid != null) {
  $(window).attr('location', 'index.html')
}

//判断是否敲击了Enter键
$(document).keyup(function(event) {
  if (event.keyCode == 13) {
    $('#login_btn').trigger('click')
  }
})

$('#user-name, #user-pass').focus(function() {
  $('.login-alert-box').slideUp()
})

$('#login_btn').click(function(e) {
  e.preventDefault()
  let userName = $('#user-name').val()
  let userPassWord = $('#user-pass').val()
  if (userName == '' || userName == undefined) {
    $('#alert-span').text('用户名不能为空')
    $('.login-alert-box').slideDown()
    $('.login-alert-box .close').click(function() {
      $('.login-alert-box').slideUp()
    })
  } else if (userPassWord == '' || userPassWord == undefined) {
    $('#alert-span').text('密码不能为空')
    $('.login-alert-box').slideDown()
    $('.login-alert-box .close').click(function() {
      $('.login-alert-box').slideUp()
    })
  } else {
    loginTest(userName, userPassWord)
  }
})

function loginTest(username, userpass) {
  axios
    .get(lHost, {
      params: {
        uname: username,
        upsd: userpass
      }
    })
    .then(function(response) {
      // console.log(response.data)
      let code = response.data.code
      if (code != 0) {
        $('#alert-span').text('用户名密码错误')
        $('.login-alert-box').slideDown()
        $('.login-alert-box .close').click(function() {
          $('.login-alert-box').slideUp()
        })
      } else {
        let uid = response.data.uid
        let uadmin = response.data.uadmin
        storage.setItem('uid', uid) //存储用户 ID
        storage.setItem('uadmin', uadmin) //存储用户身份标识
        $(window).attr('location', 'index.html')
      }
    })
    .catch(function(error) {
      console.log(response)
    })
}
