import { newsData } from './data';
import { NewsItem } from './types';
import { dateLocale, Locale } from './i18n';
import syncedFeed from './generated/knas-news.json';

type SyncedItem = Omit<NewsItem, 'date'> & { dateISO: string };
type SyncedFeed = { syncedAt?: string; items: SyncedItem[] };

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mrt: 2, mar: 2, apr: 3, mei: 4, may: 4, jun: 5, jul: 6,
  aug: 7, sep: 8, okt: 9, oct: 9, nov: 10, dec: 11,
};

function parseDisplayDate(value: string): string | undefined {
  const match = value.trim().match(/^(\d{1,2})\s+([a-z]{3})[a-z]*\.?\s+(\d{4})$/i);
  if (!match) return undefined;
  const month = MONTHS[match[2].toLowerCase()];
  if (month === undefined) return undefined;
  return new Date(Date.UTC(Number(match[3]), month, Number(match[1]), 12)).toISOString();
}

export function formatNewsDate(item: Pick<NewsItem, 'date' | 'dateISO'>, style: 'long' | 'short' = 'long', locale: Locale = 'nl'): string {
  if (!item.dateISO) return item.date;
  return new Intl.DateTimeFormat(dateLocale(locale), {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  }).format(new Date(item.dateISO));
}

export function readingMinutes(item: NewsItem): number {
  const text = (item.contentHtml ?? item.fullContent ?? item.summary).replace(/<[^>]+>/g, ' ');
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));
}

const feed = syncedFeed as SyncedFeed;

const synced: NewsItem[] = feed.items.map((item) => ({
  ...item,
  date: formatNewsDate({ date: '', dateISO: item.dateISO }, 'short'),
  fromKnas: true,
}));

const syncedIds = new Set(synced.map((item) => item.id));

const editorial: NewsItem[] = newsData
  .filter((item) => !syncedIds.has(item.id))
  .map((item) => ({ ...item, dateISO: item.dateISO ?? parseDisplayDate(item.date) }));

/** Alle berichten, nieuwste eerst: automatisch van knas.nl aangevuld met redactionele berichten. */
export const allNews: NewsItem[] = [...synced, ...editorial].sort((a, b) =>
  (b.dateISO ?? '').localeCompare(a.dateISO ?? ''),
);

export const newsSyncedAt: string | undefined = feed.syncedAt;

export const articleHref = (id: string) => `/nieuws/${encodeURIComponent(id)}`;
