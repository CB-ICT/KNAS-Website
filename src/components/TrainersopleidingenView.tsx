import { Check, ShieldCheck } from 'lucide-react';
import { Breadcrumb, Button, DataTable, HeaderMosaic, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const levels = [
  ['TCS1 · Assistent', 'Je helpt de trainer op je eigen club en leert de basis van lesgeven.'],
  ['TCS2 · Basistrainer', 'Je geeft zelfstandig training, met een didactische basis op alle drie de wapens.'],
  ['TCS3 · Verenigingstrainer', 'Je begeleidt schermers in de wedstrijdsport op nationaal niveau.'],
  ['TCS4 · Talentcoach', 'Je begeleidt jeugdtalent richting internationale wedstrijden.'],
  ['TCS5 · Topsportcoach', 'Je werkt met senioren in een internationale topsportomgeving.'],
];

const programs = [
  { id: 'tcs1', niveau: 'TCS1', duur: '2–6 maanden', studielast: '40 uur', instroom: '15–18 jaar', kosten: '€ 30', status: 'Open' },
  { id: 'tcs2', niveau: 'TCS2', duur: '6 maanden', studielast: '250 uur', instroom: 'Vanaf 17,5 jaar', kosten: '€ 600', status: 'Open' },
  { id: 'tcs3', niveau: 'TCS3', duur: '1 jaar', studielast: '400 uur', instroom: '18+ en 1 jaar TCS2-ervaring', kosten: '€ 700', status: 'Open' },
  { id: 'tcs4', niveau: 'TCS4', duur: '1–1,5 jaar', studielast: '400 uur', instroom: '2 jaar TCS3-ervaring en een stageplek', kosten: '€ 2.600, deels vergoed via KNAS-regeling', status: 'Nog niet open' },
  { id: 'tcs5', niveau: 'TCS5', duur: '2 jaar', studielast: 'In overleg', instroom: 'TCS4 en een werkplek in de topsport', kosten: 'Eigen bekostiging', status: 'Via Hogeschool van Amsterdam' },
];

const admission = [
  { id: 'ervaring', eis: 'Schermervaring', tcs2: '3 jaar, 1 wapen', tcs3: '5 jaar, 2 wapens en basis van het 3e', tcs4: 'Nationaal en internationaal, 3 wapens' },
  { id: 'leeftijd', eis: 'Leeftijd', tcs2: 'Start vanaf 17,5 jaar', tcs3: 'Minimaal 18 jaar', tcs4: 'Minimaal 20 jaar' },
  { id: 'gedragscode', eis: 'Gedragscode', tcs2: 'Ondertekenen', tcs3: 'Ondertekenen', tcs4: 'Ondertekenen' },
];

const approach = [
  'Je leert vooral in de praktijk, op je eigen vereniging',
  'Een praktijkbegeleider (PB) op de club begeleidt je',
  'Een positief en veilig sportklimaat staat centraal',
  'De niveaus sluiten aan op de Kwalificatiestructuur Sport (KSS24)',
];

export default function TrainersopleidingenView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--mosaic k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Voor clubs', href: '/voor-clubs' }, { label: 'Trainer worden' }]} />
          <div className="k-page-header__split">
            <div>
              <p className="k-eyebrow k-page-header__eyebrow">Trainersopleidingen</p>
              <h1 className="k-page-header__title">Trainer worden</h1>
              <p className="k-lead k-page-header__intro">
                Goede trainers zijn de basis van een sterke vereniging. De opleidingslijn Trainer-Coach Schermen (TCS) loopt in vijf niveaus van assistent op de club tot topsportcoach.
              </p>
              <div className="k-page-header__actions">
                <Button variant="primary" href="docs/knas-opleidingen-tcs1-5.pdf" external>Download de opleidingsgids (pdf)</Button>
                <Button variant="secondary" href="mailto:opleidingen@knas.nl">Mail opleidingen@knas.nl</Button>
              </div>
            </div>
            <HeaderMosaic images={['images/coach/coach-1.jpg', 'images/coach/coach-4.jpg', 'images/coach/coach-3.jpg']} />
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'tcs-path-title', label: 'Doorgroeipad' },
          { id: 'tcs-overview-title', label: 'Opleidingen op een rij' },
          { id: 'tcs-admission-title', label: 'Toelatingseisen' },
        ]}
      />

      <section className="k-section k-section--subtle" aria-labelledby="tcs-path-title">
        <div className="k-container">
          <h2 id="tcs-path-title" className="k-block-title">Van clubvloer naar topsport</h2>
          <ol className="k-timeline">
            {levels.map(([title, text]) => (
              <li key={title} className="k-timeline__item"><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="k-section" aria-labelledby="tcs-overview-title">
        <div className="k-container">
          <h2 id="tcs-overview-title" className="k-block-title">De opleidingen op een rij</h2>
          <DataTable
            caption="Duur, studielast, instroom en kosten per opleiding"
            captionHidden
            rowKey={(row) => row.id}
            rows={programs}
            columns={[
              { key: 'niveau', header: 'Niveau', primary: true },
              { key: 'duur', header: 'Duur' },
              { key: 'studielast', header: 'Studielast' },
              { key: 'instroom', header: 'Instroom' },
              { key: 'kosten', header: 'Kosten' },
              { key: 'status', header: 'Status' },
            ]}
          />
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="tcs-admission-title">
        <div className="k-container k-split">
          <div>
            <h2 id="tcs-admission-title" className="k-block-title">Toelatingseisen TCS2 tot en met TCS4</h2>
            <DataTable
              caption="Toelatingseisen per opleiding"
              captionHidden
              rowKey={(row) => row.id}
              rows={admission}
              columns={[
                { key: 'eis', header: 'Eis', primary: true },
                { key: 'tcs2', header: 'TCS2' },
                { key: 'tcs3', header: 'TCS3' },
                { key: 'tcs4', header: 'TCS4' },
              ]}
            />
            <p className="k-muted k-timeline__note">Voor vrijstellingen (EVC) en uitzonderingen geldt de meest recente opleidingsgids.</p>
          </div>
          <aside className="k-aside-note">
            <ShieldCheck aria-hidden="true" />
            <strong>Zo werkt de opleiding</strong>
            <ul className="k-check-list">
              {approach.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section className="k-section" aria-labelledby="tcs-next-title">
        <div className="k-container k-closing-cta">
          <div>
            <h2 id="tcs-next-title">Liever jureren of helpen?</h2>
            <p>Een club draait ook op scheidsrechters en vrijwilligers.</p>
          </div>
          <div className="k-closing-cta__actions">
            <Button variant="secondary" href="/wedstrijden/scheidsrechters">Scheidsrechter worden</Button>
            <Button variant="secondary" href="/voor-clubs/veilig-sportklimaat">Vrijwilligers</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
