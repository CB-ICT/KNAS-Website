import { WeaponItem, FAQItem, NewsItem, TournamentItem, ClubItem, RankingItem } from './types';

export const weaponsData: WeaponItem[] = [
  {
    id: 'floret',
    name: 'Floret',
    description: 'Het floret is het traditionele oefenwapen. Bij floret is de romp het enige trefvlak. Het is een technisch wapen waarbij het \'recht van aanval\' (prioriteit) bepaalt wie het punt krijgt bij een gelijktijdige treffer.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9zAsMb4wfUMYTdUkw42wWEfWtvlr0mBUcqW_IWJqnMLmqD6Bb86w0a8rLrl_43-RzQza0NSbqaHuYDgoPmql-6qvHxRP95mItvT7uwv7TiLXJQOK0tiQnFVfwTgXK6NeeUjKBCAd4M0eeSmsnMTd3QZfoX7cpz_CW27USMTb-wFpZZ3y1PVJYPTK46oIyTK_qMmJu3aMYBg76wAkj63iyvfQeXOg-y2FK1JZkjvCBwPbMw_nD6IBgUqcgbRdq6xKMFdotLn2R6qw',
    target: 'Alleen de romp (met elektrisch vest)',
    type: 'Steekwapen',
    tags: ['Technisch', 'Oefenwapen', 'Prioriteit']
  },
  {
    id: 'degen',
    name: 'Degen',
    description: 'Bij degen is het hele lichaam van top tot teen trefvlak. Er is geen voorrangsregel of prioriteit; wie het eerst treft, scoort. Bij gelijktijdige treffers (binnen 1/25ste seconde) krijgen beide schermers een punt.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9n8HqPwtrL82W3hqbLLqsbXqJLPJxW6Z_usoBH5BfRiLBd9Bf_fZqHJLfdA7OVeXH2Zu_kR1NsFsXOL8CRpzIRi_7PtCtq4PhD9lgrzwbKwKsbVtnnTb7fRtzxbp2dBAagK9KanU6lLXXBYBpDXphr-1BAEPQI9G0wt68jEndqWhTqLl0FZHteCn3hh2Sm1y0zf00YJl-PtiVwXCWpLLp_gYRr0SNiofkbDu2TxI1XV7W1zXmFssehqmvBfVyZrZCtZoqVkMzkkY',
    target: 'Het gehele lichaam (inclusief masker en voeten)',
    type: 'Steekwapen',
    tags: ['Vrij trefvlak', 'Duels', 'Geen prioriteit']
  },
  {
    id: 'sabel',
    name: 'Sabel',
    description: 'Het sabel is het explosieve, snelle wapen. In tegenstelling tot floret en degen, kun je met de sabel ook \'kappen\' en \'snijden\' met de zijkant of rug van de kling. Het trefvlak is alles boven de gordel, inclusief hoofd en armen.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTTZFhuGYhyn4vwvqy-kNBSlWWCGBpCQfCoE_Clk1jIufbDb70VVhZwJxruySRPbL4slRTfNzPDcs2iD2BEjnmFJcK4yAm8mqwD6vKaHnfwBFuBdF_zSPia_giYmFx1sPWEDKH7gfPz0Q-JTcISUXtuco0OFYzoTpWPnHdLXbHjhNCFz9Q7Uy3u-8gWf7SiqmUM0QysaUpI4eWSx-bvjjtFB1SOxpMX4a5gmDJStaUGUpD55XPJh50CsNaQOoN-5e3oOmhAibSxlI',
    target: 'Alles boven de gordel (romp, armen, hoofd/masker)',
    type: 'Slag- en steekwapen',
    tags: ['Snelheid', 'Agressie', 'Tactiek']
  }
];

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Moet ik direct eigen materiaal kopen?',
    answer: 'Nee, bijna alle verenigingen bieden uitstekend leenmateriaal aan voor beginners. Je kunt vaak de eerste maanden gratis of voor een kleine bijdrage gebruik maken van maskers, vesten, handschoenen en wapens van de club. Pas als je besluit definitief door te gaan met de sport, kun je stap voor stap je eigen uitrusting aanschaffen.'
  },
  {
    id: 'faq-2',
    question: 'Vanaf welke leeftijd kun je beginnen met schermen?',
    answer: 'De meeste kinderen beginnen tussen de 8 en 10 jaar oud, wanneer ze de fijne motoriek en concentratie beginnen te ontwikkelen. Veel clubs bieden echter ook speciale speelse programma\'s aan voor jongere kinderen vanaf 6 jaar (met plastic of schuimrubberen wapens). Ook op latere leeftijd, tot ver boven de 60, kun je uitstekend instromen in recreatieve schermgroepen!'
  },
  {
    id: 'faq-3',
    question: 'Is schermen een gevaarlijke sport?',
    answer: 'In tegenstelling tot wat vaak gedacht wordt, is schermen een van de veiligste contactsporten ter wereld. Dankzij strenge internationale veiligheidseisen is de uitrusting gemaakt van ijzersterke materialen (zoals Kevlar voor de vesten) en zijn de maskers bestand tegen enorme klappen. Bovendien zijn de stalen klingen uiterst flexibel en zijn de punten beveiligd met stompe knoppen of elektrische drukpunten.'
  },
  {
    id: 'faq-4',
    question: 'Hoe vind ik een club in de buurt?',
    answer: 'Nederland heeft een breed netwerk van actieve schermverenigingen verspreid van Groningen tot Maastricht. Je kunt eenvoudig onze interactieve \'Vind een club\' zoekfunctie gebruiken bovenaan de pagina. Vul je postcode of stad in en ontdek direct de trainingslocaties, wapens en contactgegevens van de dichtstbijzijnde club.'
  },
  {
    id: 'faq-5',
    question: 'Wat zijn de kosten voor lidmaatschap en uitrusting?',
    answer: 'Een verenigingscontributie varieert meestal tussen de €150 en €300 per jaar, afhankelijk van het aantal trainingen per week. Een basisuitrusting (masker, vest, handschoen, wapen) voor beginners kost nieuw ongeveer €250 tot €350, maar er is ook een levendige markt voor kwalitatief hoogwaardig tweedehands materiaal.'
  }
];

