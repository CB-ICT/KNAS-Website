import { Briefcase, Mail, Scale, Users } from 'lucide-react';

const boardMembers = [
  { name: 'Remco Middelveld', role: 'Secretaris / bestuur', email: 'secretaris@knas.nl', image: 'images/board/remco-middelveld.png' },
  { name: 'Roeland Reesinck', role: 'Bestuur KNAS', email: 'info@knas.nl', image: 'images/board/roeland-reesinck.png' },
  { name: 'Jan-Willem Lammers', role: 'Bestuur KNAS', email: 'info@knas.nl', image: 'images/board/jan-willem-lammers.png' },
  { name: 'Patrice Masson', role: 'Bestuur KNAS', email: 'info@knas.nl', image: 'images/board/patrice-masson.jpg' },
  { name: 'Claudia Bokel', role: 'Bestuur KNAS', email: 'info@knas.nl', image: 'images/board/claudia-bokel.png' },
];

const responsibilities = [
  {
    icon: Scale,
    title: 'Koers en beleid',
    text: 'Het bestuur stelt de koers van de bond vast, bewaakt het meerjarenbeleid en legt verantwoording af aan de algemene ledenvergadering.',
  },
  {
    icon: Briefcase,
    title: 'Organisatie en middelen',
    text: 'Het bestuur is verantwoordelijk voor de financiën, het bondsbureau en de afspraken met commissies, partners en sportkoepels.',
  },
  {
    icon: Users,
    title: 'Verenigingen en sport',
    text: 'Verenigingsondersteuning, wedstrijdsport, opleidingen, topsport en veilige sport vallen onder de bestuurlijke portefeuilles.',
  },
];

interface BestuurViewProps {
  setActiveTab: (tab: string) => void;
}

export default function BestuurView({ setActiveTab }: BestuurViewProps) {
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <section className="relative overflow-hidden bg-primary px-4 py-14 text-white md:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-10 fencing-mesh-pattern"></div>
        <div className="relative mx-auto max-w-7xl">
          <span className="mb-1 block font-sans text-xs font-bold uppercase tracking-widest text-royal-orange">Organisatie</span>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl">Bestuur</h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
            Het bondsbestuur bepaalt de koers van de KNAS en werkt samen met het bondsbureau, de commissies en de verenigingen.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 md:px-10">
        <section className="grid gap-4 md:grid-cols-3">
          {responsibilities.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-lg border border-piste-silver bg-white p-5 shadow-xs">
                <Icon className="mb-4 h-7 w-7 text-royal-orange" />
                <h2 className="font-serif text-lg font-bold text-primary">{item.title}</h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-on-surface-variant">{item.text}</p>
              </article>
            );
          })}
        </section>

        <section className="rounded-lg border border-piste-silver bg-white p-6 shadow-xs md:p-8">
          <h2 className="font-serif text-2xl font-bold text-primary">Bestuursleden</h2>
          <p className="mt-2 max-w-3xl font-sans text-sm leading-relaxed text-on-surface-variant">
            Het bestuur bestaat uit vrijwilligers met elk een eigen aandachtsgebied. Je kunt een bestuurslid rechtstreeks per e-mail benaderen.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {boardMembers.map((member) => (
              <div key={member.name} className="rounded-lg border border-piste-silver bg-surface-container-lowest p-5">
                <div className="flex items-center gap-3">
                  <img
                    src={member.image}
                    alt={`Portret van ${member.name}`}
                    className="h-14 w-14 rounded-full border border-piste-silver object-cover"
                  />
                  <div>
                    <h3 className="font-serif text-base font-bold leading-tight text-primary">{member.name}</h3>
                    <span className="mt-0.5 block font-sans text-xs font-semibold text-royal-orange">{member.role}</span>
                  </div>
                </div>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-3 inline-flex items-center gap-2 font-sans text-xs font-semibold text-primary hover:text-royal-orange"
                >
                  <Mail className="h-4 w-4" /> {member.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-piste-silver bg-white p-6 shadow-xs md:p-8">
          <h2 className="font-serif text-2xl font-bold text-primary">Bestuur, bureau en commissies</h2>
          <p className="mt-2 max-w-3xl font-sans text-sm leading-relaxed text-on-surface-variant">
            Het bestuur stelt de kaders vast, het bondsbureau voert de dagelijkse zaken uit en de commissies werken de inhoudelijke onderwerpen uit, zoals wedstrijdzaken, scheidsrechters, opleidingen en topsport.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => setActiveTab('commissies')} className="inline-flex items-center gap-2 border border-primary px-5 py-3 font-sans text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-white">
              Bekijk de commissies
            </button>
            <button type="button" onClick={() => setActiveTab('contact')} className="inline-flex items-center gap-2 border border-piste-silver px-5 py-3 font-sans text-xs font-bold uppercase tracking-wider text-primary hover:border-primary">
              Contact met het bondsbureau
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
