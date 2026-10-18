import { motion } from 'motion/react';
import { BookOpen, Download, Globe2, Medal, Plane, ShieldCheck, Target, Trophy, Users } from 'lucide-react';

const route = [
  {
    step: '1',
    title: 'Vereniging',
    text: 'Iedere topsporter begint bij een club: structureel trainen, lessen volgen en meedoen aan nationale wedstrijden.',
  },
  {
    step: '2',
    title: 'Talentontwikkeling',
    text: 'Regiotrainingen en talentprofielen helpen om aanleg vroeg te herkennen en gericht door te ontwikkelen.',
  },
  {
    step: '3',
    title: 'Begeleidingsteam',
    text: 'Per wapen begeleidt een team jeugdtalenten via een kwalificatieprogramma richting internationale jeugdtiteltoernooien.',
  },
  {
    step: '4',
    title: 'Oranje en TeamNL',
    text: 'Senioren komen uit op World Cups, Grand Prix, EK en WK en maken deel uit van TeamNL.',
  },
];

const oranje = [
  'Nederlandse senioren komen uit op WK, EK, World Cups en Grand Prix, individueel en met een equipe. Zij maken deel uit van TeamNL.',
  'Ook cadetten en junioren vertegenwoordigen Nederland internationaal, onder meer via het EFC Cadettencircuit en de FIE Junior World Cup.',
  'De selectie-eisen maken vanaf 2026-2027 onderdeel uit van het Handboek Schermer.',
];

const teams = [
  {
    code: 'DBT',
    weapon: 'Degen',
    title: 'Degen Begeleidingsteam',
    text: 'Begeleidt talentvolle degenschermers richting internationale jeugdtiteltoernooien. Resultaten op aangewezen kwalificatiewedstrijden tellen mee, naast ontwikkeling en potentieel.',
    docs: [
      { label: 'Kwalificatiekalender DBT 26-27', url: 'docs/topsport/kwalificatiekalender-dbt-26-27.pdf' },
      { label: 'Werkwijze wedstrijdbegeleiding', url: 'docs/topsport/werkwijze-wedstrijdbegeleiding-dbt.pdf' },
    ],
  },
  {
    code: 'FBT',
    weapon: 'Floret',
    title: 'Floret Begeleidingsteam',
    text: 'Ondersteunt floretschermers richting internationale jeugdtiteltoernooien. Het kwalificatieprogramma combineert aangewezen wedstrijden, begeleiding en ontwikkeling; deelname is geen automatische selectie.',
    docs: [
      { label: 'Kwalificatiekalender FBT 26-27', url: 'docs/topsport/kwalificatiekalender-fbt-26-27.pdf' },
    ],
  },
  {
    code: 'SBT',
    weapon: 'Sabel',
    title: 'Sabel Begeleidingsteam',
    text: 'Begeleidt sabelschermers via nationale trainingen, stages en wedstrijdbegeleiding richting EJK, WJK en EK U23. Ook hier tellen resultaten, ontwikkeling en potentieel samen mee.',
    docs: [
      { label: 'Kwalificatiekalender SBT 26-27', url: 'docs/topsport/kwalificatiekalender-sbt-26-27.pdf' },
    ],
  },
];

const selectionDocs = [
  { label: 'Selectie-eisen (extract Handboek Schermer)', url: 'docs/topsport/extract-handboek-schermer-selectie-eisen.pdf' },
  { label: 'Intakeformulier 2026-2027', url: 'docs/topsport/intakeformulier-2026-2027.pdf' },
  { label: 'Sportersovereenkomst 2026-2027', url: 'docs/topsport/sportersovereenkomst-2026-2027.pdf' },
];

const conductDocs = [
  { label: 'Gedragscode voor sporters', url: 'docs/topsport/gedragscode-sporters-2025.docx' },
  { label: 'Gedragscode voor trainers, coaches en begeleiders', url: 'docs/topsport/gedragscode-trainers-coaches-begeleiders-2025.docx' },
];

const athleteCommission = ['Tristan Tulen', 'Teun Jans Köhneke', 'Marleen Buitenhuis'];

const selection = [
  'Selectie gaat niet op ranglijstpunten alleen: resultaten op aangewezen kwalificatiewedstrijden wegen zwaar, maar ontwikkeling en potentieel tellen mee.',
  'Je meldt je via een intakeformulier aan voor het kwalificatieprogramma van je wapen, in overleg met je clubtrainer.',
  'Je stemt je trainings- en wedstrijdprogramma af met het begeleidingsteam en neemt deel aan nationale trainingsstages.',
  'Op een vooraf bepaalde selectiedatum stelt het begeleidingsteam de selectie voor het titeltoernooi samen.',
];

