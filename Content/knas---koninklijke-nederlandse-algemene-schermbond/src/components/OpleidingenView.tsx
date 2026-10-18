import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, ArrowRight, ClipboardCheck, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';

export default function OpleidingenView() {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const courses = [
    { id: 'trainer-1', name: 'KNAS Assistent-Trainer (Niveau 1)', duration: '3 weekenden', cost: '€ 175,-', location: 'Nieuwegein' },
    { id: 'trainer-2', name: 'KNAS Schermleraar-B (Niveau 2)', duration: '6 maanden', cost: '€ 395,-', location: 'Amsterdam / Utrecht' },
    { id: 'ref-1', name: 'Nationaal Scheidsrechter Brevet', duration: '2 studiedagen + stage', cost: 'Gratis (via club)', location: 'Almere' },
    { id: 'beginners', name: 'Introductiecursus Jeugdschermen', duration: '4 proeflessen', cost: '€ 35,-', location: 'Diverse verenigingen' }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse && fullName.trim() && email.trim()) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFullName('');
        setEmail('');
        setSelectedCourse('');
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Header Hero Banner */}
      <section className="bg-primary text-white py-14 px-4 md:px-10 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-10 fencing-mesh-pattern pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <span className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-1 block">Opleidingen en cursussen</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">KNAS Opleidingscentrum</h1>
          <p className="font-sans text-xs sm:text-sm text-white/85 mt-2 leading-relaxed max-w-2xl">
            Word gecertificeerd schermleraar, nationaal scheidsrechter of ontdek onze jeugdprogramma's. Wij faciliteren de officiële NOC*NSF geaccrediteerde opleidingen voor alle schermdisciplines.
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="w-full px-4 md:px-10 max-w-7xl mx-auto py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Educational Tracks (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-primary font-bold mb-6">Onze Opleidingsrichtingen</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Coaches & Leraren */}
              <div className="bg-white p-6 rounded-lg border border-piste-silver shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary mb-2">Leraar & Trainer Opleidingen</h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-4">
                    Begeleid de schermers van morgen. Leer didactische vaardigheden, trainingsleer en tactische degen-, floret- of sabelanalyses onder toezicht van erkende KNAS meesters.
                  </p>
                </div>
                <div className="flex items-center text-xs font-sans font-bold text-primary uppercase gap-1.5 pt-3 border-t border-piste-silver/40">
                  Bekijk trajecten <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card 2: Scheidsrechters */}
              <div className="bg-white p-6 rounded-lg border border-piste-silver shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4">
                    <ClipboardCheck className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary mb-2">Scheidsrechter Brevetten</h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-4">
                    Als scheidsrechter speel je een cruciale rol op de toernooien. Leer alles over het recht van aanval, de prioriteringregels en elektronische registratiemethoden op de piste.
                  </p>
                </div>
                <div className="flex items-center text-xs font-sans font-bold text-primary uppercase gap-1.5 pt-3 border-t border-piste-silver/40">
                  Bekijk reglementen <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card 3: Jeugdschermen (Riddertraject) */}
              <div className="bg-white p-6 rounded-lg border border-piste-silver shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary mb-2">KNAS Jeugd 'Riddertraject'</h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-4">
                    Een speels stimuleringsprogramma speciaal ontwikkeld voor kinderen. Door middel van opdrachtenboekjes en badge-examens groeien kinderen van schildknaap tot volleerd schermridder.
                  </p>
                </div>
                <div className="flex items-center text-xs font-sans font-bold text-primary uppercase gap-1.5 pt-3 border-t border-piste-silver/40">
                  Informatiebrochure <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card 4: Senioren & Beginners */}
              <div className="bg-white p-6 rounded-lg border border-piste-silver shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4">
                    <UserCheck className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary mb-2">Beginners & Recreanten</h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-4">
                    Nooit te oud om te leren. Ontdek onze opstapcursussen bij aangesloten KNAS clubs met aangepaste leerlijnen voor volwassenen en 50+ recreanten schermgroepen.
                  </p>
                </div>
                <div className="flex items-center text-xs font-sans font-bold text-primary uppercase gap-1.5 pt-3 border-t border-piste-silver/40">
                  Zoek startersgroep <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Registratieformulier Cursus (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-piste-silver rounded-lg overflow-hidden shadow-xs">
            <div className="bg-primary px-5 py-4 border-b border-piste-silver text-white">
              <span className="text-royal-orange font-sans font-bold text-[10px] uppercase tracking-widest block mb-0.5">Aanmelden</span>
              <h3 className="font-serif text-base font-bold flex items-center gap-2">
                Inschrijven Cursus
              </h3>
            </div>

            <div className="p-5">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form 
                    key="reg-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleRegister} 
                    className="space-y-4"
                  >
                    <div>
                      <label className="font-sans font-bold text-xs text-primary uppercase tracking-wider block mb-2">Naam Deelnemer:</label>
                      <input 
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Naam" 
                        className="w-full border border-piste-silver bg-white rounded p-3 text-xs font-sans outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="font-sans font-bold text-xs text-primary uppercase tracking-wider block mb-2">E-mailadres:</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mailadres" 
                        className="w-full border border-piste-silver bg-white rounded p-3 text-xs font-sans outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="font-sans font-bold text-xs text-primary uppercase tracking-wider block mb-2">Kies Opleiding:</label>
                      <select 
                        required
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full border border-piste-silver bg-white rounded p-3 text-xs font-sans outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Kies een cursus...</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>{course.name} ({course.location})</option>
                        ))}
                      </select>
                    </div>

                    {selectedCourse && (
                      <div className="p-3.5 bg-surface-container rounded border border-piste-silver text-xs font-sans text-on-surface-variant space-y-1">
                        {(() => {
                          const c = courses.find(item => item.id === selectedCourse);
                          return c ? (
                            <>
                              <div><span className="font-bold text-primary">Locatie:</span> {c.location}</div>
                              <div><span className="font-bold text-primary">Duur:</span> {c.duration}</div>
                              <div><span className="font-bold text-primary">Kosten:</span> {c.cost}</div>
                            </>
                          ) : null;
                        })()}
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={!selectedCourse}
                      className="w-full bg-primary text-white font-sans font-bold text-xs uppercase tracking-widest py-3.5 rounded hover:bg-royal-orange transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Verzend Aanmelding
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="reg-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-10 text-center space-y-4"
                  >
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-xs">
                      <ShieldCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-primary">Aanmelding Ontvangen</h4>
                      <p className="font-sans text-xs text-on-surface-variant max-w-xs mx-auto mt-2 leading-relaxed">
                        Bedankt {fullName}! Je inschrijvingsverzoek voor de KNAS leraar- of scheidsrechtercursus is succesvol geregistreerd. Je ontvangt spoedig een bevestigingsmail met opleidingssyllabus.
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
