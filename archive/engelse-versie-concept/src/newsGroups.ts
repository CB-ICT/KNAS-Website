// Groepeert de onderwerpen en doelgroepen van knas.nl tot zeven nieuwscategorieën.
import type { Localized } from './i18n';

export interface NewsGroup {
  slug: string;
  label: Localized;
}

export const newsGroups: NewsGroup[] = [
  { slug: 'topsport', label: { nl: 'Topsport en internationaal', en: 'Elite sport and international' } },
  { slug: 'wedstrijden', label: { nl: 'Wedstrijden en NK', en: 'Competitions and Dutch Championships' } },
  { slug: 'jeugd', label: { nl: 'Jeugd', en: 'Youth' } },
  { slug: 'opleidingen', label: { nl: 'Opleidingen en scheidsrechters', en: 'Courses and referees' } },
  { slug: 'bond', label: { nl: 'Bond en verenigingen', en: 'Federation and clubs' } },
  { slug: 'hulde', label: { nl: 'Hulde en in memoriam', en: 'Tributes and in memoriam' } },
  { slug: 'media', label: { nl: 'Media', en: 'Media' } },
];

const categoryToGroup: Record<string, string> = {
  'uitslagen internationaal': 'topsport',
  titeltoernooien: 'topsport',
  'olympische spelen': 'topsport',
  topsport: 'topsport',
  atleten: 'topsport',
  'nationale training': 'topsport',
  wedstrijden: 'wedstrijden',
  ranglijsten: 'wedstrijden',
  nahouw: 'wedstrijden',
  wedstrijdorganisatie: 'wedstrijden',
  regelementen: 'wedstrijden',
  reglementen: 'wedstrijden',
  jeugd: 'jeugd',
  jeugdschermen: 'jeugd',
  'opleidingen en cursussen': 'opleidingen',
  leraar: 'opleidingen',
  scheidsrechter: 'opleidingen',
  hulde: 'hulde',
  'in memoriam': 'hulde',
  media: 'media',
  pers: 'media',
};

// Alles wat niet in de tabel staat (ALV, Vereniging, Vacature, Veilige Sport, Veteranen …) valt onder Bond en verenigingen.
export function newsGroupOf(category: string): string {
  const key = category.trim().toLowerCase();
  if (categoryToGroup[key]) return categoryToGroup[key];
  if (/^(ek|wk)\b/.test(key)) return 'topsport';
  if (/^(nk|njk)\b/.test(key)) return 'wedstrijden';
  return 'bond';
}

// Bredere filters voor de footer, plus oude adressen die nog moeten werken.
export const newsCombinedFilters: Record<string, string[]> = {
  'alle-uitslagen': ['topsport', 'wedstrijden'],
  uitslagen: ['topsport'],
  'ek-wk': ['topsport'],
  nk: ['wedstrijden'],
};

/** Groepen die bij een onderwerp uit het adres horen; leeg = alles. */
export function groupsForFilter(slug?: string | null): string[] {
  if (!slug) return [];
  if (newsCombinedFilters[slug]) return newsCombinedFilters[slug];
  return newsGroups.some((group) => group.slug === slug) ? [slug] : [];
}
