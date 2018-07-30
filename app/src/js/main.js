let storage = window.sessionStorage
let uid = storage.getItem('uid')
let uadmin = storage.getItem('uadmin')
let windowH = $(window).height()

if (typeof uid == 'undefined' || uid == '' || uid == null) {
  $(window).attr('location', 'login.html')
} else {
  // console.log(uid);
}

function setWindowH() {
  $('.main-content-box').css('min-height', windowH - 80)
}

function setMapH() {
  $('#allMap').css('min-height', windowH - 140)
}
setWindowH()
setMapH()

$(window).resize(function() {
  setWindowH()
})

$('.floor-info-box .panel .panel-heading').click(function(e) {
  $(this)
    .children('span')
    .text($('.floor-info-box .panel .panel-body').is(':hidden') ? '-' : '+')
  $(this)
    .next()
    .toggle(300)
})
