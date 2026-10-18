import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, FileText, Download } from 'lucide-react';
import { uniqueClubsData } from '../allClubsData';

export default function OverKnasView() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const keyNumbers = [
    { value: '1908', label: 'opgericht als N.A.S.' },
    { value: '1923', label: 'koninklijk predicaat' },
    { value: `${uniqueClubsData.length}`, label: 'unieke verenigingen' },
    { value: '± 2.475', label: 'aangesloten schermers' },
  ];

  const domainBlocks = [
    {
      title: 'Verenigingen en groei',
      text: 'Ondersteuning van clubs, verenigingsontwikkeling, oprichting van nieuwe verenigingen en versterking van lokaal schermaanbod.',
    },
    {
      title: 'Wedstrijden en ranglijsten',
      text: 'Beheer van de nationale kalender, ondersteuning van organisatoren, verwerking van uitslagen en onderhoud van nationale ranglijsten.',
    },
    {
      title: 'Topsport en talentontwikkeling',
      text: 'Begeleiding van nationale selecties, talentpaden en internationale trajecten via KNAS-internationaal en topsportkaders.',
    },
    {
      title: 'Opleidingen en kwaliteit',
      text: 'Ontwikkeling van trainer-coach opleidingen, scheidsrechtertrajecten en toetskwaliteit via opleidingen- en toetsingscommissie.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
      const subject = formData.subject.trim() || 'Vraag via KNAS-website';
      const body = `Naam: ${formData.name}\nE-mail: ${formData.email}\n\n${formData.message}`;
      window.location.href = `mailto:info@knas.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Header Hero Banner */}
      <section className="bg-primary text-white py-14 px-4 md:px-10 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-10 fencing-mesh-pattern pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <span className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-1 block">Koninklijke Nederlandse Algemene Schermbond</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Over de KNAS</h1>
          <p className="font-sans text-xs sm:text-sm text-white/85 mt-2 leading-relaxed max-w-2xl">
            Sinds 1908 de overkoepelende bond voor de schermsport in Nederland. Onze missie: Nederland laten schermen,
            veel, vaak, lang, goed en met plezier.
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="w-full px-4 md:px-10 max-w-7xl mx-auto py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Federation Info & Board (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* History */}
          <div id="over-bond" className="bg-white p-6 md:p-8 rounded-lg border border-piste-silver shadow-xs">
            <h2 className="font-serif text-xl md:text-2xl text-primary font-bold mb-4">Onze Missie & Historie</h2>
            <p className="font-serif text-lg text-primary leading-snug mb-4">
              Nederland laten schermen: veel, vaak, lang, goed en met plezier.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2 font-sans text-sm text-on-surface-variant">
              {[
                'Alle drie de wapens: floret, degen en sabel',
                'Ondersteuning van verenigingen',
                'Nationale kampioenschappen en ranglijsten',
                'Topsport en talentontwikkeling',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-orange" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {keyNumbers.map((item) => (
                <div key={item.label} className="rounded-lg bg-primary p-4 text-white">
                  <strong className="block font-serif text-2xl">{item.value}</strong>
                  <span className="font-sans text-xs text-white/80">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 font-sans text-xs italic text-on-surface-variant">
              De KNAS is aangesloten bij NOC*NSF en verbonden aan de internationale schermstructuren FIE en EFC. Ledenaantallen worden bijgewerkt zodra een nieuwe bondstelling beschikbaar is.
            </p>
          </div>

          <div id="over-organisatie" className="bg-white p-6 md:p-8 rounded-lg border border-piste-silver shadow-xs">
            <h2 className="font-serif text-xl md:text-2xl text-primary font-bold mb-4">Waar de KNAS aan werkt</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domainBlocks.map((block) => (
                <div key={block.title} className="rounded-lg border border-piste-silver bg-surface-container-lowest p-4">
                  <h3 className="font-serif text-base font-bold text-primary mb-1.5">{block.title}</h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">{block.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="over-beleid" className="bg-white p-6 md:p-8 rounded-lg border border-piste-silver shadow-xs">
            <h2 className="font-serif text-xl md:text-2xl text-primary font-bold mb-4">Beleid en ontwikkeling</h2>
            <div className="flex flex-wrap gap-2">
              {['Verenigingsgroei', 'Veilig sportklimaat', 'Kwalitatief kader', 'Sterke wedstrijdstructuur', 'Realistische topsport', 'Integriteit en meldroutes'].map((focus) => (
                <span key={focus} className="rounded-full bg-surface-container-low px-3.5 py-1.5 font-sans text-sm font-semibold text-primary">
                  {focus}
                </span>
              ))}
            </div>
          </div>

          <div id="over-documenten" className="bg-white p-6 md:p-8 rounded-lg border border-piste-silver shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-xl md:text-2xl text-primary font-bold">Beleids- en bestuursdocumenten</h2>
            </div>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-5">
              De belangrijkste statuten, reglementen en beleidsstukken van de bond, rechtstreeks te openen.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: 'Meerjarenbeleidsplan 2025-2028', url: 'docs/policy/meerjarenbeleidsplan-2025-2028.pdf' },
                { title: 'Algemeen Reglement KNAS 2025', url: 'docs/policy/algemeen-reglement-2025.pdf' },
                { title: 'Beleid diversiteit en inclusie 2025', url: 'docs/source/beleid-diversiteit-inclusie-2025.pdf' },
                { title: 'Privacyverklaring KNAS', url: 'docs/policy/privacyverklaring.pdf' },
              ].map((doc) => (
                <a
                  key={doc.title}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-piste-silver px-4 py-3 hover:border-primary hover:shadow-xs transition-all"
                >
                  <Download className="w-4 h-4 text-royal-orange shrink-0" />
                  <span className="font-sans text-sm font-bold text-primary group-hover:text-royal-orange transition-colors">{doc.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact info & general Form (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Contact Details Card */}
          <div className="bg-white p-6 border border-piste-silver rounded-lg shadow-xs">
            <h3 className="font-serif text-lg font-bold text-primary mb-4">Bondsreceptie</h3>
            <ul className="space-y-4 font-sans text-xs sm:text-sm text-on-surface-variant">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-royal-orange shrink-0 mt-0.5" />
                <span>
                  <strong>Bondskantoor KNAS</strong><br />
                  Kelvinbaan 48<br />
                  3439 MT Nieuwegein<br />
                  Nederland
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-royal-orange shrink-0" />
                <span>+31 (0)6 - 4234 0974</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-royal-orange shrink-0" />
                <a href="mailto:info@knas.nl" className="text-primary hover:underline">info@knas.nl</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-royal-orange shrink-0" />
                <a href="mailto:leden@knas.nl" className="text-primary hover:underline">leden@knas.nl</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-royal-orange shrink-0" />
                <a href="mailto:facturen@knas.nl" className="text-primary hover:underline">facturen@knas.nl</a>
              </li>
            </ul>
          </div>

          {/* General Contact Form */}
          <div className="bg-white border border-piste-silver rounded-lg overflow-hidden shadow-xs">
            <div className="bg-primary px-5 py-4 border-b border-piste-silver text-white">
              <h3 className="font-serif text-base font-bold flex items-center gap-2">
                <HelpCircle className="w-4.5 h-4.5 text-royal-orange" />
                Stel een vraag
              </h3>
            </div>

            <div className="p-5">
              <p className="font-sans text-xs text-on-surface-variant mb-4">
                Vul je gegevens in; je bericht wordt geopend in je eigen e-mailprogramma, klaar om te versturen naar info@knas.nl.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Naam" 
                    className="w-full border border-piste-silver bg-white rounded p-3 text-xs font-sans outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="E-mailadres" 
                    className="w-full border border-piste-silver bg-white rounded p-3 text-xs font-sans outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <input 
                    type="text" 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Onderwerp (Optioneel)" 
                    className="w-full border border-piste-silver bg-white rounded p-3 text-xs font-sans outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <textarea 
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Typ hier je vraag..." 
                    className="w-full border border-piste-silver bg-white rounded p-3 text-xs font-sans outline-none focus:ring-1 focus:ring-primary resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-white font-sans font-bold text-xs uppercase tracking-widest py-3 rounded hover:bg-royal-orange transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  Open in e-mail <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
