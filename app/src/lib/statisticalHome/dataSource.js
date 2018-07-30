// 接口地址
const host = 'http://61.181.255.77:17320/';

// 宝坻区河长管理体系数据
function getRiverHead() {
  $.ajax({
    type: 'GET',
    url: host + 'BD_WaterControl/role/selectCount',
    data: 'data',
    dataType: 'json',
    success: function(response) {
      let aNum = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          let element = String(response[key]);
          aNum.push(element);
        }
      }
      // 宝坻区河长管理体系
      const eleList = ['q-live', 'c-live', 'z-live'];
      for (let i = 0; i < aNum.length; i++) {
        if (aNum[i] < 25) {
          document.getElementById(eleList[i]).innerHTML = aNum[i];
        } else {
          chronoGraph(document.getElementById(eleList[i]), '0', aNum[i]);
        }
      }
    }
  });
}
getRiverHead();
setTimeout(() => {
  setInterval(() => {
    getRiverHead();
  }, 5 * 60 * 1000);
}, 3000);

// 河道巡查任务反馈数据
function getTasks() {
  $.ajax({
    type: 'GET',
    url: host + 'BD_WaterControl/targetrecord/selectMissionCount',
    data: 'data',
    dataType: 'json',
    success: function(response) {
      let fdNum = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          let element = String(response[key]);
          fdNum.push(element);
        }
      }
      // 河道巡查任务反馈
      const feedbackList = ['fd-all', 'fd-rate', 'fd-over'];
      for (let i = 0; i < fdNum.length; i++) {
        if (fdNum[i] < 25) {
          document.getElementById(feedbackList[i]).innerHTML = fdNum[i];
        } else if (parseInt(fdNum[i]) % 1 !== 0) {
          document.getElementById(feedbackList[i]).innerHTML = fdNum[i];
        } else {
          chronoGraph(document.getElementById(feedbackList[i]), '0', fdNum[i]);
        }
      }
    }
  });
}
getTasks();
setTimeout(() => {
  setInterval(() => {
    getTasks();
  }, 5 * 60 * 1000);
}, 4000);

// 新闻公告列表数据
function getNewsList() {
  $.ajax({
    type: 'GET',
    url: host + 'BD_WaterControl/compre/getAll',
    data: 'data',
    dataType: 'json',
    success: function(response) {
      let newsListData = [];
      let data = response.data.slice(-5);
      for (let i = 0; i < data.length; i++) {
        let obj = {
          id: data[i].id,
          title: data[i].title,
          url: data[i].pictureUrl,
          content: data[i].content,
          time: data[i].time
        };
        newsListData.push(obj);
      }
      // 新闻公告
      const newsList = document.getElementById('news-list');
      newsList.innerHTML = '';
      for (let i = 0; i < newsListData.length; i++) {
        let oLi = document.createElement('li');
        oLi.setAttribute('class', 'list-item');
        let oA = document.createElement('a');
        oA.href = '#news-m' + newsListData[i].id;
        oA.setAttribute('target', '_blank');
        oA.setAttribute('data-toggle', 'modal');
        oA.setAttribute(
          'onclick',
          'showNewsCont(' +
            newsListData[i].id +
            ',' +
            '"' +
            newsListData[i].content +
            '"' +
            ',' +
            '"' +
            data[i].title +
            '"' +
            ')'
        );
        oA.innerHTML =
          newsListData[i].title.length < 12
            ? newsListData[i].title
            : newsListData[i].title + '...';
        let oSpan = document.createElement('span');
        oSpan.setAttribute('class', ' pull-right');
        let newsTime = newsListData[i].time.slice(0, 10);
        oSpan.innerHTML = newsTime;
        oA.appendChild(oSpan);
        oLi.appendChild(oA);
        newsList.appendChild(oLi);
      }
    }
  });
}
getNewsList();
setTimeout(() => {
  setInterval(() => {
    getNewsList();
  }, 10 * 60 * 1000);
}, 5000);

