import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle } from 'lucide-react';

export default function OverKnasView() {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const boardMembers = [
    { name: 'Dhr. R. van der Weide', role: 'Voorzitter', email: 'voorzitter@knas.nl' },
    { name: 'Mevr. M. de Ruiter', role: 'Secretaris', email: 'secretaris@knas.nl' },
    { name: 'Dhr. P. Groeneveld', role: 'Penningmeester', email: 'penningmeester@knas.nl' },
    { name: 'Mevr. C. Berends', role: 'Bestuurslid Breedtesport', email: 'breedtesport@knas.nl' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
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
            Sinds 1904 de officiële overkoepelende bond voor de schermsport in Nederland. Aangesloten bij NOC*NSF en de internationale schermfederatie FIE.
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="w-full px-4 md:px-10 max-w-7xl mx-auto py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Federation Info & Board (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* History */}
          <div className="bg-white p-6 md:p-8 rounded-lg border border-piste-silver shadow-xs">
            <h2 className="font-serif text-xl md:text-2xl text-primary font-bold mb-4">Onze Missie & Historie</h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-4">
              De KNAS stelt zich ten doel de schermsport in Nederland in al haar disciplines (Floret, Degen en Sabel) uit te breiden, te perfectioneren en toegankelijk te maken voor iedereen. Wij organiseren de nationale kampioenschappen, selecteren de topsporters voor internationale toernooien en ondersteunen lokale clubs met trainersopleidingen en veiligheidsmateriaal.
            </p>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Opgericht in 1904, behoort de KNAS tot de oudste sportbonden van Nederland. Onze tradities gaan eeuwen terug, maar onze blik is steevast gericht op de toekomst van een moderne, dynamische, en uiterst veilige sportomgeving.
            </p>
          </div>

          {/* Board Structure */}
          <div>
            <h2 className="font-serif text-xl md:text-2xl text-primary font-bold mb-5">Het KNAS Bestuur</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {boardMembers.map((member, idx) => (
                <div key={idx} className="bg-white p-5 rounded-lg border border-piste-silver flex justify-between items-center shadow-xs">
                  <div>
                    <h4 className="font-serif text-base font-bold text-primary leading-tight">{member.name}</h4>
                    <span className="font-sans text-xs text-royal-orange font-semibold block mt-0.5">{member.role}</span>
                  </div>
                  <a 
                    href={`mailto:${member.email}`}
                    className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-royal-orange hover:text-white transition-colors"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
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
                  Kelvinbaan 42-A<br />
                  3439 MT Nieuwegein<br />
                  Nederland
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-royal-orange shrink-0" />
                <span>+31 (0)30 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-royal-orange shrink-0" />
                <a href="mailto:info@knas.nl" className="text-primary hover:underline">info@knas.nl</a>
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
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form 
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                  >
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
                      Verstuur Bericht <Send className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6 text-center space-y-4"
                  >
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-xs">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-primary">Bericht Verzonden</h4>
                      <p className="font-sans text-xs text-on-surface-variant max-w-xs mx-auto mt-2 leading-relaxed">
                        Bedankt voor je bericht! We hebben je vraag ontvangen en nemen binnen twee werkdagen contact met je op.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
