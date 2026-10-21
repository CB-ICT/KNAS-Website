// Synchroniseert nieuws van knas.nl (RSS) naar src/generated/knas-news.json en downloadt afbeeldingen.
// Gebruik: node scripts/sync-knas-news.mjs [--strict]
import fs from 'node:fs/promises';
import path from 'node:path';

const FEED_URL = 'https://www.knas.nl/taxonomy/term/16/feed';
const BASE_URL = 'https://www.knas.nl';
const TRACKER_URL = `${BASE_URL}/tracker`;
const TRACKER_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36';
const ROOT = process.cwd();
const OUT_FILE = path.join(ROOT, 'src', 'generated', 'knas-news.json');
const IMAGE_DIR = path.join(ROOT, 'public', 'images', 'news');
const IMAGE_PUBLIC_PATH = 'images/news';
const MAX_ITEMS = 60;
const MAX_IMAGE_BYTES = 30 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 20000;
const STRICT = process.argv.includes('--strict');

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  euml: 'ë', eacute: 'é', egrave: 'è', ecirc: 'ê', Eacute: 'É', Euml: 'Ë',
  iuml: 'ï', iacute: 'í', ouml: 'ö', oacute: 'ó', ocirc: 'ô', uuml: 'ü', uacute: 'ú',
  auml: 'ä', aacute: 'á', agrave: 'à', acirc: 'â', ccedil: 'ç', ntilde: 'ñ', szlig: 'ß',
  Ouml: 'Ö', Uuml: 'Ü', Auml: 'Ä',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', sbquo: '‚', bdquo: '„',
  ndash: '–', mdash: '—', hellip: '…', bull: '•', middot: '·', euro: '€',
  copy: '©', reg: '®', trade: '™', deg: '°', laquo: '«', raquo: '»', times: '×',
  frac12: '½', frac14: '¼', frac34: '¾', sup2: '²', shy: '',
};

const FALLBACK_IMAGES = Array.from({ length: 10 }, (_, i) => `images/fencing/fencing-${String(i + 1).padStart(2, '0')}.jpg`);
const DOC_EXTENSIONS = /\.(pdf|docx?|xlsx?|pptx?|zip|csv)$/i;

function decodeEntities(input) {
  return input.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (match, code) => {
    if (code[0] === '#') {
      const num = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(num) && num > 0 && num < 0x110000 ? String.fromCodePoint(num) : '';
    }
    return NAMED_ENTITIES[code] ?? match;
  });
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getAttr(attrs, name) {
  const match = attrs.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  if (!match) return null;
  return decodeEntities(match[1] ?? match[2] ?? match[3] ?? '').trim();
}

function resolveUrl(raw) {
  if (!raw) return null;
  try {
    const url = new URL(raw, BASE_URL + '/');
    return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

// YouTube-embed (youtube.com/embed/ID?x=y) -> gewone kijklink; overige video-URL's blijven ongewijzigd.
function toWatchUrl(src) {
  const url = new URL(src);
  const match = url.pathname.match(/^\/embed\/([^/?#]+)/);
  if (!/youtube/i.test(url.hostname) || !match) return src;
  return `https://www.youtube.com/watch?v=${encodeURIComponent(match[1])}`;
}

function plainText(html) {
  return decodeEntities(
    html
      .replace(/<\/?(?:br|p|div|h\d|li|ul|ol|tr|td|th|table|blockquote)\b[^>]*>/gi, ' ')
      .replace(/<[^>]+>/g, ''),
  ).replace(/\s+/g, ' ').trim();
}

async function fetchWithTimeout(
  url,
  userAgent = 'KNAS-website-news-sync/1.0 (+https://www.knas.nl)',
  readBody = (response) => response.text(),
) {
  const controller = new AbortController();
  let timer;
  try {
    return await Promise.race([
      fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': userAgent },
      }).then(async (response) => ({ response, body: await readBody(response) })),
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new Error(`Timeout na ${FETCH_TIMEOUT_MS} ms`));
        }, FETCH_TIMEOUT_MS);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

// --- Afbeeldingen ---------------------------------------------------------

const MIME_EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/gif': '.gif', 'image/webp': '.webp' };
const MAX_IMAGE_WIDTH = 1600;

let sharpModule;
async function loadSharp() {
  if (sharpModule === undefined) {
    sharpModule = await import('sharp').then((m) => m.default).catch(() => null);
    if (!sharpModule) console.warn('[knas-nieuws] "sharp" niet gevonden: afbeeldingen worden niet verkleind.');
  }
  return sharpModule;
}

async function optimizeImage(buffer, ext) {
  const sharp = await loadSharp();
  if (!sharp || ext === '.gif') return { buffer, ext };
  const pipeline = sharp(buffer).rotate().resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true });
  if (ext === '.png') return { buffer: await pipeline.png({ compressionLevel: 9 }).toBuffer(), ext };
  return { buffer: await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer(), ext: '.jpg' };
}

async function downloadImage(url, nodeId) {
  const parsed = new URL(url);
  const baseName = path.basename(decodeURIComponent(parsed.pathname)).replace(/\.[a-z0-9]+$/i, '');
  const safeBase = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'afbeelding';

  const existing = (await fs.readdir(IMAGE_DIR).catch(() => [])).find((file) => file.startsWith(`${nodeId}-${safeBase}.`));
  if (existing) return `${IMAGE_PUBLIC_PATH}/${existing}`;

  const { response: res, body } = await fetchWithTimeout(url, undefined, (response) => response.arrayBuffer());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = (res.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
  const ext = MIME_EXT[type];
  if (!ext) throw new Error(`geen ondersteund afbeeldingstype (${type || 'onbekend'})`);
  const raw = Buffer.from(body);
  if (raw.length > MAX_IMAGE_BYTES) throw new Error('afbeelding te groot');
  const optimized = await optimizeImage(raw, ext);

  const fileName = `${nodeId}-${safeBase}${optimized.ext}`;
  await fs.mkdir(IMAGE_DIR, { recursive: true });
  await fs.writeFile(path.join(IMAGE_DIR, fileName), optimized.buffer);
  return `${IMAGE_PUBLIC_PATH}/${fileName}`;
}

// --- HTML opschonen -------------------------------------------------------

const TAG_MAP = {
  p: 'p', br: 'br', strong: 'strong', b: 'strong', em: 'em', i: 'em',
  ul: 'ul', ol: 'ol', li: 'li', blockquote: 'blockquote', a: 'a', img: 'img', hr: 'hr',
  h1: 'h3', h2: 'h3', h3: 'h3', h4: 'h4', h5: 'h4', h6: 'h4',
  table: 'table', thead: 'thead', tbody: 'tbody', tr: 'tr', th: 'th', td: 'td',
};
const VOID_TAGS = new Set(['br', 'img', 'hr']);
const DROP_WITH_CONTENT = /<(script|style|noscript|object|embed|form|svg)\b[\s\S]*?<\/\1\s*>/gi;

/**
 * Bouwt de HTML opnieuw op uit een whitelist van tags/attributen; alle tekst wordt ge-escaped,
 * zodat er geen onveilige markup van de bron in de site terechtkomt.
 */
async function sanitizeBody(rawHtml, nodeId, imageLog) {
  let html = rawHtml.replace(/<!--[\s\S]*?-->/g, '').replace(DROP_WITH_CONTENT, '');

  const videoLinks = [];
  html = html.replace(/<iframe\b([^>]*)>[\s\S]*?<\/iframe\s*>/gi, (_m, attrs) => {
    const src = resolveUrl(getAttr(attrs, 'src'));
    if (src && /youtube\.com|youtu\.be|vimeo\.com/i.test(src)) videoLinks.push(toWatchUrl(src));
    return '';
  });

  const out = [];
  const stack = [];
  const images = [];
  const attachments = [];
  const tokenRe = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g;
  let last = 0;
  let match;

  const pushText = (text) => {
    const clean = decodeEntities(text).replace(/[\s\u00a0]+/g, ' ');
    if (clean) out.push(escapeHtml(clean));
  };

  while ((match = tokenRe.exec(html))) {
    pushText(html.slice(last, match.index));
    last = tokenRe.lastIndex;

    const closing = match[1] === '/';
    const tag = TAG_MAP[match[2].toLowerCase()];
    const attrs = match[3] ?? '';
    if (!tag) continue;

    if (closing) {
      const idx = stack.lastIndexOf(tag);
      if (idx === -1) continue;
      while (stack.length > idx) out.push(`</${stack.pop()}>`);
      continue;
    }

    if (tag === 'img') {
      const src = resolveUrl(getAttr(attrs, 'src'));
      if (!src || src.startsWith('mailto:')) continue;
      try {
        const local = await downloadImage(src, nodeId);
        const alt = getAttr(attrs, 'alt') ?? '';
        images.push(local);
        out.push(`<img src="${escapeHtml(local)}" alt="${escapeHtml(alt)}" loading="lazy">`);
      } catch (error) {
        imageLog.push(`  ! afbeelding overgeslagen (${src}): ${error.message}`);
      }
      continue;
    }

    if (VOID_TAGS.has(tag)) {
      out.push(`<${tag}>`);
      continue;
    }

    if (tag === 'a') {
      const href = resolveUrl(getAttr(attrs, 'href'));
      if (!href) continue;
      if (DOC_EXTENSIONS.test(new URL(href).pathname)) attachments.push(href);
      stack.push('a');
      out.push(`<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">`);
      continue;
    }

    if (tag === 'td' || tag === 'th') {
      const colspan = Number(getAttr(attrs, 'colspan'));
      const span = Number.isInteger(colspan) && colspan > 1 && colspan < 20 ? ` colspan="${colspan}"` : '';
      stack.push(tag);
      out.push(`<${tag}${span}>`);
      continue;
    }

    // Een nieuwe <p> sluit een nog openstaande <p> (HTML-gedrag).
    if (tag === 'p' && stack.includes('p')) {
      while (stack.length && stack[stack.length - 1] !== 'p') out.push(`</${stack.pop()}>`);
      out.push(`</${stack.pop()}>`);
    }
    stack.push(tag);
    out.push(`<${tag}>`);
  }
  pushText(html.slice(last));
  while (stack.length) out.push(`</${stack.pop()}>`);

  let result = out.join('');
  if (videoLinks.length) {
    result += videoLinks
      .map((url) => `<p><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Bekijk de video</a></p>`)
      .join('');
  }
  return { html: result, images, attachments: [...new Set(attachments)] };
}

/** Zet regels met "•" om naar echte lijsten; de regel ervoor wordt een tussenkop. */
function structureBulletParagraphs(html) {
  return html.replace(/<p>([\s\S]*?)<\/p>/g, (full, inner) => {
    const lines = inner.split(/<br>/).map((line) => line.trim()).filter(Boolean);
    if (!lines.some((line) => /^•/.test(line))) return full;

    const parts = [];
    let list = [];
    const flush = () => {
      if (list.length) parts.push(`<ul>${list.map((item) => `<li>${item}</li>`).join('')}</ul>`);
      list = [];
    };
    lines.forEach((line, index) => {
      if (/^•/.test(line)) {
        list.push(line.replace(/^•\s*/, ''));
        return;
      }
      flush();
      const nextIsBullet = /^•/.test(lines[index + 1] ?? '');
      parts.push(nextIsBullet ? `<h4>${line}</h4>` : `<p>${line}</p>`);
    });
    flush();
    return parts.join('');
  });
}

function tidyHtml(html, title) {
  let result = structureBulletParagraphs(html)
    .replace(/<p>\s*(?:<br>\s*)*<\/p>/g, '')
    .replace(/(?:<br>\s*){3,}/g, '<br><br>')
    .replace(/<p>\s*<br>/g, '<p>')
    .replace(/<br>\s*<\/p>/g, '</p>')
    .replace(/<(strong|em)>\s*<\/\1>/g, '')
    .replace(/<(p|h3|h4|li|td|th|blockquote)>\s+/g, '<$1>')
    .replace(/\s+<\/(p|h3|h4|li|td|th|blockquote)>/g, '</$1>')
    .replace(/>\s+<(\/?)(p|h3|h4|ul|ol|li|table|thead|tbody|tr|blockquote|hr)\b/g, '><$1$2');

  // Veel berichten herhalen de titel als eerste alinea.
  const first = result.match(/^<p>([\s\S]*?)<\/p>/);
  if (first && plainText(first[1]).toLowerCase() === title.toLowerCase()) result = result.slice(first[0].length);
  return result.trim();
}

function makeSummary(html, title) {
  const prose = plainText(html.replace(/<h4>[\s\S]*?<\/h4>/g, ' ').replace(/<(ul|ol|table)>[\s\S]*?<\/\1>/g, ' '));
  const headingCount = (html.match(/<h4>/g) ?? []).length;
  const text = prose || (headingCount
    ? `Resultaten van Nederlandse schermers op ${headingCount} ${headingCount === 1 ? 'wedstrijd' : 'wedstrijden'}.`
    : '');
  const base = text && text.toLowerCase() !== title.toLowerCase() ? text : title;
  if (base.length <= 200) return base;
  const cut = base.slice(0, 200);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 120 ? cut.lastIndexOf(' ') : 200).replace(/[\s,.;:–-]+$/, '')}…`;
}

const ENGLISH_MONTHS = new Map([
  ['january', 0], ['february', 1], ['march', 2], ['april', 3], ['may', 4], ['june', 5],
  ['july', 6], ['august', 7], ['september', 8], ['october', 9], ['november', 10], ['december', 11],
]);

function trackerDate(html) {
  const value = html.match(/views-field-created[\s\S]*?<span class="field-content">([^<]+)<\/span>/i)?.[1] ?? '';
  const match = value.match(/(?:[A-Za-z]+,\s+)?([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})/);
  const month = match ? ENGLISH_MONTHS.get(match[1].toLowerCase()) : undefined;
  return match && month !== undefined
    ? new Date(Date.UTC(Number(match[3]), month, Number(match[2]), 12))
    : new Date(Number.NaN);
}

// --- RSS ------------------------------------------------------------------

function tagContent(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  if (!match) return '';
  return match[1].replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1');
}

function splitFields(descriptionHtml) {
  const fieldRe = /<div class="field field-name-([\w-]+)[^"]*"/g;
  const starts = [...descriptionHtml.matchAll(fieldRe)].map((m) => ({ name: m[1], index: m.index }));
  if (!starts.length) return { body: descriptionHtml, terms: {} };

  const fields = starts.map((start, i) => ({
    name: start.name,
    html: descriptionHtml.slice(start.index, starts[i + 1]?.index ?? descriptionHtml.length),
  }));
  const body = fields.filter((f) => !f.name.startsWith('taxonomy')).map((f) => f.html).join('');
  const terms = {};
  for (const field of fields.filter((f) => f.name.startsWith('taxonomy'))) {
    terms[field.name] = [...field.html.matchAll(/<a [^>]*>([^<]+)<\/a>/g)].map((m) => decodeEntities(m[1]).trim());
  }
  return { body, terms };
}

async function parseArticle({ title, nodeId, pubDate, author, descriptionHtml, articleTerms }, imageLog) {
  const parsedFields = splitFields(decodeEntities(descriptionHtml));
  const { body } = parsedFields;
  const terms = articleTerms ?? parsedFields.terms;
  if (!body.trim()) return null;

  const sanitized = await sanitizeBody(body, nodeId, imageLog);
  let contentHtml = tidyHtml(sanitized.html, title);

  const cover = sanitized.images[0];
  if (cover) {
    // De eerste afbeelding wordt de coverfoto en hoeft niet nogmaals in de tekst.
    contentHtml = contentHtml
      .replace(new RegExp(`<img src="${cover.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`), '')
      .replace(/<p>\s*<\/p>/g, '')
      .trim();
  }

  const rubriek = terms['taxonomy-vocabulary-6'] ?? [];
  const doelgroep = terms['taxonomy-vocabulary-1'] ?? [];
  const titleCategory = /^NKE\b/i.test(title) ? 'NK Equipe' : undefined;
  const category = rubriek[0] ?? titleCategory ?? doelgroep[0] ?? 'Nieuws';
  const tags = [...new Set([...rubriek, ...doelgroep])].filter((t) => t !== category);

  return {
    id: `news-${nodeId}`,
    nodeId,
    title,
    dateISO: Number.isNaN(pubDate.getTime()) ? new Date().toISOString() : pubDate.toISOString(),
    category,
    tags,
    author: author || undefined,
    summary: makeSummary(contentHtml, title),
    contentHtml,
    image: cover ?? FALLBACK_IMAGES[nodeId % FALLBACK_IMAGES.length],
    hasOwnImage: Boolean(cover),
    attachments: sanitized.attachments.map((url) => ({
      title: decodeURIComponent(path.basename(new URL(url).pathname)),
      url,
    })),
    sourceUrl: `${BASE_URL}/node/${nodeId}`,
  };
}

