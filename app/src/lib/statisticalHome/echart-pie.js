var dom = document.getElementById('bd-diagram-pie');
var myChartBDPie = echarts.init(dom, 'shine');
var app = {};
option = null;
app.title = '环形图';

function getTasksData() {
  $.ajax({
    type: 'GET',
    url: host + 'BD_WaterControl/targetrecord/selectRiverCount',
    data: 'data',
    dataType: 'json',
    success: function(response) {
      let title = [];
      let data = [];
      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          const element = response.data[key];
          title.push(element.rivername);
          let obj = {
            id: element.riverid,
            value: parseInt(element.count),
            name: element.rivername
          };
          data.push(obj);
        }
      }
      let pieData = {
        title: title,
        data: data
      };
      var names = pieData.title;
      var datas = pieData.data;

      option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>  {b}任务数: {c}'
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: '80%',
          bottom: 0,
          textStyle: {
            color: '#fff'
          },
          data: names
        },
        series: [
          {
            name: '任务发布情况分布图',
            type: 'pie',
            center: ['50%', '40%'],
            radius: ['55%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: datas
          }
        ]
      };
      if (option && typeof option === 'object') {
        myChartBDPie.setOption(option, true);
      }
    }
  });
}

getTasksData();
setTimeout(() => {
  setInterval(() => {
    myChartBDPie.clear();
    getTasksData();
  }, 5 * 60 * 1000);
}, 4000);
