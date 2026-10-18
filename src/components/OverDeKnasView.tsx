import { FileText, Users } from 'lucide-react';
import { Breadcrumb, FeatureCard, IconTile, SectionNav } from '../ui/components';
import { uniqueClubsData } from '../allClubsData';
import '../ui/templates/templates.css';

const t = {
  breadcrumb: 'Over de KNAS',
  title: 'Over de KNAS',
  intro: 'De Koninklijke Nederlandse Algemene Schermbond is sinds 1908 de bond voor de schermsport in Nederland. De KNAS is een vereniging van verenigingen: de aangesloten clubs vormen samen de bond.',
  heroAlt: 'Schermsters van verschillende clubs samen op de foto met hun medailles',
  sectionNav: { mission: 'Missie', work: 'Waar we aan werken', org: 'Organisatie', docs: 'Documenten' },
  missionTitle: 'Nederland laten schermen',
  missionLead: 'Veel, vaak, lang, goed en met plezier: zoveel mogelijk mensen, regelmatig, hun leven lang, op een goed niveau. Prestatie en plezier gaan hand in hand.',
  metrics: {
    founded: { label: 'Opgericht', note: 'als Nederlandsche Amateur Schermbond' },
    royal: { label: 'Koninklijk', note: 'predicaat koninklijk' },
    clubs: { label: 'Verenigingen', note: 'door heel Nederland' },
    fencers: { label: 'Schermers', value: '2.475', note: 'aangesloten via hun club' },
  },
  membershipNote: 'De KNAS is aangesloten bij NOC*NSF en lid van de internationale schermfederaties FIE en EFC.',
  workTitle: 'Waar we aan werken',
  domains: [
    { image: 'images/fencing/fencing-03.jpg', title: 'Verenigingen en groei', text: 'Ondersteuning van clubs, het oprichten van nieuwe verenigingen en meer schermaanbod in het land.', href: '/voor-clubs' },
    { image: 'images/fencing/fencing-04.jpg', title: 'Wedstrijden en ranglijsten', text: 'De nationale kalender, ondersteuning van organisatoren, uitslagen en de nationale ranglijsten.', href: '/wedstrijden' },
    { image: 'images/fencing/fencing-06.jpg', title: 'Topsport en talent', text: 'Begeleidingsteams per wapen, selecties voor titeltoernooien en internationale inschrijvingen.', href: '/topsport' },
    { image: 'images/fencing/fencing-10.jpg', title: 'Opleidingen', text: 'Opleidingen voor trainers en scheidsrechters, van assistent op de club tot topsportcoach.', href: '/voor-clubs/trainersopleidingen' },
  ],
  orgTitle: 'Zo werkt de bond',
  orgFacts: [
    { title: 'Algemene ledenvergadering', text: 'De aangesloten verenigingen beslissen mee; het bestuur legt hier verantwoording af.' },
    { title: 'Bestuur', text: 'Stelt de koers en het meerjarenbeleid vast en is verantwoordelijk voor financiën en het bondsbureau.' },
    { title: 'Bondsbureau', text: 'Het aanspreekpunt in Nieuwegein voor ledenadministratie, verenigingen, wedstrijdorganisatie en materiaal.' },
    { title: 'Commissies', text: 'Vrijwilligers werken onderwerpen uit, zoals wedstrijden, scheidsrechters, opleidingen en topsport.' },
  ],
  boardTile: { label: 'Bestuur en commissies', description: 'Wie er in het bestuur en de commissies zitten' },
  contactTile: { label: 'Contact', description: 'Bondsbureau, e-mail per onderwerp' },
  docsTitle: 'Documenten',
  docsLead: 'Reglementen, beleid en het Handboek Schermer van de bond.',
  docType: 'PDF',
  documents: [
    { title: 'Algemeen Reglement 2025', href: 'docs/policy/algemeen-reglement-2025.pdf' },
    { title: 'Meerjarenbeleidsplan 2025-2028', href: 'docs/policy/meerjarenbeleidsplan-2025-2028.pdf' },
    { title: 'Handboek Schermer 2025', href: 'docs/source/handboek-schermer-2025.pdf' },
    { title: 'Vrijwilligersbeleid 2025', href: 'docs/source/vrijwilligersbeleid-2025.pdf' },
    { title: 'Beleid diversiteit en inclusie 2025', href: 'docs/source/beleid-diversiteit-inclusie-2025.pdf' },
    { title: 'Privacyverklaring', href: 'docs/policy/privacyverklaring.pdf' },
  ],
  clubDocsLink: 'Documenten voor verenigingen',
  rulesLink: 'Wedstrijdreglementen',
};

