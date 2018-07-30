// 百度地图API功能
var map = new BMap.Map('allMap');
map.centerAndZoom(new BMap.Point(116.403765, 39.91485), 5);
map.disableDoubleClickZoom();
map.disablePinchToZoom();
map.disableDragging();
var bdary = new BMap.Boundary();
// 定位划出行政区
bdary.get('宝坻区', function(rs) {
  // 设置地图样式风格
  map.setMapStyle({
    styleJson: [
      {
        featureType: 'background',
        elementType: 'all',
        stylers: {
          color: '#1c3377'
        }
      },
      {
        featureType: 'road',
        elementType: 'all',
        stylers: {
          visibility: 'off'
        }
      },
      {
        featureType: 'poilabel',
        elementType: 'all',
        stylers: {
          visibility: 'off'
        }
      },
      {
        featureType: 'administrative',
        elementType: 'all',
        stylers: {
          visibility: 'off'
        }
      },
      {
        featureType: 'water',
        elementType: 'all',
        stylers: {
          visibility: 'off'
        }
      }
    ]
  });
  //获取行政区域
  map.clearOverlays(); //清除地图覆盖物
  var count = rs.boundaries.length; //行政区域的点有多少个
  if (count === 0) {
    console.log('未能获取当前输入行政区域');
    return;
  }
  var pointArray = [];
  for (var i = 0; i < count; i++) {
    var ply = new BMap.Polygon(rs.boundaries[i], {
      strokeWeight: 2,
      strokeColor: '#008e44',
      fillColor: '#0b1f34'
    }); //建立多边形覆盖物
    map.addOverlay(ply); //添加覆盖物
    pointArray = pointArray.concat(ply.getPath());
  }
  var Region = []; //调整视野坐标集

  $.ajax({
    type: 'get',
    url: host + 'BD_WaterControl/secondriver/selectAll',
    async: true,
    cache: false,
    crossDomain: true == !document.all,
    success: function(res) {
      var sid;
      var Rcor = [
        '#006837',
        '#c0272d',
        '#faaf3b',
        '#419845',
        '#29aae1',
        '#fbed21',
        '#00ffff',
        '#f05a24'
      ];
      // var oUl = document.createElement('ul');
      for (var i = 0; i < res.data.length; i++) {
        sid = res.data[i].sid;
        Highlight(sid, Rcor[i]);
      }
    }
  });

  //查询添加河道
  function Highlight(sid, Rcor) {
    $.ajax({
      type: 'get',
      url: host + 'BD_WaterControl/secondriver/selectBySid?sid=' + sid,
      async: true,
      cache: false,
      crossDomain: true == !document.all,
      success: function(res) {
        var point = [];
        for (var i = 0; i < res.data.region.length; i++) {
          point.push(
            new BMap.Point(
              res.data.region[i].longtitude,
              res.data.region[i].latitude
            )
          );
          Region.push(
            new BMap.Point(
              res.data.region[i].longtitude,
              res.data.region[i].latitude
            )
          );
        }
        var polygon = new BMap.Polygon(point, {
          strokeColor: Rcor,
          strokeOpacity: 1,
          strokeWeight: 1,
          fillColor: Rcor,
          fillOpacity: 1
        }); //创建多边形
        map.addOverlay(polygon);
      }
    });
  }
  map.setViewport(pointArray); //调整视野
});

setTimeout(() => {
  $('.map-wrapper').css('display', 'none');
}, 3000);
