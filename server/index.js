// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');
const {
  exec,
  which,
  echo
} = require('shelljs')
const getFiltrateData = require('./filtrateData.js');

cloud.init()

function execAsync(cmd, opts = {}) {
  return new Promise(function (resolve, reject) {
    // Execute the command, reject if we exit non-zero (i.e. error)
    exec(cmd, opts, function (code, stdout, stderr) {
      if (code != 0) return reject(new Error(stderr));
      return resolve(stdout);
    });
  });
}

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  });
  app.router('update', async (ctx, next) => {
    try {
      if (which('yum')) {
        console.log('yum')
        // const c = await execAsync('su - root')
        // console.log('c', c)
        let execShell = `su - root -s /bin/sh -c "yum install pango.x86_64  -y"`
        // libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64
        const a = await execAsync(execShell)
        console.log('a', a)
        ctx.body = {
          code: 200,
          msg: 'ok',
          data: a
        }
      } else {
        echo('apt-get command not found')
        console.log('apt-get command not found')
        ctx.body = {
          code: 500,
          msg: 'apt-get command not found'
        }
      }
    } catch (error) {
      console.log(error)
      console.log(error.message)
      ctx.body = {
        code: 500,
        msg: error
      }
    }
  })

  app.router('list', async (ctx, next) => {
    try {
      const {
        url
      } = ctx._req.event

      console.log(url, ctx)

      const filtrateData = await getFiltrateData(url);
      ctx.body = {
        code: 200,
        msg: 'ok',
        data: filtrateData
      }

    } catch (err) {
      ctx.body = {
        code: 500,
        msg: err
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
