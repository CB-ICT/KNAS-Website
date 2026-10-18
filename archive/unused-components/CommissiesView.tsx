import React from 'react';
import { motion } from 'motion/react';
import { Accessibility, FileText, HeartPulse, Lightbulb, Mail, Megaphone, ShieldCheck, Trophy, Users, Wrench, Globe2, Scale, GraduationCap } from 'lucide-react';

type Commissie = {
  id: string;
  naam: string;
  doel: string;
  contact?: string;
  leden: string[];
  icon: React.ComponentType<{ className?: string }>;
};

const commissies: Commissie[] = [
  {
    id: 'atleten',
    naam: 'Atletencommissie',
    doel: 'Vertegenwoordigt de belangen van topsporters en adviseert over topsportbeleid.',
    leden: ['Tristan Tulen', 'Teun Jans Köhneke', 'Marleen Buitenhuis'],
    icon: Trophy,
  },
  {
    id: 'scheidsrechters',
    naam: 'Scheidsrechterscommissie',
    doel: 'Ondersteunt scheidsrechters, organiseert opleidingen en verzorgt inzet bij kampioenschappen.',
    contact: 'scheidsrechters@knas.nl',
    leden: ['Nico Speelman', 'Hugo-Jan Dulfer', 'Katja Schober', 'Patrick Pieters', 'Niels Bosman', 'Daan Weber'],
    icon: ShieldCheck,
  },
  {
    id: 'wedstrijden',
    naam: 'KNAS Wedstrijden, Ondersteuning en Ranglijsten',
    doel: 'Beheert wedstrijdkalender, ondersteunt organisaties en onderhoudt de ranglijsten.',
    contact: 'wedstrijdzaken@knas.nl',
    leden: ['Christian Jansen', 'Henri Faber', 'Paul van Dam', 'Lars Kramer', 'Mark Balasz Farkas'],
    icon: Users,
  },
  {
    id: 'internationaal',
    naam: 'KNAS-internationaal',
    doel: 'Verwerkt informatie en inschrijvingen voor FIE/EFC wedstrijden en internationale circuits.',
    contact: 'knasinternationaal@knas.nl',
    leden: ['Anton Oskamp', 'Remco Middelveld'],
    icon: Globe2,
  },
  {
    id: 'materiaal',
    naam: 'Materiaalcommissie',
    doel: 'Beheert KNAS-materiaal en coördineert opslag, uitgifte en retourstromen.',
    contact: 'materiaal@knas.nl',
    leden: ['Kees Boon', 'Evert-Jan Smit'],
    icon: Wrench,
  },
  {
    id: 'toetsing',
    naam: 'Toetsingscommissie',
    doel: 'Bewaakt toetskwaliteit van opleidingen en behandelt vrijstellingen (EVC).',
    leden: ['Floris Nonhebel'],
    icon: Scale,
  },
  {
    id: 'medisch',
    naam: 'Medische commissie',
    doel: 'Adviseert het bestuur over medisch beleid en sportmedische onderwerpen.',
    contact: 'info@fysiotherapievangilst.nl',
    leden: ['Pieter van Gilst'],
    icon: HeartPulse,
  },
  {
    id: 'rolstoelschermen',
    naam: 'Commissie Rolstoelschermen',
    doel: 'Adviseert over de ontwikkeling en toegankelijkheid van rolstoelschermen binnen de Nederlandse schermsport.',
    leden: ['Gaby van Ertekin'],
    icon: Accessibility,
  },
  {
    id: 'pr',
    naam: 'PR- en communicatiecommissie',
    doel: 'Verzorgt communicatie over toernooien, promotie van de schermsport en de inzet van website en sociale media.',
    contact: 'media@knas.nl',
    leden: ['Paul Water', 'Julius Wagenaar', 'Sonja Lendi', 'Carmen Berends'],
    icon: Megaphone,
  },
  {
    id: 'reglementen',
    naam: 'Reglementencommissie',
    doel: 'Werkt aan de toepassing, actualisering en uitleg van de reglementen binnen de schermsport.',
    leden: ['Evert Jan Smit', 'Nico Speelman', 'Tristan Tulen'],
    icon: FileText,
  },
  {
    id: 'veteranen',
    naam: 'Commissie Veteranen',
    doel: 'Adviseert over het Nederlandse veteranenschermen, het wedstrijdcircuit en deelname aan Europese en wereldkampioenschappen.',
    leden: ['Paul v.d. Berg', 'Paul van Dam', 'Ans Hom', 'Sef Laschek'],
    icon: Users,
  },
  {
    id: 'opleidingen',
    naam: 'KNAS-opleidingen',
    doel: 'Ondersteunt de opleidingen voor schermleraren, trainers en scheidsrechters.',
    leden: ['Frans Posthuma'],
    icon: GraduationCap,
  },
  {
    id: 'financieel',
    naam: 'Financiële Commissie',
    doel: 'Beoordeelt het financiële beleid van de KNAS en het beheer van de bondsmiddelen door het bestuur.',
    leden: ['Sef Laschek', 'Martijn Hengeveld', 'Bas von Königslöw'],
    icon: Scale,
  },
  {
    id: 'talent-ouders',
    naam: 'Talent- en Oudercommissie',
    doel: 'Ondersteunt de ontwikkeling van talenten en faciliteert de samenwerking tussen talenten, ouders, clubs en de topsportorganisatie.',
    leden: [],
    icon: Trophy,
  },
  {
    id: 'strategie',
    naam: 'Commissie Strategie en Innovatie',
    doel: 'Ontwikkelt vernieuwingsvoorstellen en lange termijn koers voor de bond.',
    leden: ['Spencer van Erven', 'Ineke Knape', 'Etienne Van Cann', 'Cheryl de Jong', 'Anton Oskamp', 'Siebren Tigchelaar'],
    icon: Lightbulb,
  },
];

