import { Accessibility, Check, FileText, HeartHandshake, MessageCircle, Users } from 'lucide-react';
import { Breadcrumb, Button, HeaderMosaic, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const safetyHelps = [
  'Omgangsafspraken die iedereen kent, van jeugdlid tot bestuurder',
  'Trainers die de gedragscode voor trainers en coaches hebben ondertekend',
  'Een vast aanspreekpunt voor nieuwe vrijwilligers',
  'Een eigen vertrouwenscontactpersoon (VCP) die leden en ouders als eerste aanspreekpunt weten te vinden',
  'Werken met een Verklaring Omtrent het Gedrag (VOG); de KNAS heeft daarvoor een VOG-beleid',
];

const documents = [
  { title: 'VOG-beleid KNAS (juli 2024)', href: 'docs/policy/vog-beleid-2024.pdf' },
  { title: 'Vrijwilligersbeleid 2025', href: 'docs/source/vrijwilligersbeleid-2025.pdf' },
  { title: 'Beleid diversiteit en inclusie 2025', href: 'docs/source/beleid-diversiteit-inclusie-2025.pdf' },
];

export default function VeiligSportklimaatView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--mosaic k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Voor clubs', href: '/voor-clubs' }, { label: 'Vrijwilligers, veiligheid en inclusie' }]} />
          <div className="k-page-header__split">
            <div>
              <h1 className="k-page-header__title">Vrijwilligers, veiligheid en inclusie</h1>
              <p className="k-lead k-page-header__intro">
                Een club draait op mensen. Vrijwilligers maken trainingen en toernooien mogelijk, en een open, veilige sfeer zorgt dat iedereen zich er thuis voelt.
              </p>
            </div>
            <HeaderMosaic images={['images/coach/coach-5.jpg', 'images/youth/youth-2.jpg', 'images/referees/referees-7.jpg']} />
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'veilig-people-title', label: 'Mensen in de club' },
          { id: 'veilig-wheelchair-title', label: 'Rolstoelschermen' },
          { id: 'veilig-club-title', label: 'Veilige sfeer' },
          { id: 'veilig-docs-title', label: 'Beleid' },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="veilig-people-title">
        <div className="k-container">
          <h2 id="veilig-people-title" className="k-block-title">Mensen maken de club</h2>
          <div className="k-grid k-grid--2">
            <article className="k-intro-point">
              <Users aria-hidden="true" />
              <h3>Vrijwilligers</h3>
              <p>Vrijwilligers zijn onmisbaar bij trainingen, toernooien en in het bestuur. Een warm welkom, duidelijke taken en waardering helpen om ze te vinden en te houden. Het vrijwilligersbeleid geeft daar handvatten voor.</p>
            </article>
            <article className="k-intro-point">
              <HeartHandshake aria-hidden="true" />
              <h3>Iedereen welkom</h3>
              <p>Een inclusieve club maakt ruimte voor verschillen in leeftijd, gender, achtergrond, niveau en beperking. Aandacht, duidelijke afspraken en een open ontvangst maken het verschil. In het beleid diversiteit en inclusie staan de uitgangspunten van de KNAS.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="veilig-wheelchair-title">
        <div className="k-container k-split">
          <div>
            <h2 id="veilig-wheelchair-title" className="k-block-title">Rolstoelschermen</h2>
            <p className="k-lead">Rolstoelschermen is een volwaardige discipline met eigen wedstrijdvormen. De rolstoel staat vast in een frame, waardoor de nadruk ligt op bovenlichaam, klingwerk en tactiek.</p>
            <h3 className="k-rule-subhead k-subblock">Waar kun je rolstoelschermen?</h3>
            <p>In de clubzoeker herken je clubs die rolstoelschermen aanbieden of ondersteunen aan het rolstoelteken. Vraag bij de club naar de actuele trainingsmogelijkheden en de toegankelijkheid van de locatie.</p>
            <div className="k-page-header__actions">
              <Button variant="secondary" href="/clubs?rolstoelschermen" iconLeft={<Accessibility aria-hidden="true" />}>Clubs met rolstoelschermen</Button>
            </div>
          </div>
          <aside className="k-aside-note">
            <Accessibility aria-hidden="true" />
            <strong>Geen club in de buurt?</strong>
            <p>Vraag bij een club in de buurt of je er kunt rolstoelschermen. Ook als een club het nog niet aanbiedt, kan zij soms meedenken over een passende plek.</p>
            <div className="k-page-header__actions">
              <Button variant="secondary" href="/clubs">Vind een club</Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="k-section" aria-labelledby="veilig-club-title">
        <div className="k-container k-split">
          <div>
            <h2 id="veilig-club-title" className="k-block-title">Een veilige sfeer</h2>
            <p className="k-lead">Een veilige club is een plek waar je jezelf kunt zijn en waar je met een vraag of zorg terechtkunt. Dit helpt:</p>
            <ul className="k-check-list">
              {safetyHelps.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
            </ul>
          </div>
          <aside className="k-aside-note">
            <MessageCircle aria-hidden="true" />
            <strong>Ergens mee zitten?</strong>
            <p>Je kunt terecht bij de vertrouwenscontactpersonen van de KNAS via <a href="mailto:integriteit@knas.nl">integriteit@knas.nl</a>, of bij het onafhankelijke Centrum Veilige Sport Nederland.</p>
            <div className="k-page-header__actions">
              <Button variant="secondary" href="/meldpunt">Meldpunt Veilige Sport</Button>
              <Button variant="text" href="https://centrumveiligesport.nl/contact" external>Centrum Veilige Sport</Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="veilig-docs-title">
        <div className="k-container k-container--narrow">
          <h2 id="veilig-docs-title" className="k-block-title">Beleid</h2>
          <p className="k-lead">De KNAS voert beleid voor een veilige, toegankelijke en inclusieve schermsport, met aandacht voor het tegengaan van grensoverschrijdend gedrag, matchfixing en doping.</p>
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
