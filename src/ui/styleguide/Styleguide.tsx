import { useEffect, useState } from 'react';
import { CalendarDays, GraduationCap, MapPin, Swords } from 'lucide-react';
import {
  Accordion, Alert, Breadcrumb, Button, ChoiceGroup, ClubCard, DataTable, EventCard,
  IconTile, NewsCard, Pagination, SearchBar, Select, TextArea, TextField,
} from '../components';
import {
  ContentTemplate, DataTableTemplate, DetailTemplate, FormTemplate, HomeTemplate,
  ListingTemplate, NotFoundTemplate, PageHeader, PageShell, SearchResultsTemplate,
} from '../templates';
import './styleguide.css';

// Interne werkpagina (noindex): componenten en templates bekijken zonder routing.
const views = {
  componenten: { label: 'Componenten & tokens', render: () => <ComponentsOverview /> },
  home: { label: 'Template: homepage', render: () => <HomeTemplate /> },
  'overzicht-nieuws': { label: 'Template: overzicht nieuws', render: () => <ListingTemplate variant="nieuws" /> },
  'overzicht-clubs': { label: 'Template: overzicht clubs', render: () => <ListingTemplate variant="clubs" /> },
  'detail-artikel': { label: 'Template: nieuwsartikel', render: () => <DetailTemplate variant="artikel" /> },
  'detail-club': { label: 'Template: clubpagina', render: () => <DetailTemplate variant="club" /> },
  content: { label: 'Template: contentpagina', render: () => <ContentTemplate /> },
  formulier: { label: 'Template: formulier', render: () => <FormTemplate /> },
  kalender: { label: 'Template: kalender', render: () => <DataTableTemplate variant="kalender" /> },
  ranglijst: { label: 'Template: ranglijst', render: () => <DataTableTemplate variant="ranglijst" /> },
  zoeken: { label: 'Template: zoekresultaten', render: () => <SearchResultsTemplate /> },
  '404': { label: 'Template: 404', render: () => <NotFoundTemplate /> },
};
type ViewKey = keyof typeof views;

const readHash = (): ViewKey => {
  const key = window.location.hash.replace('#', '') as ViewKey;
  return key in views ? key : 'componenten';
};

