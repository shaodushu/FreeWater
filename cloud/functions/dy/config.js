module.exports = {
  isShowChrome: false, //是否显示chrome浏览器
  ajaxKey: 'v2/aweme/post', //接口的关键字，防止对所有接口都获取数据
  ajaxPath: 'video.play_addr.url_list[0]', //视频在接口里的路径
  // inputUrl: 'https://v.douyin.com/qKYSAt/'
  // inputUrl: 'https://v.douyin.com/qKDN9n/', //输入的链接，后期由页面传入吧
  savePath: './output', //保存路径
  isDownload: true, //是否下载视频
  isSaveJsonData: false, //是否保存json数据,如获取到的接口数据和整理后的视频数据

}
