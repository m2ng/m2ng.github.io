import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 787, height: 562 });
  await page.goto('https://m2ng.github.io', { waitUntil: 'networkidle0' });
  // await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: 'output/screenshot.jpg',
    quality: 97
  });
  const pdf = await page.pdf({ 
    path: 'output/MatthewNg_CV.pdf',
    format: 'A4',
    margin: { top: '39px', right: '39px', bottom: '39px', left: '39px' },
    printBackground: true,
  });

  await browser.close();
})();