export const newsData: NewsItem[] = [
  {
    id: 'news-1',
    date: '14 Mei 2024',
    category: 'Top Sport',
    title: 'Selectie bekend voor de Europese Kampioenschappen',
    summary: 'De technische commissie van de KNAS heeft vandaag de definitieve selectie bekendgemaakt voor de aankomende Europese Kampioenschappen in Basel, Zwitserland. Onze nationale degen- en floretploegen reizen af met hoge ambities en hopen op kwalificatiepunten voor de Olympische Spelen.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLD1q1d1ve2L2tWxHJEHDSDGzsZ0wcsNCj7l8s2WBTplrPs4ZChW_Y8n7PYeknlpyPoyoZn4d8Udhqu4jAUvIYsT34g3Ap_teHCWqjgWYghtHSaisvTpTcpNsYKJMheKBGYEvRklilvhP2KZYvGVEwSy0SoaEt49kyLci_qk98_OmB-83kxILGP28tz7TXhl_p9ymgk3bIPu4E5dS_35IleITrpzX68pyr1c2I0Xt7BrZpFbXDdfoTaJZomd_V_aJ95l-Qc_PN9rU'
  },
  {
    id: 'news-2',
    date: '10 Mei 2024',
    category: 'Verenigingen',
    title: 'Nieuwe jeugdopleiding gelanceerd in Utrecht',
    summary: 'In samenwerking met een consortium van lokale Utrechtse schermverenigingen lanceert de KNAS een gloednieuw pilotproject. Dit initiatief is speciaal ontworpen om de overstap van recreatieve schoolsport naar structureel verenigingsschermen en competitief jeugdschermen te vergemakkelijken.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEvM6hiKe2cPK7m2ZpLHzwBo_O-UYRPZv6QMMCOuYJZY5ZgSifEWi_w20p5q7fJJrUdSQd-JV0EWFSi2JfVxlKS-zAiCb3QtKRY76QSv-2lnZjmAOjEUVhctfK1Aik4du5Uer6NidNxIEnMpPiL7yX3mw3rdG-esW3ODfLeWuUOQKGCN_GV8pWF9FoSXIXFEkwXynDNzxJAx4UTcpQLaZ5Qa8J1txIPb0jVVY6FiPpCdQ0k8j1jhv6KFG5mbqs31mOYaf2YxqugGA'
  },
  {
    id: 'news-3',
    date: '08 Mei 2024',
    category: 'Breedtesport',
    title: 'Schermen voor iedereen: Open Dag een groot succes',
    summary: 'Afgelopen weekend openden meer dan 20 aangesloten KNAS-schermverenigingen in heel Nederland gelijktijdig hun deuren voor het grote publiek. De belangstelling was overal recordbrekend. Honderden enthousiaste proeflesnemers van jong tot oud maakten voor het eerst kennis met de schermsport.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHqINStzaN5MJKxAWcslaSPaaxVrdhCwalckOeZ9nCacLDB_19_I1ySSD0ZAu5CgyhYQPRk_2LCiRvk4NdSAOHJEEo1cct21Ez58qDnvPgHpRFxP40SrnmXvplRW8VU7x-3NWWIWqTBBthXZwGSXNN_zRJbjByaY5WMaiZ4gXY0dt8lSuHxpB_F1yfBydVAa47vGLQOt9U-O2f9nPaOUEGK0ybnaDBA8SfTLWuxVxm2K8dh4-1hmHawwLsPD4j2ey0zFxO8qDji90'
  }
];

