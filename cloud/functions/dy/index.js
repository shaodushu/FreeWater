// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');
const {
  runDouyin
} = require('./core');

cloud.init()
// const api = require('./api')
// const tools = require('./tools')

//  1. 检索书籍
//  2. 获取书本基本信息
//  3. 获取书本目录
//  3.1 最近更新
//  3.2 全部章节
//  4. 获取书本详情


// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  });

  app.router('dy', async (ctx, next) => {
    try {
      const {
        title
      } = ctx._req.event
      // console.log(ctx)
      // const result = await api.search(title)
    //   return ctx.body = {
    //     code: 200,
    //     msg: `发现相关小说`,
    //     data: tools.booksList(result.text)
    //   }

      try {
        const {
          videoStream,
          share_title
        } = await runDouyin('https://v.douyin.com/JdngHhh/');
        ctx._res.attachment(`${share_title}(无水印).mp4`);
        videoStream.pipe(ctx._res);
      } catch (e) {
        console.log(e);
        ctx._res.send('错误: ' + e);
      }


    } catch (err) {
      return ctx.body = {
        code: 500,
        msg: 'err:' + err
      }
    }
  });

  return app.serve();
}

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()
//   try {
//     const {
//       videoStream,
//       share_title
//     } = await runDouyin(req.query.url);
//     res.attachment(`${share_title}(无水印).mp4`);
//     videoStream.pipe(res);
//   } catch (e) {
//     console.log(e);
//     res.send('错误: ' + e);
//   }

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }
