import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const distFile = path.join(root, 'dist-single', 'index.html');

const mimeByExt = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.json': 'application/json',
};

function dataUriFromBuffer(filePath, buf) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = mimeByExt[ext] ?? 'application/octet-stream';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

async function resolveAssetPath(assetPath) {
  const normalized = assetPath.replace(/^\//, '');
  const publicPath = path.join(root, 'public', normalized);
  const distPath = path.join(root, 'dist-single', normalized);

  try {
    await fs.access(publicPath);
    return publicPath;
  } catch {}

  try {
    await fs.access(distPath);
    return distPath;
  } catch {}

  return null;
}

async function replaceLocalAssets(html) {
  const matches = [...html.matchAll(/\/(?:images|docs)\/[A-Za-z0-9._\/-]+/g)].map((m) => m[0]);
  const unique = [...new Set(matches)];

  let output = html;
  for (const asset of unique) {
    const full = await resolveAssetPath(asset);
    if (!full) continue;

    const buf = await fs.readFile(full);
    const uri = dataUriFromBuffer(full, buf);
    output = output.split(asset).join(uri);
  }

  return output;
}

async function replaceLeafletMarkerCdnUrls(html) {
  const replacements = [
    {
      url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      file: path.join(root, 'node_modules', 'leaflet', 'dist', 'images', 'marker-icon.png'),
    },
    {
      url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      file: path.join(root, 'node_modules', 'leaflet', 'dist', 'images', 'marker-icon-2x.png'),
    },
    {
      url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      file: path.join(root, 'node_modules', 'leaflet', 'dist', 'images', 'marker-shadow.png'),
    },
  ];

  let output = html;
  for (const item of replacements) {
    try {
      const buf = await fs.readFile(item.file);
      const uri = dataUriFromBuffer(item.file, buf);
      output = output.split(item.url).join(uri);
    } catch {
      // Leave URL as-is if leaflet asset cannot be read.
    }
  }

  return output;
}

function removeExternalGoogleFontLinks(html) {
  return html
    .replace(/\n?\s*<link[^>]*fonts\.googleapis\.com[^>]*>\s*/g, '\n')
    .replace(/\n?\s*<link[^>]*fonts\.gstatic\.com[^>]*>\s*/g, '\n');
}

async function main() {
  const original = await fs.readFile(distFile, 'utf8');
  let html = original;

  html = await replaceLocalAssets(html);
  html = await replaceLeafletMarkerCdnUrls(html);
  html = removeExternalGoogleFontLinks(html);

  const outputFile = path.join(root, 'dist-single', 'index-offline.html');
  await fs.writeFile(outputFile, html, 'utf8');

  console.log(`Offline single-file written: ${outputFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