export const tournamentsData: TournamentItem[] = [
  {
    id: 'tour-1',
    dateDay: '18',
    dateMonth: 'Mei',
    isLive: true,
    type: 'NK Senioren',
    category: 'Floret & Degen',
    title: 'Nederlandse Kampioenschappen Schermen 2026',
    location: 'Amsterdam, Sporthallen Zuid',
    time: '09:00 - 18:30',
    actionLabel: 'Live Scores',
    actionUrl: '#live'
  },
  {
    id: 'tour-2',
    dateDay: '15',
    dateMonth: 'Jun',
    isLive: false,
    type: 'Nationaal',
    category: 'Degen',
    title: 'Nederlandse Kampioenschappen Degen 2026',
    location: 'Schermcentrum Amsterdam',
    time: '09:00 - 18:00',
    actionLabel: 'Details',
    actionUrl: '#details'
  },
  {
    id: 'tour-3',
    dateDay: '22',
    dateMonth: 'Jun',
    isLive: false,
    type: 'Internationaal',
    category: 'Foil (FIE World Cup)',
    title: 'FIE World Cup Paris (Foil)',
    location: 'Parijs, Frankrijk • Stade Pierre de Coubertin',
    time: 'Senior Men & Women',
    actionLabel: 'Tickets',
    actionUrl: '#tickets'
  },
  {
    id: 'tour-4',
    dateDay: '05',
    dateMonth: 'Jul',
    isLive: false,
    type: 'Nationaal',
    category: 'Jeugd Toernooi',
    title: 'Jeugd Toernooi \'Zwaard van Arnhem\'',
    location: 'Arnhem, Sportcentrum De Valk',
    time: 'U12, U14, U17 Categorieën',
    actionLabel: 'Inschrijven',
    actionUrl: '#inschrijven'
  },
  {
    id: 'tour-5',
    dateDay: '18',
    dateMonth: 'Sep',
    isLive: false,
    type: 'Regionaal',
    category: 'Sabel',
    title: 'Groningen Sabre Open 2026',
    location: 'Groningen, Willem-Alexander Sportcentrum',
    time: 'Alle Leeftijden • Individueel & Teams',
    actionLabel: 'Inschrijven',
    actionUrl: '#inschrijven'
  }
];

