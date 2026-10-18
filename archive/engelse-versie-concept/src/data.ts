import { WeaponItem, FAQItem, NewsItem, TournamentItem, ClubItem, RankingItem } from './types';
import calendarFeed from './generated/nahouw-calendar.json';

export const weaponsData: WeaponItem[] = [
  {
    id: 'floret',
    name: 'Floret',
    description: 'Het floret is een licht steekwapen waarmee je alleen punten scoort met de punt, en alleen op de romp. Bij gelijktijdige treffers bepaalt het \'recht van aanval\': degene die het initiatief nam, krijgt het punt. Daardoor draait floret om zuivere techniek en het opbouwen van je aanval.',
    positiveNote: 'Floret beloont precisie en een slim opgebouwd spel. Wie graag nadenkt over timing en initiatief, komt hier helemaal tot zijn recht.',
    beginnerFeel: 'Floret is de klassieke instap: je leert er de kern van goed schermen, van voetenwerk tot het juiste moment van aanvallen.',
    tacticalFocus: 'Het recht van aanval traint discipline en overzicht. Je leert je aanval voorbereiden in plaats van er zomaar op los te gaan.',
    image: 'images/fencing/fencing-08.jpg',
    target: 'Alleen de romp (met elektrisch vest)',
    type: 'Steekwapen',
    tags: ['Technisch', 'Precisie', 'Prioriteit']
  },
  {
    id: 'degen',
    name: 'Degen',
    description: 'De degen is het zwaarste van de drie wapens en heeft het hele lichaam als trefvlak, van masker tot voet. Er is geen recht van aanval: wie als eerste raakt, scoort. Raken beide schermers vrijwel tegelijk, dan krijgen ze allebei een punt.',
    positiveNote: 'Degen voelt eerlijk en direct: elk raak punt telt, ongeacht wie begon. Dat maakt het geduldige, tactische spel juist zo bevredigend.',
    beginnerFeel: 'Doordat alles telt en er geen voorrangsregel is, snap je de regels meteen en kun je vanaf het begin je eigen plan volgen.',
    tacticalFocus: 'Degen draait om afstand, geduld en het uitlokken van fouten. Eén goed getimede counter kan een heel punt beslissen.',
    image: 'images/fencing/fencing-07.jpg',
    target: 'Het gehele lichaam (inclusief masker en voeten)',
    type: 'Steekwapen',
    tags: ['Vrij trefvlak', 'Duels', 'Geen prioriteit']
  },
  {
    id: 'sabel',
    name: 'Sabel',
    description: 'De sabel is het snelste wapen: je scoort niet alleen met de punt, maar ook met de snijkant van de kling. Het trefvlak is alles boven de gordel, inclusief armen en hoofd. Net als bij floret geldt het recht van aanval, maar dan in razend tempo.',
    positiveNote: 'Sabel is explosief en spectaculair. Wie houdt van tempo, durf en snelle beslissingen, voelt zich hier meteen thuis.',
    beginnerFeel: 'De actie is direct zichtbaar en aanstekelijk: aanvallen, pareren en overnemen volgen elkaar in hoog tempo op.',
    tacticalFocus: 'Sabel vraagt om lef en scherpe keuzes. Initiatief nemen en het juiste moment kiezen is vaak het verschil tussen winst en verlies.',
    image: 'images/fencing/fencing-05.jpg',
    target: 'Alles boven de gordel (romp, armen, hoofd/masker)',
    type: 'Slag- en steekwapen',
    tags: ['Snelheid', 'Agressie', 'Tactiek']
  }
];

