import { Accessibility, ExternalLink, MapPin, Users } from 'lucide-react';

interface InclusieViewProps {
  setActiveTab: (tab: string) => void;
}

export default function InclusieView({ setActiveTab }: InclusieViewProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <section className="relative overflow-hidden bg-primary px-4 py-14 text-white md:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-10 fencing-mesh-pattern"></div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="mb-1 block font-sans text-xs font-bold uppercase tracking-widest text-royal-orange">Iedereen hoort erbij</span>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl">Diversiteit &amp; inclusie</h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
            Schermen is er voor mensen met verschillende achtergronden, mogelijkheden en ambities. Samen werken we aan clubs waar iedereen zich welkom en veilig voelt.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-lg border border-piste-silver bg-white p-6 shadow-xs">
            <Users className="mb-4 h-7 w-7 text-royal-orange" />
            <h2 className="font-serif text-xl font-bold text-primary">Een plek voor iedereen</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-on-surface-variant">
              Een inclusieve club maakt ruimte voor verschillen in leeftijd, gender, achtergrond, niveau en beperking. Aandacht, duidelijke afspraken en een open ontvangst maken daarin het verschil.
            </p>
          </article>
          <article className="rounded-lg border border-piste-silver bg-white p-6 shadow-xs">
            <Accessibility className="mb-4 h-7 w-7 text-royal-orange" />
            <h2 className="font-serif text-xl font-bold text-primary">Rolstoelschermen</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-on-surface-variant">
              Rolstoelschermen is een volwaardige discipline met eigen wedstrijdvormen. De rolstoel staat vast in een frame; daardoor ligt de nadruk op bovenlichaam, klingwerk en tactiek.
            </p>
          </article>
          <article className="rounded-lg border border-piste-silver bg-white p-6 shadow-xs">
            <MapPin className="mb-4 h-7 w-7 text-royal-orange" />
            <h2 className="font-serif text-xl font-bold text-primary">Waar kun je rolstoelschermen?</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-on-surface-variant">
              Rolstoelschermen wordt op dit moment aangeboden of ondersteund door verenigingen in onder meer Breda, Gouda, Arnhem, Alkmaar, Heemstede, Amsterdam, Den Bosch, Den Haag en Baarn. Informeer bij de vereniging naar de actuele trainingsmogelijkheden en toegankelijkheid van de locatie.
            </p>
            <div className="mt-5 rounded border border-piste-silver bg-surface-container-low p-3 font-sans text-xs text-on-surface-variant">
              Mogelijke locaties: Pallas Wheelchair Fencing Team Breda, De Vrijbuiters Gouda, Scaramouche Arnhem, HollandSchermen Alkmaar/Heemstede, SchermCentrumAmsterdam, Schermclub Den Bosch, Ter Weer Den Haag en Vivas Baarn.
            </div>
          </article>
        </div>

        <section className="mt-8 rounded-lg border border-piste-silver bg-primary p-6 text-white shadow-xs md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-royal-orange">Beleid</span>
            <h2 className="mt-1 font-serif text-2xl font-bold">Beleid diversiteit en inclusie 2025</h2>
            <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-white/80">
              In dit beleid beschrijft de bond de uitgangspunten voor een veilige, toegankelijke en inclusieve schermsport.
            </p>
          </div>
          <a
            href="docs/source/beleid-diversiteit-inclusie-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex shrink-0 items-center gap-2 border border-white/60 px-5 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white hover:border-royal-orange hover:text-royal-orange md:mt-0"
          >
            Lees het beleid <ExternalLink className="h-4 w-4" />
          </a>
        </section>

        <div className="mt-8 rounded-lg border border-piste-silver bg-white p-6 shadow-xs">
          <h2 className="font-serif text-xl font-bold text-primary">Begin bij een club in de buurt</h2>
          <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-on-surface-variant">
            Vraag een vereniging naar de mogelijkheden, toegankelijkheid van de locatie en begeleiding. Ook wanneer een club nog geen rolstoelschermen aanbiedt, kan zij soms meedenken over een passende plek.
          </p>
          <button type="button" onClick={() => setActiveTab('verenigingen')} className="mt-5 inline-flex items-center gap-2 bg-royal-orange px-5 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-primary">
            Vind een club
          </button>
        </div>
      </section>
    </div>
  );
}