export const clubsData: ClubItem[] = [
  {
    id: 'club-1',
    name: 'Schermcentrum Amsterdam',
    distance: '2.4 KM',
    address: 'Jan van Galenstraat 31, 1051 KM Amsterdam',
    phone: '020 123 4567',
    email: 'info@sca-schermen.nl',
    website: 'https://www.schermcentrumamsterdam.nl',
    weapons: ['Floret', 'Degen', 'Sabel'],
    trainingDays: ['Ma', 'Di', 'Wo', 'Do', 'Vr'],
    lat: 41, // Custom coordinates relative to the map box
    lng: 44,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXJaNYRUzg6NLxUD_BCM9WdseaXixphbekiuN5zug_mIUudLyYu_irrpNfioC7CRi_UKJaperpKYwpnNALwdt4ulnlqPjfdSUtDAWc3BAqfh5O_WUhtcfaE3ZfMRW9FUYTkHYz_yIeLD6vxaoVL7IJ7IbU8oCqNiu2i9PIQI6cvki6b8tXE2X2OVP_9A_EVYNZkFOE83a3bt8VGz3t4wN15lP-z0hWsh3lZLVloTRQtu2FQZ8r5OBQ75JEgpyDV8EoLhE8fT1T8fQ',
    trainingHours: [
      { day: 'Maandag', hours: '18:00 - 21:30' },
      { day: 'Dinsdag', hours: '17:00 - 21:00' },
      { day: 'Donderdag', hours: '19:00 - 22:00' }
    ]
  },
  {
    id: 'club-2',
    name: 'S.V. Pallós',
    distance: '4.1 KM',
    address: 'Science Park 306, 1098 XH Amsterdam',
    phone: '020 987 6543',
    email: 'info@sv-pallos.nl',
    website: 'https://www.sv-pallos.nl',
    weapons: ['Degen', 'Sabel'],
    trainingDays: ['Di', 'Do'],
    lat: 56,
    lng: 54,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHqINStzaN5MJKxAWcslaSPaaxVrdhCwalckOeZ9nCacLDB_19_I1ySSD0ZAu5CgyhYQPRk_2LCiRvk4NdSAOHJEEo1cct21Ez58qDnvPgHpRFxP40SrnmXvplRW8VU7x-3NWWIWqTBBthXZwGSXNN_zRJbjByaY5WMaiZ4gXY0dt8lSuHxpB_F1yfBydVAa47vGLQOt9U-O2f9nPaOUEGK0ybnaDBA8SfTLWuxVxm2K8dh4-1hmHawwLsPD4j2ey0zFxO8qDji90',
    trainingHours: [
      { day: 'Dinsdag', hours: '19:00 - 22:00' },
      { day: 'Donderdag', hours: '19:00 - 22:00' }
    ]
  },
  {
    id: 'club-3',
    name: 'Ter Weer',
    distance: '12.8 KM',
    address: 'Badhoevedorp & Amsterdam West, 1171 AT Badhoevedorp',
    phone: '020 444 3322',
    email: 'contact@terweer.nl',
    website: 'https://www.terweer.nl',
    weapons: ['Floret', 'Degen'],
    trainingDays: ['Wo', 'Za'],
    lat: 61,
    lng: 39,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEvM6hiKe2cPK7m2ZpLHzwBo_O-UYRPZv6QMMCOuYJZY5ZgSifEWi_w20p5q7fJJrUdSQd-JV0EWFSi2JfVxlKS-zAiCb3QtKRY76QSv-2lnZjmAOjEUVhctfK1Aik4du5Uer6NidNxIEnMpPiL7yX3mw3rdG-esW3ODfLeWuUOQKGCN_GV8pWF9FoSXIXFEkwXynDNzxJAx4UTcpQLaZ5Qa8J1txIPb0jVVY6FiPpCdQ0k8j1jhv6KFG5mbqs31mOYaf2YxqugGA',
    trainingHours: [
      { day: 'Woensdag', hours: '18:00 - 21:00' },
      { day: 'Zaterdag', hours: '10:00 - 13:00' }
    ]
  },
  {
    id: 'club-4',
    name: 'HollandSchermen',
    distance: '15.2 KM',
    address: 'Sportpark De Beurs, 1827 LX Alkmaar',
    phone: '072 555 1122',
    email: 'info@hollandschermen.nl',
    website: 'https://www.hollandschermen.nl',
    weapons: ['Floret'],
    trainingDays: ['Ma', 'Di', 'Do', 'Vr'],
    lat: 34,
    lng: 29,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0q_R3p6iOGLKOtF5EaQpdUudaPYm_JxGFn5Vp4lmejd1E4s4yXF4AIwX69iGzYxn4Qm3lSTj8Y4gSZ_uDXiwwKORdY5VwPjC3uTwREY3fA-ni27XLxXQTFXJSBNW9Th3YrVhoXtfPwrfmdHCCcfzEUhF9jsl8aqq0n8EAKS4pJ_xKD3W3hhzV9ZNm0PbfehSmfWXni5Z1S6WPO1UPuIrY4jUSxsdtKVhsMPviDjJc4I8NsHv__czFtfoB1BGD7rMNXfI6JrgkmL0',
    trainingHours: [
      { day: 'Maandag', hours: '17:30 - 20:00' },
      { day: 'Dinsdag', hours: '18:00 - 21:00' },
      { day: 'Donderdag', hours: '18:00 - 21:00' }
    ]
  },
  {
    id: 'club-5',
    name: 'Schermclub Utrecht',
    distance: '34.5 KM',
    address: 'Utrechtseweg 104, 3512 KT Utrecht',
    phone: '030 111 2222',
    email: 'info@schermclubutrecht.nl',
    website: 'https://www.schermclubutrecht.nl',
    weapons: ['Floret', 'Degen', 'Sabel'],
    trainingDays: ['Wo', 'Vr'],
    lat: 68,
    lng: 65,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7J6zvMOVZHw49b4hL61xMOUeGfHN-MyTgyHc-q5ybKZwAXXEqwjTY1vz1ezdTZPQIQtlpMaUvkwoUwQ53cTdx6Mzb-eNWMTcdGOunQyGSzBdnvHDwQ6FEqBdHKpTQpAPiruX8eerWq_yifFqNlB4VrVrz6G_Apn_To8tgTXXWsFU79tWKp3OShif0V6HQ1G8d6WGjS8qvxfqCXvtnl8lhC6bX0YsqAvlPto7TN8tzwQAgzvIW-XwqVWQeOo1YzlD4AWs8L8NyYL4',
    trainingHours: [
      { day: 'Woensdag', hours: '18:30 - 21:30' },
      { day: 'Vrijdag', hours: '19:00 - 22:00' }
    ]
  }
];