export const weaponsDataEn: WeaponItem[] = [
  {
    id: 'floret',
    name: 'Foil',
    description: 'The foil is a light thrusting weapon: you score only with the point, and only on the torso. When both fencers hit at the same time, right of way decides: the fencer who took the initiative wins the point. That makes foil all about clean technique and building up your attack.',
    positiveNote: 'Foil rewards precision and clever, well-constructed play. If you enjoy thinking about timing and initiative, this is where you will really shine.',
    beginnerFeel: 'Foil is the classic starting point: it teaches you the essentials of good fencing, from footwork to choosing the right moment to attack.',
    tacticalFocus: 'Right of way builds discipline and awareness. You learn to prepare your attack rather than simply charging in.',
    image: 'images/fencing/fencing-08.jpg',
    target: 'Torso only (wearing a lamé, the electric jacket)',
    type: 'Thrusting weapon',
    tags: ['Technical', 'Precision', 'Right of way']
  },
  {
    id: 'degen',
    name: 'Épée',
    description: 'The épée is the heaviest of the three weapons, and the whole body is valid target, from mask to foot. There is no right of way: whoever hits first scores. If both fencers hit at virtually the same moment, they each receive a point.',
    positiveNote: 'Épée feels fair and direct: every hit counts, no matter who started. That is exactly what makes the patient, tactical game so satisfying.',
    beginnerFeel: 'Because every hit counts and there is no priority rule, the rules make sense straight away and you can follow your own game plan from the start.',
    tacticalFocus: 'Épée is all about distance, patience and drawing your opponent into mistakes. A single well-timed counter-attack can decide a whole point.',
    image: 'images/fencing/fencing-07.jpg',
    target: 'The whole body (including mask and feet)',
    type: 'Thrusting weapon',
    tags: ['Whole-body target', 'Duels', 'No right of way']
  },
  {
    id: 'sabel',
    name: 'Sabre',
    description: 'The sabre is the fastest weapon: you score not only with the point but also with the cutting edge of the blade. The target is everything above the waist, including the arms and head. As in foil, right of way applies, but at breakneck speed.',
    positiveNote: 'Sabre is explosive and spectacular. If you love speed, daring and split-second decisions, you will feel at home straight away.',
    beginnerFeel: 'The action is immediately visible and infectious: attacks, parries and ripostes follow one another at high speed.',
    tacticalFocus: 'Sabre calls for nerve and sharp decision-making. Taking the initiative and picking the right moment is often the difference between winning and losing.',
    image: 'images/fencing/fencing-05.jpg',
    target: 'Everything above the waist (torso, arms, head/mask)',
    type: 'Cutting and thrusting weapon',
    tags: ['Speed', 'Aggression', 'Tactics']
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
    answer: 'Schermen is een veilige sport wanneer je traint met goedgekeurd materiaal en de aanwijzingen van de trainer volgt. Masker, vest, handschoen en wapen beschermen je tijdens de training; clubs werken met duidelijke veiligheidsregels en leren je stap voor stap hoe je veilig beweegt, aanvalt en verdedigt.'
  },
  {
    id: 'faq-4',
    question: 'Hoe vind ik een club in de buurt?',
    answer: 'Nederland heeft een breed netwerk van actieve schermverenigingen verspreid van Groningen tot Maastricht. Je kunt eenvoudig onze interactieve \'Vind een club\' zoekfunctie gebruiken bovenaan de pagina. Vul je postcode of stad in en ontdek direct de trainingslocaties, wapens en contactgegevens van de dichtstbijzijnde club.'
  },
  {
    id: 'faq-5',
    question: 'Wat zijn de kosten voor lidmaatschap en uitrusting?',
    answer: 'De contributie verschilt per club en hangt meestal af van je leeftijd en het aantal trainingen per week. Daarnaast betaal je via je club een bondsbijdrage aan de KNAS. Voor beginners is leenmateriaal vaak beschikbaar. Als je later eigen uitrusting wilt kopen, kun je dat stap voor stap doen; tweedehands materiaal is ook een optie.'
  }
];

