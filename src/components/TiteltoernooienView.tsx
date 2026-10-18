import { Award, Check, FileText, ListChecks, Target, UserCheck, Users } from 'lucide-react';
import { Accordion, Breadcrumb, DataTable, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const handbook = 'docs/topsport/extract-handboek-schermer-selectie-eisen.pdf';

const tournaments = [
  { id: 'ejk', toernooi: 'EK cadetten en junioren', datum: '7\u201314 februari 2027', plaats: 'Rome, Itali\u00eb' },
  { id: 'wjk', toernooi: 'WK cadetten en junioren', datum: '9\u201317 april 2027', plaats: 'Tallinn, Estland' },
  { id: 'eku23', toernooi: 'EK U23', datum: '28 april\u20131 mei 2027', plaats: 'Podgorica, Montenegro' },
  { id: 'ekvet', toernooi: 'EK veteranen individueel', datum: '6\u20139 mei 2027', plaats: 'Skopje, Noord-Macedoni\u00eb' },
  { id: 'ek', toernooi: 'EK senioren', datum: '29 mei\u20139 juni 2027', plaats: 'Istanbul, Turkije' },
  { id: 'wk', toernooi: 'WK senioren', datum: '20\u201328 juli 2027', plaats: 'Tasjkent, Oezbekistan' },
  { id: 'uni', toernooi: 'Universiade', datum: '1\u201312 augustus 2027', plaats: 'Chungcheong, Zuid-Korea' },
];

const youthRequirements = [
  'Minimaal drie aangewezen kwalificatietoernooien',
  'Een getekende sportersovereenkomst en intakeformulier',
  'De Nederlandse nationaliteit',
];

const u23Routes = [
  ['Senioren wereldbekercircuit', 'Je schermt een volledig seniorenprogramma en bent nog geen 23 jaar.'],
  ['U23-circuit', '1500 punten op de U23-ranglijst en minimaal drie kwalificatietoernooien. Vanaf 1200 punten kan het met een gemotiveerde voordracht van het begeleidingsteam.'],
  ['Junioren wereldbekercircuit', 'Je schermt een volledig juniorenprogramma en hebt 2000 punten op de juniorenranglijst, met minimaal drie kwalificatietoernooien.'],
];

const selectionSteps = [
  ['Voorstel', 'Het begeleidingsteam doet een voorstel.'],
  ['Toetsing', 'De manager topsport en het bestuurslid topsport toetsen het voorstel.'],
  ['Besluit', 'Het bestuur maakt de selectie definitief.'],
  ['Bekendmaking', 'Alle schermers krijgen een e-mail.'],
  ['Inschrijving', 'KNAS Internationaal schrijft de selectie in.'],
];

const timeline = [
  { id: 'ejk', toernooi: 'EK cadetten en junioren', laatste: '20 december', bekend: '5 januari', beroep: '7 januari' },
  { id: 'wjk', toernooi: 'WK cadetten en junioren', laatste: '24 januari*', bekend: '15 februari', beroep: '17 februari' },
  { id: 'eku23', toernooi: 'EK U23', laatste: '7 maart', bekend: '23 maart', beroep: '25 maart' },
];

export default function TiteltoernooienView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-08.jpg" alt="Floretschermers in een partij" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Topsport', href: '/topsport' }, { label: 'Titeltoernooien en selectie' }]} />
          <h1 className="k-page-header__title">Titeltoernooien en selectie</h1>
          <p className="k-lead k-page-header__intro">
            Welke internationale titeltoernooien er in seizoen 2026-2027 zijn, en hoe de KNAS bepaalt wie Nederland vertegenwoordigt. De regels komen uit het Handboek Schermer.
          </p>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'titels-calendar-title', label: 'Kalender' },
          { id: 'titels-youth-title', label: 'Cadetten en junioren' },
          { id: 'titels-u23-title', label: 'U23' },
          { id: 'titels-senior-title', label: 'Senioren' },
          { id: 'titels-other-title', label: 'Overige' },
          { id: 'titels-process-title', label: 'Selectieproces' },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="titels-calendar-title">
        <div className="k-container">
          <h2 id="titels-calendar-title" className="k-block-title">Titeltoernooien 2026-2027</h2>
          <DataTable
            caption="Internationale titeltoernooien in seizoen 2026-2027"
            captionHidden
            rowKey={(row) => row.id}
            rows={tournaments}
            columns={[
              { key: 'toernooi', header: 'Toernooi', primary: true },
              { key: 'datum', header: 'Datum' },
              { key: 'plaats', header: 'Plaats' },
            ]}
          />
          <p className="k-rule-note">In 2027 zijn er geen Jeugd Olympische Spelen, Olympische Spelen of EK veteranen voor teams.</p>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="titels-youth-title">
        <div className="k-container">
          <h2 id="titels-youth-title" className="k-block-title">Cadetten en junioren: EK en WK</h2>
          <p className="k-lead k-onzerelaties-intro">Je wordt geselecteerd op je ontwikkeling en je resultaten op de aangewezen kwalificatietoernooien, niet op een plek op de Nederlandse ranglijst.</p>
          <div className="k-grid k-grid--3">
            <article className="k-intro-point">
              <Target aria-hidden="true" />
              <h3>Het niveau</h3>
              <p>Je hebt een zeer grote kans om door de poule te komen en een reële kans om de eerste eliminatie te winnen. Vooral je niveau in het internationale veld telt.</p>
            </article>
            <article className="k-intro-point">
              <ListChecks aria-hidden="true" />
              <h3>Voorwaarden</h3>
              <ul className="k-check-list">
                {youthRequirements.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
              </ul>
            </article>
            <article className="k-intro-point">
              <Users aria-hidden="true" />
              <h3>Startplaatsen per wapen</h3>
              <p><b>EK:</b> vier cadetten en vier junioren, plus een equipe in beide categorieën.</p>
              <p><b>WK:</b> vier junioren en drie cadetten. Alleen de junioren hebben een equipe.</p>
            </article>
          </div>
          <p className="k-rule-note">Volledige deelname aan het programma geeft geen automatisch recht op selectie, ook niet als er plaatsen over zijn.</p>

          <h3 className="k-rule-subhead k-subblock">Meer weten</h3>
          <Accordion items={[
            { question: 'Welke kwalificatietoernooien tellen?', answer: <><p>Het begeleidingsteam van je wapen wijst ze aan in de <a href="/topsport/talentprogramma">kwalificatiekalender</a>.</p><p><strong>Junioren:</strong> de meeste kwalificatietoernooien zijn Junior World Cups.</p><p><strong>Cadetten:</strong> wil je ook naar het EK of WK voor junioren, dan laat je op een aantal juniorentoernooien zien dat je dat niveau hebt.</p></> },
            { question: 'Wat wordt nog meer meegewogen?', answer: <p>Potentieel, ontwikkeling tijdens het seizoen, gedrag op en rond toernooien, mentale weerbaarheid en coachbaarheid, inzet in het programma, blessures en fitheid, en kwaliteiten in het equipeschermen.</p> },
            { question: 'Hoe werkt de equipe?', answer: <p>Ben je geselecteerd voor de individuele wedstrijd én de equipe, dan is meedoen aan de equipe verplicht; wie weigert, verliest ook de individuele plek. Om een equipe compleet te maken kunnen één of twee extra schermers worden geselecteerd die het programma volgden en minimaal één keer door de voorronde kwamen.</p> },
            { question: 'Kan ik een afwijkend programma volgen?', answer: <p>Ja, in bijzondere gevallen, bijvoorbeeld als je in het buitenland woont, een deel van het seizoen hebt gemist of je voor meerdere categorieën wilt kwalificeren. Sterke cadetten kunnen ook bij de junioren worden aangewezen. Dit spreek je af met het begeleidingsteam en de manager topsport.</p> },
            { question: 'Wat kost het?', answer: <p>Reis, verblijf en inschrijving zijn voor eigen rekening; de KNAS schiet het inschrijfgeld voor en betaalt de aangewezen coach.</p> },
          ]} />
        </div>
      </section>

      <section className="k-section" aria-labelledby="titels-u23-title">
        <div className="k-container">
          <h2 id="titels-u23-title" className="k-block-title">EK U23</h2>
          <p className="k-lead k-onzerelaties-intro">Er zijn drie routes, in deze volgorde van voorrang:</p>
          <ol className="k-steps">
            {u23Routes.map(([title, text], index) => (
              <li key={title} className="k-step">
                <span className="k-step__number" aria-hidden="true">{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
          <p className="k-rule-note">Kosten zijn voor eigen rekening. De KNAS wijst geen coach aan, tenzij het bestuur anders besluit.</p>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="titels-senior-title">
        <div className="k-container">
          <h2 id="titels-senior-title" className="k-block-title">Senioren: EK en WK</h2>
          <p className="k-lead k-onzerelaties-intro">Bij de senioren telt je plek op de Nederlandse seniorenranglijst.</p>
          <div className="k-grid k-grid--3">
            <article className="k-intro-point">
              <Award aria-hidden="true" />
              <h3>Direct geselecteerd</h3>
              <p className="k-intro-point__figure">2500 punten</p>
              <p>Op de seniorenranglijst tot en met 30 april 2027. Zijn het er meer dan vier, dan beslist de wereldranglijst.</p>
            </article>
            <article className="k-intro-point">
              <UserCheck aria-hidden="true" />
              <h3>Met voordracht</h3>
              <p className="k-intro-point__figure">1200 punten</p>
              <p>Plus minimaal twee wereldbekers waarin je door de voorronde kwam, en een voordracht van de manager topsport.</p>
            </article>
            <article className="k-intro-point">
              <Users aria-hidden="true" />
              <h3>Startplaatsen per wapen</h3>
              <p className="k-intro-point__figure">4 + 1 team</p>
              <p>Maximaal vier schermers per wapen in de individuele wedstrijd en één team.</p>
            </article>
          </div>
          <p className="k-rule-note">Het EK valt dit jaar samen met de European Games.</p>

          <h3 className="k-rule-subhead k-subblock">Meer weten</h3>
          <Accordion items={[
            { question: 'Hoe wordt de equipe samengesteld?', answer: <><p>Zijn er plaatsen over, dan kan de manager topsport een schermer met minimaal 1200 punten voordragen voor de equipe. Dat geeft geen recht op de individuele wedstrijd.</p><p>Bij heren degen zitten de beste drie in het team. De vierde wordt gekozen door de manager topsport en het bestuurslid topsport, op basis van trainingsinzet en betrokkenheid.</p></> },
          ]} />
        </div>
      </section>

      <section className="k-section" aria-labelledby="titels-other-title">
        <div className="k-container k-container--narrow">
          <h2 id="titels-other-title" className="k-block-title">Overige titeltoernooien</h2>
          <Accordion items={[
            { question: 'EK voor clubs', answer: <p>Er is geen selectie: de winnaar van het NK Equipe mag, of anders de verliezend finalist. De club meldt zich zelf aan en regelt zo nodig zelf een scheidsrechter.</p> },
            { question: 'EK veteranen', answer: <p>Je hebt 1000 punten nodig (750 in de hoogste leeftijdscategorie), of deelname aan minimaal vijf wedstrijden op de ranglijst met 100 punten.</p> },
            { question: 'Universiade', answer: <p>Voor studenten aan een hbo of universiteit, of wie in 2026 of 2027 is afgestudeerd, geboren tussen 1999 en 2009. Je hebt 2000 punten nodig op de senioren- of juniorenranglijst. Meld je ambitie vóór 1 januari 2027 bij de manager topsport. De kosten zijn voor eigen rekening.</p> },
            { question: 'Olympische Spelen 2028', answer: <p>De kwalificatie start op 1 mei 2027 en volgt de regels van de FIE en NOC*NSF. Het Olympisch kwalificatietoernooi wordt in april 2028 verwacht; NOC*NSF vraagt daarvoor minimaal één top-8 op een World Cup of Grand Prix.</p> },
          ]} />
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="titels-process-title">
        <div className="k-container">
          <h2 id="titels-process-title" className="k-block-title">Zo verloopt de selectie</h2>
          <ol className="k-timeline">
            {selectionSteps.map(([title, text]) => (
              <li key={title} className="k-timeline__item"><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
          <p className="k-rule-note"><strong>Niet eens met de selectie?</strong> Teken binnen twee dagen na de bekendmaking schriftelijk beroep aan bij het bestuurslid topsport.</p>

          <h3 className="k-rule-subhead k-subblock">Belangrijke data 2026-2027</h3>
          <DataTable
            caption="Belangrijke data voor de selectie per titeltoernooi"
            captionHidden
            rowKey={(row) => row.id}
            rows={timeline}
            columns={[
              { key: 'toernooi', header: 'Toernooi', primary: true },
              { key: 'laatste', header: 'Laatste wedstrijddag' },
              { key: 'bekend', header: 'Selectie bekend' },
              { key: 'beroep', header: 'Beroep tot' },
            ]}
          />
          <p className="k-rule-note">* Sabel cadetten: 31 januari.</p>
          <a href={handbook} className="k-inline-link" target="_blank" rel="noopener noreferrer">
            <FileText aria-hidden="true" /> Selectie-eisen in het Handboek Schermer (pdf)
          </a>
        </div>
      </section>
    </div>
  );
}