export default function OverDeKnasView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: t.breadcrumb }]} />
          <div className="k-page-header__layout">
            <div>
              <h1 className="k-page-header__title">{t.title}</h1>
              <p className="k-lead k-page-header__intro">
                {t.intro}
              </p>
            </div>
            <figure className="k-page-header__media">
              <img src="images/fencing/fencing-11.jpg" alt={t.heroAlt} style={{ objectPosition: '50% 15%' }} />
            </figure>
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'over-mission-title', label: t.sectionNav.mission },
          { id: 'over-work-title', label: t.sectionNav.work },
          { id: 'over-org-title', label: t.sectionNav.org },
          { id: 'over-docs-title', label: t.sectionNav.docs },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="over-mission-title">
        <div className="k-container">
          <h2 id="over-mission-title" className="k-block-title">{t.missionTitle}</h2>
          <p className="k-lead k-onzerelaties-intro">{t.missionLead}</p>
          <dl className="k-rule-metrics">
            <div><dt>{t.metrics.founded.label}</dt><dd><strong>1908</strong><span>{t.metrics.founded.note}</span></dd></div>
            <div><dt>{t.metrics.royal.label}</dt><dd><strong>1923</strong><span>{t.metrics.royal.note}</span></dd></div>
            <div><dt>{t.metrics.clubs.label}</dt><dd><strong>{uniqueClubsData.length}</strong><span>{t.metrics.clubs.note}</span></dd></div>
            <div><dt>{t.metrics.fencers.label}</dt><dd><strong>{t.metrics.fencers.value}</strong><span>{t.metrics.fencers.note}</span></dd></div>
          </dl>
          <p className="k-rule-note">{t.membershipNote}</p>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="over-work-title">
        <div className="k-container">
          <h2 id="over-work-title" className="k-block-title">{t.workTitle}</h2>
          <div className="k-grid k-grid--2">
            {t.domains.map((domain) => (
              <FeatureCard key={domain.title} href={domain.href} image={domain.image} title={domain.title} text={domain.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="over-org-title">
        <div className="k-container k-split">
          <div>
            <h2 id="over-org-title" className="k-block-title">{t.orgTitle}</h2>
            <ul className="k-rule-facts k-rule-facts--stacked">
              {t.orgFacts.map((fact) => (
                <li key={fact.title}><strong>{fact.title}</strong> {fact.text}</li>
              ))}
            </ul>
          </div>
          <div className="k-stack">
            <IconTile href="/over-de-knas/bestuur" icon={<Users />} label={t.boardTile.label} description={t.boardTile.description} />
            <IconTile href="/contact" icon={<FileText />} label={t.contactTile.label} description={t.contactTile.description} />
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="over-docs-title">
        <div className="k-container k-container--narrow">
          <h2 id="over-docs-title" className="k-block-title">{t.docsTitle}</h2>
          <p className="k-lead k-onzerelaties-intro">{t.docsLead}</p>
          <ul className="k-rule-documents">
            {t.documents.map((doc) => (
              <li key={doc.href}>
                <a href={doc.href} target="_blank" rel="noopener noreferrer">
                  <FileText aria-hidden="true" /><span>{doc.title}</span><span className="k-rule-documents__type">{t.docType}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="k-page-header__actions">
            <a href="/voor-clubs/documenten" className="k-inline-link">{t.clubDocsLink}</a>
            <a href="/wedstrijden/reglementen" className="k-inline-link">{t.rulesLink}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