export const faqDataEn: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do I need to buy my own equipment straight away?',
    answer: 'No. Almost every club has good loan equipment for beginners. For the first few months you can often use the club’s masks, jackets, gloves and weapons free of charge or for a small fee. Only once you decide to stick with the sport do you need to start building up your own kit, one piece at a time.'
  },
  {
    id: 'faq-2',
    question: 'At what age can you start fencing?',
    answer: 'Most children start between the ages of 8 and 10, when their fine motor skills and concentration are developing. Many clubs also run special, playful programmes for younger children from the age of 6 (using plastic or foam weapons). And it is never too late: well into your sixties and beyond, you can easily join a recreational fencing group!'
  },
  {
    id: 'faq-3',
    question: 'Is fencing a dangerous sport?',
    answer: 'Fencing is a safe sport as long as you train with approved equipment and follow your coach’s instructions. Your mask, jacket, glove and weapon protect you during training; clubs work with clear safety rules and teach you step by step how to move, attack and defend safely.'
  },
  {
    id: 'faq-4',
    question: 'How do I find a club near me?',
    answer: 'The Netherlands has a wide network of active fencing clubs, from Groningen to Maastricht. Simply use our interactive ‘Find a club’ search at the top of the page. Enter your postcode or town and instantly see the training venues, weapons and contact details of the nearest club.'
  },
  {
    id: 'faq-5',
    question: 'How much do membership and equipment cost?',
    answer: 'Club membership fees vary from club to club and usually depend on your age and how many times a week you train. On top of that, you pay a federation fee to the KNAS through your club. Loan equipment is often available for beginners. If you later want to buy your own kit, you can do so gradually; second-hand equipment is also an option.'
  }
];

