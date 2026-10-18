import { createContext, useContext } from 'react';

export type Locale = 'nl' | 'en';
export type Localized<T = string> = Record<Locale, T>;

export const LocaleContext = createContext<Locale>('nl');
export const useLocale = () => useContext(LocaleContext);

/** NL is leidend; EN moet exact dezelfde structuur hebben (ontbrekende of extra sleutels geven een typefout). */
export function defineContent<T>(content: { nl: T; en: NoInfer<T> }): Localized<T> {
  return content;
}

export function useContent<T>(content: Localized<T>): T {
  return content[useLocale()];
}

export const dateLocale = (locale: Locale) => (locale === 'en' ? 'en-GB' : 'nl-NL');

// Engels staat onder /en; Nederlands houdt de bestaande paden.
export const localeOfPath = (path: string): Locale => (/^\/en(?=$|[/?])/.test(path) ? 'en' : 'nl');

export const stripLocale = (path: string) => {
  if (localeOfPath(path) === 'nl') return path;
  const rest = path.slice(3);
  return rest.startsWith('/') ? rest : `/${rest}`;
};

export const withLocale = (path: string, locale: Locale) => {
  if (locale === 'nl') return path;
  return path === '/' ? '/en' : path.startsWith('/?') ? `/en${path.slice(1)}` : `/en${path}`;
};

// Voor code buiten React (zoals de linkomzetting) die de actieve taal moet kennen.
let activeLocale: Locale = 'nl';
export const setActiveLocale = (locale: Locale) => { activeLocale = locale; };
export const getActiveLocale = () => activeLocale;
