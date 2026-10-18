import { Check, FileText, GitBranch, Handshake, MapPin, Sprout } from 'lucide-react';
import { Breadcrumb, Button, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const needs = [
  'Een initiatiefgroep en een bestuur',
  'Een geschikte zaal met vaste trainingstijden',
  'Een gekwalificeerde trainer',
  'Materiaal waarmee beginners kunnen oefenen',
  'Statuten en een ledenadministratie',
  'Aansluiting bij de KNAS',
];

const planSteps = [
  ['Breng de regio in kaart', 'Welke plaatsen, scholen, sportaccommodaties en verenigingen zijn al actief? Kijk ook naar reistijd, mogelijke deelnemers en bestaande sportinitiatieven.'],
  ['Vorm een initiatiefgroep', 'Betrek een trainer, enkele vrijwilligers en een accommodatiepartner. Een bestaande schermvereniging, school of gemeente kan meedenken of meehelpen.'],
  ['Start klein', 'Begin met een kennismakingsreeks, clinics of een vaste trainingsavond. Meet de belangstelling voordat je vaste kosten en verplichtingen aangaat.'],
  ['Regel kwaliteit en veiligheid', 'Zorg voor bevoegde begeleiding, passend materiaal, een veilige sportomgeving, duidelijke afspraken en een haalbare vrijwilligersplanning.'],
  ['Bouw aan continuïteit', 'Maak afspraken over ledenadministratie, contributie, zaalhuur, trainers en materiaal, en over doorgroei naar een zelfstandige vereniging of nevenvestiging.'],
];

const planContents = [
  'De regio en de doelgroep',
  'Het verwachte aantal deelnemers en hoe zij instromen',
  'Locatie, trainingsmomenten en benodigd materiaal',
  'Trainers, begeleiding en vrijwilligers',
  'Een begroting met zaalhuur, materiaal, contributie en promotie',
  'De planning van de eerste kennismaking en het eerste seizoen',
  'Afspraken over evaluatie en doorgroei',
];

const branchModel = [
  'Eén club is de hoofdvestiging en start nevenvestigingen in plaatsen op 15 tot 25 km afstand',
  'Een beginnerscursus start zodra zich ongeveer 10 deelnemers hebben aangemeld',
  'Trainers in opleiding geven les op de nevenvestiging',
  'Een ervaren hoofdtrainer zorgt voor kennis, lesmateriaal, schermmateriaal en promotie',
  'Het plan rekende met groei van 15 naar 25 leden per vestiging in drie jaar',
];

const documents = [
  { title: 'Algemeen Reglement 2025', href: 'docs/policy/algemeen-reglement-2025.pdf' },
];

export default function ClubOprichtenView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-10.jpg" alt="Trainers en een schermer langs de loper tijdens een toernooi" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Voor clubs', href: '/voor-clubs' }, { label: 'Een club oprichten' }]} />
          <h1 className="k-page-header__title">Een club oprichten</h1>
          <p className="k-lead k-page-header__intro">
            Schermen is nog niet overal in Nederland te beoefenen. Wil je schermen naar jouw regio brengen? De KNAS ondersteunt nieuwe verenigingen en nevenvestigingen met advies, en waar mogelijk met organisatorische en financiële hulp.
          </p>
          <div className="k-page-header__actions">
            <Button variant="primary" href="mailto:info@knas.nl?subject=Een%20club%20oprichten">Bespreek je plan</Button>
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'oprichten-routes-title', label: 'Twee manieren' },
          { id: 'oprichten-needs-title', label: 'Wat heb je nodig?' },
          { id: 'wvp-steps-title', label: 'Witte Vlekkenplan' },
          { id: 'wvp-plan-title', label: 'Wat staat in een plan?' },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="oprichten-routes-title">
        <div className="k-container">
          <h2 id="oprichten-routes-title" className="k-block-title">Twee manieren om te beginnen</h2>
          <div className="k-grid k-grid--2">
            <article className="k-intro-point">
              <Sprout aria-hidden="true" />
              <h3>Een nieuwe vereniging</h3>
              <p>Je start een zelfstandige club met een eigen bestuur, leden en trainingsaanbod.</p>
            </article>
            <article className="k-intro-point">
              <GitBranch aria-hidden="true" />
              <h3>Een nevenvestiging</h3>
              <p>Een bestaande club start op een nieuwe locatie. Je bouwt voort op een organisatie, trainers en materiaal die er al zijn.</p>
            </article>
          </div>
          <div className="k-subblock">
            <h3 className="k-rule-subhead">Voorbeeld: een hoofdvestiging met nevenvestigingen</h3>
            <p className="k-onzerelaties-intro">Een club in de regio Zutphen werkte een plan uit om schermen naar omliggende plaatsen te brengen. De opzet:</p>
            <ul className="k-check-list k-check-list--columns">
              {branchModel.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="oprichten-needs-title">
        <div className="k-container k-split">
          <div>
            <h2 id="oprichten-needs-title" className="k-block-title">Wat heb je nodig?</h2>
            <ul className="k-check-list k-check-list--columns">
              {needs.map((need) => <li key={need}><Check aria-hidden="true" /> {need}</li>)}
            </ul>
            <a href="/voor-clubs/trainersopleidingen" className="k-inline-link">Bekijk de trainersopleidingen</a>
          </div>
          <aside className="k-aside-note">
            <MapPin aria-hidden="true" />
            <strong>Wat is een witte vlek?</strong>
            <p>Een regio waar mensen weinig mogelijkheden hebben om te schermen: er is geen club in de buurt, of het bestaande aanbod is te klein om nieuwe groepen te ontvangen.</p>
          </aside>
        </div>
      </section>

      <section className="k-section" aria-labelledby="wvp-steps-title">
        <div className="k-container">
          <p className="k-eyebrow">Witte Vlekkenplan</p>
          <h2 id="wvp-steps-title" className="k-block-title">Van idee naar aanbod</h2>
          <p className="k-lead k-onzerelaties-intro">Het doel is niet alleen een nieuwe club starten, maar een bereikbaar sportaanbod opbouwen dat ook na het eerste seizoen blijft bestaan.</p>
          <ol className="k-timeline">
            {planSteps.map(([title, text]) => (
              <li key={title} className="k-timeline__item"><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="wvp-plan-title">
        <div className="k-container k-split">
          <div>
            <h2 id="wvp-plan-title" className="k-block-title">Wat staat er in een plan?</h2>
            <ul className="k-check-list">
              {planContents.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
            </ul>
          </div>
          <aside className="k-aside-note">
            <Handshake aria-hidden="true" />
            <strong>Samenwerken aan groei</strong>
            <p>Een bestaande club kan een nieuw initiatief ondersteunen met kennis, materiaal, administratie en trainers. De initiatiefgroep hoeft dan niet alles vanaf dag één alleen te dragen.</p>
            <p>Leg vooraf vast wie de zaal regelt, wie de lessen geeft, hoe de ledenadministratie loopt en wanneer je samen evalueert.</p>
          </aside>
        </div>
      </section>

      <section className="k-section" aria-labelledby="wvp-start-title">
        <div className="k-container k-closing-cta">
          <div>
            <h2 id="wvp-start-title">De eerste stap</h2>
            <p>Plan een gesprek met de betrokken club(s), trainer(s) en de locatiepartner. Werk daarna een plan van één pagina uit met doelgroep, aanbod, kosten, verantwoordelijkheden en een startdatum. Wij denken graag mee over de mogelijkheden en de actuele ondersteuning.</p>
          </div>
          <div className="k-closing-cta__actions">
            <Button variant="secondary" href="mailto:info@knas.nl?subject=Witte%20Vlekkenplan">Neem contact op</Button>
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="oprichten-docs-title">
        <div className="k-container k-container--narrow">
          <h2 id="oprichten-docs-title" className="k-block-title">Lees verder</h2>
          <ul className="k-rule-documents">
            {documents.map((doc) => (
              <li key={doc.href}>
                <a href={doc.href} target="_blank" rel="noopener noreferrer">
                  <FileText aria-hidden="true" /><span>{doc.title}</span><span className="k-rule-documents__type">PDF</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
