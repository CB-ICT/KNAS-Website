import { CreditCard, FileCheck, ShieldCheck, Users } from 'lucide-react';

const fees = [
  { amount: '€ 74,70', label: 'Senioren', detail: '23 jaar en ouder' },
  { amount: '€ 37,35', label: 'Jeugd', detail: '22 jaar en jonger' },
  { amount: '€ 6,00', label: 'Introductielidmaatschap', detail: 'eenmalig, 3 maanden' },
  { amount: '€ 12,00', label: 'Niet-schermend lid', detail: 'bestuursfuncties' },
];

const benefits = [
  'Deelname aan wedstrijden, competities en nationale kampioenschappen.',
  'Toegang tot opleidingen en bijscholing voor trainers, scheidsrechters en vrijwilligers.',
  'Collectieve aansprakelijkheids- en ongevallenverzekering tijdens het schermen.',
  'Registratie in de ledenadministratie en verwerking van resultaten op de ranglijsten.',
  'Ondersteuning van wedstrijdkalender, jeugd- en veteranenprogramma’s en materiaal.',
];

interface LidmaatschapViewProps {
  setActiveTab: (tab: string) => void;
}

export default function LidmaatschapView({ setActiveTab }: LidmaatschapViewProps) {
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <section className="relative overflow-hidden bg-primary px-4 py-14 text-white md:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-10 fencing-mesh-pattern"></div>
        <div className="relative mx-auto max-w-7xl">
          <span className="mb-1 block font-sans text-xs font-bold uppercase tracking-widest text-royal-orange">Lid worden en blijven</span>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl">Lidmaatschap en kosten</h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
            Je wordt lid via de vereniging waar je schermt. Je betaalt daar de clubcontributie; de vereniging draagt daarnaast een bondsbijdrage af aan de KNAS.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 md:px-10">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            ['1', 'Kies een vereniging', 'Zoek een club in de buurt en volg daar training of een proefles.'],
            ['2', 'De club meldt je aan', 'Na de introductieperiode registreert de vereniging je bij de bond.'],
            ['3', 'Je bent aangesloten', 'Je kunt meedoen aan wedstrijden, opleidingen en het verenigingsleven.'],
          ].map(([step, title, text]) => (
            <article key={step} className="rounded-lg border border-piste-silver bg-white p-5 shadow-xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-sans text-sm font-bold text-white">{step}</span>
              <h2 className="mt-4 font-serif text-lg font-bold text-primary">{title}</h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-on-surface-variant">{text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-piste-silver bg-white p-6 shadow-xs md:p-8">
          <div className="mb-2 flex items-center gap-3">
            <CreditCard className="h-7 w-7 text-royal-orange" />
            <h2 className="font-serif text-2xl font-bold text-primary">Wat kost je KNAS-lidmaatschap?</h2>
          </div>
          <p className="max-w-3xl font-sans text-sm leading-relaxed text-on-surface-variant">
            De bedragen hieronder zijn de jaarlijkse KNAS-bondsbijdragen voor kalenderjaar 2026. Je betaalt deze bijdrage via je vereniging. De vereniging bepaalt daarnaast haar eigen contributie voor trainingen, zaalhuur en begeleiding.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {fees.map((fee) => (
              <div key={fee.label} className="rounded-lg border border-piste-silver bg-surface-container-lowest p-4">
                <strong className="block font-serif text-2xl text-primary">{fee.amount}</strong>
                <span className="mt-1 block font-sans text-sm font-semibold text-primary">{fee.label}</span>
                <span className="font-sans text-xs text-on-surface-variant">{fee.detail}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <strong className="block font-serif text-xl text-primary">Clubcontributie</strong>
              <span className="mt-1 block font-sans text-sm font-semibold text-primary">ongeveer €150–€450 per jaar</span>
              <span className="font-sans text-xs text-on-surface-variant">Los van de KNAS-bondsbijdrage, tenzij de club beide bedragen samen int.</span>
            </div>
            <div className="rounded-lg border border-piste-silver bg-surface-container-lowest p-4">
              <strong className="block font-serif text-xl text-primary">KNAS-bondsbijdrage</strong>
              <span className="mt-1 block font-sans text-sm font-semibold text-primary">onderdeel van je verenigingslidmaatschap</span>
              <span className="font-sans text-xs text-on-surface-variant">De club regelt de aanmelding en draagt de bondsbijdrage af.</span>
            </div>
          </div>
          <p className="mt-4 font-sans text-xs italic text-on-surface-variant">
            Het introductielidmaatschap loopt automatisch af en kan één keer per persoon worden verstrekt.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-piste-silver bg-white p-6 shadow-xs md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-royal-orange" />
              <h2 className="font-serif text-2xl font-bold text-primary">Wat krijg je ervoor?</h2>
            </div>
            <ul className="space-y-2 font-sans text-sm leading-relaxed text-on-surface-variant">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2">
                  <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-royal-orange" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-piste-silver bg-white p-6 shadow-xs md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Users className="h-7 w-7 text-royal-orange" />
              <h2 className="font-serif text-2xl font-bold text-primary">Wijzigingen en vragen</h2>
            </div>
            <p className="font-sans text-sm leading-relaxed text-on-surface-variant">
              Overstappen naar een andere vereniging, stoppen of gegevens wijzigen loopt via de ledenadministratie van je club. In bijzondere gevallen is een persoonlijk lidmaatschap mogelijk.
            </p>
            <a href="/beginnen/veelgestelde-vragen" className="mt-4 inline-block font-sans text-xs font-bold uppercase tracking-wider text-primary underline decoration-royal-orange underline-offset-4 hover:text-royal-orange">
              Bekijk de veelgestelde vragen
            </a>
            <a href="mailto:leden@knas.nl" className="mt-5 inline-flex items-center gap-2 bg-royal-orange px-5 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-primary">
              Mail de ledenadministratie
            </a>
            <button type="button" onClick={() => setActiveTab('verenigingen')} className="mt-3 block font-sans text-xs font-bold uppercase tracking-wider text-primary hover:text-royal-orange">
              Vind eerst een vereniging
            </button>
          </article>
        </section>
      </main>
    </div>
  );
}