// 任务发布统计数据
function getTaskRelease() {
  $.ajax({
    type: 'GET',
    url: host + 'BD_WaterControl/targetrecord/selectCountByTime',
    data: 'data',
    dataType: 'json',
    success: function(response) {
      let takesData = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          const element = response[key];
          for (const i in element) {
            if (element.hasOwnProperty(i)) {
              const element1 = element[i];
              let obj = { num: String(element1) };
              takesData.push(obj);
            }
          }
        }
      }
      // 任务发布统计
      const takesLsit = [
        'takes-over',
        'takes-num',
        'n-takes-over',
        'n-takes-num'
      ];
      for (let i = 0; i < takesData.length; i++) {
        if (takesData[i].num < 25) {
          document.getElementById(takesLsit[i]).innerHTML = takesData[i].num;
        } else {
          chronoGraph(
            document.getElementById(takesLsit[i]),
            '0',
            takesData[i].num
          );
        }
      }
    }
  });
}
getTaskRelease();
setTimeout(() => {
  setInterval(() => {
    getTaskRelease();
  }, 10 * 60 * 1000);
}, 6000);

// 天气预报数据
$.ajax({
  type: 'GET',
  url: 'http://61.181.255.77:17350/BC_HBJ/getPollForecast',
  data: 'data',
  async: true,
  dataType: 'json',
  success: function(response) {
    let data = response.data;
    let weatherData = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let sEle = element.content.split(' ');
      // console.log(sEle[3]);
      let str = sEle[3].indexOf('转');
      // console.log(str);
      let test;
      if (str != -1) {
        test = sEle[3].slice(2, 4) + ' ';
      } else {
        test = sEle[3].slice(0, 2) + ' ';
      }
      // console.log(test);
      let obj = {
        title: sEle[0],
        type: test,
        temperature: sEle[4].split('/')[1]
      };
      // console.log(obj);
      weatherData.push(obj);
    }
    // 未来天气
    const weatherList = document.getElementById('weather-list');
    for (let i = 0; i < weatherData.length; i++) {
      let oLi = document.createElement('li');
      let oH1 = document.createElement('h1');
      let oH2 = document.createElement('h2');
      oLi.setAttribute('class', 'list-item');
      oH1.innerHTML = weatherData[i].title;
      oH2.innerHTML = weatherData[i].type + weatherData[i].temperature;
      oLi.appendChild(oH1);
      oLi.appendChild(oH2);
      weatherList.appendChild(oLi);
    }
  }
});

// 宝坻区河道总长数据、管理员数量数据
let bdNum = ['150308', '263'];

// 数组对象去重
// function arrayUnique(arr, name) {
//   var hash = {};
//   return arr.reduce(function(item, next) {
//     hash[next[name]] ? '' : (hash[next[name]] = true && item.push(next));
//     return item;
//   }, []);
// }

// 人员列表信息查询
userNameList(1);
function userNameList(sid) {
  $('#user-list').css('display', 'none');

  let oUl = document.getElementById('user-list');
  oUl.innerHTML = '';
  let userNameList = [];
  $.ajax({
    type: 'GET',
    url: host + 'BD_WaterControl/role/selectRoleByInfo?sid=' + sid,
    data: 'data',
    dataType: 'json',
    success: function(response) {
      let data = response.data;
      for (let i = 0; i < data.length; i++) {
        const qz = data[i].duties == '常务副区长' || data[i].duties == '副区长';
        const zz =
          data[i].duties == '党委书记' ||
          data[i].duties == '主任' ||
          data[i].duties == '镇长';
        const cz = data[i].duties == '村长';
        const element = data[i];
        if (qz) {
          // console.log('区长：' + data[i].personName);
          let oLi1 = document.createElement('li');
          let oImgqz = document.createElement('img');
          oImgqz.setAttribute('src', '../images/usertop1.png');
          oLi1.setAttribute('class', 'list-item quzhang');
          oLi1.innerHTML = data[i].personName;
          oLi1.appendChild(oImgqz);
          oUl.appendChild(oLi1);
        } else if (zz) {
          // console.log('镇长：' + data[i].personName);
          let oLi2 = document.createElement('li');
          let oImgzz = document.createElement('img');
          oImgzz.setAttribute('src', '../images/usertop2.png');
          oLi2.setAttribute('class', 'list-item zhenzhang');
          oLi2.innerHTML = data[i].personName;
          oLi2.appendChild(oImgzz);
          oUl.appendChild(oLi2);
        } else if (cz && typeof cz != 'undefined') {
          // console.log('村长：' + data[i].personName);
          let oLi3 = document.createElement('li');
          let oImgcz = document.createElement('img');
          oImgcz.setAttribute('src', '../images/usertop3.png');
          oLi3.setAttribute('class', 'list-item');
          oLi3.innerHTML = data[i].personName;
          oLi3.appendChild(oImgcz);
          oUl.appendChild(oLi3);
        }
      }
      $('#user-list').slideDown();
    }
  });
}