export const newsData: NewsItem[] = [
  {
    id: 'news-4004',
    date: '11 Sep 2026',
    category: 'Media',
    title: 'World Fencing Day 2026: Once a Fencer, Always a Fencer',
    summary: 'Op 12 oktober vieren schermers wereldwijd World Fencing Day, dit jaar met het thema Once a Fencer, Always a Fencer.',
    fullContent: `Of je nu nog elke week op de loper staat of al jaren geen wapen meer hebt vastgehouden: je blijft onderdeel van de schermgemeenschap. Op 12 oktober vieren schermers wereldwijd World Fencing Day, dit jaar met het thema Once a Fencer, Always a Fencer.

Voor iedereen betekent schermen iets anders. Voor de een zijn het de vriendschappen die op de club zijn ontstaan, voor de ander het zelfvertrouwen dat de sport bracht. Weer anderen denken terug aan onvergetelijke wedstrijden of aan de reizen en avonturen die schermen mogelijk maakte.

Meedoen kan eenvoudig: maak een korte video of foto, zet je masker af en vertel in één zin wat schermen jou heeft gegeven dat altijd is gebleven. Deel het op social media en gebruik de hashtags #WorldFencingDay en #OnceAFencerAlwaysAFencer.`,
    image: 'images/fencing/fencing-02.jpg',
  },
  {
    id: 'news-4003',
    date: '06 Sep 2026',
    category: 'Topsport',
    title: 'Uitslagen FIE, EFC en IWAS - 5 en 6 september 2026',
    summary: 'Overzicht van de internationale resultaten van Nederlandse schermers in het weekend van 5 en 6 september 2026.',
    fullContent: `In het weekend van 5 en 6 september 2026 kwamen Nederlandse schermers in actie op internationale FIE-, EFC- en IWAS-wedstrijden.

Bij de heren degen in Dublin eindigden meerdere Nederlanders in de bovenste regionen van het deelnemersveld, met schermers van onder meer ASV Scaramouche uit Arnhem en Schermclub Den Bosch.

De volledige uitslagen worden door KNAS Internationaal verwerkt en tellen mee voor de nationale en kwalificatieranglijsten.`,
    image: 'images/fencing/fencing-03.jpg',
  },
  {
    id: 'news-4001',
    date: '28 Jul 2026',
    category: 'Topsport',
    title: 'Uitslagen WK Senioren - Hongkong',
    summary: 'De Nederlandse equipe heren degen kwam uit op het WK Senioren in Hongkong, met individuele en teamresultaten.',
    fullContent: `Van 22 tot en met 30 juli 2026 vond in Hongkong het WK Senioren plaats.

Bij de heren degen individueel was Tristan Tulen de beste Nederlander in een deelnemersveld van 225 schermers. Met de equipe heren degen kwam Nederland eveneens in actie.

De WK-resultaten vormen een belangrijk ijkpunt in de internationale seniorencyclus richting de volgende titeltoernooien.`,
    image: 'images/fencing/fencing-01.jpg',
  },
  {
    id: 'news-4000',
    date: '14 Jul 2026',
    category: 'Veteranen',
    title: 'WK Veteranen 2026 - Tbilisi, Georgië',
    summary: 'De inschrijfprocedure voor het WK Veteranen 2026 in Tbilisi (9 t/m 17 oktober) is gepubliceerd.',
    fullContent: `Het WK Veteranen 2026 wordt van 9 tot en met 17 oktober 2026 gehouden in Tbilisi, Georgië.

De inschrijfprocedure voor het toernooi is gepubliceerd. Veteranenschermers die willen deelnemen, wordt gevraagd de procedure en de bijbehorende termijnen goed door te nemen.

Het WK Veteranen is het jaarlijkse hoogtepunt voor de internationale veteranencategorie.`,
    image: 'images/fencing/fencing-05.jpg',
  },
  {
    id: 'news-3997',
    date: '26 Jun 2026',
    category: 'Wedstrijden',
    title: 'NK Equipe: houd rekening met de warmte dit weekend',
    summary: 'Belangrijke veiligheidsupdate voor deelnemers, officials en publiek rond het NK Equipe in Leeuwarden, met nadruk op hittemaatregelen en eigen voorbereiding.',
    fullContent: `Komend weekend vindt in Leeuwarden het NK Equipe Schermen plaats in Sporthal Kalverdijkje. Vanwege de aanhoudend hoge temperaturen vraagt de organisatie iedereen om goed voorbereid te zijn op warmte.

  De wedstrijdleiding volgt de situatie doorlopend op temperatuur en luchtvochtigheid. Wanneer het niet langer verantwoord is om door te schermen, kan het programma tijdelijk worden stilgelegd of volledig worden gestopt.

  Maatregelen op locatie: extra ventilatie waar mogelijk, alertheid van EHBO en scheidsrechters op signalen van hittestress, en directe onderbreking bij twijfel over gezondheid.

  Advies aan deelnemers: voldoende drinken, tussendoor afkoelen, schermkleding uit tijdens rust, handdoek meenemen en klachten direct melden bij scheidsrechter, EHBO of wedstrijdleiding.

  Voor scheidsrechters geldt dat luchtigere kleding is toegestaan, mits representatief. Doel is een veilig en sportief kampioenschapsweekend voor iedereen.`,
    image: 'images/fencing/fencing-04.jpg',
    sourceUrl: 'https://www.knas.nl/node/3997'
  },
  {
    id: 'news-3996',
    date: '24 Jun 2026',
    category: 'Veteranen',
    title: 'Veteranen clinicdag 6 september 2026',
    summary: 'De KNAS Veteranen Commissie organiseert opnieuw een clinicdag in Amstelveen met techniek, tactiek, individuele begeleiding en gezamenlijke afsluiting.',
    fullContent: `De KNAS Veteranen Commissie organiseert op 6 september 2026 opnieuw een clinicdag voor veteranenschermers in het VU Sportcentrum in Amstelveen.

  De dag is bedoeld voor schermers vanaf 40 jaar en richt zich op techniek, tactiek, bewegen, gezondheid en plezier in het schermen. Er is ruimte voor workshops, individuele lessen en oefenpartijen.

  Programma in hoofdlijnen: ontvangst, warming-up, trainingsblokken in de ochtend en middag, lunchpauze en afsluiting met een sociale borrel.

  Kosten bedragen 40 euro per persoon. Inschrijving gebeurt op volgorde van aanmelding. Deelnemers moeten beschikken over correcte schermuitrusting volgens KNAS/FIE-eisen en lid zijn van een erkende schermbond.

  Doel van de clinicdag is een laagdrempelige, sportieve dag met kwaliteit en ontmoeting voor de veteranencategorie.`,
    image: 'images/fencing/fencing-05.jpg',
    sourceUrl: 'https://www.knas.nl/node/3996'
  },
  {
    id: 'news-3995',
    date: '23 Jun 2026',
    category: 'Verenigingen',
    title: 'Zomerschermen bij SCA in juli en augustus 2026',
    summary: 'SchermCentrum Amsterdam biedt zomertrainingen aan voor jeugd en volwassenen, met open instroom voor schermers die in de zomer willen doortrainen.',
    fullContent: `SchermCentrum Amsterdam blijft in juli en augustus open voor zomerschermen en nodigt schermers uit heel Nederland uit om mee te trainen.

  Er zijn aparte trainingsblokken voor jeugd en volwassenen, met verschillende momenten voor floret, degen en sabel. Het initiatief is bedoeld om ook tijdens de zomerperiode door te kunnen trainen en sparren met schermers van andere verenigingen.

  Voor deelname wordt verwacht dat schermers zelfstandig kunnen schermen en beschikken over eigen elektrisch materiaal. Individuele lessen met trainers vallen buiten dit zomerprogramma.

  Deelnamekosten zijn 30 euro per kalendermaand. Aanmelden kan via de trainingscontacten van de vereniging.

  De locatie is het Frans Otten Stadion in Amsterdam.`,
    image: 'images/fencing/fencing-06.jpg',
    sourceUrl: 'https://www.knas.nl/node/3995'
  },
  {
    id: 'news-3994',
    date: '22 Jun 2026',
    category: 'Bond',
    title: 'Ruim EUR55.486,- namens de Nederlandse Loterij voor de KNAS!',
    summary: 'Tijdens het NK Senioren ontving de KNAS een afdracht uit 2025 die wordt ingezet voor infrastructuur, verenigingsondersteuning en opleidingen.',
    fullContent: `Tijdens het NK Senioren in Almere ontving de KNAS een cheque van ruim EUR55.486 namens de Nederlandse Loterij.

  De bond geeft aan dat deze bijdrage wordt gebruikt voor versterking van de sportinfrastructuur, ondersteuning van verenigingen en ontwikkeling van trainers en scheidsrechters.

  De bijdrage past binnen de bredere afdracht van de Nederlandse Loterij aan NOC*NSF en aangesloten sportbonden, met als doel sportdeelname en sportontwikkeling in Nederland te versterken.

  De KNAS spreekt waardering uit voor deze ondersteuning en ziet de bijdrage als een belangrijke impuls voor de verdere groei en professionalisering van de schermsport.`,
    image: 'images/fencing/fencing-07.jpg',
    sourceUrl: 'https://www.knas.nl/node/3994'
  },
  {
    id: 'news-3993',
    date: '22 Jun 2026',
    category: 'Jeugd',
    title: 'Medaillespiegel NJK 2026',
    summary: 'Publicatie van de medaillespiegel van het Nederlands Jeugdkampioenschap 2026, met overzicht van de prestaties per vereniging.',
    fullContent: `De medaillespiegel van het NJK 2026 is gepubliceerd. Het overzicht laat per vereniging en categorie zien welke resultaten tijdens het Nederlands Jeugdkampioenschap zijn behaald.

  Met deze publicatie maakt de KNAS de prestaties van jeugdschermers en verenigingen transparant en vergelijkbaar binnen het nationale jeugdcircuit.

  De medaillespiegel vormt samen met de uitslagen en klassementen een belangrijk instrument voor evaluatie van prestaties en ontwikkeling in het jeugdschermen.`,
    image: 'images/fencing/fencing-08.jpg',
    sourceUrl: 'https://www.knas.nl/node/3993'
  },
  {
    id: 'news-3992',
    date: '22 Jun 2026',
    category: 'Jeugd',
    title: 'Klassement Verenigingsbeker 2026',
    summary: 'Het bijgewerkte klassement van de Verenigingsbeker 2026 is gepubliceerd met de actuele tussenstand op basis van jeugdresultaten.',
    fullContent: `Het actuele klassement van de Verenigingsbeker 2026 is gepubliceerd.

  Dit klassement bundelt de prestaties van verenigingen over de relevante jeugdwedstrijden en maakt zichtbaar hoe clubs zich gedurende het seizoen ontwikkelen.

  De tussenstand helpt verenigingen, coaches en sporters om de sportieve voortgang te volgen richting de afronding van het seizoen.`,
    image: 'images/fencing/fencing-09.jpg',
    sourceUrl: 'https://www.knas.nl/node/3992'
  },
  {
    id: 'news-3991',
    date: '22 Jun 2026',
    category: 'Wedstrijden',
    title: 'Deelnemers NK equipe 2026',
    summary: 'Definitieve deelnemerslijst voor het NK Equipe 2026 in Leeuwarden, inclusief teams per wapen en aanvullende wedstrijdinformatie.',
    fullContent: `De definitieve deelnemerslijst voor het NK Equipe 2026 in Leeuwarden is gepubliceerd.

  In de lijst staan de aangemelde teams per wapen en categorie, waaronder heren en dames degen, floret en sabel.

  Aanvangstijden en eventuele aanvullende wedstrijdinformatie worden via de convocatie en wedstrijdkanalen geactualiseerd.

  Deze publicatie geeft verenigingen en schermers tijdig duidelijkheid over deelname en voorbereiding op het kampioenschap.`,
    image: 'images/fencing/fencing-10.jpg',
    sourceUrl: 'https://www.knas.nl/node/3991'
  },
  {
    id: 'news-3990',
    date: '19 Jun 2026',
    category: 'NJK',
    title: 'NJK - Volg het live via Fencing Time Live',
    summary: 'Praktische update voor het NJK met verwijzing naar live resultaten, zodat deelnemers en supporters het toernooi realtime kunnen volgen.',
    fullContent: `Voor het NJK is een live-volgroute gedeeld via Fencing Time Live.

  Daarmee kunnen schermers, coaches, ouders en supporters de voortgang van poules, eliminaties en uitslagen realtime volgen, zowel op locatie als op afstand.

  De KNAS benadrukt dat dit de meest directe manier is om tijdens het toernooi op de hoogte te blijven van actuele resultaten en planning.`,
    image: 'images/fencing/fencing-03.jpg',
    sourceUrl: 'https://www.knas.nl/node/3990'
  },
  {
    id: 'news-3989',
    date: '18 Jun 2026',
    category: 'Veilige sport',
    title: 'Het wordt warm in Roermond: dit moet je weten voor het NJK',
    summary: 'Vooruitblik op warme omstandigheden tijdens het NJK met maatregelen vanuit organisatie en praktische adviezen voor schermers en begeleiders.',
    fullContent: `Voor het NJK in Roermond is een hittewaarschuwing gedeeld met deelnemers, ouders, coaches, scheidsrechters en officials.

  De organisatie monitort temperatuur en luchtvochtigheid en kan wedstrijden pauzeren of stopzetten als omstandigheden daarom vragen.

  Aanbevelingen zijn onder meer: vooraf en tijdens de dag goed hydrateren, actief afkoelen in rustmomenten, een handdoek meenemen en klachten direct melden.

  Ook voor scheidsrechters is een aangepaste kledinglijn toegestaan binnen representatieve kaders.

  Kernboodschap: samen zorgen voor een veilig, sportief en verantwoord kampioenschapsweekend.`,
    image: 'images/fencing/fencing-02.jpg',
    sourceUrl: 'https://www.knas.nl/node/3989'
  },
  {
    id: 'news-3988',
    date: '17 Jun 2026',
    category: 'NK Senioren',
    title: 'Uitslagen Nederlandse Kampioenschappen Senioren 2026',
    summary: 'Overzicht van de Nederlandse kampioenen per wapen en samenvatting van het NK Senioren 2026 in Almere.',
    fullContent: `Tijdens het NK Senioren 2026 in Almere zijn de nationale titels verdeeld op degen, floret en sabel.

Het toernooi bracht de nationale top samen voor twee competitiedagen met een groot deelnemersveld.

In het bericht staan de kampioenen per wapen en categorie, plus een terugblik op het verloop van het kampioenschap.

De KNAS vraagt daarnaast feedback op de gehanteerde wedstrijdformule, mede in relatie tot de internationale kalender.`,
    image: 'images/fencing/fencing-01.jpg',
    sourceUrl: 'https://www.knas.nl/node/3988'
  }
];

