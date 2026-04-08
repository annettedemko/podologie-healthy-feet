const puppeteer = require('puppeteer');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, 'public', 'flyer-augsburg.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 30000 });

  // Clean up screen-only elements
  await page.evaluate(() => {
    document.querySelectorAll('.no-print, .print-hint').forEach(el => el.remove());
    document.documentElement.style.background = 'none';
    document.documentElement.style.minHeight = 'auto';
    document.documentElement.style.display = 'block';
    document.body.style.margin = '0';
    document.body.style.boxShadow = 'none';
    document.body.style.borderRadius = '0';
    document.body.style.width = '105mm';
    document.body.style.height = 'auto';
    document.body.style.overflow = 'visible';

    // page2 also needs no shadow/radius
    const p2 = document.querySelector('.page2');
    if (p2) {
      p2.style.boxShadow = 'none';
      p2.style.borderRadius = '0';
      p2.style.margin = '0 auto';
    }
  });

  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 2000));

  await page.pdf({
    path: path.resolve(__dirname, 'public', 'flyer-augsburg.pdf'),
    width: '105mm',
    height: '148mm',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true,
    preferCSSPageSize: true,
  });

  console.log('PDF saved: public/flyer-augsburg.pdf');
  await browser.close();
}

main().catch(console.error);
