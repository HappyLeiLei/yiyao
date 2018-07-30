// 格式化
function formatNum(num) {
  var result = [],
    counter = 0;
  num = (num || 0).toString().split('');
  for (var i = num.length - 1; i >= 0; i--) {
    counter++;
    result.unshift(num[i]);
    if (!(counter % 3) && i != 0) {
      result.unshift(',');
    }
  }
  return result.join('');
}
function pad(num, n) {
  var len = num.toString().length;
  while (len < n) {
    num = '0' + num;
    len++;
  }
  return num;
}
// 千分位
function chronoGraph(ele, start, end) {
  var hand = [];
  start = parseInt(start.replace(/,/g, ''));
  var now = start;
  end = parseInt(end.replace(/,/g, ''));
  var lang = end.toString().length;

  var step = parseInt((end - start) / 25); /* 鍒嗘垚25甯� */

  hand.push(
    setInterval(function() {
      if (now < end) {
        ele.innerHTML = formatNum(pad(now, lang));
        now += step;
      } else {
        clearTimer(hand);
        ele.innerHTML = formatNum(end);
        now = 0;
      }
    }, 30)
  );
}
function clearTimer(hand) {
  for (var i = 0; i < hand.length; i++) {
    clearTimeout(hand[i]);
  }
  hand.length = 0;
}
// 获取非行间样式行函数
function getStyle(obj, name) {
  if (obj.currentStyle) {
    return obj.currentStyle[name];
  } else {
    return getComputedStyle(obj, false)[name];
  }
}

// 运动函数
function startMove(obj, json, fnEnd) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    var stopMove = true;
    for (const attr in json) {
      var cur = 0;
      if (attr == 'opacity') {
        cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
      } else {
        cur = parseInt(getStyle(obj, attr));
      }

      var speed = (json[attr] - cur) / 30;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (cur != json[attr]) {
        stopMove = false;
      }
      if (attr == 'opacity') {
        obj.style.filter = 'alpha(opacity:' + (cur + speed) + ');';
        obj.style['opacity'] = (cur + speed) / 100;
      } else {
        obj.style[attr] = cur + speed + 'px';
      }
    }
    if (stopMove) {
      clearInterval(obj.timer);
      if (fnEnd) fnEnd();
    }
  }, 30);
}