export default function CommissiesView() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-container-low to-surface-container-lowest">
      <section className="relative overflow-hidden bg-primary py-14 text-white">
        <div className="absolute inset-0 opacity-10 fencing-mesh-pattern" aria-hidden />
        <div className="relative mx-auto w-full max-w-7xl px-4 md:px-10">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-royal-orange">KNAS Organisatie</p>
          <h1 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-5xl">Commissies</h1>
          <p className="mt-4 max-w-3xl font-sans text-sm leading-relaxed text-white/90 md:text-base">
            Overzicht van commissies binnen de KNAS, inclusief kernverantwoordelijkheden, contactkanalen en betrokken leden.
          </p>
        </div>
      </section>

      <main className="mx-auto mt-8 w-full max-w-7xl space-y-6 px-4 pb-12 md:px-10">
        <section className="rounded-2xl border border-piste-silver bg-white p-5 shadow-sm md:p-6">
          <div className="mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-2xl font-bold text-primary">Commissie-overzicht</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {commissies.map((commissie, index) => {
              const Icon = commissie.icon;
              return (
                <motion.article
                  key={commissie.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  className="rounded-xl border border-piste-silver bg-surface-container-lowest p-4"
                >
                  <div className="mb-3 flex items-start gap-2">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-serif text-lg font-bold text-primary leading-snug">{commissie.naam}</h3>
                  </div>

                  <p className="font-sans text-xs leading-relaxed text-on-surface-variant">{commissie.doel}</p>

                  {commissie.contact && (
                    <a
                      href={`mailto:${commissie.contact}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-primary hover:underline"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {commissie.contact}
                    </a>
                  )}

                  <div className="mt-3 border-t border-piste-silver pt-3">
                    <p className="mb-1 font-sans text-[11px] font-bold uppercase tracking-widest text-primary/70">Leden</p>
                    <ul className="space-y-1 font-sans text-xs text-on-surface-variant">
                      {commissie.leden.map((lid) => (
                        <li key={lid}>• {lid}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
