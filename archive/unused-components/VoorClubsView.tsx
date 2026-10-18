import React from 'react';
import { FileText, School, Users } from 'lucide-react';

const sections = [
  {
    id: 'clubs-oprichten',
    title: 'Ondersteuning club oprichten',
    text: 'Begin met een initiatiefgroep, een bestuur, een geschikte accommodatie en een veilig sportaanbod. Denk daarnaast aan statuten, ledenadministratie, trainers, materiaal en de aansluiting bij de bond.',
    resource: { label: 'Lees het Algemeen Reglement', url: 'docs/policy/algemeen-reglement-2025.pdf' },
  },
  {
    id: 'clubs-wittevlek',
    title: 'Witte Vlekkenplan',
    text: 'In regio’s met weinig of geen schermaanbod kan een nieuw initiatief beginnen met kennismakingslessen, samenwerking met scholen en een haalbaar plan voor zaal, trainers en continuïteit.',
    resource: { label: 'Lees de uitleg over het Witte Vlekkenplan', url: 'docs/source/witte-vlekkenplan-uitleg.pdf' },
  },
  {
    id: 'clubs-overschrijven',
    title: 'Leden overschrijven',
    text: 'Een overschrijving loopt via de ledenadministratie van de betrokken verenigingen. Maak afspraken over de einddatum, contributie en eventuele verplichtingen voordat de wijziging wordt doorgegeven.',
    resource: { label: 'Lees de procedure voor overschrijven', url: 'docs/source/overschrijven-leden-uitleg.html' },
  },
  {
    id: 'clubs-opleidingen',
    title: 'Opleidingen en trainers',
    text: 'Een sterke club bouwt aan deskundige trainers en begeleiders. De TCS1-5-structuur biedt een route van assistentie op de clubvloer naar zelfstandig lesgeven en coachen.',
    resource: { label: 'Bekijk de TCS1-5-structuur', url: 'docs/knas-opleidingen-tcs1-5.pdf' },
  },
  {
    id: 'clubs-veiligheid',
    title: 'Veilige club en vrijwilligers',
    text: 'Bestuurders en vrijwilligers maken samen de cultuur van een vereniging. Werk met duidelijke gedragsafspraken, een zorgvuldige introductie van vrijwilligers en aandacht voor meldroutes en sociale veiligheid.',
    resource: { label: 'Lees het vrijwilligersbeleid', url: 'docs/source/vrijwilligersbeleid-2025.pdf' },
  },
  {
    id: 'clubs-verenigingen',
    title: 'Alle verenigingen',
    text: 'Gebruik de clubzoeker om verenigingen te vinden op plaats, postcode, naam en wapen. Neem rechtstreeks contact op met een club voor training, proeflessen en actuele openingstijden.',
    resource: { label: 'Open de clubzoeker', tab: 'verenigingen' },
  },
];

interface VoorClubsViewProps {
  setActiveTab: (tab: string) => void;
}

export default function VoorClubsView({ setActiveTab }: VoorClubsViewProps) {
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <section className="bg-primary text-white py-14 px-4 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 fencing-mesh-pattern" aria-hidden />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-1">Voor verenigingen</p>
          <h1 className="font-serif text-4xl font-bold">Voor clubs</h1>
          <p className="font-sans text-sm text-white/85 mt-3 max-w-3xl">
            Verenigingen zijn het hart van de schermsport. Hier vind je ondersteuning, opleidingen en formulieren,
            zodat bestuurders, trainers en vrijwilligers snel verder kunnen.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-10 space-y-6">
        <section id="clubs-ondersteuning" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((item) => (
            <article id={item.id} key={item.title} className="scroll-mt-24 rounded-xl border border-piste-silver bg-white p-5 shadow-xs">
              <h2 className="font-serif text-xl font-bold text-primary">{item.title}</h2>
              <p className="mt-2 font-sans text-xs text-on-surface-variant leading-relaxed">{item.text}</p>
              {item.resource && ('tab' in item.resource ? (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(item.resource.tab);
                    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 360);
                  }}
                  className="mt-4 inline-flex font-sans text-xs font-bold uppercase tracking-wider text-primary hover:text-royal-orange"
                >
                  {item.resource.label}
                </button>
              ) : (
                <a href={item.resource.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex font-sans text-xs font-bold uppercase tracking-wider text-primary hover:text-royal-orange">
                  {item.resource.label}
                </a>
              ))}
            </article>
          ))}
        </section>

        <section id="clubs-verenigingen" className="rounded-xl border border-piste-silver bg-surface-container p-6 grid gap-3 md:grid-cols-3">
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 mt-0.5 text-primary" />
            <p className="text-xs font-sans text-on-surface-variant">Vragen over ledenadministratie: leden@knas.nl</p>
          </div>
          <div className="flex items-start gap-2">
            <School className="w-4 h-4 mt-0.5 text-primary" />
            <p className="text-xs font-sans text-on-surface-variant">Vragen over opleidingen: opleidingen@knas.nl</p>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 mt-0.5 text-primary" />
            <p className="text-xs font-sans text-on-surface-variant">Algemene ondersteuning: info@knas.nl</p>
          </div>
        </section>
      </main>
    </div>
  );
}
