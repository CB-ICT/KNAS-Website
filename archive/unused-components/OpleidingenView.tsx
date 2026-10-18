import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Download,
  Flag,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UserRoundCheck,
} from 'lucide-react';

type Program = {
  id: string;
  title: string;
  role: string;
  level: string;
  duration: string;
  studyLoad: string;
  entry: string;
  fee: string;
  status: string;
  color: string;
  border: string;
  glow: string;
};

const programs: Program[] = [
  {
    id: 'TCS1',
    title: 'Assistent op de vereniging',
    role: 'Zaalassistent (club)',
    level: 'Instapniveau',
    duration: '2-6 maanden',
    studyLoad: '40 uur',
    entry: '15-18 jaar + praktijkbegeleider',
    fee: 'EUR 30,00',
    status: 'Actief',
    color: 'bg-cyan-500',
    border: 'border-cyan-200',
    glow: 'from-cyan-400/20',
  },
  {
    id: 'TCS2',
    title: 'Zelfstandig lesgeven - basis',
    role: 'Basistrainer (regionaal)',
    level: 'Didactische basis op 3 wapens',
    duration: '6 maanden',
    studyLoad: '250 uur',
    entry: 'Start 17,5 jaar + praktijkbegeleider',
    fee: 'EUR 600,00',
    status: 'Actief',
    color: 'bg-emerald-500',
    border: 'border-emerald-200',
    glow: 'from-emerald-400/20',
  },
  {
    id: 'TCS3',
    title: 'Verenigingstrainer wedstrijdsport',
    role: 'Verenigingstrainer (landelijk)',
    level: 'Coachend op nationaal niveau',
    duration: '1 jaar',
    studyLoad: '400 uur',
    entry: '18+ jaar + 1 jaar TCS2 + praktijkbegeleider',
    fee: 'EUR 700,00',
    status: 'Actief',
    color: 'bg-amber-500',
    border: 'border-amber-200',
    glow: 'from-amber-400/20',
  },
  {
    id: 'TCS4',
    title: 'Talentontwikkeling jeugd internationaal',
    role: 'Talentcoach (internationaal)',
    level: 'Langjarige talentbegeleiding',
    duration: '1-1,5 jaar',
    studyLoad: '400 uur',
    entry: '2 jaar TCS3 + stageplek + praktijkbegeleider',
    fee: 'EUR 2600,00 (met KNAS-regeling deels vergoed)',
    status: 'Nog niet opengesteld',
    color: 'bg-fuchsia-500',
    border: 'border-fuchsia-200',
    glow: 'from-fuchsia-400/20',
  },
  {
    id: 'TCS5',
    title: 'Topsport senioren presteren internationaal',
    role: 'Topsportcoach (internationaal)',
    level: 'AD Sport / topsportomgeving',
    duration: '2 jaar (HvA)',
    studyLoad: 'In overleg',
    entry: 'TCS4 + werkplek in topsportomgeving',
    fee: 'Zelf bekostigen',
    status: 'Via partnerroute',
    color: 'bg-rose-500',
    border: 'border-rose-200',
    glow: 'from-rose-400/20',
  },
];

const admissionRows = [
  {
    onderwerp: 'Gedragscode',
    tcs2: 'Ondertekenen gedragscode trainers/coaches',
    tcs3: 'Verplicht',
    tcs4: 'Verplicht',
  },
  {
    onderwerp: 'Ervaring',
    tcs2: '3 jaar schermervaring, 1 wapen',
    tcs3: '5 jaar ervaring, 2 wapens + basis 3e',
    tcs4: 'Nationaal + internationaal, 3 wapens',
  },
  {
    onderwerp: 'Leeftijd',
    tcs2: 'Start vanaf 17,5 jaar',
    tcs3: 'Minimaal 18 jaar',
    tcs4: 'Minimaal 20 jaar',
  },
];

const featurePillars = [
  'Leren in de praktijk op de vereniging met praktijkbegeleider (PB).',
  'Driehoek Schermen-Leraar-Schermer als basis van elke opleidingssituatie.',
  'Positief en veilig sportklimaat: relatie, competentie en autonomie.',
  'Koppeling met KSS24 en samenwerking met NOC*NSF en toetscommissie.',
];

const growthPath = [
  { id: 'TCS1', label: 'Assisteren op de club', icon: Layers },
  { id: 'TCS2', label: 'Zelfstandig training geven', icon: CheckCircle2 },
  { id: 'TCS3', label: 'Wedstrijdsport begeleiden', icon: Trophy },
  { id: 'TCS4', label: 'Talentontwikkeling internationaal', icon: Sparkles },
  { id: 'TCS5', label: 'Topsport presteren', icon: Rocket },
];

