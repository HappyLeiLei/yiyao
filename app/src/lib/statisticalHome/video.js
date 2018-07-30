var videoObject = {
  container: '#video', //容器的ID或className
  variable: 'player', //播放函数名称
  loaded: 'loadedHandler', //当播放器加载后执行的函数
  loop: true, //播放结束是否循环播放
  autoplay: true, //是否自动播放
  config: '', //指定配置函数
  debug: false, //是否开启调试模式
  //flashplayer: true, //强制使用flashplayer
  drag: 'start', //拖动的属性
  seek: 0, //默认跳转的时间
  video: [
    [
      'http://60.30.52.41/live/bhlk10/chunklist_w900994561.m3u8',
      'video/m3u8',
      0
    ]
  ]
};
var player = new ckplayer(videoObject);
