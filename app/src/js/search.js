// 初始化查询时间控件
$('.form_date').datetimepicker({
  language: 'zh-CN',
  weekStart: 1,
  todayBtn: 1,
  autoclose: 1,
  todayHighlight: 1,
  startView: 2,
  minView: 2,
  forceParse: 0
})

// 历史数据搜索
let oHSearchBtn = $('#search-histori-btn')
let oHSearchInput = $('#search-histori-input')
let oSDate = ''
oHSearchBtn.click(function(e) {
  e.preventDefault()
  let searchDate = oHSearchInput.val()
  if (searchDate != '' && searchDate != undefined) {
    // console.log(searchDate);
    getHistoriData('', 1, searchDate)
  } else {
    console.log('查询日期不能为空')
  }
})

// 报警历史查询最近15条报警数据
function getNowAlarmData(idImei, anum, adate) {
  $('.page-box').hide()
  let wname = idImei !== undefined ? 'idImei=' + idImei + '&' : ''
  let page = anum === undefined ? 'pageNo=1' + '&' : 'pageNo=' + anum + '&'
  let limit = 'pageSize=' + '15' + '&'
  let time = adate !== undefined ? 'idImei=' + adate : ''
  // console.log(wHorst + wname + page + limit + time);
  $.ajax({
    type: 'get',
    url: nowHost + wname + page + limit + time,
    data: 'data',
    dataType: 'json',
    success: function(response) {
      // console.log(response.data);
      let rev = response.data
      // let daoxu = rev.reverse();
      // console.log(daoxu)
      let code = response.code
      // console.log(code)
      let oTBody = $('.an-box tbody')
      if (code == 0) {
        // console.log(response.data);
        let data = response.data
        let pages = response.page
        let count = response.count / response.page
        let current = page
        // console.log(current)
        for (let i = 0; i < data.length; i++) {
          for (let j = i + 1; j < data.length; j++) {
            if (data[i].wid > data[j].wid) {
              let aTmp = data[i]
              data[i] = data[j]
              data[j] = aTmp
            }
          }
        }
        oTBody.html('')
        data.map(item => {
          oTBody.append(`<tr>
              <td>${item.id}</td>
              <td>${item.position}</td>
              <td>${item.idImei}</td>
              <td style="${
                parseInt(item.video) === 0 ? 'color:red' : 'color:green'
              }">${parseInt(item.video) === 0 ? '异常' : '正常'}</td>
              <td style="${
                parseInt(item.ele) === 0 ? 'color:red' : 'color:green'
              }">${parseInt(item.ele) === 0 ? '异常' : '正常'}</td>
              <td style="${
                parseInt(item.net) !== 100 ? 'color:green' : 'color:red'
              }">${parseInt(item.net) !== 100 ? '正常' : '异常'}</td>
              <td>${item.releasetime}</td>
            </tr>`)
        })

        $('#current-num').text('当前页' + pages)
        $('#all-page').text('总页数：' + pages)
        $('#go-to-pageN').val(page.replace('page=', '').replace('&', ''))
      } else {
        // console.log(response);
        oTBody.html(`
          <tr>
            <td colspan="7">
              暂时没有报警数据.
            </td>
          </tr>
        `)
      }
      let dNum = parseInt(
        $('#current-num')
          .text()
          .replace('当前页：', '')
      )
      if (dNum == 1) {
        $('.previous').addClass('disabled')
      } else {
        $('.previous').removeClass('disabled')
      }
    }
  })
}

