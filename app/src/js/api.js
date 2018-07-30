// 数据接口
let base = 'http://61.181.255.77:17320'

// 登录接口
let lHost = 'http://61.181.255.77:17311' + '/Hglibrary/login/loginselect?'

// 报警数据最近20条接口
let nowHost = base + '/VideoCheckTest/videoCheckData/selectAllByInfo?'
// 报警数据查询接口
let wHorst = base + '/Hglibrary/waring/selectWaringByDate?'

//坐标数据 Z
let Z_pt = base + '/VideoCheckTest/deviceInfo/selectAllByInfo'
// 设备状态 Z
let z_device_status =
  base + '/VideoCheckTest/videoCheckPublish/selectAllById?id='
// 重启 Z
let z_rest = base + '/VideoCheckTest/videoCheckPublish/restart?id='
