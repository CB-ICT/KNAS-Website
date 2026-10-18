import { FileText } from 'lucide-react';
import { Breadcrumb, HeaderMosaic, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const teams = [
  {
    code: 'DBT',
    title: 'Degen Begeleidingsteam',
    docs: [
      { label: 'Kwalificatiekalender 2026-2027', href: 'docs/topsport/kwalificatiekalender-dbt-26-27.pdf' },
      { label: 'Werkwijze wedstrijdbegeleiding', href: 'docs/topsport/werkwijze-wedstrijdbegeleiding-dbt.pdf' },
    ],
  },
  {
    code: 'FBT',
    title: 'Floret Begeleidingsteam',
    docs: [{ label: 'Kwalificatiekalender 2026-2027', href: 'docs/topsport/kwalificatiekalender-fbt-26-27.pdf' }],
  },
  {
    code: 'SBT',
    title: 'Sabel Begeleidingsteam',
    docs: [{ label: 'Kwalificatiekalender 2026-2027', href: 'docs/topsport/kwalificatiekalender-sbt-26-27.pdf' }],
  },
];

const joinSteps = [
  ['Augustus', 'Uitnodiging', 'Het begeleidingsteam nodigt schermers uit, op basis van onder meer ranglijsten, resultaten en topsportperspectief, en maakt de kwalificatiewedstrijden bekend.'],
  ['September', 'Intake', 'Je vult het intakeformulier in, tekent de sportersovereenkomst en bespreekt beide met je ouders, het team en je clubtrainer. Uiterlijk 30 september.'],
  ['Najaar', 'Wedstrijden en stages', 'Je schermt minimaal drie aangewezen kwalificatiewedstrijden en doet mee aan de stages van je wapen.'],
  ['Januari tot maart', 'Selectie', 'De selecties voor het EK en WK voor cadetten en junioren en het EK U23 worden bekend.'],
];

const costs = [
  ['Kwalificatiewedstrijden', 'Eigen kosten. De kosten van de trainer worden gedeeld door de deelnemers.'],
  ['EK en WK cadetten en junioren', 'Reis, verblijf en inschrijving zijn voor eigen rekening. De KNAS betaalt de coach.'],
  ['EK U23', 'Alles op eigen kosten, ook een eventuele coach.'],
  ['Help mee', 'Er is weinig budget. Ouders die willen helpen met organisatie of fondsenwerving zijn welkom bij het begeleidingsteam.'],
];

const status = [
  ['Drie statussen', 'NOC*NSF kent de statussen Internationaal Talent, Nationaal Talent en Belofte.'],
  ['Aanvragen', 'Je vraagt een status aan bij de manager topsport.'],
  ['Beoordeling', 'De aanvraag wordt beoordeeld aan de hand van het talentprofiel (zie documenten).'],
  ['Geldigheid', 'Een status geldt voor één seizoen; daarna volgt een nieuwe beoordeling.'],
];

const documents = [
  { title: 'Selectie-eisen (extract Handboek Schermer)', meta: 'PDF', href: 'docs/topsport/extract-handboek-schermer-selectie-eisen.pdf' },
  { title: 'Intakeformulier 2026-2027', meta: 'PDF', href: 'docs/topsport/intakeformulier-2026-2027.pdf' },
  { title: 'Sportersovereenkomst 2026-2027', meta: 'PDF', href: 'docs/topsport/sportersovereenkomst-2026-2027.pdf' },
  { title: 'Sporttakspecifiek talentprofiel 2026', meta: 'Word', href: 'docs/topsport/sporttakspecifiek-talentprofiel-2026.doc' },
  { title: 'Gedragscode voor sporters', meta: 'Word', href: 'docs/topsport/gedragscode-sporters-2025.docx' },
  { title: 'Gedragscode voor trainers, coaches en begeleiders', meta: 'Word', href: 'docs/topsport/gedragscode-trainers-coaches-begeleiders-2025.docx' },
];

export default function TalentprogrammaView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--mosaic k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Topsport', href: '/topsport' }, { label: 'Talentprogramma' }]} />
          <div className="k-page-header__split">
            <div>
              <h1 className="k-page-header__title">Talentprogramma</h1>
              <p className="k-lead k-page-header__intro">
                Voor talentvolle jeugd heeft de KNAS per wapen een begeleidingsteam: schermleraren van verschillende clubs die schermers helpen in hun ontwikkeling naar de senioren. De focus ligt op cadetten en junioren.
              </p>
            </div>
            <HeaderMosaic images={['images/epee/epee-2.jpg', 'images/foil/foil-5.jpg', 'images/sabre/sabre-2.jpg']} />
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'talent-teams-title', label: 'Begeleidingsteams' },
          { id: 'talent-join-title', label: 'Zo doe je mee' },
          { id: 'talent-costs-title', label: 'Kosten en status' },
          { id: 'talent-docs-title', label: 'Documenten' },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="talent-teams-title">
        <div className="k-container">
          <h2 id="talent-teams-title" className="k-block-title">Begeleidingsteams per wapen</h2>
          <p className="k-lead k-onzerelaties-intro">Een begeleidingsteam organiseert trainingen en stages, kiest de kwalificatiewedstrijden, volgt je ontwikkeling en doet voorstellen voor de selectie.</p>
          <div className="k-grid k-grid--3">
            {teams.map((team) => (
              <article key={team.code} className="k-intro-point">
                <p className="k-eyebrow">{team.code}</p>
                <h3>{team.title}</h3>
                <ul className="k-doc-list">
                  {team.docs.map((doc) => (
                    <li key={doc.href}>
                      <a href={doc.href} target="_blank" rel="noopener noreferrer"><FileText aria-hidden="true" /> {doc.label}</a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="talent-join-title">
        <div className="k-container">
          <h2 id="talent-join-title" className="k-block-title">Zo doe je mee</h2>
          <ol className="k-timeline k-timeline--four">
            {joinSteps.map(([when, title, text]) => (
              <li key={title} className="k-timeline__item">
                <p className="k-eyebrow">{when}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <p className="k-rule-note">Meedoen geeft geen automatisch recht op selectie. Lees hoe de <a href="/topsport/titeltoernooien">selectie voor titeltoernooien</a> werkt.</p>
        </div>
      </section>

      <section className="k-section" aria-labelledby="talent-costs-title">
        <div className="k-container k-grid k-grid--2">
          <div>
            <h2 id="talent-costs-title" className="k-block-title">Kosten</h2>
            <ul className="k-rule-facts k-rule-facts--stacked">
              {costs.map(([title, text]) => <li key={title}><strong>{title}</strong> {text}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="k-block-title">Talentstatus</h2>
            <ul className="k-rule-facts k-rule-facts--stacked">
              {status.map(([title, text]) => <li key={title}><strong>{title}</strong> {text}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="talent-docs-title">
        <div className="k-container k-container--narrow">
          <h2 id="talent-docs-title" className="k-block-title">Documenten</h2>
          <ul className="k-rule-documents">
            {documents.map((doc) => (
              <li key={doc.href}>
                <a href={doc.href} target="_blank" rel="noopener noreferrer">
                  <FileText aria-hidden="true" /><span>{doc.title}</span><span className="k-rule-documents__type">{doc.meta}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