type RawNahouwTournament = {
  title: string;
  date: string;
  closingDate?: string;
  city: string;
  weapon: string;
  type: string;
  url: string;
};

const nahouwNl12MonthsRaw: RawNahouwTournament[] = [
  {
    title: 'Veteranen clinicdag 2026',
    date: '2026-09-06',
    city: 'Amstelveen',
    weapon: 'SaFlEp',
    type: 'Int.',
    url: 'https://www.nahouw.net/tournament/trn/ce43c934/veteranen-clinicdag-2026.html'
  },
  {
    title: 'Ferrum Vetus - 4 2026',
    date: '2026-09-13',
    city: 'Wageningen',
    weapon: 'SaFlEp',
    type: 'Int.',
    url: 'https://www.nahouw.net/tournament/trn/400f452c/ferrum-vetus-4-2026.html'
  },
  {
    title: 'Tournoi Satellite',
    date: '2026-09-19',
    city: 'Amsterdam',
    weapon: 'Fl',
    type: 'FIE SA',
    url: 'https://www.nahouw.net/tournament/trn/1742097b/tournoi-satellite.html'
  },
  {
    title: 'SISTA SFZ',
    date: '2026-09-19',
    city: 'Amsterdam',
    weapon: 'SaFl',
    type: 'Int.',
    url: 'https://www.nahouw.net/tournament/trn/1452aed6/sista-sfz.html'
  },
  {
    title: 'Koning Willem II toernooi',
    date: '2026-09-20',
    city: 'Tilburg',
    weapon: 'Ep',
    type: 'Int.',
    url: 'https://www.nahouw.net/tournament/trn/11e2d02f/koning-willem-ii-toernooi.html'
  },
  {
    title: 'ESTEC Invitatietoernooi',
    date: '2026-11-28',
    city: 'Noordwijk',
    weapon: 'SaFlEp',
    type: 'Int.',
    url: 'https://www.nahouw.net/tournament/trn/cf4a7c09/estec-invitatietoernooi.html'
  },
  {
    title: 'Keizer Kareltoernooi 2027',
    date: '2027-03-07',
    city: 'Nijmegen',
    weapon: 'SaFlEp',
    type: 'Int.',
    url: 'https://www.nahouw.net/tournament/trn/b391657/keizer-kareltoernooi-2027.html'
  },
  {
    title: '20e Internationaal Rijnland Toernooi',
    date: '2027-03-21',
    city: 'Sassenheim',
    weapon: 'FlEp',
    type: 'Int.',
    url: 'https://www.nahouw.net/tournament/trn/926ebead/20e-internationaal-rijnland-toernooi.html'
  },
  {
    title: '32e DOM-Toernooi equipe',
    date: '2027-04-03',
    city: 'Utrecht',
    weapon: 'SaFlEp',
    type: 'Int.',
    url: 'https://www.nahouw.net/tournament/trn/b0abb1d1/32e-dom-toernooi-equipe.html'
  },
  {
    title: '32e DOM-Toernooi individueel',
    date: '2027-04-04',
    city: 'Utrecht',
    weapon: 'SaFlEp',
    type: 'Int.',
    url: 'https://www.nahouw.net/tournament/trn/6c2387d0/32e-dom-toernooi-individueel.html'
  },
  {
    title: '9e Schermtoernooi Ludus et Gladius',
    date: '2027-05-22',
    city: 'Alkmaar',
    weapon: 'SaFlEp',
    type: 'Int.',
    url: 'https://www.nahouw.net/tournament/trn/bf3df31b/9e-schermtoernooi-ludus-et-gladius.html'
  }
];

