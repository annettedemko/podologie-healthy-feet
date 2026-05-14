import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const svg = fs.readFileSync(path.join(root, 'public', 'favicon.svg'), 'utf8');

const sizes = [
  { size: 32, file: 'favicon.ico' },
  { size: 180, file: 'apple-touch-icon.png' },
  { size: 192, file: 'icon-192.png' },
  { size: 512, file: 'icon-512.png' },
];

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();

for (const { size, file } of sizes) {
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  const html = `<!doctype html><html><head><style>
    html,body{margin:0;padding:0;background:transparent;}
    svg{width:${size}px;height:${size}px;display:block;}
  </style></head><body>${svg}</body></html>`;
  await page.setContent(html, { waitUntil: 'load' });
  const el = await page.$('svg');
  const buf = await el.screenshot({ omitBackground: true, type: 'png' });
  fs.writeFileSync(path.join(root, 'public', file), buf);
  console.log(`wrote public/${file} (${size}x${size}, ${buf.length} bytes)`);
}

await browser.close();
