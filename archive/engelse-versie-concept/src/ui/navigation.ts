// Informatiearchitectuur als data: header, footer, breadcrumbs en sitemap lezen allemaal hieruit.
// Hoofdnavigatie = 6 taken van de bezoeker, max. 3 niveaus (hoofditem → groep/pagina → detail).
import { newsGroups } from '../newsGroups';
import type { Locale, Localized } from '../i18n';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface MainNavItem {
  id: string;
  label: string;
  href: string;
  /** Korte belofte bovenaan het mega-menu: waarom zou je hier klikken? */
  intro: string;
  /** Linktekst naar de overzichtspagina in het menu. */
  overviewLabel: string;
  groups: NavGroup[];
  promo?: NavLink;
  /** Valt op in het menu met een eigen kleur. */
  accent?: boolean;
  /** Vervangt in de footer de links uit de groepen. */
  footerLinks?: NavLink[];
}

// Bronvorm: elke zichtbare tekst in beide talen; de rest van de app krijgt via resolve() gewone strings.
type Source<T> = {
  [K in keyof T]: T[K] extends string ? (K extends 'href' | 'id' ? string : Localized)
    : T[K] extends string | undefined ? (K extends 'href' | 'id' ? T[K] : Localized | undefined)
    : T[K] extends (infer U)[] ? Source<U>[]
    : T[K] extends object | undefined ? Source<NonNullable<T[K]>> | Extract<T[K], undefined>
    : T[K];
};

const L = (nl: string, en: string): Localized => ({ nl, en });

