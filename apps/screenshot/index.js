import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 787, height: 562 });
  await page.goto('https://m2ng.github.io', { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: 'output/screenshot.jpg',
    quality: 97
  });
  await browser.close();
})();