export const rankingsData: RankingItem[] = [
  // Degen
  { rank: 1, name: 'Bas Verwijlen', weapon: 'Degen', category: 'Senioren', points: 4520 },
  { rank: 2, name: 'Tristan Tulen', weapon: 'Degen', category: 'Senioren', points: 4105 },
  { rank: 3, name: 'David van Nunen', weapon: 'Degen', category: 'Senioren', points: 3890 },
  { rank: 4, name: 'Rafael Tulen', weapon: 'Degen', category: 'Senioren', points: 3410 },
  { rank: 5, name: 'Randy Postma', weapon: 'Degen', category: 'Senioren', points: 3120 },
  
  // Floret
  { rank: 1, name: 'Daniel Giacon', weapon: 'Floret', category: 'Senioren', points: 4230 },
  { rank: 2, name: 'Teun Jans-Köhneke', weapon: 'Floret', category: 'Senioren', points: 3910 },
  { rank: 3, name: 'Job de Ruiter', weapon: 'Floret', category: 'Senioren', points: 3650 },
  { rank: 4, name: 'Edo Zoons', weapon: 'Floret', category: 'Senioren', points: 3100 },
  { rank: 5, name: 'Paul Stockmann', weapon: 'Floret', category: 'Senioren', points: 2890 },

  // Sabel
  { rank: 1, name: 'Sergej Lychagin', weapon: 'Sabel', category: 'Senioren', points: 4110 },
  { rank: 2, name: 'Dirk-Jan Bouwman', weapon: 'Sabel', category: 'Senioren', points: 3740 },
  { rank: 3, name: 'Marijn de Jong', weapon: 'Sabel', category: 'Senioren', points: 3520 },
  { rank: 4, name: 'Bela Roesink', weapon: 'Sabel', category: 'Senioren', points: 3080 },
  { rank: 5, name: 'Nico Speelman', weapon: 'Sabel', category: 'Senioren', points: 2750 }
];
