// 获取接口中的所有视频链接
import puppeteer from "https://deno.land/x/puppeteer@9.0.1/mod.ts";
import config from "./config.ts";

const { ajaxKey, devices, isSaveJsonData, isShowChrome } = config;

/** 获取所有连接 */
export default async function getAllUrl(inputUrl: any, type: string) {
  const browser = await puppeteer.launch({
    headless: !isShowChrome,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.emulate(puppeteer.devices[devices]);
  await page.goto(inputUrl);

  if (type === "like") {
    const likeTab = await page.waitForSelector(".like-tab");
    likeTab!.click();
  }

  console.log("开始获取接口中的视频");
  let aweme_list: any[] = [];
  // 这个事件监听要放在下面那些await前面
  page.on(
    "requestfinished",
    (
      request: {
        resourceType: () => string;
        url: () => string | any[];
        response: () => any;
      },
    ) => {
      // 查看所有请求地址
      if (request.resourceType() == "xhr") {
        // 匹配所需数据的请求地址
        console.log(request.url());
        if (request.url().indexOf(ajaxKey + type) != -1) {
          (async () => {
            try {
              // 获取数据并转为json格式
              let res = await request.response();
              let result = await res.json();

              // 接口数据中找到需要的数据
              aweme_list.push(...result.aweme_list);
              console.log("正在获取接口数据，当前视频个数：", aweme_list.length);
            } catch (err) {
              console.log(err);
            }
          })();
        }
      }
    },
  );

  // 不能传this进去，应该就是只能传入能序列化的值
  await page.evaluate(async () => {
    let isScrollEnd = false;
    // 这个是在浏览器的环境了，所以console不会打到node控制台，
    // 所以这个代码里的变量不能用到这里面

    function sleep(second: number | undefined) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(" enough sleep~");
        }, second);
      });
    }
    let scroll_timer: number | undefined = undefined;
    // @ts-ignore
    $(window).scroll(function () {
      // @ts-ignore
      const scrollTop = $(this).scrollTop();
      // @ts-ignore
      const scrollHeight = $(document).height();
      // @ts-ignore
      const windowHeight = $(this).height();
      // 防止滚动过快，接口较慢，1.5s后再去判断
      clearTimeout(scroll_timer);
      scroll_timer = setTimeout(() => {
        if (scrollTop + windowHeight >= scrollHeight) {
          isScrollEnd = true;
          console.log("that.isScrollEnd", isScrollEnd);
        }
      }, 1500);
    });
    let y = 0;
    // 防止无限滚动的页面，window.scrollY 做个限制
    while (!isScrollEnd && y < 50000) {
      y += 100;
      await sleep(20);
      // @ts-ignore
      window.scrollTo(0, y);
    }
  });

  console.log("视频接口爬取完成，视频个数为：", aweme_list.length);
  if (isSaveJsonData) {
    Deno.writeTextFileSync("aweme_list.json", JSON.stringify(aweme_list));
  }
  await browser.close();
  return aweme_list;
}

// getAllUrl("https://v.douyin.com/dL9BfJK/", "post");