// 报警历史查询
let getAlarmDataLock = true
function getAlarmData(aname, anum) {
  $('.page-box').show()
  let wname = aname !== undefined ? 'idImei=' + aname + '&' : ''
  let page = anum !== undefined ? 'pageNo=' + anum + '&' : 'pageNo=1' + '&'
  let limit = 'pageSize=' + '15' + '&'
  // console.log(nowHost + wname + page + limit);
  if (getAlarmDataLock) {
    getAlarmDataLock = false
    $.ajax({
      type: 'get',
      url: nowHost + wname + page + limit,
      data: 'data',
      dataType: 'json',
      success: function(response) {
        let code = response.code
        let oTBody = $('.an-box tbody')
        let pages = response.page
        if (code == 0) {
          let data = response.data
          oTBody.html('')
          data.map(item => {
            oTBody.append(`<tr>
              <td>${item.id}</td>
              <td>${item.position}</td>
              <td>${item.idImei}</td>
              <td style="${
                parseInt(item.video) === 0 ? 'color:red' : 'color:green'
              }">${parseInt(item.video) === 0 ? '异常' : '正常'}</td>
              <td style="${
                parseInt(item.ele) === 0 ? 'color:red' : 'color:green'
              }">${parseInt(item.ele) === 0 ? '异常' : '正常'}</td>
              <td style="${
                parseInt(item.net) !== 100 ? 'color:green' : 'color:red'
              }">${parseInt(item.net) !== 100 ? '正常' : '异常'}</td>
              <td>${item.releasetime}</td>
            </tr>`)
          })

          $('#current-num').text(
            '当前页：' + page.replace('pageNo=', '').replace('&', '')
          )
          $('#all-page').text('总页数：' + pages)
          $('#go-to-pageN').val(page.replace('pageNo=', '').replace('&', ''))
          getAlarmDataLock = true
        } else {
          oTBody.html(`
            <tr>
              <td colspan="7">
                暂时没有报警数据.
              </td>
            </tr>
          `)
          getAlarmDataLock = true
        }
        let dNum = parseInt(
          $('#current-num')
            .text()
            .replace('当前页：', '')
        )
        if (dNum == 1) {
          $('.previous').addClass('disabled')
        } else {
          $('.previous').removeClass('disabled')
        }
        if (dNum !== pages) {
          $('.next').removeClass('disabled')
        } else {
          $('.next').addClass('disabled')
        }
      }
    })
  }
}

// 报警数据搜索
let oASearchBtn = $('#search-alarm-btn')
let oASearchInput = $('#search-alarm-input')
oASearchBtn.click(function(e) {
  e.preventDefault()
  let searchDate = oASearchInput.val()
  if (searchDate != '' && searchDate != undefined) {
    getAlarmData(searchDate, 1)
  } else {
    console.log('查询日期不能为空')
  }
})

// 报警数据翻页查询
let hpageNum = 1
let wpageNum = 1
function nextPage(sName, oNum, allPages) {
  wpageNum++
  if (oNum == allPages) return
  if (oNum != 1) {
    oNum += 1
    getAlarmData(sName, oNum)
  } else {
    hpageNum++
    getAlarmData(sName, hpageNum)
  }
}
function previousPage(sName) {
  let dNum = parseInt(
    $('#current-num')
      .text()
      .replace('当前页：', '')
  )
  getAlarmData(sName, dNum - 1)
}

function goToPagea(sName, goNum) {
  getAlarmData(sName, goNum)
}

$('#a-next').click(function(e) {
  e.preventDefault()
  let currentNum = $('#current-num').html()
  let allPages = parseInt(
    $('#all-page')
      .html()
      .replace('总页数：', '')
  )
  let oNum = parseInt(currentNum.replace('当前页：', ''))
  let date = oASearchInput.val()
  nextPage(date, oNum, allPages)
})
$('#a-previous').click(function(e) {
  e.preventDefault()
  let dNum = parseInt(
    $('#current-num')
      .text()
      .replace('当前页：', '')
  )
  if (dNum != 1) {
    let date = oASearchInput.val()
    previousPage(date)
  }
})
$('#a-go-to-page-search').click(function(e) {
  e.preventDefault()
  let sName = oASearchInput.val()
  let num = $('#go-to-pageN').val()
  goToPagea(sName, num)
})