const monthAbbreviations = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

const weaponLabelFromCode = (code: string): string => {
  if (code === 'SaFlEp') return 'Sabel, Floret, Degen';
  if (code === 'SaFl') return 'Sabel, Floret';
  if (code === 'FlEp') return 'Floret, Degen';
  if (code === 'Sa') return 'Sabel';
  if (code === 'Fl') return 'Floret';
  if (code === 'Ep') return 'Degen';
  return code;
};

const typeLabelFromCode = (code: string): string => {
  if (code === 'Nat.') return 'Nationaal';
  if (code === 'Int.') return 'Internationaal';
  if (code === 'Rec.') return 'Recreatief';
  if (code === 'Rec.Int.') return 'Recreatief, internationaal';
  if (code.startsWith('FIE')) return 'FIE';
  return code;
};

const syncedCalendar = calendarFeed as { syncedAt?: string; items: RawNahouwTournament[] };

/** Moment waarop de kalender voor het laatst van Nahouw is opgehaald; leeg = oude vaste lijst. */
export const calendarSyncedAt: string | undefined = syncedCalendar.items.length ? syncedCalendar.syncedAt : undefined;

const asDate = (isoDate: string): Date => new Date(`${isoDate}T12:00:00`);

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const twelveMonthsAhead = new Date(startOfToday);
twelveMonthsAhead.setFullYear(twelveMonthsAhead.getFullYear() + 1);
twelveMonthsAhead.setHours(23, 59, 59, 999);

