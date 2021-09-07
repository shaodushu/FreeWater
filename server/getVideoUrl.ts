/// <reference types="./types.d.ts" />

// 获取接口中的所有视频链接
import puppeteer from "https://deno.land/x/puppeteer@9.0.1/mod.ts";
import config from "./config.ts";

const { isShowChrome } = config;

/** 获取所有连接 */
export default async function getVideoUrl(inputUrl: string) {
  const browser = await puppeteer.launch({
    headless: !isShowChrome,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  console.log("浏览器初始化完成");
  const page = await browser.newPage();

  console.log("开始获取接口中的视频");
  const awemeList: string[] = [];
  //这个事件监听要放在下面那些await前面
  page.on("requestfinished", (
    request,
  ) => {
    // 查看所有请求地址
    if (["xhr", "fetch"].includes(request.resourceType())) {
      // 匹配所需数据的请求地址
      if (request.url().indexOf("web.douyinvod") != -1) {
        // 接口数据中找到需要的数据
        awemeList.push(request.url());
      }
    }
  });

  await page.setViewport({ width: 1688, height: 1366 });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.84",
  );
  await page.goto(inputUrl);

  console.log("视频接口爬取完成，视频个数为：", awemeList.length);

  await browser.close();
  return awemeList;
}

// getAllUrl("https://v.douyin.com/d6yYx4K/");
