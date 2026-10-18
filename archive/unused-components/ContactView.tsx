import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const contacts = [
  { onderwerp: 'Algemene vragen bondsbureau', email: 'info@knas.nl', tel: '+31 (0)6 - 4234 0974' },
  { onderwerp: 'Ledenadministratie', email: 'leden@knas.nl', tel: '+31 (0)6 - 4234 0974' },
  { onderwerp: 'Facturen en declaraties', email: 'facturen@knas.nl', tel: '' },
  { onderwerp: 'Wedstrijdzaken en ranglijsten', email: 'wedstrijdzaken@knas.nl', tel: '' },
  { onderwerp: 'Internationale zaken', email: 'knasinternationaal@knas.nl', tel: '' },
  { onderwerp: 'Scheidsrechterszaken', email: 'scheidsrechters@knas.nl', tel: '' },
  { onderwerp: 'Website technisch', email: 'webmaster@knas.nl', tel: '' },
];

export default function ContactView() {
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <section className="bg-primary text-white py-14 px-4 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 fencing-mesh-pattern" aria-hidden />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-1">Bond en bureau</p>
          <h1 className="font-serif text-4xl font-bold">Contact</h1>
          <p className="font-sans text-sm text-white/85 mt-3 max-w-3xl">Heb je een vraag? Het bondsbureau helpt je graag verder en brengt je snel bij de juiste route.</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-10 space-y-6">
        <section id="contact-bondsbureau" className="rounded-xl border border-piste-silver bg-white p-6">
          <h2 className="font-serif text-2xl font-bold text-primary mb-4">Bondsbureau</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-piste-silver bg-surface-container-lowest p-4 text-sm font-sans text-on-surface-variant">
              <p className="font-bold text-primary mb-2">Postadres</p>
              <p>Koninklijke Nederlandse Algemene Schermbond</p>
              <p>Postbus 2650</p>
              <p>3430 GB Nieuwegein</p>
            </div>
            <div className="rounded-lg border border-piste-silver bg-surface-container-lowest p-4 text-sm font-sans text-on-surface-variant">
              <p className="font-bold text-primary mb-2">Bezoekadres</p>
              <p>Kelvinbaan 48</p>
              <p>3439 MT Nieuwegein</p>
              <p>Nederland</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3 text-sm font-sans text-on-surface-variant">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +31 (0)6 - 4234 0974</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@knas.nl</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Nieuwegein</div>
          </div>
        </section>

        <section className="rounded-xl border border-piste-silver bg-white p-6">
          <h2 className="font-serif text-2xl font-bold text-primary mb-4">Contact per onderwerp</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-xs font-sans">
              <thead>
                <tr className="bg-surface-container text-left text-primary">
                  <th className="border border-piste-silver px-4 py-3 uppercase tracking-wider">Onderwerp</th>
                  <th className="border border-piste-silver px-4 py-3 uppercase tracking-wider">E-mail</th>
                  <th className="border border-piste-silver px-4 py-3 uppercase tracking-wider">Telefoon</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.onderwerp} className="odd:bg-white even:bg-surface-container-lowest">
                    <td className="border border-piste-silver px-4 py-3 font-semibold text-primary">{c.onderwerp}</td>
                    <td className="border border-piste-silver px-4 py-3"><a href={`mailto:${c.email}`} className="text-primary hover:underline">{c.email}</a></td>
                    <td className="border border-piste-silver px-4 py-3 text-on-surface-variant">{c.tel || 'n.v.t.'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="contact-vcp" className="rounded-xl border border-piste-silver bg-white p-6">
          <h2 className="font-serif text-2xl font-bold text-primary mb-4">Vertrouwenscontactpersoon (VCP)</h2>
          <p className="text-sm font-sans text-on-surface-variant leading-relaxed">
            Voor signalen rond sociale veiligheid, grensoverschrijdend gedrag of integriteitsvragen kun je een
            vertrouwelijke route starten. Je melding wordt zorgvuldig behandeld en opgevolgd volgens de geldende
            veiligheidsprocedures binnen de KNAS.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:info@knas.nl?subject=Vertrouwelijke%20melding%20(VCP)"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded font-sans font-bold text-xs uppercase tracking-wider hover:bg-royal-orange transition-colors"
            >
              <Mail className="w-4 h-4" /> Vertrouwelijk contact
            </a>
            <a
              href="https://centrumveiligesport.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-piste-silver text-primary px-5 py-2.5 rounded font-sans font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-colors"
            >
              Centrum Veilige Sport Nederland
            </a>
          </div>
        </section>

        <section id="contact-vacatures" className="rounded-xl border border-piste-silver bg-white p-6">
          <h2 className="font-serif text-2xl font-bold text-primary mb-4">Vacatures</h2>
          <p className="text-sm font-sans text-on-surface-variant leading-relaxed">
            Vacatures en vrijwilligerstrajecten worden periodiek gepubliceerd binnen de bondscommunicatie.
            Interesse in bestuurlijke of commissie-inzet? Neem contact op via info@knas.nl met je expertiseprofiel.
          </p>
        </section>
      </main>
    </div>
  );
}