const mainNavSource: Source<MainNavItem>[] = [
  {
    id: 'nieuws',
    label: L('Nieuws', 'News'),
    href: '/nieuws',
    intro: L('Het laatste nieuws uit de schermwereld.', 'The latest news from the world of fencing.'),
    overviewLabel: L('Al het nieuws', 'All news'),
    groups: [
      {
        title: L('Onderwerpen', 'Topics'),
        links: newsGroups.map((group) => ({ label: group.label, href: `/nieuws?onderwerp=${group.slug}` })),
      },
    ],
    accent: true,
    footerLinks: [
      { label: L('Uitslagen', 'Results'), href: '/nieuws?onderwerp=alle-uitslagen' },
      { label: L('Bond en verenigingen', 'Federation and clubs'), href: '/nieuws?onderwerp=bond' },
      { label: L('Media', 'Media'), href: '/nieuws?onderwerp=media' },
    ],
  },
  {
    id: 'beginnen',
    label: L('Beginnen', 'Get started'),
    href: '/beginnen',
    intro: L('Nieuw in schermen? Hier vind je alles om te starten.', 'New to fencing? Everything you need to get started.'),
    overviewLabel: L('Wat is schermen en hoe begin je?', 'What is fencing and how do you start?'),
    groups: [
      {
        title: L('Beginnen met schermen', 'Starting fencing'),
        links: [
          { label: L('De drie wapens', 'The three weapons'), href: '/beginnen/wapens' },
          { label: L('Proefles en eerste stappen', 'Trial lesson and first steps'), href: '/beginnen/eerste-stappen' },
          { label: L('Veelgestelde vragen', 'Frequently asked questions'), href: '/beginnen/veelgestelde-vragen' },
        ],
      },
      {
        title: L('Club en lid worden', 'Clubs and membership'),
        links: [
          { label: L('Vind een club', 'Find a club'), href: '/clubs' },
          { label: L('Lidmaatschap en kosten', 'Membership and fees'), href: '/beginnen/lid-worden' },
        ],
      },
      {
        title: L('Jeugd en ouders', 'Young fencers and parents'),
        links: [
          { label: L('Leeftijdscategorieën', 'Age categories'), href: '/wedstrijden/leeftijdscategorieen' },
          { label: L('Soorten wedstrijden', 'Types of competition'), href: '/wedstrijden/soorten' },
          { label: L('Materiaaleisen', 'Equipment requirements'), href: '/wedstrijden/materiaaleisen' },
          { label: L('Talentprogramma', 'Talent programme'), href: '/topsport/talentprogramma' },
        ],
      },
    ],
    promo: {
      label: L('Vind een club bij jou in de buurt', 'Find a club near you'),
      href: '/clubs',
      description: L('Zoek op plaats of postcode en vraag een proefles aan bij de club.', 'Search by town or postcode and ask the club about a trial lesson.'),
    },
  },
  {
    id: 'wedstrijden',
    label: L('Wedstrijden', 'Competitions'),
    overviewLabel: L('Alles over wedstrijden', 'All about competitions'),
    href: '/wedstrijden',
    intro: L('Wedstrijden vinden, je goed voorbereiden en de regels kennen.', 'Find competitions, prepare well and know the rules.'),
    groups: [
      {
        title: L('Wedstrijden zoeken', 'Find competitions'),
        links: [
          { label: L('Wedstrijdkalender', 'Competition calendar'), href: '/wedstrijden/kalender' },
          { label: L('Nederlandse kampioenschappen', 'Dutch Championships'), href: '/wedstrijden/nk' },
          { label: L('Ranglijsten', 'Rankings'), href: '/wedstrijden/ranglijsten' },
        ],
      },
      {
        title: L('Voorbereiding en regels', 'Preparation and rules'),
        links: [
          { label: L('Voorbereiden op een wedstrijd', 'Preparing for a competition'), href: '/wedstrijden/voorbereiden' },
          { label: L('Wedstrijdreglement', 'Competition rules'), href: '/wedstrijden/reglementen' },
          { label: L('Scheidsrechters', 'Referees'), href: '/wedstrijden/scheidsrechters' },
        ],
      },
    ],
    promo: {
      label: L('Komende wedstrijden', 'Upcoming competitions'),
      href: '/wedstrijden/kalender',
      description: L('Zoek op wapen, maand en plaats.', 'Search by weapon, month and town.'),
    },
  },
  {
    id: 'voor-clubs',
    label: L('Voor clubs', 'For clubs'),
    overviewLabel: L('Alles voor clubs', 'Everything for clubs'),
    href: '/voor-clubs',
    intro: L('Voor bestuurders, trainers en vrijwilligers van verenigingen.', 'For club board members, coaches and volunteers.'),
    groups: [
      {
        title: L('Je vereniging', 'Your club'),
        links: [
          { label: L('Ledenadministratie', 'Membership administration'), href: '/voor-clubs/ledenadministratie' },
          { label: L('Een club oprichten', 'Starting a club'), href: '/voor-clubs/club-oprichten' },
          { label: L('Documenten en formulieren', 'Documents and forms'), href: '/voor-clubs/documenten' },
        ],
      },
      {
        title: L('Mensen in je club', 'People in your club'),
        links: [
          { label: L('Trainer worden', 'Become a coach'), href: '/voor-clubs/trainersopleidingen' },
          { label: L('Scheidsrechter worden', 'Become a referee'), href: '/wedstrijden/scheidsrechters' },
          { label: L('Vrijwilligers, veiligheid en inclusie', 'Volunteers, safety and inclusion'), href: '/voor-clubs/veilig-sportklimaat' },
        ],
      },
    ],
    promo: {
      label: L('Trainer worden', 'Become a coach'),
      href: '/voor-clubs/trainersopleidingen',
      description: L('Van assistent op de club tot topsportcoach: TCS1 tot en met TCS5.', 'From club assistant to elite coach: TCS1 to TCS5.'),
    },
  },
  {
    id: 'topsport',
    label: L('Topsport', 'Elite sport'),
    overviewLabel: L('Alles over topsport', 'All about elite sport'),
    href: '/topsport',
    intro: L('De weg van talent naar de internationale top.', 'The pathway from talent to the international top.'),
    groups: [
      {
        title: L('Talent, selectie en internationaal', 'Talent, selection and international'),
        links: [
          { label: L('Talentprogramma', 'Talent programme'), href: '/topsport/talentprogramma' },
          { label: L('Titeltoernooien en selectie', 'Championships and selection'), href: '/topsport/titeltoernooien' },
          { label: L('Internationaal aanmelden', 'International entries'), href: '/topsport/internationaal-aanmelden' },
        ],
      },
    ],
    promo: {
      label: L('Titeltoernooien 2026-2027', 'Championships 2026-2027'),
      href: '/topsport/titeltoernooien',
      description: L('EJK Rome, WJK Tallinn, EK U23 Podgorica, EK Istanbul en WK Tasjkent.', 'European Cadet and Junior Championships in Rome, World Cadet and Junior Championships in Tallinn, European U23 Championships in Podgorica, European Championships in Istanbul and World Championships in Tashkent.'),
    },
  },
  {
    id: 'over',
    label: L('Over de KNAS', 'About the KNAS'),
    overviewLabel: L('Meer over de KNAS', 'More about the KNAS'),
    href: '/over-de-knas',
    intro: L('Wie we zijn, hoe we werken en hoe je ons bereikt.', 'Who we are, how we work and how to reach us.'),
    groups: [
      {
        title: L('De bond', 'The federation'),
        links: [
          { label: L('Wie we zijn', 'Who we are'), href: '/over-de-knas' },
          { label: L('Bestuur en commissies', 'Board and committees'), href: '/over-de-knas/bestuur' },
          { label: L('Ereleden', 'Honorary members'), href: '/over-de-knas/ereleden' },
          { label: L('Documenten', 'Documents'), href: '/over-de-knas/documenten' },
        ],
      },
      {
        title: L('Lid zijn en contact', 'Membership and contact'),
        links: [
          { label: L('Lidmaatschap en tarieven', 'Membership and fees'), href: '/over-de-knas/lidmaatschap' },
          { label: L('Contact', 'Contact'), href: '/contact' },
          { label: L('Meldpunt Veilige Sport', 'Meldpunt Veilige Sport (safe sport reporting)'), href: '/meldpunt' },
        ],
      },
    ],
  },
];

