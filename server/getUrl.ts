// 获取视频实际下载链接
import puppeteer from "https://deno.land/x/puppeteer@9.0.1/mod.ts";

const getUrl = async (item: any) => {
  const browser = await puppeteer.launch(); //启动浏览器实例
  const page = await browser.newPage(); //创建一个新页面
  await page.emulate(puppeteer.devices["iPhone 6"]); //模拟iphone6打开页面
  await page.goto(item.url); //进入指定网页
  const result = await page.evaluate((item) => {
    // @ts-ignore document
    const url = document.querySelector("source").src;
    return {
      title: item.title,
      url,
    };
  }, item);
  await browser.close();
  return result;
};

export default getUrl;
