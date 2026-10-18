import { AlertTriangle, Check, KeyRound } from 'lucide-react';
import { Breadcrumb, Button, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const onzeRelaties = 'https://knas.onzerelaties.net';

const tasks = [
  { title: 'Nieuwe leden', text: 'Na een proefperiode registreert de club het lid bij de bond. Een introductielidmaatschap (€ 6,00, 3 maanden) loopt automatisch af en kan één keer per persoon worden verstrekt.' },
  { title: 'Wijzigingen en afmelden', text: 'Nieuwe gegevens, een andere leeftijdscategorie of stoppen: de ledenadministratie van de club verwerkt de wijziging.' },
  { title: 'Bondsbijdrage', text: 'De club int de bondsbijdrage bij haar leden en draagt die af aan de KNAS, naast de eigen clubcontributie.' },
];

const loginSteps = [
  { title: 'Vraag je gegevens op', text: 'Vraag de ledenadministratie van je club om je relatienummer en het e-mailadres dat voor jou in OnzeRelaties staat. De club kan je e-mailadres zo nodig aanpassen.' },
  { title: 'Stel een wachtwoord in', text: 'Kies op OnzeRelaties voor “wachtwoord herstellen” en vul je relatienummer en e-mailadres in. Je krijgt een e-mail met een tijdelijke link om een wachtwoord van minimaal 12 tekens in te stellen. Geen e-mail? Kijk in je spammap.', link: { label: 'Wachtwoord instellen', href: `${onzeRelaties}/pag/0xd6af` } },
  { title: 'Log in', text: 'Log in met je relatienummer en wachtwoord. Het veld OTP laat je leeg.', link: { label: 'Naar OnzeRelaties', href: onzeRelaties } },
];

const extraRights = [
  'Ledenbeheer en inschrijvingen versturen namens je club',
  'Wedstrijdorganisatie: inschrijvingen downloaden',
  'Alleen inzage in de gegevens, wedstrijden en leden van je club',
];

const transferSteps = [
  ['Bespreek de overstap', 'Het lid meldt de wens om over te stappen bij de huidige en de nieuwe vereniging.'],
  ['Controleer de gegevens', 'Gebruik de juiste naam, geboortedatum, relatienummer en ingangsdatum.'],
  ['Stem de einddatum af', 'Controleer of er nog contributie, materiaal of andere afspraken lopen bij de huidige club.'],
  ['Geef de wijziging door', 'De ledenadministratie verwerkt de overschrijving in het ledensysteem.'],
  ['Bevestig de registratie', 'Controleer of het lid bij de juiste club staat en kan meedoen aan trainingen en wedstrijden.'],
];

const transferRoles = [
  ['Het lid', 'Bespreekt de overstap op tijd en levert correcte persoonsgegevens.'],
  ['De oude club', 'Controleert openstaande afspraken en legt de einddatum vast.'],
  ['De nieuwe club', 'Registreert het lid en informeert over contributie, trainingen en materiaal.'],
  ['De ledenadministratie', 'Bewaart de bevestiging en verwerkt eventuele correcties.'],
];

export default function LedenadministratieView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-11.jpg" alt="Schermsters van verschillende clubs samen op de foto" style={{ objectPosition: '50% 15%' }} />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Voor clubs', href: '/voor-clubs' }, { label: 'Ledenadministratie' }]} />
          <h1 className="k-page-header__title">Ledenadministratie</h1>
          <p className="k-lead k-page-header__intro">
            Schermers zijn via hun vereniging aangesloten bij de KNAS. De ledenadministratie van de club registreert nieuwe leden, verwerkt wijzigingen en zorgt voor de bondsbijdrage.
          </p>
          <div className="k-page-header__actions">
            <Button variant="primary" href={onzeRelaties} external>Inloggen bij OnzeRelaties</Button>
            <Button variant="secondary" href="/over-de-knas/lidmaatschap">Bekijk de tarieven</Button>
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'leden-tasks-title', label: 'Wat regel je?' },
          { id: 'onzerelaties-title', label: 'OnzeRelaties' },
          { id: 'onzerelaties-data-title', label: 'Gegevens en rechten' },
          { id: 'leden-transfer-title', label: 'Overschrijven' },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="leden-tasks-title">
        <div className="k-container">
          <h2 id="leden-tasks-title" className="k-block-title">Wat regel je als club?</h2>
          <div className="k-grid k-grid--3">
            {tasks.map((task) => (
              <article key={task.title} className="k-intro-point">
                <Check aria-hidden="true" />
                <h3>{task.title}</h3>
                <p>{task.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="onzerelaties-title">
        <div className="k-container">
          <h2 id="onzerelaties-title" className="k-block-title">Inloggen bij OnzeRelaties</h2>
          <p className="k-lead k-onzerelaties-intro">
            OnzeRelaties is de ledenadministratie van de KNAS. Met hetzelfde account log je ook in op de Nahouw (wedstrijdinschrijving), OnzeRanglijsten en de site van de Jeugd Equipe Competitie. De eerste keer gaat zo:
          </p>
          <ol className="k-steps">
            {loginSteps.map((step, index) => (
              <li key={step.title} className="k-step">
                <span className="k-step__number" aria-hidden="true">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {step.link && (
                    <a href={step.link.href} className="k-inline-link" target="_blank" rel="noopener noreferrer">
                      <KeyRound aria-hidden="true" /> {step.link.label}
                      <span className="k-visually-hidden"> (opent in nieuw venster)</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <div className="k-aside-note k-leden-note">
            <AlertTriangle aria-hidden="true" />
            <strong>Kom je er niet in?</strong>
            <p>Klopt je relatienummer of e-mailadres niet, dan krijg je een algemene foutmelding. De ledenadministratie van je club kan zien wat er mis is.</p>
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="onzerelaties-data-title">
        <div className="k-container k-grid k-grid--2">
          <div>
            <h2 id="onzerelaties-data-title" className="k-block-title">Je gegevens aanpassen</h2>
            <p>Je eigen gegevens, zoals je adres, pas je aan in OnzeRelaties. Kun je iets niet zelf wijzigen, geef het dan door aan de ledenadministratie van je club.</p>
          </div>
          <div>
            <h2 className="k-block-title">Extra rechten voor clubs</h2>
            <p>Bestuurders en wedstrijdorganisatoren kunnen op de Nahouw extra rechten krijgen:</p>
            <ul className="k-check-list">
              {extraRights.map((right) => <li key={right}><Check aria-hidden="true" /> {right}</li>)}
            </ul>
            <a href="mailto:wedstrijdzaken@knas.nl?subject=Extra%20rechten%20Nahouw" className="k-inline-link">Vraag extra rechten aan bij wedstrijdzaken</a>
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="leden-transfer-title">
        <div className="k-container">
          <h2 id="leden-transfer-title" className="k-block-title">Een lid overschrijven</h2>
          <ol className="k-timeline">
            {transferSteps.map(([title, text]) => (
              <li key={title} className="k-timeline__item"><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
          <div className="k-grid k-grid--2 k-leden-transfer-extra">
            <div>
              <h3 className="k-rule-subhead">Wie doet wat?</h3>
              <ul className="k-rule-facts k-rule-facts--stacked">
                {transferRoles.map(([role, text]) => <li key={role}><strong>{role}</strong> {text}</li>)}
              </ul>
              <p className="k-rule-note">Twijfel je over de actuele werkwijze? Vraag het na bij de ledenadministratie van de KNAS.</p>
            </div>
            <div className="k-aside-note">
              <AlertTriangle aria-hidden="true" />
              <strong>Let op bij wedstrijden</strong>
              <p>Een overstap kan gevolgen hebben voor inschrijvingen, teamdeelname, ranglijsten en de club waarvoor iemand uitkomt. Controleer lopende wedstrijden en teams voordat je de datum vastlegt.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="leden-next-title">
        <div className="k-container k-closing-cta">
          <div>
            <h2 id="leden-next-title">Vraag over de ledenadministratie?</h2>
            <p>Het bondsbureau helpt bij registraties, correcties en bijzondere situaties.</p>
          </div>
          <div className="k-closing-cta__actions">
            <Button variant="secondary" href="mailto:leden@knas.nl">Mail leden@knas.nl</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
