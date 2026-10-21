// Haalt Nederlandse wedstrijden op van nahouw.net naar src/generated/nahouw-calendar.json.
// Gebruik: node scripts/sync-nahouw-calendar.mjs [--strict]
import fs from 'node:fs/promises';
import path from 'node:path';

const SOURCE_URL = 'https://www.nahouw.net/tournaments';
const BASE_URL = 'https://www.nahouw.net';
const OUT_FILE = path.join(process.cwd(), 'src', 'generated', 'nahouw-calendar.json');
const STRICT = process.argv.includes('--strict');
const FETCH_TIMEOUT_MS = 30000;

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decode(text) {
  return text
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
      if (code[0] === '#') {
        const num = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
        return Number.isFinite(num) ? String.fromCodePoint(num) : '';
      }
      return ENTITIES[code.toLowerCase()] ?? match;
    })
    .replace(/\s+/g, ' ')
    .trim();
}

function parseRow(rowHtml) {
  const cells = [...rowHtml.matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/g)].map((m) => ({ attrs: m[1], html: m[2] }));
  if (cells.length < 7) return null;

  const [nameCell, weaponCell, typeCell, dateCell, cityCell, countryCell, closingCell] = cells;
  const link = nameCell.html.match(/href="([^"]+)"/);
  const name = nameCell.html.match(/<span>([\s\S]*?)<\/span>/);
  const date = dateCell.attrs.match(/data-value="(\d{4}-\d{2}-\d{2})"/);
  const country = countryCell.attrs.match(/title="([^"]+)"/);
  if (!link || !name || !date || !['NED', 'Netherlands'].includes(country?.[1] ?? '')) return null;

  const closing = closingCell.attrs.match(/data-value="(\d{4}-\d{2}-\d{2})"/);
  const typeTitle = typeCell.attrs.match(/title="([^"]+)"/);
  return {
    title: decode(name[1]),
    date: date[1],
    closingDate: closing ? closing[1] : undefined,
    city: decode(cityCell.html.replace(/<[^>]+>/g, '')),
    weapon: decode(weaponCell.html.replace(/<[^>]+>/g, '')),
    type: decode(typeCell.html.replace(/<[^>]+>/g, '')),
    typeLabel: typeTitle ? decode(typeTitle[1]) : undefined,
    url: new URL(link[1], BASE_URL).href,
  };
}

async function readExisting() {
  try {
    const data = JSON.parse(await fs.readFile(OUT_FILE, 'utf8'));
    return Array.isArray(data.items) ? data : { items: [] };
  } catch {
    return { items: [] };
  }
}

async function main() {
  const existing = await readExisting();
  console.log(`[nahouw] Kalender ophalen: ${SOURCE_URL}`);
  let html;
  try {
    const controller = new AbortController();
    let timer;
    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => {
        controller.abort();
        reject(new Error(`timeout na ${FETCH_TIMEOUT_MS} ms`));
      }, FETCH_TIMEOUT_MS);
    });
    try {
      const request = (async () => {
        const res = await fetch(SOURCE_URL, {
          signal: controller.signal,
          headers: { 'User-Agent': 'KNAS-website-calendar-sync/1.0' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })();
      html = await Promise.race([request, timeout]);
    } finally {
      clearTimeout(timer);
    }
  } catch (error) {
    console.warn(`[nahouw] Niet bereikbaar (${error.message}); bestaande kalender blijft staan.`);
    if (STRICT && existing.items.length === 0) throw error;
    return;
  }

  const rows = [...html.matchAll(/<tr class="is-(?:even|odd) ot-row">([\s\S]*?)<\/tr>/g)].map((m) => m[1]);
  const items = rows.map(parseRow).filter(Boolean).sort((a, b) => a.date.localeCompare(b.date));

  // Een lege lijst wijst eerder op een gewijzigde Nahouw-pagina dan op nul wedstrijden.
  if (items.length === 0) {
    console.warn('[nahouw] Geen Nederlandse wedstrijden gevonden; bestaande kalender blijft staan.');
    if (STRICT && existing.items.length === 0) throw new Error('Geen actuele kalender of bruikbare cache beschikbaar.');
    return;
  }

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(
    OUT_FILE,
    `${JSON.stringify({ source: SOURCE_URL, syncedAt: new Date().toISOString(), items }, null, 2)}\n`,
    'utf8',
  );
  console.log(`[nahouw] ${items.length} Nederlandse wedstrijden opgeslagen.`);
}

main().catch((error) => {
  console.error(`[nahouw] Onverwachte fout: ${error.stack ?? error}`);
  process.exit(STRICT ? 1 : 0);
});
