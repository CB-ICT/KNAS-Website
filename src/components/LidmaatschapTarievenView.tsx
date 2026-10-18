import { Check } from 'lucide-react';
import { Breadcrumb, Button, DataTable, HeaderMosaic, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const steps = [
  ['Kies een vereniging', 'Zoek een club in de buurt en volg daar een proefles of training.'],
  ['De club meldt je aan', 'Na de introductieperiode registreert de vereniging je bij de bond.'],
  ['Je bent aangesloten', 'Je kunt meedoen aan wedstrijden, opleidingen en het verenigingsleven.'],
];

const fees = [
  { id: 'senior', soort: 'Senioren', voor: '23 jaar en ouder', bedrag: '€ 74,70' },
  { id: 'jeugd', soort: 'Jeugd', voor: '22 jaar en jonger', bedrag: '€ 37,35' },
  { id: 'intro', soort: 'Introductielidmaatschap', voor: 'Eenmalig, 3 maanden', bedrag: '€ 6,00' },
  { id: 'niet', soort: 'Niet-schermend lid', voor: 'Bijvoorbeeld bestuursfuncties', bedrag: '€ 12,00' },
];

const benefits = [
  'Meedoen aan wedstrijden, competities en Nederlandse kampioenschappen',
  'Toegang tot opleidingen voor trainers, scheidsrechters en vrijwilligers',
  'Een collectieve aansprakelijkheids- en ongevallenverzekering tijdens het schermen',
  'Je resultaten op de ranglijsten',
  'Ondersteuning van de wedstrijdkalender, jeugd- en veteranenprogramma\u2019s',
];

export default function LidmaatschapTarievenView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--mosaic k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Over de KNAS', href: '/over-de-knas' }, { label: 'Lidmaatschap en tarieven' }]} />
          <div className="k-page-header__split">
            <div>
              <h1 className="k-page-header__title">Lidmaatschap en tarieven</h1>
              <p className="k-lead k-page-header__intro">
                Je wordt lid via de vereniging waar je schermt. Je betaalt daar de clubcontributie; de vereniging draagt daarnaast een bondsbijdrage af aan de KNAS.
              </p>
            </div>
            <HeaderMosaic images={['images/coach/coach-7.jpg', 'images/epee/epee-5.jpg', 'images/foil/foil-6.jpg']} />
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'lid-steps-title', label: 'Zo word je lid' },
          { id: 'lid-fees-title', label: 'Tarieven' },
          { id: 'lid-benefits-title', label: 'Wat krijg je ervoor?' },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="lid-steps-title">
        <div className="k-container">
          <h2 id="lid-steps-title" className="k-block-title">Zo word je lid</h2>
          <ol className="k-steps">
            {steps.map(([title, text], index) => (
              <li key={title} className="k-step">
                <span className="k-step__number" aria-hidden="true">{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
          <div className="k-page-header__actions">
            <Button variant="secondary" href="/clubs">Vind een club</Button>
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="lid-fees-title">
        <div className="k-container k-split">
          <div>
            <h2 id="lid-fees-title" className="k-block-title">Bondsbijdrage 2026</h2>
            <DataTable
              caption="KNAS-bondsbijdrage per jaar in 2026"
              captionHidden
              rowKey={(row) => row.id}
              rows={fees}
              columns={[
                { key: 'soort', header: 'Soort lid', primary: true },
                { key: 'voor', header: 'Voor wie' },
                { key: 'bedrag', header: 'Per jaar' },
              ]}
            />
            <p className="k-rule-note">Een introductielidmaatschap loopt automatisch af en kan één keer per persoon worden verstrekt.</p>
          </div>
          <aside className="k-aside-note">
            <strong>Clubcontributie</strong>
            <p>Daarnaast betaal je contributie aan je club. De hoogte verschilt per club en hangt meestal af van je leeftijd en hoe vaak je traint. Vraag het tarief op bij de club.</p>
          </aside>
        </div>
      </section>

      <section className="k-section" aria-labelledby="lid-benefits-title">
        <div className="k-container k-split">
          <div>
            <h2 id="lid-benefits-title" className="k-block-title">Wat krijg je ervoor?</h2>
            <ul className="k-check-list">
              {benefits.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
            </ul>
          </div>
          <aside className="k-aside-note">
            <strong>Overstappen, stoppen of iets wijzigen?</strong>
            <p>Dat loopt via de ledenadministratie van je club.</p>
            <div className="k-page-header__actions">
              <Button variant="secondary" href="/voor-clubs/ledenadministratie">Ledenadministratie</Button>
              <Button variant="text" href="/beginnen/veelgestelde-vragen">Veelgestelde vragen</Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