export default function Styleguide() {
  const [view, setView] = useState<ViewKey>(readHash);

  useEffect(() => {
    const onHash = () => { setView(readHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <>
      {views[view].render()}
      <div className="sg-switcher">
        <label htmlFor="sg-view" className="k-visually-hidden">Kies weergave</label>
        <select id="sg-view" value={view} onChange={(event) => { window.location.hash = event.target.value; }}>
          {Object.entries(views).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
        </select>
      </div>
    </>
  );
}

const swatches = [
  { name: 'navy-800', value: '#002a56', note: 'Wit erop 14.3:1 · AAA' },
  { name: 'navy-700', value: '#1e416f', note: 'Wit erop 10.3:1 · AAA' },
  { name: 'orange-500', value: '#f19012', note: 'Navy erop 5.96:1 · AA (wit erop 2.4:1 ✗)', dark: true },
  { name: 'orange-700', value: '#a35700', note: 'Als tekst op wit 5.36:1 · AA' },
  { name: 'gray-900', value: '#191c1d', note: 'Tekst op wit 17.2:1' },
  { name: 'gray-700', value: '#43474f', note: 'Tekst op wit 9.3:1' },
  { name: 'gray-600', value: '#5f6673', note: 'Tekst op wit 5.8:1' },
  { name: 'gray-500', value: '#7a8496', note: 'Invoerrand 3.8:1 (≥3:1)' },
  { name: 'red-700', value: '#b42318', note: 'Fouttekst 6.6:1' },
  { name: 'green-700', value: '#067647', note: 'Succes 5.7:1' },
];

const typeScale = ['4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'base', 'sm', 'xs'];

function ComponentsOverview() {
  return (
    <PageShell currentPath="/wedstrijden/kalender">
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Design system' }]}
        eyebrow="Fundament"
        title="KNAS design system"
        intro="Tokens en componenten. Kies rechtsonder een paginatemplate."
      />

      <div className="k-container sg-sections">
        <Section title="Kleuren en contrast">
          <div className="sg-swatches">
            {swatches.map((s) => (
              <div key={s.name} className="sg-swatch">
                <span className="sg-swatch__color" style={{ background: s.value, color: s.dark ? '#002a56' : '#fff' }}>Aa</span>
                <strong>{s.name}</strong>
                <code>{s.value}</code>
                <span className="k-muted">{s.note}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typografie">
          <div className="k-stack">
            {typeScale.map((size) => (
              <p key={size} style={{ fontSize: `var(--text-${size})`, fontFamily: ['4xl', '3xl', '2xl', 'xl'].includes(size) ? 'var(--font-serif)' : undefined, color: 'var(--color-heading)', lineHeight: 1.2 }}>
                <code className="sg-code">--text-{size}</code> Beweeg. Denk. Scherm.
              </p>
            ))}
          </div>
        </Section>

        <Section title="Knoppen">
          <div className="sg-row">
            <Button variant="primary">Primair (1× per scherm)</Button>
            <Button variant="secondary">Secundair</Button>
            <Button variant="text" href="#">Tekstlink</Button>
          </div>
          <div className="sg-row sg-dark k-on-dark">
            <Button variant="primary">Primair</Button>
            <Button variant="secondary">Secundair op donker</Button>
            <Button variant="text" href="#">Tekstlink</Button>
          </div>
        </Section>

        <Section title="Kaarten en tegels">
          <div className="k-grid k-grid--3">
            <NewsCard href="#" title="Titel van een nieuwsbericht over twee regels" date="11 oktober 2026" dateTime="2026-10-11" category="Topsport" summary="Korte samenvatting van maximaal drie regels." image="images/fencing/fencing-03.jpg" />
            <div className="k-stack">
              <ClubCard href="#" name="Schermvereniging Voorbeeld" city="Utrecht" distance="3,2 km" weapons={['Floret', 'Degen']} />
              <EventCard href="#" title="NK Senioren 2027" day="24" month="apr" dateTime="2027-04-24" location="Topsportcentrum Almere" type="NK" weapon="Alle wapens" />
            </div>
            <div className="k-stack">
              <IconTile href="#" icon={<MapPin />} label="Vind een club" description="Op plaats of postcode" />
              <IconTile href="#" icon={<Swords />} label="Begin met schermen" />
              <IconTile href="#" icon={<CalendarDays />} label="Wedstrijdkalender" />
              <IconTile href="#" icon={<GraduationCap />} label="Opleidingen" />
            </div>
          </div>
        </Section>

        <Section title="Breadcrumb, zoeken en paginering">
          <div className="k-stack" style={{ ['--stack-gap' as string]: 'var(--space-5)' }}>
            <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Wedstrijden', href: '#' }, { label: 'Ranglijsten' }]} />
            <SearchBar />
            <Pagination current={4} total={12} hrefFor={(page) => `#p${page}`} />
          </div>
        </Section>

        <Section title="Meldingen">
          <div className="k-stack">
            <Alert tone="info" title="Informatie">Inschrijving voor het NK sluit op 1 april.</Alert>
            <Alert tone="success" title="Gelukt">Je aanmelding is verstuurd.</Alert>
            <Alert tone="warning" title="Let op" dismissible>De sporthal is deze week gesloten.</Alert>
            <Alert tone="error" title="Er ging iets mis">Probeer het later opnieuw.</Alert>
          </div>
        </Section>

        <Section title="Formulierelementen">
          <form className="k-form" onSubmit={(event) => event.preventDefault()}>
            <TextField name="naam" label="Naam" autoComplete="name" />
            <TextField name="email" type="email" label="E-mailadres" hint="Bijvoorbeeld naam@voorbeeld.nl" error="Vul een geldig e-mailadres in, zoals naam@voorbeeld.nl" />
            <TextField name="postcode" label="Postcode" width="sm" optional />
            <Select name="wapen" label="Wapen" options={[{ value: 'f', label: 'Floret' }, { value: 'd', label: 'Degen' }, { value: 's', label: 'Sabel' }]} />
            <ChoiceGroup name="niveau" type="radio" label="Ervaring" options={[{ value: '0', label: 'Nog nooit geschermd' }, { value: '1', label: 'Een paar keer', hint: 'Bijvoorbeeld een proefles of clinic.' }]} />
            <ChoiceGroup name="dag" type="checkbox" label="Voorkeursdagen" optional error="Kies minstens één dag" options={[{ value: 'ma', label: 'Maandag' }, { value: 'wo', label: 'Woensdag' }, { value: 'za', label: 'Zaterdag' }]} />
            <TextArea name="opmerking" label="Opmerking" optional rows={3} />
          </form>
        </Section>

        <Section title="Tabel (responsive)">
          <DataTable
            caption="Ranglijst heren degen senioren (voorbeeld)"
            rowKey={(row) => row.pos}
            rows={[
              { pos: '1', naam: '[Naam]', club: '[Club]', punten: 120 },
              { pos: '2', naam: '[Naam]', club: '[Club]', punten: 96 },
              { pos: '3', naam: '[Naam]', club: '[Club]', punten: 88 },
            ]}
            columns={[
              { key: 'pos', header: 'Positie', sortValue: (row) => Number(row.pos) },
              { key: 'naam', header: 'Naam', primary: true },
              { key: 'club', header: 'Club' },
              { key: 'punten', header: 'Punten', align: 'end', sortValue: (row) => row.punten },
            ]}
          />
        </Section>

        <Section title="Accordion (FAQ)">
          <Accordion
            name="sg-faq"
            items={[
              { question: 'Vanaf welke leeftijd kan ik beginnen?', answer: <p>Antwoord in één of twee korte alinea's.</p> },
              { question: 'Wat kost een proefles?', answer: <p>Antwoord.</p> },
              { question: 'Moet ik zelf uitrusting kopen?', answer: <p>Antwoord.</p> },
            ]}
          />
        </Section>
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children?: any }) {
  return (
    <section className="sg-section" aria-label={title}>
      <h2 className="sg-section__title">{title}</h2>
      {children}
    </section>
  );
}
