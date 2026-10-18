import { Award, Heart, Medal } from 'lucide-react';

const honoraryMembers = [
  'Henk Kenter',
  'Bert v.d. Flier',
  'Wiebe Mokken',
  'Anton Oskamp',
  'Etienne Van Cann',
  'Rob Wolthuis',
];

const membersOfMerit = [
  'Bas Verwijlen OLY',
  'Pierre Peeters',
  'Indra Angad-Gaur',
  'Arwin Kardolus',
  'Olaf Kardolus',
  'Sonja Tol',
  'Mieke de Graaf-Stoel',
  'Tristan Tulen',
  'Rafael Tulen',
  'David van Nunen',
  'Konrad Veenenbos',
  'Leon Pijnappel',
  'Ad van der Weg',
];

export default function EreledenView() {
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <section className="relative overflow-hidden bg-primary px-4 py-14 text-white md:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-10 fencing-mesh-pattern"></div>
        <div className="relative mx-auto max-w-7xl">
          <span className="mb-1 block font-sans text-xs font-bold uppercase tracking-widest text-royal-orange">Erkenning &amp; geschiedenis</span>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl">Ereleden en leden van verdienste</h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
            Schermers en vrijwilligers die zich op bijzondere wijze hebben ingezet voor de Nederlandse schermsport.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 md:px-10">
        <section className="rounded-lg border border-piste-silver bg-white p-6 shadow-xs md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <Award className="h-7 w-7 text-royal-orange" />
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-primary/60">Bijzondere onderscheiding</span>
              <h2 className="font-serif text-2xl font-bold text-primary">Ereleden</h2>
            </div>
          </div>
          <p className="max-w-3xl font-sans text-sm leading-relaxed text-on-surface-variant">
            Het erelidmaatschap is een blijvende erkenning voor een uitzonderlijke bijdrage aan de bond en de schermsport. Deze lijst verbindt de huidige schermgemeenschap met mensen die de sport langdurig hebben opgebouwd.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {honoraryMembers.map((name) => (
              <div key={name} className="flex items-center gap-3 rounded-lg border border-piste-silver bg-surface-container-lowest px-4 py-3">
                <Medal className="h-4 w-4 shrink-0 text-royal-orange" />
                <span className="font-serif text-base font-bold text-primary">{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-piste-silver bg-white p-6 shadow-xs md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <Heart className="h-7 w-7 text-royal-orange" />
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-primary/60">Lange inzet voor de sport</span>
              <h2 className="font-serif text-2xl font-bold text-primary">Leden van verdienste</h2>
            </div>
          </div>
          <p className="max-w-3xl font-sans text-sm leading-relaxed text-on-surface-variant">
            Leden van verdienste hebben zich op een bijzondere manier ingezet als sporter, vrijwilliger, bestuurder, trainer, official of organisator. Hun werk heeft de schermsport zichtbaar, sterker en beter georganiseerd gemaakt.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {membersOfMerit.map((name) => (
              <div key={name} className="rounded-lg border border-piste-silver px-4 py-3 font-serif text-base font-bold text-primary">
                {name}
              </div>
            ))}
          </div>
        </section>

        <p className="font-sans text-xs italic text-on-surface-variant">
          De lijsten zijn gebaseerd op de gepubliceerde bondsoverzichten en kunnen in de toekomst worden aangevuld.
        </p>
      </main>
    </div>
  );
}