async function parseItem(itemXml, imageLog) {
  const title = decodeEntities(tagContent(itemXml, 'title')).replace(/\s+/g, ' ').trim();
  const link = decodeEntities(tagContent(itemXml, 'link')).trim();
  const guid = decodeEntities(tagContent(itemXml, 'guid'));
  const nodeId = Number((link.match(/\/node\/(\d+)/) ?? guid.match(/^(\d+)/) ?? [])[1]);
  if (!title || !Number.isInteger(nodeId)) return null;

  return parseArticle({
    title,
    nodeId,
    pubDate: new Date(tagContent(itemXml, 'pubDate')),
    author: decodeEntities(tagContent(itemXml, 'dc:creator')).trim(),
    descriptionHtml: decodeEntities(tagContent(itemXml, 'description')),
  }, imageLog);
}

function parseTrackerEntries(html) {
  const table = html.match(/<table\b(?=[^>]*\bclass\s*=\s*["'][^"']*\bviews-table\b[^"']*["'])[^>]*>[\s\S]*?<\/table>/i)?.[0];
  if (!table) throw new Error('Tabel met recente KNAS-berichten niet gevonden.');

  const entries = new Map();
  for (const [, attributes, title] of table.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = getAttr(attributes, 'href');
    if (!href) continue;

    try {
      const url = new URL(href, BASE_URL);
      const nodeId = Number(url.pathname.match(/^\/node\/(\d+)\/?$/)?.[1]);
      if (url.origin === new URL(BASE_URL).origin && Number.isInteger(nodeId) && nodeId > 0) {
        entries.set(nodeId, { nodeId, title: plainText(title) });
      }
    } catch {
      continue;
    }
  }

  if (entries.size === 0) throw new Error('Geen berichtlinks gevonden in de tabel met recente KNAS-berichten.');
  return [...entries.values()];
}

async function parseTrackerEntry(entry, imageLog) {
  const { response, body: html } = await fetchWithTimeout(`${BASE_URL}/node/${entry.nodeId}`, TRACKER_USER_AGENT);
  if (!response.ok) throw new Error(`HTTP ${response.status} voor KNAS-bericht ${entry.nodeId}`);
  const article = html.match(new RegExp(`<article\\b(?=[^>]*\\bid="node-${entry.nodeId}")[^>]*>[\\s\\S]*?<\\/article>`, 'i'))?.[0];
  if (!article) return null;

  const titleFromPage = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const title = decodeEntities(titleFromPage ?? entry.title).replace(/\s*\|\s*KNAS\s*$/i, '').trim();
  const author = decodeEntities(html.match(/views-field-name[\s\S]*?<span class="username">([^<]+)<\/span>/i)?.[1] ?? '').trim();

  return parseArticle({
    title,
    nodeId: entry.nodeId,
    pubDate: trackerDate(html),
    author,
    descriptionHtml: article.split(/<div id="book-navigation-/i)[0],
  }, imageLog);
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
  console.log(`[knas-nieuws] Feed ophalen: ${FEED_URL}`);

  let xml;
  let feedAvailable = false;
  try {
    const { response: res, body } = await fetchWithTimeout(FEED_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    xml = body;
    feedAvailable = true;
  } catch (error) {
    console.warn(`[knas-nieuws] Feed niet bereikbaar (${error.message}); bestaande ${existing.items.length} berichten blijven staan.`);
    if (existing.items.length === 0 && STRICT) throw error;
    xml = '';
  }

  const imageLog = [];
  const itemsXml = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  const fresh = [];
  for (const itemXml of itemsXml) {
    try {
      const item = await parseItem(itemXml, imageLog);
      if (item) fresh.push(item);
    } catch (error) {
      console.warn(`[knas-nieuws] Bericht overgeslagen: ${error.message}`);
    }
  }

  let trackerEntries = [];
  let trackerAvailable = false;
  try {
    const { response, body } = await fetchWithTimeout(TRACKER_URL, TRACKER_USER_AGENT);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    trackerEntries = parseTrackerEntries(body);
    trackerAvailable = true;
  } catch (error) {
    console.warn(`[knas-nieuws] Recente KNAS-berichten niet bereikbaar (${error.message}).`);
  }
  console.log(`[knas-nieuws] Tracker: ${trackerAvailable ? `${trackerEntries.length} recente berichten gevonden` : 'niet beschikbaar'}.`);

  const knownIds = new Set([...existing.items, ...fresh].map((item) => item.id));
  let trackerCount = 0;
  for (const entry of trackerEntries) {
    const id = `news-${entry.nodeId}`;
    if (knownIds.has(id)) continue;
    try {
      const item = await parseTrackerEntry(entry, imageLog);
      if (item) {
        fresh.push(item);
        knownIds.add(item.id);
        trackerCount += 1;
      }
    } catch (error) {
      console.warn(`[knas-nieuws] Recent bericht ${entry.nodeId} overgeslagen: ${error.message}`);
    }
  }
  console.log(`[knas-nieuws] Tracker: ${trackerCount} berichten extra geïmporteerd.`);

  const byId = new Map(existing.items.map((item) => [item.id, item]));
  const newIds = fresh.filter((item) => !byId.has(item.id)).map((item) => item.title);
  for (const item of fresh) byId.set(item.id, item);

  const items = [...byId.values()]
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
    .slice(0, MAX_ITEMS);

  await writeOutput({
    source: FEED_URL,
    syncedAt: feedAvailable || trackerAvailable ? new Date().toISOString() : existing.syncedAt,
    items,
  });

  imageLog.forEach((line) => console.warn(line));
  console.log(`[knas-nieuws] ${itemsXml.length} RSS-items verwerkt, ${trackerCount} extra recente berichten opgehaald, ${newIds.length} nieuw, ${items.length} totaal opgeslagen.`);
  newIds.forEach((title) => console.log(`  + ${title}`));
}

async function writeOutput(data) {
  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

main().catch((error) => {
  console.error(`[knas-nieuws] Onverwachte fout: ${error.stack ?? error}`);
  process.exit(STRICT ? 1 : 0);
});
