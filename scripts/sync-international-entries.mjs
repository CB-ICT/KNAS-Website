// Synchroniseert de actuele internationale aanmeldingen-PDF van knas.nl naar een stabiele lokale bestandsnaam.
// Gebruik: node scripts/sync-international-entries.mjs [--strict]
import fs from 'node:fs/promises';
import path from 'node:path';

const PAGE_URL = 'https://www.knas.nl/wereldbekerinschrijvingen';
const BASE_URL = 'https://www.knas.nl';
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'docs', 'topsport', 'internationale-aanmeldingen-actueel.pdf');
const META_FILE = path.join(process.cwd(), 'src', 'generated', 'international-entries.json');
const FETCH_TIMEOUT_MS = 30000;
const STRICT = process.argv.includes('--strict');

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'KNAS-website-international-entries-sync/1.0 (+https://www.knas.nl)' },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  console.log(`[knas-aanmeldingen] Pagina ophalen: ${PAGE_URL}`);
  const pageResponse = await fetchWithTimeout(PAGE_URL);
  if (!pageResponse.ok) throw new Error(`pagina HTTP ${pageResponse.status}`);
  const html = await pageResponse.text();
  const match = html.match(/href=["']([^"']*Aanmeldingen[^"']+\.pdf(?:\?[^"']*)?)["']/i);
  if (!match) throw new Error('geen actuele Aanmeldingen-PDF gevonden op de KNAS-pagina');

  const pdfUrl = new URL(match[1].replace(/&amp;/g, '&'), BASE_URL).href;
  const pdfResponse = await fetchWithTimeout(pdfUrl);
  if (!pdfResponse.ok) throw new Error(`PDF HTTP ${pdfResponse.status}`);
  const contentType = (pdfResponse.headers.get('content-type') ?? '').toLowerCase();
  const buffer = Buffer.from(await pdfResponse.arrayBuffer());
  if (!buffer.subarray(0, 4).equals(Buffer.from('%PDF'))) throw new Error(`download is geen PDF (${contentType || 'onbekend type'})`);

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, buffer);
  await fs.mkdir(path.dirname(META_FILE), { recursive: true });
  await fs.writeFile(META_FILE, `${JSON.stringify({ sourceUrl: pdfUrl, syncedAt: new Date().toISOString() }, null, 2)}\n`, 'utf8');
  console.log(`[knas-aanmeldingen] ${pdfUrl} -> ${path.relative(process.cwd(), OUTPUT_FILE)} (${buffer.length} bytes)`);
}

main().catch((error) => {
  console.error(`[knas-aanmeldingen] Synchronisatie mislukt: ${error.message}`);
  fs.access(OUTPUT_FILE).then(() => {
    console.warn('[knas-aanmeldingen] Bestaande PDF blijft behouden.');
    process.exitCode = 0;
  }).catch(() => {
    process.exitCode = STRICT ? 1 : 0;
  });
});
