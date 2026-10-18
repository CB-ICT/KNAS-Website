// Genereert public/docs/source/witte-vlekkenplan-uitleg.pdf zonder externe dependencies.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/docs/source/witte-vlekkenplan-uitleg.pdf');

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 62;
const MARGIN_TOP = 64;
const MARGIN_BOTTOM = 70;
const TEXT_W = PAGE_W - MARGIN_X * 2;

const NAVY = [0.03, 0.21, 0.39];
const ORANGE = [0.91, 0.55, 0.09];
const BODY = [0.11, 0.18, 0.27];
const GREY = [0.38, 0.44, 0.51];

const content = [
  { type: 'eyebrow', text: 'Voor verenigingen en initiatiefnemers' },
  { type: 'title', text: 'Witte Vlekkenplan' },
  { type: 'lede', text: 'Meer schermen in meer regio\u2019s. In gebieden waar nog geen of weinig schermaanbod is, kan een nieuw initiatief de sport dichter bij inwoners brengen. Deze uitleg helpt verenigingen en lokale initiatiefnemers om zo\u2019n plan stap voor stap op te bouwen.' },

  { type: 'h2', text: 'Wat is een witte vlek?' },
  { type: 'p', text: 'Een witte vlek is een regio waar mensen weinig mogelijkheden hebben om te schermen. Dat kan betekenen dat er geen vereniging in de buurt is, of dat het bestaande aanbod te klein is om nieuwe groepen te ontvangen.' },
  { type: 'p', text: 'Het doel is daarom niet alleen een nieuwe club starten, maar een bereikbaar en houdbaar sportaanbod opbouwen dat ook na het eerste seizoen blijft bestaan.' },

  { type: 'h2', text: 'Van idee naar aanbod' },
  { type: 'step', n: '1', title: 'Breng de regio in kaart', text: 'Welke plaatsen, scholen, sportaccommodaties en verenigingen zijn al actief? Kijk ook naar reistijd, mogelijke deelnemers en bestaande sportinitiatieven.' },
  { type: 'step', n: '2', title: 'Vorm een initiatiefgroep', text: 'Betrek een trainer, enkele vrijwilligers en een accommodatiepartner. Een bestaande schermvereniging, school of gemeente kan meedenken of meehelpen.' },
  { type: 'step', n: '3', title: 'Start klein en toets de belangstelling', text: 'Begin met een kennismakingsreeks, clinics of een vaste trainingsavond. Meet de belangstelling voordat je vaste kosten en verplichtingen aangaat.' },
  { type: 'step', n: '4', title: 'Regel kwaliteit en veiligheid', text: 'Zorg voor bevoegde begeleiding, passend materiaal, een veilige sportomgeving, duidelijke afspraken en een haalbare vrijwilligersplanning.' },
  { type: 'step', n: '5', title: 'Bouw aan continu\u00efteit', text: 'Maak afspraken over ledenadministratie, contributie, zaalhuur, trainers en materiaal. Bepaal ook hoe het initiatief kan doorgroeien naar een zelfstandige vereniging of een nevenvestiging.' },

  { type: 'h2', text: 'Wat staat er in een plan?' },
  { type: 'bullet', text: 'de regio en de doelgroep;' },
  { type: 'bullet', text: 'het verwachte aantal deelnemers en de manier waarop zij instromen;' },
  { type: 'bullet', text: 'locatie, trainingsmomenten en benodigd materiaal;' },
  { type: 'bullet', text: 'trainers, begeleiding en vrijwilligers;' },
  { type: 'bullet', text: 'een begroting met zaalhuur, materiaal, contributie en promotie;' },
  { type: 'bullet', text: 'de planning van de eerste kennismaking en het eerste seizoen;' },
  { type: 'bullet', text: 'afspraken over evaluatie en doorgroei.' },

  { type: 'h2', text: 'Samenwerken aan groei' },
  { type: 'p', text: 'Een bestaand bestuur kan een nieuw initiatief ondersteunen met kennis, materiaal, administratie en trainers. De initiatiefgroep hoeft de organisatie dan niet vanaf dag \u00e9\u00e9n alleen te dragen.' },
  { type: 'p', text: 'Leg de afspraken vooraf vast: wie regelt de zaal, wie verzorgt de lessen, hoe loopt de ledenadministratie en wanneer evalueer je samen? Een korte evaluatie na de eerste trainingsperiode voorkomt misverstanden.' },

  { type: 'h2', text: 'Eerste werkafspraak' },
  { type: 'p', text: 'Plan een gesprek met de betrokken vereniging(en), trainer(s) en de locatiepartner. Werk daarna een plan van \u00e9\u00e9n pagina uit met doelgroep, aanbod, kosten, verantwoordelijkheden en een startdatum. Daarmee wordt het initiatief concreet en bespreekbaar.' },

  { type: 'note', text: 'Werkdocument bij de informatie op de KNAS-website. Controleer altijd de actuele bondseisen, reglementen en beschikbare ondersteuning voordat een vereniging formele afspraken maakt.' },
];

// Benaderde tekenbreedtes van Helvetica volstaan voor betrouwbare regelafbreking.
const widthOf = (text, size, bold) => text.length * size * (bold ? 0.55 : 0.5);