const talent = [
  'Talentidentificatie en -ontwikkeling zijn essentieel: zonder talent is er geen topsport.',
  'Regiotrainingen helpen om talent vroeg te herkennen en gericht te ontwikkelen.',
  'NOC*NSF kent drie statussen: Internationaal Talent (IT), Nationaal Talent (NT) en Belofte (B), toegekend aan de hand van de KNAS-talentprofielen.',
];

const internationalFlow = [
  'Aanmeldingen voor World Cup-, satelliet- en Europese cadetten-/U23-wedstrijden lopen via de (wedstrijd)secretaris van de vereniging.',
  'Deze aanmeldingen moeten uiterlijk vier weken voor de wedstrijd bij KNAS Internationaal binnen zijn.',
  'Aanmeldingen voor titeltoernooien lopen via de bondscoach, de technisch directeur en/of het bestuurslid Topsport.',
  'Te late aanmeldingen of aanmeldingen door anderen dan de wedstrijdsecretaris worden niet geaccepteerd.',
];

interface TopsportViewProps {
  setActiveTab?: (tab: string) => void;
}

export default function TopsportView({ setActiveTab }: TopsportViewProps) {
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <section className="relative flex min-h-[380px] items-center overflow-hidden bg-primary py-16 text-white">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('images/fencing/fencing-01.jpg')" }}
          role="img"
          aria-label="Schermer in actie tijdens een internationale wedstrijd"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary via-primary/85 to-primary/40" aria-hidden />
        <div className="pointer-events-none absolute inset-0 z-10 opacity-10 fencing-mesh-pattern" aria-hidden />

        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 md:px-10">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-royal-orange">KNAS Topsport</p>
          <h1 className="mt-2 max-w-3xl font-serif text-4xl font-bold leading-tight md:text-5xl">
            Van talent naar internationale top
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/90 md:text-base">
            De KNAS begeleidt schermers stap voor stap: van regionale talentontwikkeling en begeleidingsteams per wapen
            tot deelname aan World Cups, EK&apos;s en WK&apos;s binnen TeamNL.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-12 md:px-10">
        <section>
          <div className="mb-5 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-2xl font-bold text-primary">De route naar de top</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {route.map((item, index) => (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="relative rounded-xl border-t-4 border-royal-orange bg-white p-5 shadow-xs"
              >
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-primary/60">Stap {item.step}</span>
                <h3 className="mt-1 font-serif text-lg font-bold text-primary">{item.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-on-surface-variant">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-piste-silver bg-white p-6 shadow-xs md:p-8">
            <div className="mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-2xl font-bold text-primary">Nederland internationaal</h2>
            </div>
            <ul className="space-y-3 font-sans text-sm leading-relaxed text-on-surface-variant">
              {oranje.map((line) => (
                <li key={line} className="border-l-2 border-royal-orange/40 pl-4">{line}</li>
              ))}
            </ul>
          </div>

          <aside className="rounded-xl border border-piste-silver bg-white p-6 shadow-xs md:p-8">
            <div className="mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-xl font-bold text-primary">Atletencommissie</h2>
            </div>
            <p className="font-sans text-sm leading-relaxed text-on-surface-variant">
              De atletencommissie behartigt de belangen van topsporters en adviseert het bestuur over topsportbeleid
              vanuit het perspectief van de sporter.
            </p>
            <ul className="mt-4 space-y-1.5 font-sans text-sm text-primary">
              {athleteCommission.map((name) => (
                <li key={name} className="font-semibold">{name}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section id="over-topsport">
          <div className="mb-2 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-2xl font-bold text-primary">Begeleidingsteams per wapen</h2>
          </div>
          <p className="mb-5 max-w-3xl font-sans text-sm leading-relaxed text-on-surface-variant">
            Voor elk wapen begeleidt een team jeugdtalenten richting de internationale jeugdtiteltoernooien. Je meldt je
            aan via het intakeformulier en schermt op de aangewezen kwalificatiewedstrijden uit de kalender.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {teams.map((team, index) => (
              <motion.article
                key={team.code}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className="flex flex-col overflow-hidden rounded-xl border border-piste-silver bg-white shadow-xs"
              >
                <div className="flex items-center justify-between bg-primary px-5 py-3 text-white">
                  <span className="font-serif text-xl font-bold">{team.code}</span>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-royal-orange">{team.weapon}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-lg font-bold text-primary">{team.title}</h3>
                  <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-on-surface-variant">{team.text}</p>
                  <div className="mt-4 space-y-1.5 border-t border-piste-silver pt-4">
                    {team.docs.map((doc) => (
                      <a
                        key={doc.url}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-sans text-xs font-semibold text-primary hover:text-royal-orange"
                      >
                        <Download className="h-3.5 w-3.5 shrink-0 text-royal-orange" /> {doc.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-piste-silver bg-white p-6 shadow-xs md:p-8">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-2xl font-bold text-primary">Selectie en kwalificatie</h2>
            </div>
            <ol className="space-y-3 font-sans text-sm leading-relaxed text-on-surface-variant">
              {selection.map((line, index) => (
                <li key={line} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{index + 1}</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 border-l-4 border-royal-orange bg-surface-container-lowest p-4 font-sans text-xs leading-relaxed text-on-surface-variant">
              Kwalificatiecriteria, kalenders en deadlines verschillen per seizoen, wapen en leeftijdscategorie. De
              actuele aankondiging van het betreffende toernooi is altijd leidend.
            </p>
          </div>

          <aside className="rounded-xl border border-piste-silver bg-white p-6 shadow-xs md:p-8">
            <h2 className="font-serif text-xl font-bold text-primary">Documenten bij selectie</h2>
            <div className="mt-4 space-y-2">
              {selectionDocs.map((doc) => (
                <a
                  key={doc.url}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 rounded-lg border border-piste-silver bg-surface-container-lowest p-3 font-sans text-xs font-semibold text-primary hover:border-primary"
                >
                  <Download className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal-orange" /> {doc.label}
                </a>
              ))}
            </div>
            <h3 className="mt-6 font-serif text-base font-bold text-primary">Gedragscodes</h3>
            <div className="mt-2 space-y-2">
              {conductDocs.map((doc) => (
                <a
                  key={doc.url}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 font-sans text-xs font-semibold text-primary hover:text-royal-orange"
                >
                  <Download className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal-orange" /> {doc.label}
                </a>
              ))}
            </div>
          </aside>
        </section>

        <section className="overflow-hidden rounded-xl bg-primary text-white shadow-sm">
          <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Plane className="h-5 w-5 text-royal-orange" />
                <h2 className="font-serif text-2xl font-bold">Internationale aanmeldingen</h2>
              </div>
              <ul className="space-y-2.5 font-sans text-sm leading-relaxed text-white/85">
                {internationalFlow.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-royal-orange" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href="docs/topsport/internationale-aanmeldingen-2026-2027.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 bg-royal-orange px-5 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-primary"
              >
                Aanmeldingen 2026-2027 <Download className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-lg bg-white/10 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Medal className="h-5 w-5 text-royal-orange" />
                <h2 className="font-serif text-xl font-bold">Talentstatussen</h2>
              </div>
              <ul className="space-y-2 font-sans text-sm leading-relaxed text-white/85">
                {talent.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <a
                href="docs/topsport/sporttakspecifiek-talentprofiel-2026.doc"
                className="mt-4 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-royal-orange hover:text-white"
              >
                Sporttakspecifiek talentprofiel <Download className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-2xl font-bold text-primary">Verder kijken</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <button
              type="button"
              onClick={() => setActiveTab?.('nieuws')}
              className="rounded-lg border border-piste-silver bg-white p-4 text-left transition hover:border-primary"
            >
              <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-primary/70">Nieuws</p>
              <p className="mt-1 font-sans text-sm font-semibold text-primary">Topsport- en uitslagenberichten</p>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab?.('ranglijsten')}
              className="rounded-lg border border-piste-silver bg-white p-4 text-left transition hover:border-primary"
            >
              <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-primary/70">Ranglijsten</p>
              <p className="mt-1 font-sans text-sm font-semibold text-primary">Standen per wapen en categorie</p>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab?.('wedstrijdinformatie')}
              className="rounded-lg border border-piste-silver bg-white p-4 text-left transition hover:border-primary"
            >
              <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-primary/70">Wedstrijden</p>
              <p className="mt-1 font-sans text-sm font-semibold text-primary">Hoe schermtoernooien werken</p>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
