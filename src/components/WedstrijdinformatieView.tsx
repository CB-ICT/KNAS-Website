import { ArrowRight, Check, FileText, Lightbulb } from 'lucide-react';
import { Breadcrumb, Button, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const fieMaterialRules = 'https://static.fie.org/uploads/40/204156-book%20material%20August%202026%20ang.pdf';

const steps = [
  ['Kies een wedstrijd', 'In de kalender zie je per wedstrijd het wapen, de soort en tot wanneer je kunt inschrijven.'],
  ['Schrijf je op tijd in', 'Open de wedstrijd en volg de inschrijving van de organisator. Na de sluitingsdatum kan het meestal niet meer.'],
  ['Lees de uitnodiging', 'Daarin staan het programma, de categorieën, de aanmeldtijd en de eisen aan je materiaal.'],
  ['Kom op tijd', 'Meld je bij de wedstrijdtafel en laat je materiaal controleren als daarom gevraagd wordt.'],
];

const checklist = [
  'Kleding en bescherming: masker, vest, ondervest, borstplaat, handschoen, schermbroek en kniekousen',
  'Twee werkende wapens en twee fils de corps (lichaamskabels), één in gebruik en één reserve',
  'Floret: een apart masker met geleidende keellap, een lamé (elektrisch vest) en een fil de masque (maskerkabel)',
  'Degen: geen lamé of fil de masque nodig; degen en fil de corps zijn voldoende',
  'Sabel: een lamé, elektrisch masker en manchette (manchet); de fil de masque verbindt het masker',
  'Je schermpaspoort als de wedstrijd daarom vraagt',
  'Water, eten en iets warms voor tussen de partijen',
];

const dayFlow = [
  ['Aankomst en aanmelden', 'Je meldt je bij de wedstrijdtafel, haalt je startnummer op en zoekt je vereniging of kleedruimte op.'],
  ['Materiaalcontrole en warming-up', 'De wedstrijdleiding controleert je wapens en kleding. Daarna heb je tijd om om te kleden, op te warmen en in te schermen.'],
  ['Poules', 'Je schermt in een groep tegen iedereen. Een partij gaat tot 5 treffers of 3 minuten. Na de poules wordt de tussenstand opgemaakt.'],
  ['Directe eliminatie', 'Daarna volgt een afvalschema. Een partij gaat tot 15 treffers, in drie periodes van 3 minuten.'],
  ['Prijsuitreiking en vertrek', 'Na de laatste partijen volgt de prijsuitreiking. De uitslag vind je daarna bij de wedstrijd in de kalender.'],
];

const kinds = [
  {
    title: 'Recreatieve toernooien',
    text: 'Laagdrempelig en ideaal om ervaring op te doen. Voor de jongste jeugd vaak met stickers of medailles.',
  },
  {
    title: 'Jeugdpuntentoernooien',
    text: 'Een reeks jeugdwedstrijden waarmee je punten verzamelt voor een klassement per wapen en leeftijd.',
    link: { label: 'Handleiding jeugdpuntentoernooi (pdf)', href: 'docs/source/handleiding-jeugdpuntentoernooi-2025-2026.pdf', file: true },
  },
  {
    title: 'Nationale en internationale toernooien',
    text: 'Open wedstrijden, waar ook schermers uit het buitenland aan meedoen. Resultaten tellen vaak mee voor de ranglijst.',
    link: { label: 'Bekijk de ranglijsten', href: '/wedstrijden/ranglijsten' },
  },
  {
    title: 'Nederlandse kampioenschappen',
    text: 'Titeltoernooien voor jeugd, senioren en veteranen, met eigen voorwaarden voor deelname.',
    link: { label: 'Bekijk de kampioenschappen', href: '/wedstrijden/nk' },
  },
  {
    title: 'Equipewedstrijden',
    text: 'Teamwedstrijden waarin je met drie schermers en een reserve namens je vereniging uitkomt.',
  },
];

export default function WedstrijdinformatieView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-05.jpg" alt="Sabelschermers in een partij" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wedstrijden', href: '/wedstrijden' }, { label: 'Voorbereiden op een wedstrijd' }]} />
          <h1 className="k-page-header__title">Voorbereiden op een wedstrijd</h1>
          <p className="k-lead k-page-header__intro">Je eerste wedstrijd of je honderdste: zo kom je goed voorbereid op de loper.</p>
          <div className="k-page-header__actions">
            <Button variant="primary" href="/wedstrijden/kalender">Bekijk de wedstrijdkalender</Button>
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'steps-title', label: 'Zo doe je mee' },
          { id: 'checklist-title', label: 'Wat neem je mee?' },
          { id: 'day-title', label: 'Wedstrijddag' },
          { id: 'kinds-title', label: 'Soorten wedstrijden' },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="steps-title">
        <div className="k-container">
          <h2 id="steps-title" className="k-block-title">Zo doe je mee</h2>
          <ol className="k-steps k-steps--four">
            {steps.map(([title, text], index) => (
              <li key={title} className="k-step">
                <span className="k-step__number" aria-hidden="true">{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="checklist-title">
        <div className="k-container k-split">
          <div>
            <h2 id="checklist-title" className="k-block-title">Wat neem je mee?</h2>
            <ul className="k-check-list k-check-list--columns">
              {checklist.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
            </ul>
            <a href={fieMaterialRules} className="k-inline-link" target="_blank" rel="noopener noreferrer">
              <FileText aria-hidden="true" /> Bekijk de FIE-materiaaleisen (pdf)
            </a>
          </div>
          <aside className="k-aside-note">
            <Lightbulb aria-hidden="true" />
            <strong>Tip voor je eerste wedstrijd</strong>
            <p>Vraag je trainer welke wedstrijd bij je niveau past. Een recreatief toernooi of jeugdpuntentoernooi is een goede eerste stap.</p>
          </aside>
        </div>
      </section>

      <section className="k-section" aria-labelledby="day-title">
        <div className="k-container">
          <h2 id="day-title" className="k-block-title">Zo verloopt een wedstrijddag meestal</h2>
          <ol className="k-timeline">
            {dayFlow.map(([title, text]) => (
              <li key={title} className="k-timeline__item"><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
          <p className="k-muted k-timeline__note">Bij de jongste jeugd en bij veteranen kunnen partijduur en wedstrijdvorm afwijken. De uitnodiging van de wedstrijd is altijd leidend.</p>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="kinds-title">
        <div className="k-container">
          <h2 id="kinds-title" className="k-block-title">Welke wedstrijden zijn er?</h2>
          <dl className="k-kind-list">
            {kinds.map((kind) => (
              <div key={kind.title} className="k-kind-list__item">
                <dt>{kind.title}</dt>
                <dd>
                  <p>{kind.text}</p>
                  {kind.link && (
                    <a href={kind.link.href} className="k-inline-link" {...(kind.link.file ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {kind.link.file ? <FileText aria-hidden="true" /> : null}
                      {kind.link.label}
                      {!kind.link.file && <ArrowRight aria-hidden="true" />}
                    </a>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="k-section" aria-labelledby="prep-next-title">
        <div className="k-container k-closing-cta">
          <div>
            <h2 id="prep-next-title">Klaar voor je volgende wedstrijd?</h2>
            <p>Zoek een wedstrijd in de kalender, of lees eerst de belangrijkste regels.</p>
          </div>
          <div className="k-closing-cta__actions">
            <Button variant="primary" href="/wedstrijden/kalender">Bekijk de wedstrijdkalender</Button>
            <Button variant="secondary" href="/wedstrijden/reglementen">Lees het wedstrijdreglement</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