const calendarSource = syncedCalendar.items.length ? syncedCalendar.items : nahouwNl12MonthsRaw;

const upcomingWithin12MonthsRaw = calendarSource.filter((item) => {
  const date = asDate(item.date);
  return date >= startOfToday && date <= twelveMonthsAhead;
});

const tournamentsSource = upcomingWithin12MonthsRaw;

export const tournamentsData: TournamentItem[] = tournamentsSource
  .slice()
  .sort((a, b) => asDate(a.date).getTime() - asDate(b.date).getTime())
  .map((item, index) => {
    const date = asDate(item.date);

    return {
      id: `tour-${index + 1}`,
      dateISO: item.date,
      closingDateISO: item.closingDate,
      dateDay: `${date.getDate()}`.padStart(2, '0'),
      dateMonth: monthAbbreviations[date.getMonth()],
      type: typeLabelFromCode(item.type),
      typeCode: item.type,
      category: weaponLabelFromCode(item.weapon),
      weaponCode: item.weapon,
      title: item.title,
      city: item.city,
      location: `${item.city}, Nederland`,
      time: 'Nahouw kalender',
      actionLabel: 'Bekijk wedstrijdgegevens',
      actionUrl: item.url
    };
  });

export const clubsData: ClubItem[] = [
  {
    id: 'club-1',
    name: 'Schermcentrum Amsterdam',
    distance: '2.4 KM',
    address: 'Jan van Galenstraat 31, 1051 KM Amsterdam',
    phone: '020 123 4567',
    email: 'info@sca-schermen.nl',
    website: 'https://knas.nl/verenigingen',
    weapons: ['Floret', 'Degen', 'Sabel'],
    trainingDays: ['Ma', 'Di', 'Wo', 'Do', 'Vr'],
    lat: 41, // Custom coordinates relative to the map box
    lng: 44,
    image: 'images/fencing/fencing-07.jpg',
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
    website: 'https://knas.nl/verenigingen',
    weapons: ['Degen', 'Sabel'],
    trainingDays: ['Di', 'Do'],
    lat: 56,
    lng: 54,
    image: 'images/fencing/fencing-08.jpg',
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
    website: 'https://knas.nl/verenigingen',
    weapons: ['Floret', 'Degen'],
    trainingDays: ['Wo', 'Za'],
    lat: 61,
    lng: 39,
    image: 'images/fencing/fencing-09.jpg',
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
    website: 'https://knas.nl/verenigingen',
    weapons: ['Floret'],
    trainingDays: ['Ma', 'Di', 'Do', 'Vr'],
    lat: 34,
    lng: 29,
    image: 'images/fencing/fencing-10.jpg',
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
    website: 'https://knas.nl/verenigingen',
    weapons: ['Floret', 'Degen', 'Sabel'],
    trainingDays: ['Wo', 'Vr'],
    lat: 68,
    lng: 65,
    image: 'images/fencing/fencing-02.jpg',
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