export default function OpleidingenView() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-container-low to-surface-container-lowest">
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-15 fencing-mesh-pattern" aria-hidden />
        <div className="absolute -left-16 -top-24 h-64 w-64 rounded-full bg-royal-orange/25 blur-3xl" aria-hidden />
        <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" aria-hidden />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:px-10 md:py-18">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-5"
          >
            <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-royal-orange">KNAS Opleidingen</p>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
              TCS1 t/m TCS5
              <span className="block text-2xl text-white/80 md:text-3xl">van zaalassistent tot topsportcoach</span>
            </h1>
            <p className="max-w-xl font-sans text-sm leading-relaxed text-white/90 md:text-base">
              Deze pagina is opgebouwd uit de KNAS-opleidingsgids (mei 2025) en geeft je een helder overzicht
              van instroom, studielast, kosten en doorgroeiroutes binnen de trainer-coach-schermen lijn.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="docs/knas-opleidingen-tcs1-5.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded bg-royal-orange px-5 py-3 font-sans text-xs font-bold uppercase tracking-widest text-white transition hover:brightness-110"
              >
                Download PDF <Download className="h-4 w-4" />
              </a>
              <a
                href="mailto:opleidingen@knas.nl"
                className="inline-flex items-center gap-2 rounded border border-white/40 px-5 py-3 font-sans text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/10"
              >
                Contact Opleidingen <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55, ease: 'easeOut' }}
            className="grid grid-cols-2 gap-3 self-center"
          >
            <div className="col-span-2 overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
              <img
                src="images/fencing/fencing-08.jpg"
                alt="KNAS trainer-coach opleiding in de schermzaal"
                className="h-36 w-full object-cover md:h-44"
              />
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-widest text-white/80">Niveaus</p>
              <p className="mt-2 font-serif text-3xl font-bold">5</p>
              <p className="mt-1 text-xs text-white/85">TCS1 tot en met TCS5</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-widest text-white/80">Startleeftijd</p>
              <p className="mt-2 font-serif text-3xl font-bold">17,5</p>
              <p className="mt-1 text-xs text-white/85">zelfstandig lesgeven vanaf TCS2</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-widest text-white/80">Langste traject</p>
              <p className="mt-2 font-serif text-3xl font-bold">2 jaar</p>
              <p className="mt-1 text-xs text-white/85">TCS5 via HvA-partnerroute</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-widest text-white/80">Kwalificatie</p>
              <p className="mt-2 font-serif text-3xl font-bold">KSS24</p>
              <p className="mt-1 text-xs text-white/85">kwalificatiestructuur sport</p>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="relative z-10 mx-auto -mt-8 w-full max-w-7xl space-y-6 px-4 pb-12 md:-mt-10 md:px-10">
        <section className="rounded-2xl border border-piste-silver bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-primary/75">Doorgroeipad</p>
              <h2 className="font-serif text-2xl font-bold text-primary">Van clubvloer naar topsport</h2>
            </div>
            <span className="hidden rounded-full bg-surface-container px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-widest text-primary/80 md:inline-flex">
              Leren in stappen
            </span>
          </div>

          <div className="relative grid gap-3 md:grid-cols-5">
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-cyan-400 via-emerald-400 via-amber-400 via-fuchsia-400 to-rose-400 md:block" />
            {growthPath.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                  className="relative rounded-xl border border-piste-silver bg-surface-container-lowest p-4"
                >
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-primary/70">{step.id}</p>
                  <p className="mt-1 font-sans text-xs font-semibold leading-snug text-on-surface-variant">{step.label}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-piste-silver bg-white p-5 shadow-sm md:p-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-primary">Opleidingslijn</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary">Overzicht TCS1-5</h2>
            </div>
            <p className="max-w-md text-right font-sans text-xs text-on-surface-variant">
              Van assistentie op de clubvloer tot internationale topsportcoaching: elk niveau bouwt op het vorige.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program, index) => (
              <motion.article
                key={program.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
                className={`group relative overflow-hidden rounded-xl border bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${program.border}`}
              >
                <div className={`absolute right-0 top-0 h-1.5 w-full ${program.color}`} />
                <div className={`pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${program.glow} to-transparent blur-2xl`} />
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-primary/75">{program.id}</p>
                    <h3 className="mt-1 font-serif text-xl font-bold text-primary">{program.title}</h3>
                  </div>
                  <span className="rounded-full bg-surface-container px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-primary/80">
                    {program.status}
                  </span>
                </div>

                <p className="mb-4 text-sm font-sans font-semibold text-on-surface-variant">{program.role}</p>

                <div className="space-y-2 border-y border-piste-silver/70 py-3 font-sans text-xs text-on-surface-variant">
                  <p className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-primary" /> {program.duration} | {program.studyLoad}</p>
                  <p className="flex items-center gap-2"><UserRoundCheck className="h-4 w-4 text-primary" /> {program.entry}</p>
                  <p className="flex items-center gap-2"><Trophy className="h-4 w-4 text-primary" /> {program.fee}</p>
                </div>

                <p className="mt-3 font-sans text-xs text-on-surface-variant">{program.level}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-piste-silver bg-white p-5 shadow-sm md:p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="font-serif text-2xl font-bold text-primary">Toelatingsvoorwaarden TCS2-TCS4</h3>
              <p className="mt-2 font-sans text-xs leading-relaxed text-on-surface-variant">
                Samenvatting van de voorwaarden uit de opleidingsgids. Voor exacte uitzonderingen en vrijstellingen
                (EVC) geldt altijd het meest recente KNAS-reglement.
              </p>

              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full border-collapse font-sans text-xs">
                  <thead>
                    <tr className="bg-surface-container text-left text-primary">
                      <th className="border border-piste-silver px-4 py-3 font-bold uppercase tracking-widest">Onderwerp</th>
                      <th className="border border-piste-silver px-4 py-3 font-bold uppercase tracking-widest">TCS2</th>
                      <th className="border border-piste-silver px-4 py-3 font-bold uppercase tracking-widest">TCS3</th>
                      <th className="border border-piste-silver px-4 py-3 font-bold uppercase tracking-widest">TCS4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admissionRows.map((row) => (
                      <tr key={row.onderwerp} className="odd:bg-white even:bg-surface-container-lowest">
                        <td className="border border-piste-silver px-4 py-3 font-bold text-primary">{row.onderwerp}</td>
                        <td className="border border-piste-silver px-4 py-3 text-on-surface-variant">{row.tcs2}</td>
                        <td className="border border-piste-silver px-4 py-3 text-on-surface-variant">{row.tcs3}</td>
                        <td className="border border-piste-silver px-4 py-3 text-on-surface-variant">{row.tcs4}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl border border-piste-silver bg-primary p-6 text-white">
                <h4 className="font-serif text-xl font-bold">Waarom deze opzet werkt</h4>
                <ul className="mt-4 space-y-3 font-sans text-xs leading-relaxed text-white/90">
                  {featurePillars.map((pillar) => (
                    <li key={pillar} className="flex items-start gap-2">
                      <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal-orange" />
                      <span>{pillar}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-piste-silver bg-white p-6">
                <h4 className="font-serif text-xl font-bold text-primary">Praktisch</h4>
                <div className="mt-4 space-y-3 text-xs font-sans text-on-surface-variant">
                  <p className="flex items-center gap-2"><Flag className="h-4 w-4 text-primary" /> Instroom vaak via eigen vereniging.</p>
                  <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Veilig sportklimaat en gedragscode zijn basisvoorwaarden.</p>
                  <p className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Vragen: opleidingen@knas.nl</p>
                </div>
                <a
                  href="docs/knas-opleidingen-tcs1-5.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded bg-primary px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-white transition hover:bg-royal-orange"
                >
                  Bekijk bronbestand <Download className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section id="opleidingen-kader" className="mx-auto w-full max-w-7xl px-0 pb-4 scroll-mt-24">
          <div className="mb-6">
            <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-royal-orange">Scheidsrechters &amp; vrijwilligers</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Meer dan trainers</h2>
            <p className="mt-2 max-w-2xl font-sans text-sm text-on-surface-variant leading-relaxed">
              Een sterke schermsport draait ook op scheidsrechters en vrijwilligers. Ook daar zijn opleiding, begeleiding en duidelijke afspraken voor.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-piste-silver bg-white p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"><ShieldCheck className="h-4 w-4" /></span>
                <h3 className="font-serif text-lg font-bold text-primary">Scheidsrechters</h3>
              </div>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                De Scheidsrechterscommissie verzorgt opleiding, begeleiding en inzet van scheidsrechters bij toernooien en kampioenschappen.
                Interesse om scheidsrechter te worden of je te ontwikkelen? Neem contact op met de commissie.
              </p>
              <a
                href="mailto:scheidsrechters@knas.nl"
                className="mt-4 inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-primary hover:text-royal-orange transition-colors"
              >
                scheidsrechters@knas.nl <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-xl border border-piste-silver bg-white p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"><UserRoundCheck className="h-4 w-4" /></span>
                <h3 className="font-serif text-lg font-bold text-primary">Vrijwilligers</h3>
              </div>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Vrijwilligers zijn onmisbaar bij verenigingen, toernooien en commissies. Het KNAS-vrijwilligersbeleid beschrijft
                hoe de bond vrijwilligers werft, begeleidt en waardeert.
              </p>
              <a
                  href="docs/source/vrijwilligersbeleid-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-primary hover:text-royal-orange transition-colors"
              >
                Vrijwilligersbeleid (PDF) <Download className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
