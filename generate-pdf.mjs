import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const baseName = process.argv[2] || 'Zusatzvereinbarung-Podologie-HealthyFeet-Soumeya-Mama';
const inputPath = resolve(__dirname, `public/${baseName}.html`);
const outputPath = resolve(__dirname, `public/${baseName}.pdf`);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.goto(`file://${inputPath}`, { waitUntil: 'networkidle0' });

// Wait for Google Fonts
await page.waitForFunction(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 2000));

await page.pdf({
  path: outputPath,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  margin: {
    top: '22mm',
    right: '25mm',
    bottom: '22mm',
    left: '25mm',
  },
  headerTemplate: '<span></span>',
  footerTemplate: `
    <div style="width: 100%; padding: 0 10mm; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #d4c49a; font-size: 7.5pt; font-family: 'Inter', system-ui, sans-serif; margin-top: 4px; padding-top: 6px;">
      <span style="color: #b8a272;">Podologische Praxis Healthy Feet</span>
      <span style="color: #6b7280;">Seite <span class="pageNumber"></span> von <span class="totalPages"></span></span>
    </div>
  `,
});

await browser.close();
console.log(`PDF saved: ${outputPath}`);
