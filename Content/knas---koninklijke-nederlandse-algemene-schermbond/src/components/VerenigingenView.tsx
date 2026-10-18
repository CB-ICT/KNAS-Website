import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Phone, Mail, Globe, Navigation, Clock, ShieldAlert, CheckCircle, Info, X } from 'lucide-react';
import { clubsData } from '../data';
import { ClubItem } from '../types';

interface VerenigingenViewProps {
  searchLocation: string;
  setSearchLocation: (loc: string) => void;
}

export default function VerenigingenView({ searchLocation, setSearchLocation }: VerenigingenViewProps) {
  const [searchQuery, setSearchQuery] = useState(searchLocation);
  const [selectedWeaponFilter, setSelectedWeaponFilter] = useState<string>('Alle');
  const [activeClub, setActiveClub] = useState<ClubItem | null>(null);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Sync internal search input with parent search state (from homepage search)
  useEffect(() => {
    setSearchQuery(searchLocation);
  }, [searchLocation]);

  // Handle live search matching club names, addresses, or city strings
  const filteredClubs = clubsData.filter((club) => {
    const matchesSearch = 
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      club.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWeapon = 
      selectedWeaponFilter === 'Alle' || 
      club.weapons.includes(selectedWeaponFilter);

    return matchesSearch && matchesWeapon;
  });

  const handleClubSelect = (club: ClubItem) => {
    setActiveClub(club);
    setContactSuccess(false);
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-low">
      {/* 1. Header Hero Banner */}
      <section className="bg-primary text-white py-12 px-4 md:px-10 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-5 piste-pattern pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-1 block">Interactieve Clubzoeker</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold">KNAS Verenigingen</h1>
            <p className="font-sans text-xs sm:text-sm text-white/80 mt-1.5 max-w-xl">
              Vind de dichtstbijzijnde KNAS schermvereniging. Gebruik onze filters om te zoeken op postcode of op specifiek gewenste wapens.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4 border-l border-white/10 pl-6 hidden lg:flex">
            <div className="text-center">
              <span className="font-serif text-3xl font-bold text-royal-orange">45+</span>
              <p className="font-sans text-[11px] uppercase tracking-wider text-white/70">Actieve Clubs</p>
            </div>
            <div className="text-center">
              <span className="font-serif text-3xl font-bold text-royal-orange">5000+</span>
              <p className="font-sans text-[11px] uppercase tracking-wider text-white/70">Actieve Leden</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Portal Interface layout: Sidebar Filters & Club Grid vs Interactive Map */}
      <section className="w-full px-4 md:px-10 max-w-7xl mx-auto py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Club filtering & cards (5 columns) */}
        <div className="lg:col-span-5 flex flex-col space-y-4 max-h-[72vh] lg:overflow-y-auto pr-2">
          {/* Filters card */}
          <div className="bg-white p-5 rounded-lg border border-piste-silver shadow-xs shrink-0">
            <h3 className="font-serif text-base font-bold text-primary mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-royal-orange font-light">filter_alt</span>
              Filter Schermclubs
            </h3>

            {/* Postcode/City Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchLocation(e.target.value);
                }}
                placeholder="Zoek op stad of clubnaam..."
                className="w-full pl-9 pr-4 py-2 border border-piste-silver rounded text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-surface-container-low"
              />
              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(''); setSearchLocation(''); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 hover:text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Weapon Filters tags */}
            <div>
              <span className="font-sans font-bold text-xs text-primary uppercase tracking-wider block mb-2">
                Disciplines:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Alle', 'Floret', 'Degen', 'Sabel'].map((weapon) => {
                  const isSelected = selectedWeaponFilter === weapon;
                  return (
                    <button
                      key={weapon}
                      onClick={() => setSelectedWeaponFilter(weapon)}
                      className={`px-3 py-1.5 rounded-sm font-sans text-xs font-bold uppercase tracking-wider transition-colors border ${
                        isSelected 
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-white text-on-surface-variant border-piste-silver hover:border-primary hover:text-primary'
                      }`}
                    >
                      {weapon}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Clubs list header & counter */}
          <div className="flex items-center justify-between text-xs font-sans text-on-surface-variant px-1 shrink-0">
            <span>Resultaten: <strong>{filteredClubs.length}</strong> verenigingen gevonden</span>
            {filteredClubs.length === 0 && <span className="text-royal-orange">Probeer een andere filter</span>}
          </div>

          {/* Clubs list results scroll */}
          <div className="space-y-3.5">
            {filteredClubs.map((club) => {
              const isSelected = activeClub?.id === club.id;
              return (
                <div 
                  key={club.id}
                  onClick={() => handleClubSelect(club)}
                  className={`bg-white p-5 rounded-lg border transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'border-royal-orange ring-1 ring-royal-orange/40 bg-white shadow-md scale-[1.01]' 
                      : 'border-piste-silver hover:border-primary hover:shadow-xs'
                  }`}
                  id={`club-card-${club.id}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-lg font-bold text-primary group-hover:text-royal-orange">
                      {club.name}
                    </h4>
                    <span className="font-sans text-[11px] font-bold text-royal-orange shrink-0 bg-royal-orange/10 px-2 py-0.5 rounded-xs">
                      {club.distance}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-on-surface-variant flex items-center gap-1.5 mb-3.5">
                    <span className="material-symbols-outlined text-[15px] text-primary shrink-0">location_on</span>
                    {club.address}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-piste-silver/40">
                    {/* Weapons tags */}
                    <div className="flex gap-1">
                      {club.weapons.map((w) => (
                        <span key={w} className="bg-surface-container text-primary font-sans font-bold text-[10px] px-2 py-0.5 rounded-xs uppercase tracking-wider">
                          {w}
                        </span>
                      ))}
                    </div>

                    <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-wider flex items-center gap-1 hover:text-royal-orange">
                      Bekijk profiel
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredClubs.length === 0 && (
              <div className="bg-white border border-piste-silver p-8 rounded-lg text-center flex flex-col items-center">
                <ShieldAlert className="w-12 h-12 text-royal-orange/70 mb-3" />
                <h4 className="font-serif text-base font-bold text-primary mb-1">Geen verenigingen gevonden</h4>
                <p className="font-sans text-xs text-on-surface-variant max-w-xs">
                  We konden geen schermclubs vinden die voldoen aan je huidige zoektermen of disciplines. Reset je filters om opnieuw te zoeken.
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedWeaponFilter('Alle'); }}
                  className="bg-primary text-white text-xs font-sans font-bold uppercase tracking-wider px-4 py-2 rounded mt-4 hover:bg-royal-orange"
                >
                  Wis Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right side Interactive Map Blueprint & active club display profile (7 columns) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          
          {/* Interactive Map card */}
          <div className="bg-white border border-piste-silver rounded-lg overflow-hidden relative shadow-xs aspect-[4/3] flex flex-col">
            
            {/* Map Header */}
            <div className="bg-surface-container px-4 py-3 border-b border-piste-silver flex justify-between items-center shrink-0">
              <span className="font-serif text-sm font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-lg">map</span>
                Regionale Kaart (Noord-Holland & Utrecht)
              </span>
              <span className="text-[10px] font-sans text-on-surface-variant uppercase tracking-wider">Interactief</span>
            </div>

            {/* Custom SVG Map Canvas */}
            <div className="flex-1 w-full bg-[#f1f3f5] relative overflow-hidden select-none" id="map-canvas">
              {/* Custom Blueprint Grayscale Canal Watermarks */}
              <div className="absolute inset-0 piste-pattern opacity-15 pointer-events-none"></div>

              {/* Grid outline lines */}
              <div className="absolute top-1/4 left-0 right-0 h-[1px] border-t border-piste-silver/45 pointer-events-none"></div>
              <div className="absolute top-2/4 left-0 right-0 h-[1px] border-t border-piste-silver/45 pointer-events-none"></div>
              <div className="absolute top-3/4 left-0 right-0 h-[1px] border-t border-piste-silver/45 pointer-events-none"></div>
              <div className="absolute left-1/3 top-0 bottom-0 w-[1px] border-l border-piste-silver/45 pointer-events-none"></div>
              <div className="absolute left-2/3 top-0 bottom-0 w-[1px] border-l border-piste-silver/45 pointer-events-none"></div>

              {/* Geographic watermark labels */}
              <div className="absolute top-[35%] left-[25%] text-[9px] font-sans font-bold tracking-widest text-on-surface-variant/25 uppercase transform -rotate-12 pointer-events-none">Noordzee Kanaal</div>
              <div className="absolute top-[75%] left-[70%] text-[9px] font-sans font-bold tracking-widest text-on-surface-variant/25 uppercase transform rotate-12 pointer-events-none">Lek & Rijn</div>
              <div className="absolute top-[48%] left-[45%] text-[10px] font-sans font-bold tracking-widest text-on-surface-variant/35 uppercase pointer-events-none">AMSTERDAM</div>
              <div className="absolute top-[67%] left-[64%] text-[10px] font-sans font-bold tracking-widest text-on-surface-variant/35 uppercase pointer-events-none">UTRECHT</div>

              {/* Interactive Pulsing Map Pins */}
              {filteredClubs.map((club) => {
                const isSelected = activeClub?.id === club.id;
                return (
                  <button
                    key={club.id}
                    onClick={() => handleClubSelect(club)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-transform"
                    style={{ left: `${club.lat}%`, top: `${club.lng}%` }}
                    id={`map-pin-${club.id}`}
                  >
                    {/* Animated Pulsing Halo */}
                    <span className={`absolute inline-flex h-10 w-10 rounded-full opacity-35 -left-3 -top-3 transition-all ${
                      isSelected ? 'bg-royal-orange animate-ping' : 'bg-primary/20 group-hover:bg-primary/45'
                    }`}></span>

                    {/* Pin pointer marker */}
                    <div className={`relative flex items-center justify-center w-7.5 h-7.5 rounded-full border shadow-md transition-all duration-300 ${
                      isSelected 
                        ? 'bg-royal-orange border-white text-white scale-125' 
                        : 'bg-primary border-white text-white group-hover:bg-royal-orange'
                    }`}>
                      <span className="material-symbols-outlined text-[16px] font-bold">sports_martial_arts</span>
                    </div>

                    {/* Floating tooltips on hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-9 bg-primary text-white text-[11px] font-sans font-bold px-2.5 py-1.5 rounded shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-30">
                      {club.name} ({club.distance})
                      <div className="w-2 h-2 bg-primary absolute left-1/2 -translate-x-1/2 top-full rotate-45"></div>
                    </div>
                  </button>
                );
              })}

              {/* Simple Compass Rose */}
              <div className="absolute bottom-4 right-4 bg-white/75 border border-piste-silver/70 rounded p-2 text-center pointer-events-none z-10 hidden sm:block">
                <div className="text-[10px] font-sans font-bold text-primary leading-none">N</div>
                <div className="w-5 h-5 border-2 border-primary rounded-full relative my-1 mx-auto flex items-center justify-center">
                  <div className="w-0.5 h-3 bg-primary absolute top-0"></div>
                </div>
                <div className="text-[8px] font-sans text-on-surface-variant leading-none">W • KNAS • O</div>
              </div>
            </div>
          </div>

          {/* Detailed Selected Club Profile (Renders beneath map if activeClub selected) */}
          <AnimatePresence mode="wait">
            {activeClub ? (
              <motion.div 
                key={activeClub.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-white rounded-lg border border-piste-silver overflow-hidden shadow-md"
              >
                {/* Visual club thumbnail banner */}
                <div className="h-44 bg-surface-container relative">
                  <img 
                    alt={activeClub.name} 
                    className="w-full h-full object-cover" 
                    src={activeClub.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex gap-1 mb-1">
                      {activeClub.weapons.map((w) => (
                        <span key={w} className="bg-royal-orange text-white text-[9px] font-sans font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                          {w}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif text-xl font-bold leading-tight">{activeClub.name}</h3>
                  </div>
                  <button 
                    onClick={() => setActiveClub(null)}
                    className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Profile Grid content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Specs details */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-sm font-bold text-primary border-b border-piste-silver pb-1.5 uppercase tracking-wider">Contact & Locatie</h4>
                    <ul className="space-y-2.5 font-sans text-xs text-on-surface-variant">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">location_on</span>
                        <span>{activeClub.address}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary shrink-0" />
                        <span>{activeClub.phone}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        <a href={`mailto:${activeClub.email}`} className="text-primary hover:underline">{activeClub.email}</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-primary shrink-0" />
                        <a href={activeClub.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                          Bezoek Website
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Right training days & interactive form */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-sm font-bold text-primary border-b border-piste-silver pb-1.5 uppercase tracking-wider">Trainingsuren</h4>
                    <div className="space-y-2 bg-surface-container-low p-3.5 rounded-md border border-piste-silver/65">
                      {activeClub.trainingHours.map((hour, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs font-sans text-on-surface-variant">
                          <span className="font-bold text-primary">{hour.day}</span>
                          <span>{hour.hours}</span>
                        </div>
                      ))}
                      <div className="text-[10px] text-on-surface-variant italic pt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-royal-orange shrink-0" />
                        Mogelijkheid tot proefles aanwezig
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inline contact form widget for the club */}
                <div className="bg-surface-container/60 p-6 border-t border-piste-silver/50">
                  <h4 className="font-serif text-sm font-bold text-primary mb-3">Vraag direct een Proefles aan</h4>
                  
                  <AnimatePresence mode="wait">
                    {!contactSuccess ? (
                      <motion.form 
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleContactSubmit}
                        className="space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Je naam" 
                            className="bg-white border border-piste-silver rounded p-2.5 text-xs font-sans outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                          <input 
                            type="email" 
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="Je e-mailadres" 
                            className="bg-white border border-piste-silver rounded p-2.5 text-xs font-sans outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <textarea 
                          rows={2}
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder={`Ik wil graag meer weten over proeflessen bij ${activeClub.name}...`} 
                          className="w-full bg-white border border-piste-silver rounded p-2.5 text-xs font-sans outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                        ></textarea>
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                            <Info className="w-3.5 h-3.5 text-primary" />
                            Aanvraag wordt direct verzonden naar de club.
                          </p>
                          <button 
                            type="submit" 
                            className="bg-primary text-white px-5 py-2.5 rounded font-sans font-bold text-xs uppercase tracking-wider hover:bg-royal-orange transition-colors shrink-0"
                          >
                            Verzend Aanvraag
                          </button>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div 
                        key="contact-success"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                        <div>
                          <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-green-900">Aanvraag succesvol verzonden!</h5>
                          <p className="font-sans text-[11px] text-green-700 mt-0.5">Je proefles-aanvraag is verwerkt. De secretaris van {activeClub.name} neemt zo spoedig mogelijk contact met je op.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg border border-piste-silver p-8 text-center flex-1 flex flex-col items-center justify-center min-h-[220px]">
                <Navigation className="w-10 h-10 text-primary/35 mb-3" />
                <h4 className="font-serif text-base font-bold text-primary mb-1">Geen vereniging geselecteerd</h4>
                <p className="font-sans text-xs text-on-surface-variant max-w-xs">
                  Klik op een vereniging in de resultatenlijst of kies een speld op de interactieve regiokaart om het volledige clubprofiel te bekijken en contact op te nemen.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
