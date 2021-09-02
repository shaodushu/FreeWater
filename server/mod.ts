
import puppeteer from "https://deno.land/x/puppeteer@9.0.1/mod.ts";

// 运行Chrome
const browser = await puppeteer.launch();

// 打开掘金并截图、生成pdf
const page = await browser.newPage();

await page.goto('https://juejin.cn',{
    waitUntil: 'networkidle2',
});
await page.screenshot({ path: 'juejin.png' });
await page.pdf({ path: 'juejin.pdf', format: 'a4' });

// 关闭
await browser.close();