// Taken die leden vaak en snel willen doen; onderaan de mobiele lade.
const utilityNavSource: Source<NavLink>[] = [
  { label: L('Inschrijven wedstrijden', 'Competition entries'), href: 'https://www.knas.nl/inschrijven', external: true },
  { label: L('Ledenadministratie (OnzeRelaties)', 'Membership administration (OnzeRelaties)'), href: '/voor-clubs/onzerelaties' },
  { label: L('Reglementen', 'Rules'), href: '/wedstrijden/reglementen' },
  { label: L('Contact', 'Contact'), href: '/contact' },
];

const footerLegalSource: Source<NavLink>[] = [
  { label: L('Privacy op deze website', 'Privacy on this website'), href: '/privacy' },
  { label: L('Privacyverklaring KNAS', 'KNAS privacy statement (in Dutch)'), href: 'docs/policy/privacyverklaring.pdf', external: true },
];

// Vervangt elke {nl, en}-tekst door de tekst in de gekozen taal.
function resolve<T>(value: unknown, locale: Locale): T {
  if (Array.isArray(value)) return value.map((item) => resolve(item, locale)) as T;
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    if (typeof record.nl === 'string' && typeof record.en === 'string' && Object.keys(record).length === 2) return record[locale] as T;
    return Object.fromEntries(Object.entries(record).map(([key, inner]) => [key, resolve(inner, locale)])) as T;
  }
  return value as T;
}

const cache = new Map<string, unknown>();
const memo = <T>(key: string, build: () => T): T => {
  if (!cache.has(key)) cache.set(key, build());
  return cache.get(key) as T;
};

export const getMainNav = (locale: Locale) => memo(`main-${locale}`, () => resolve<MainNavItem[]>(mainNavSource, locale));
export const getUtilityNav = (locale: Locale) => memo(`utility-${locale}`, () => resolve<NavLink[]>(utilityNavSource, locale));
export const getFooterLegal = (locale: Locale) => memo(`legal-${locale}`, () => resolve<NavLink[]>(footerLegalSource, locale));

/** Nederlandse navigatie, voor code die geen taal kent (bijv. de sitemap). */
export const mainNav = getMainNav('nl');

export const contactInfo = {
  name: 'Koninklijke Nederlandse Algemene Schermbond',
  street: 'Kelvinbaan 48',
  city: '3439 MT Nieuwegein',
  email: 'info@knas.nl',
};

export const socialLinks = [
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/Schermbond/' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/schermbond/' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@knas-nederlandseschermbond4978' },
] as const;
