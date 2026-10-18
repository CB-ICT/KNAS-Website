import { AlertTriangle, FileText } from 'lucide-react';
import { Breadcrumb, Button } from '../ui/components';
import internationalEntries from '../generated/international-entries.json';
import '../ui/templates/templates.css';

const steps = [
  ['Via je vereniging', 'Je meldt je aan via de wedstrijdsecretaris of secretaris van je vereniging, niet zelf.'],
  ['Uiterlijk vier weken vooraf', 'De aanmelding moet uiterlijk vier weken voor de wedstrijd bij KNAS Internationaal binnen zijn.'],
  ['KNAS Internationaal schrijft in', 'KNAS Internationaal verwerkt de aanmeldingen en doet de inschrijving bij de FIE of EFC.'],
];

export default function InternationaalAanmeldenView() {
  return (
    <div className="k-ds k-international-entries-page">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-06.jpg" alt="Twee schermsters in een floretpartij" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Topsport', href: '/topsport' }, { label: 'Internationaal aanmelden' }]} />
          <h1 className="k-page-header__title">Internationaal aanmelden</h1>
          <p className="k-lead k-page-header__intro">
            Wil je meedoen aan een World Cup, een satelliettoernooi of een Europees cadetten- of U23-toernooi? Dan loopt de inschrijving via je vereniging en KNAS Internationaal.
          </p>
          <div className="k-page-header__actions">
            <Button variant="primary" href="docs/topsport/internationale-aanmeldingen-actueel.pdf" external iconLeft={<FileText aria-hidden="true" />}>
              Actuele aanmeldingen (pdf)
            </Button>
          </div>
        </div>
      </header>

      <section className="k-section k-section--tight-top" aria-labelledby="int-steps-title">
        <div className="k-container">
          <h2 id="int-steps-title" className="k-block-title">Zo werkt het</h2>
          <ol className="k-steps">
            {steps.map(([title, text], index) => (
              <li key={title} className="k-step">
                <span className="k-step__number" aria-hidden="true">{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
          <div className="k-grid k-grid--2 k-leden-transfer-extra">
            <div className="k-aside-note">
              <AlertTriangle aria-hidden="true" />
              <strong>Let op</strong>
              <p>Te late aanmeldingen, of aanmeldingen door iemand anders dan de wedstrijdsecretaris, worden niet geaccepteerd.</p>
            </div>
            <div>
              <h3 className="k-rule-subhead">Titeltoernooien</h3>
              <p>Voor een EK of WK meld je je niet zelf aan. Na de selectie zorgt de KNAS voor de inschrijving.</p>
              <a href="/topsport/titeltoernooien" className="k-inline-link">Zo werkt de selectie</a>
            </div>
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="int-overview-title">
        <div className="k-container k-closing-cta">
          <div>
            <h2 id="int-overview-title">Wie gaat waarheen?</h2>
            <p>Het overzicht van aanmeldingen laat per wedstrijd zien welke Nederlandse schermers zijn ingeschreven, met scheidsrechter en coach.</p>
            <p className="k-muted">Bijgewerkt op {new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(internationalEntries.syncedAt))}.</p>
          </div>
          <div className="k-closing-cta__actions">
              <Button variant="secondary" href="docs/topsport/internationale-aanmeldingen-actueel.pdf" external iconLeft={<FileText aria-hidden="true" />}>Actuele aanmeldingen (pdf)</Button>
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="int-contact-title">
        <div className="k-container k-closing-cta">
          <div>
            <h2 id="int-contact-title">Vraag over een aanmelding?</h2>
            <p>Neem contact op met KNAS Internationaal.</p>
          </div>
          <div className="k-closing-cta__actions">
            <Button variant="secondary" href="mailto:knasinternationaal@knas.nl">Mail knasinternationaal@knas.nl</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
