// 宝坻区河道总长数据、管理员数量数据
function getRiverHeadData() {
  const bdHh = ['bd-hc', 'bd-all-user'];
  for (let i = 0; i < bdNum.length; i++) {
    chronoGraph(document.getElementById(bdHh[i]), '0', bdNum[i]);
  }
}
getRiverHeadData();
setTimeout(() => {
  setInterval(() => {
    getRiverHeadData();
  }, 10 * 60 * 1000);
}, 7000);

// 执行人员列表
// const userList = document.getElementById('user-list');
// for (let i = 0; i < userName.length; i++) {
//   let oLi = document.createElement('li');
//   oLi.setAttribute('class', 'list-item');
//   oLi.innerHTML = userName[i];
//   userList.appendChild(oLi);
// }

// 获取服务器时间
let serverTime = new Date($.ajax({ async: false }).getResponseHeader('Date'));
let getTime = serverTime.toLocaleString().replace(/\//g, '.');
$('#get-date').html('数据刷新时间 ' + getTime);

// 显示新闻详情
function showNewsCont(newsId, newsContent, title) {
  $('.news-content-m').attr('id', 'news-m' + newsId);
  $('.modal-title').html(title);
  $('.modal-body').html($.base64.decode(newsContent));
  clearTimeout(timer);
}

// // 定时刷新
// function loadHtml() {
//   window.location.reload();
// }
// let timer = setTimeout('loadHtml()', 1000 * 10 * 60);

// function startLoad() {
//   setTimeout('loadHtml()', 1000 * 10 * 60);
// }
