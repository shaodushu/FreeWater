// const axios = require('axios');

// axios.defaults.withCredentials = true

// async function a() {
//   const a = await axios({
//     url: 'https://v.douyin.com/dLurNGk/',
//     methods: 'get',
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.78'
//     }
//   })
//   console.log(a)
// }
// // a()
// ///video/6838097424821652751?previous_page=web_code_link

// async function b() {
//   const a = await axios({
//     url: 'https://www.douyin.com/video/6838097424821652751?previous_page=web_code_link',
//     methods: 'get',
//     headers: {
//       'authority': 'www.douyin.com',
//       'method': 'GET',
//       'path': '/video/6838097424821652751?previous_page=web_code_link',
//       'scheme': 'https',
//       'cookie': "douyin.com; ttwid=1%7CEHf20g0vo4Nv9MC_1oj2aT7GBW2gqoLP58c7YJvv7b8%7C1624604255%7Cecc46094b862349fc837fa0f279502cc995062583cfe849f86c513265315517a; odin_tt=9fc19b74b3623ff167563ef0f9f5e7067197374ba2a546bf50fcb04abb53210cfc778fefbc9cce656bbf32fa43782775252d8f5ca7756cb714561c65b87c620e; passport_csrf_token_default=d9552e8d96ce7cdababc8c2d6f665d4c; passport_csrf_token=d9552e8d96ce7cdababc8c2d6f665d4c; MONITOR_WEB_ID=1e384683-439a-4c3f-94db-d172e38f657f; s_v_web_id=verify_kst07ccb_AQsQJXce_UVg3_4auI_ApOt_iI7xj88W9tEQ",
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.78'
//     }
//   })
//   console.log(a)
// }
// b()

// 入口文件
const getUrl = require('./getUrl.js');
const getFiltrateData = require('./filtrateData.js');
// const downloadVideo = require('./download.js');
const config = require('./config');


async function getVideo(inputUrl) {
  let filtrateData = await getFiltrateData(inputUrl)
  console.log(filtrateData)
  for (let i = 0; i < filtrateData.length; i++) {
    // 获取实际视频下载地址
    let video = await getUrl(filtrateData[i])
    if (config.isDownload) {
    //   downloadVideo(video)
    }
  }
}


getVideo('https://v.douyin.com/dL9BfJK/')