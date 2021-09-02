// const puppeteer = require('puppeteer');

// const launchConfig = {
//     // headless: false,
//     // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
//     slowMo: 1000,
//     defaultViewport: {
//         width: 1600,
//         height: 900,
//     }
// }

// puppeteer.launch(launchConfig).then(async browser => {
//     const page = await browser.newPage();
//     await page.goto('https://movie.douban.com/cinema/nowplaying/beijing/');
//     const result = await page.evaluate(() => {
//         const items = document.querySelectorAll('#nowplaying > div.mod-bd > ul >li');
//         const links = [];
//         if (items.length >= 1) {
//             items.forEach((item) => {
//                 const data = Array.from(item.attributes);
//                 const link = {};
//                 data.forEach((v) => {
//                     link[v.nodeName] = v.value;
//                 });
//                 const a = item.querySelector('.poster > a');
//                 const img = a.querySelector('img');
//                 link.href = a.getAttribute('href');
//                 link.src = img.getAttribute('src');
//                 links.push({
//                     ...link,
//                 });
//             });
//         }
//         return links;
//     });
//     console.log('result', result)
//     await browser.close();
// });

// const puppeteer = require('puppeteer')

// async function main() {
//   // 启动chrome浏览器
//   const browser = await puppeteer.launch({
//     // // 指定该浏览器的路径
//     // executablePath: chromiumPath,
//     // 是否为无头浏览器模式，默认为无头浏览器模式
//     // headless: false,
//     // slowMo: 1000,
//     // defaultViewport: {
//     //   width: 1600,
//     //   height: 900,
//     // }
//   })
//   // 在一个默认的浏览器上下文中被创建一个新页面
//   const page1 = await browser.newPage()

//   // 空白页刚问该指定网址
//   await page1.goto(
//     'https://tiyu.baidu.com/tokyoly/home/tab/%E5%A5%96%E7%89%8C%E6%A6%9C/from/pc'
//   )

//   // 等待title节点出现
//   await page1.waitForSelector('title')

//   // 用page自带的方法获取节点

//   // 用js获取节点
//   const result = await page1.evaluate(() => {
//     const items = document.querySelectorAll('.item')
//     console.log(items)
//     const links = [];
//     if (items.length >= 1) {
//       items.forEach((item) => {
//         const data = Array.from(item.attributes);
//         const link = {};
//         // data.forEach((v) => {
//         //   link[v.nodeName] = v.value;
//         // });
//         const name = item.querySelector('.name').innerText;
//         const gold = item.querySelector('.item-gold').innerText;
//         const silver = item.querySelector('.item-silver').innerText;
//         const copper = item.querySelector('.item-copper').innerText;
//         // const img = a.querySelector('img');
//         // link.href = a.getAttribute('href');
//         // link.src = img.getAttribute('src');
//         links.push({
//           name,
//           gold,
//           silver,
//           copper
//         });
//       });
//     }
//     return links;
//     // return titleDom
//   })
//   console.log(result, '查看数据---')
//   // 截图
//   //await page1.screenshot({ path: 'google.png' })
//   //   await page1.pdf({
//   //     path: './baidu.pdf',
//   //   })
//   browser.close()
// }
// main()

const puppeteer = require('puppeteer')

async function main() {
  // 启动chrome浏览器
  const browser = await puppeteer.launch({
    // // 指定该浏览器的路径
    // executablePath: chromiumPath,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',

    // 是否为无头浏览器模式，默认为无头浏览器模式
    headless: false,
    slowMo: 1000,
    defaultViewport: {
      width: 1600,
      height: 900,
    }
  })
  // 在一个默认的浏览器上下文中被创建一个新页面
  const page1 = await browser.newPage()

  // 空白页刚问该指定网址
  await page1.goto(
    // 'https://v.douyin.com/JdngHhh/'
    // 'https://www.douyin.com/video/6838097424821652751?previous_page=app_code_link'
    // 'https://www.douyin.com/recommend'
    'https://v.douyin.com/dL9BfJK/'
  )

  // 等待title节点出现
  //   await page1.waitForSelector('xg-bar')

  // 用page自带的方法获取节点

  // 用js获取节点
  const result = await page1.evaluate(() => {
    const item = document.querySelectorAll('img')
    // const data = Array.from(item.attributes);
    // const link = {};
    // data.forEach((v) => {
    //   link[v.nodeName] = v.value;
    // });
    return item;
    // return titleDom
  })
  console.log(result, '查看数据---')
  // 截图
  //await page1.screenshot({ path: 'google.png' })
  //   await page1.pdf({
  //     path: './baidu.pdf',
  //   })
  browser.close()
}
main()
