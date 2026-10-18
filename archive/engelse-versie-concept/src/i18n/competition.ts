import { defineContent, Locale } from './index';

// Labels voor wedstrijdgegevens uit de Nahouw-kalender (codes staan in src/data.ts).
const typeLabels = defineContent<Record<string, string>>({
  nl: { 'Nat.': 'Nationaal', 'Int.': 'Internationaal', 'Rec.': 'Recreatief', 'Rec.Int.': 'Recreatief, internationaal', FIE: 'FIE' },
  en: { 'Nat.': 'National', 'Int.': 'International', 'Rec.': 'Recreational', 'Rec.Int.': 'Recreational, international', FIE: 'FIE' },
});

const weaponNames = defineContent<Record<'Fl' | 'Ep' | 'Sa', string>>({
  nl: { Fl: 'Floret', Ep: 'Degen', Sa: 'Sabel' },
  en: { Fl: 'Foil', Ep: 'Épée', Sa: 'Sabre' },
});

export const competitionTypeLabel = (code: string | undefined, locale: Locale) => {
  if (!code) return undefined;
  return typeLabels[locale][code.startsWith('FIE') ? 'FIE' : code] ?? code;
};

/** Volgorde in de code is sabel, floret, degen (bijv. "SaFlEp"). */
export const weaponCodes = (code: string | undefined) => (code?.match(/Sa|Fl|Ep/g) ?? []) as ('Fl' | 'Ep' | 'Sa')[];

export const competitionWeaponLabel = (code: string | undefined, locale: Locale) =>
  weaponCodes(code).map((part) => weaponNames[locale][part]).join(', ') || code;

export const shortMonth = (isoDate: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'nl-NL', { month: 'short' }).format(new Date(`${isoDate}T12:00:00`)).replace('.', '');
