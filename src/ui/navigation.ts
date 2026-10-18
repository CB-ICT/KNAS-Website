// Informatiearchitectuur als data: header, footer, breadcrumbs en sitemap lezen allemaal hieruit.
// Hoofdnavigatie = 6 taken van de bezoeker, max. 3 niveaus (hoofditem → groep/pagina → detail).
import { allNews } from '../news';
import { newsGroupOf, newsGroups } from '../newsGroups';

// Alleen onderwerpen waar nu berichten in staan, zodat geen menu-item op een lege lijst uitkomt.
const activeNewsGroups = newsGroups.filter((group) => allNews.some((item) => newsGroupOf(item.category) === group.slug));

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

export const mainNav: MainNavItem[] = [
  {
    id: 'nieuws',
    label: 'Nieuws',
    href: '/nieuws',
    intro: 'Het laatste nieuws uit de schermwereld.',
    overviewLabel: 'Al het nieuws',
    groups: [
      {
        title: 'Onderwerpen',
        links: activeNewsGroups.map((group) => ({ label: group.label, href: `/nieuws?onderwerp=${group.slug}` })),
      },
    ],
    accent: true,
    footerLinks: [
      { label: 'Uitslagen', href: '/nieuws?onderwerp=alle-uitslagen' },
      { label: 'Bond en verenigingen', href: '/nieuws?onderwerp=bond' },
      { label: 'Media', href: '/nieuws?onderwerp=media' },
    ],
  },
  {
    id: 'beginnen',
    label: 'Beginnen',
    href: '/beginnen',
    intro: 'Nieuw in schermen? Hier vind je alles om te starten.',
    overviewLabel: 'Wat is schermen en hoe begin je?',
    groups: [
      {
        title: 'Beginnen met schermen',
        links: [
          { label: 'De drie wapens', href: '/beginnen/wapens' },
          { label: 'Proefles en eerste stappen', href: '/beginnen/eerste-stappen' },
          { label: 'Veelgestelde vragen', href: '/beginnen/veelgestelde-vragen' },
        ],
      },
      {
        title: 'Club en lid worden',
        links: [
          { label: 'Vind een club', href: '/clubs' },
          { label: 'Lidmaatschap en kosten', href: '/beginnen/lid-worden' },
        ],
      },
      {
        title: 'Jeugd en ouders',
        links: [
          { label: 'Leeftijdscategorieën', href: '/wedstrijden/leeftijdscategorieen' },
          { label: 'Soorten wedstrijden', href: '/wedstrijden/soorten' },
          { label: 'Materiaaleisen', href: '/wedstrijden/materiaaleisen' },
          { label: 'Talentprogramma', href: '/topsport/talentprogramma' },
        ],
      },
    ],
    promo: { label: 'Vind een club bij jou in de buurt', href: '/clubs', description: 'Zoek op plaats of postcode en vraag een proefles aan bij de club.' },
  },
  {
    id: 'wedstrijden',
    label: 'Wedstrijden',
    overviewLabel: 'Alles over wedstrijden',
    href: '/wedstrijden',
    intro: 'Wedstrijden vinden, je goed voorbereiden en de regels kennen.',
    groups: [
      {
        title: 'Wedstrijden zoeken',
        links: [
          { label: 'Wedstrijdkalender', href: '/wedstrijden/kalender' },
          { label: 'Nederlandse kampioenschappen', href: '/wedstrijden/nk' },
          { label: 'Ranglijsten', href: '/wedstrijden/ranglijsten' },
        ],
      },
      {
        title: 'Voorbereiding en regels',
        links: [
          { label: 'Voorbereiden op een wedstrijd', href: '/wedstrijden/voorbereiden' },
          { label: 'Wedstrijdreglement', href: '/wedstrijden/reglementen' },
          { label: 'Scheidsrechters', href: '/wedstrijden/scheidsrechters' },
        ],
      },
    ],
    promo: { label: 'Komende wedstrijden', href: '/wedstrijden/kalender', description: 'Zoek op wapen, maand en plaats.' },
  },
  {
    id: 'voor-clubs',
    label: 'Voor clubs',
    overviewLabel: 'Alles voor clubs',
    href: '/voor-clubs',
    intro: 'Voor bestuurders, trainers en vrijwilligers van verenigingen.',
    groups: [
      {
        title: 'Je vereniging',
        links: [
          { label: 'Ledenadministratie', href: '/voor-clubs/ledenadministratie' },
          { label: 'Een club oprichten', href: '/voor-clubs/club-oprichten' },
          { label: 'Documenten en formulieren', href: '/voor-clubs/documenten' },
        ],
      },
      {
        title: 'Mensen in je club',
        links: [
          { label: 'Trainer worden', href: '/voor-clubs/trainersopleidingen' },
          { label: 'Scheidsrechter worden', href: '/wedstrijden/scheidsrechters' },
          { label: 'Vrijwilligers, veiligheid en inclusie', href: '/voor-clubs/veilig-sportklimaat' },
        ],
      },
    ],
    promo: { label: 'Trainer worden', href: '/voor-clubs/trainersopleidingen', description: 'Van assistent op de club tot topsportcoach: TCS1 tot en met TCS5.' },
  },
  {
    id: 'topsport',
    label: 'Topsport',
    overviewLabel: 'Alles over topsport',
    href: '/topsport',
    intro: 'De weg van talent naar de internationale top.',
    groups: [
      {
        title: 'Talent, selectie en internationaal',
        links: [
          { label: 'Talentprogramma', href: '/topsport/talentprogramma' },
          { label: 'Titeltoernooien en selectie', href: '/topsport/titeltoernooien' },
          { label: 'Internationaal aanmelden', href: '/topsport/internationaal-aanmelden' },
        ],
      },
    ],
    promo: { label: 'Titeltoernooien 2026-2027', href: '/topsport/titeltoernooien', description: 'EJK Rome, WJK Tallinn, EK U23 Podgorica, EK Istanbul en WK Tasjkent.' },
  },
  {
    id: 'over',
    label: 'Over de KNAS',
    overviewLabel: 'Meer over de KNAS',
    href: '/over-de-knas',
    intro: 'Wie we zijn, hoe we werken en hoe je ons bereikt.',
    groups: [
      {
        title: 'De bond',
        links: [
          { label: 'Wie we zijn', href: '/over-de-knas' },
          { label: 'Bestuur en commissies', href: '/over-de-knas/bestuur' },
          { label: 'Ereleden', href: '/over-de-knas/ereleden' },
          { label: 'Documenten', href: '/over-de-knas/documenten' },
        ],
      },
      {
        title: 'Lid zijn en contact',
        links: [
          { label: 'Lidmaatschap en tarieven', href: '/over-de-knas/lidmaatschap' },
          { label: 'Contact', href: '/contact' },
          { label: 'Meldpunt Veilige Sport', href: '/meldpunt' },
        ],
      },
    ],
  },
];

// Taken die leden vaak en snel willen doen; onderaan de mobiele lade.
export const utilityNav: NavLink[] = [
  { label: 'Inschrijven wedstrijden', href: 'https://www.knas.nl/inschrijven', external: true },
  { label: 'Ledenadministratie (OnzeRelaties)', href: '/voor-clubs/onzerelaties' },
  { label: 'Reglementen', href: '/wedstrijden/reglementen' },
  { label: 'Contact', href: '/contact' },
];

export const footerLegal: NavLink[] = [
  { label: 'Privacy op deze website', href: '/privacy' },
  { label: 'Privacyverklaring KNAS', href: 'docs/policy/privacyverklaring.pdf', external: true },
];

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
