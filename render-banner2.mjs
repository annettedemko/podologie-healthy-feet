import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  // 7050×1050 mm (700×100 cm + 25 mm Überfüller umlaufend)
  const MM_TO_PX = 96 / 25.4; // 96 DPI CSS pixels
  const PDF_W_MM = 7050;
  const PDF_H_MM = 1050;
  const PDF_VP_W = Math.round(PDF_W_MM * MM_TO_PX); // 26646
  const PDF_VP_H = Math.round(PDF_H_MM * MM_TO_PX); // 3969

  // PNG: smaller viewport + scale, then upscale to 150 DPI
  const PNG_VP_W = 4700;
  const PNG_VP_H = 700;
  const SCALE = 3;
  const FINAL_W = Math.round(PDF_W_MM / 25.4 * 150); // 41634
  const FINAL_H = Math.round(PDF_H_MM / 25.4 * 150); // 6201

  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 120000,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  const htmlPath = path.join(__dirname, 'public', 'banner-print-pdf.html');

  // PDF (vector-based) — viewport must match page size at 96 DPI
  console.log(`PDF viewport: ${PDF_VP_W}×${PDF_VP_H} px → ${PDF_W_MM}×${PDF_H_MM} mm`);
  await page.setViewport({ width: PDF_VP_W, height: PDF_VP_H, deviceScaleFactor: 1 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 3000));

  await page.pdf({
    path: path.join(__dirname, 'public', 'banner-fassade-druckvorlage.pdf'),
    width: `${PDF_W_MM}mm`, height: `${PDF_H_MM}mm`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log('PDF done: 7050×1050 mm (inkl. 25mm Überfüller)');

  // PNG at smaller viewport + scale
  await page.setViewport({ width: PNG_VP_W, height: PNG_VP_H, deviceScaleFactor: SCALE });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 3000));

  const tempPath = path.join(__dirname, 'public', 'banner-temp.png');
  await page.screenshot({ path: tempPath, type: 'png', clip: { x: 0, y: 0, width: PNG_VP_W, height: PNG_VP_H } });
  await browser.close();
  console.log('Screenshot done');

  // Upscale to 150 DPI
  const finalPath = path.join(__dirname, 'public', 'banner-fassade-150dpi.png');
  execSync(`magick "${tempPath}" -filter Lanczos -resize ${FINAL_W}x${FINAL_H}! -units PixelsPerInch -density 150 -quality 100 "${finalPath}"`);
  fs.unlinkSync(tempPath);

  console.log(`Done! ${FINAL_W}x${FINAL_H}, ${(fs.statSync(finalPath).size/1024/1024).toFixed(2)} MB`);
}

main().catch(console.error);