const wrap = (text, size, bold, maxWidth) => {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (widthOf(candidate, size, bold) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const esc = (text) => text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

const pages = [];
let ops = [];
let y = PAGE_H - MARGIN_TOP;

const newPage = () => {
  pages.push(ops.join('\n'));
  ops = [];
  y = PAGE_H - MARGIN_TOP;
};

const ensure = (needed) => {
  if (y - needed < MARGIN_BOTTOM) newPage();
};

const drawText = (text, { size, bold, color, x = MARGIN_X }) => {
  const [r, g, b] = color;
  ops.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${esc(text)}) Tj ET`);
};

const paragraph = (text, { size = 10.5, bold = false, color = BODY, x = MARGIN_X, width = TEXT_W, leading = 15, after = 9 } = {}) => {
  for (const line of wrap(text, size, bold, width)) {
    ensure(leading);
    drawText(line, { size, bold, color, x });
    y -= leading;
  }
  y -= after;
};

const rect = (x, yPos, w, h, color) => {
  const [r, g, b] = color;
  ops.push(`${r} ${g} ${b} rg ${x.toFixed(2)} ${yPos.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`);
};

for (const block of content) {
  if (block.type === 'eyebrow') {
    ensure(20);
    drawText(block.text.toUpperCase(), { size: 8.5, bold: true, color: ORANGE });
    y -= 20;
  } else if (block.type === 'title') {
    ensure(46);
    drawText(block.text, { size: 30, bold: true, color: NAVY });
    y -= 26;
    rect(MARGIN_X, y, 74, 3, ORANGE);
    y -= 26;
  } else if (block.type === 'lede') {
    const lines = wrap(block.text, 11, false, TEXT_W - 22);
    const boxH = lines.length * 16 + 20;
    ensure(boxH + 10);
    rect(MARGIN_X, y - boxH + 12, TEXT_W, boxH, [0.93, 0.96, 0.98]);
    rect(MARGIN_X, y - boxH + 12, 3.5, boxH, ORANGE);
    y -= 6;
    for (const line of lines) {
      drawText(line, { size: 11, color: BODY, x: MARGIN_X + 14 });
      y -= 16;
    }
    y -= 20;
  } else if (block.type === 'h2') {
    ensure(40);
    y -= 8;
    drawText(block.text, { size: 15, bold: true, color: NAVY });
    y -= 8;
    rect(MARGIN_X, y, TEXT_W, 0.9, [0.79, 0.85, 0.9]);
    y -= 16;
  } else if (block.type === 'step') {
    const lines = wrap(block.text, 10.5, false, TEXT_W - 34);
    ensure(lines.length * 15 + 26);
    rect(MARGIN_X, y - 2, 15, 15, NAVY);
    drawText(block.n, { size: 9.5, bold: true, color: [1, 1, 1], x: MARGIN_X + 5 });
    drawText(block.title, { size: 11, bold: true, color: NAVY, x: MARGIN_X + 26 });
    y -= 16;
    for (const line of lines) {
      ensure(15);
      drawText(line, { size: 10.5, color: BODY, x: MARGIN_X + 26 });
      y -= 15;
    }
    y -= 10;
  } else if (block.type === 'bullet') {
    const lines = wrap(block.text, 10.5, false, TEXT_W - 18);
    ensure(lines.length * 15 + 4);
    rect(MARGIN_X + 2, y + 3.5, 3, 3, ORANGE);
    lines.forEach((line, index) => {
      drawText(line, { size: 10.5, color: BODY, x: MARGIN_X + 14 });
      y -= 15;
      if (index < lines.length - 1) ensure(15);
    });
    y -= 2;
  } else if (block.type === 'p') {
    paragraph(block.text);
  } else if (block.type === 'note') {
    const lines = wrap(block.text, 9, false, TEXT_W - 20);
    ensure(lines.length * 13 + 26);
    y -= 10;
    rect(MARGIN_X, y - lines.length * 13 + 4, TEXT_W, lines.length * 13 + 14, [0.96, 0.97, 0.98]);
    y -= 6;
    for (const line of lines) {
      drawText(line, { size: 9, color: GREY, x: MARGIN_X + 10 });
      y -= 13;
    }
  }
}
pages.push(ops.join('\n'));

const objects = [];
const addObject = (body) => {
  objects.push(body);
  return objects.length; // 1-based object number
};

const pagesObjNumber = 1 + 1 + pages.length * 2 + 1; // placeholder, resolved below
const contentNumbers = [];
const pageNumbers = [];

addObject('<< /Type /Catalog /Pages 2 0 R >>'); // 1
addObject('PAGES_PLACEHOLDER'); // 2
const fontRegular = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
const fontBold = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');

for (const stream of pages) {
  const contentNumber = addObject(`<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`);
  contentNumbers.push(contentNumber);
  const pageNumber = addObject(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
    `/Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >> >> ` +
    `/Contents ${contentNumber} 0 R >>`
  );
  pageNumbers.push(pageNumber);
}

objects[1] = `<< /Type /Pages /Count ${pageNumbers.length} /Kids [${pageNumbers.map((n) => `${n} 0 R`).join(' ')}] >>`;
void pagesObjNumber;

let pdf = '%PDF-1.4\n';
const offsets = [];
objects.forEach((body, index) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'));
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf, 'latin1');
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const offset of offsets) {
  pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, Buffer.from(pdf, 'latin1'));
console.log(`PDF geschreven: ${OUT} (${pages.length} pagina's)`);
