import puppeteer from "https://deno.land/x/puppeteer@9.0.1/mod.ts";

async function test() {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    console.log(browser);
  } catch (error) {
    console.log(error);
  }
}

test();
