import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Trophy, Calendar, Award, Check, UserCheck, ShieldAlert, ArrowRight, Sparkles, X, HeartPulse } from 'lucide-react';
import { tournamentsData, rankingsData } from '../data';
import { TournamentItem } from '../types';

export default function WedstrijdenView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeaponFilter, setSelectedWeaponFilter] = useState('Alle');
  const [selectedRankingWeapon, setSelectedRankingWeapon] = useState<'Degen' | 'Floret' | 'Sabel'>('Degen');
  
  // License Checker states
  const [licenseName, setLicenseName] = useState('');
  const [licenseClub, setLicenseClub] = useState('');
  const [licenseWeapon, setLicenseWeapon] = useState<'Degen' | 'Floret' | 'Sabel'>('Degen');
  const [licenseSuccess, setLicenseSuccess] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  // Tournament list filtering
  const filteredTournaments = tournamentsData.filter((tour) => {
    const matchesSearch = 
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWeapon = 
      selectedWeaponFilter === 'Alle' || 
      tour.category.includes(selectedWeaponFilter) || 
      tour.title.includes(selectedWeaponFilter);

    return matchesSearch && matchesWeapon;
  });

  // Ranking list filtering
  const filteredRankings = rankingsData.filter((rank) => rank.weapon === selectedRankingWeapon);

  const handleLicenseCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (licenseName.trim() && licenseClub.trim()) {
      setLicenseSuccess(true);
      setShowLicenseModal(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      {/* 1. Header Hero Banner */}
      <section className="bg-primary text-white py-14 px-4 md:px-10 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-10 fencing-mesh-pattern pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 relative z-10">
          <div>
            <span className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-1 block">Competitiesport</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">Wedstrijden & Kalender</h1>
            <p className="font-sans text-xs sm:text-sm text-white/85 mt-2 leading-relaxed">
              Volg alle aankomende KNAS toernooien en beheer je wedstrijdlicenties. Bekijk de actuele nationale ranglijsten per wapen voor heren en dames senioren.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a 
              href="#check-licentie" 
              className="bg-royal-orange hover:bg-white hover:text-primary text-white px-5 py-2.5 rounded text-xs font-sans font-bold uppercase tracking-widest transition-all shadow-md"
            >
              Licentie Aanvragen
            </a>
            <a 
              href="#ranglijsten" 
              className="border border-white hover:bg-white hover:text-primary text-white px-5 py-2.5 rounded text-xs font-sans font-bold uppercase tracking-widest transition-all"
            >
              Bekijk Ranglijsten
            </a>
          </div>
        </div>
      </section>

      {/* 2. Main content: Kalender (cols: 8) & Rankings (cols: 4) */}
      <section className="w-full px-4 md:px-10 max-w-7xl mx-auto py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left pane: Tournaments list (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-5 rounded-lg border border-piste-silver shadow-xs">
            <h3 className="font-serif text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-royal-orange text-xl">event_note</span>
              Toernooikalender Zoeken
            </h3>

            {/* Filter controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4.5 h-4.5" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Zoek op locatie of toernooinaam..."
                  className="w-full pl-9 pr-4 py-2 border border-piste-silver rounded text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-surface-container-low"
                />
              </div>

              {/* Weapon dropdown filter */}
              <div className="flex items-center gap-2">
                <span className="font-sans font-bold text-xs text-primary uppercase shrink-0">Wapen:</span>
                <div className="flex gap-1.5 flex-1">
                  {['Alle', 'Degen', 'Floret', 'Sabel'].map((weapon) => {
                    const isSelected = selectedWeaponFilter === weapon;
                    return (
                      <button
                        key={weapon}
                        onClick={() => setSelectedWeaponFilter(weapon)}
                        className={`flex-1 text-center py-1.5 border rounded-sm font-sans text-[11px] font-bold uppercase tracking-wider transition-colors ${
                          isSelected 
                            ? 'bg-primary border-primary text-white' 
                            : 'bg-white border-piste-silver text-on-surface-variant hover:border-primary hover:text-primary'
                        }`}
                      >
                        {weapon}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Tournaments results count */}
          <div className="flex items-center justify-between text-xs font-sans text-on-surface-variant px-1">
            <span>Komende wedstrijden: <strong>{filteredTournaments.length}</strong></span>
            {searchQuery && <button onClick={() => setSearchQuery('')} className="text-primary hover:underline">Wis zoekterm</button>}
          </div>

          {/* Tournaments list scroll */}
          <div className="space-y-4">
            {filteredTournaments.map((tour) => (
              <div 
                key={tour.id}
                className="bg-white p-5 rounded-lg border border-piste-silver flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Calendar day badge */}
                  <div className="w-14 h-14 bg-surface-container border border-piste-silver flex flex-col items-center justify-center text-center shrink-0 rounded">
                    <span className="font-sans font-bold text-[10px] text-on-surface-variant uppercase tracking-wider leading-none mb-1">{tour.dateMonth}</span>
                    <span className="font-serif text-xl font-bold text-primary leading-none">{tour.dateDay}</span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {tour.isLive && (
                        <span className="bg-royal-orange text-white font-sans font-bold text-[9px] px-2 py-0.5 rounded-sm uppercase tracking-wider animate-pulse">
                          Live Nu
                        </span>
                      )}
                      <span className="bg-primary/5 text-primary text-[9px] font-sans font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider">
                        {tour.type}
                      </span>
                      <span className="text-on-surface-variant text-[11px] font-sans">
                        {tour.category}
                      </span>
                    </div>

                    <h4 className="font-serif text-base sm:text-lg font-bold text-primary leading-snug">
                      {tour.title}
                    </h4>

                    <p className="font-sans text-xs text-on-surface-variant mt-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {tour.location} • <span className="font-bold">{tour.time}</span>
                    </p>
                  </div>
                </div>

                {/* Simulated action triggers */}
                <div className="shrink-0 flex sm:flex-col items-stretch gap-2">
                  <button 
                    onClick={() => alert(`Officiële KNAS uitslagendienst: Inschrijven of live resultaten bekijken voor "${tour.title}"`)}
                    className={`px-4 py-2 rounded font-sans font-bold text-[11px] uppercase tracking-wider text-center transition-colors cursor-pointer ${
                      tour.isLive 
                        ? 'bg-royal-orange text-white hover:bg-primary' 
                        : 'border border-piste-silver text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {tour.actionLabel}
                  </button>
                </div>
              </div>
            ))}

            {filteredTournaments.length === 0 && (
              <div className="bg-white border border-piste-silver rounded-lg p-12 text-center flex flex-col items-center justify-center">
                <Calendar className="w-12 h-12 text-primary/30 mb-3" />
                <h4 className="font-serif text-base font-bold text-primary mb-1">Geen toernooien gevonden</h4>
                <p className="font-sans text-xs text-on-surface-variant max-w-xs">
                  We konden geen KNAS of FIE toernooien vinden die voldoen aan je gekozen zoekcriteria. Probeer je filters te resetten.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right pane: Standings (4 columns) */}
        <div id="ranglijsten" className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-piste-silver rounded-lg overflow-hidden shadow-xs">
            {/* Rankings title block */}
            <div className="bg-primary px-5 py-4 border-b border-piste-silver text-white">
              <span className="text-royal-orange font-sans font-bold text-[10px] uppercase tracking-widest block mb-0.5">Top-Ranking</span>
              <h3 className="font-serif text-lg font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-royal-orange" />
                KNAS Ranglijst 2026
              </h3>
            </div>

            {/* Weapon Select Tabs for Standings */}
            <div className="flex border-b border-piste-silver bg-surface-container">
              {(['Degen', 'Floret', 'Sabel'] as const).map((weapon) => {
                const isSelected = selectedRankingWeapon === weapon;
                return (
                  <button
                    key={weapon}
                    onClick={() => setSelectedRankingWeapon(weapon)}
                    className={`flex-1 py-3 text-center font-sans text-xs font-bold uppercase tracking-wider transition-colors ${
                      isSelected 
                        ? 'bg-white text-primary border-b-2 border-primary' 
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                    }`}
                  >
                    {weapon}
                  </button>
                );
              })}
            </div>

            {/* Standings items */}
            <div className="divide-y divide-piste-silver/60">
              {filteredRankings.map((rank) => (
                <div key={rank.rank} className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-3">
                    {/* Rank bubble */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-sans text-xs font-bold shrink-0 ${
                      rank.rank === 1 ? 'bg-royal-orange text-white' :
                      rank.rank === 2 ? 'bg-slate-400 text-white' :
                      rank.rank === 3 ? 'bg-amber-600 text-white' : 'bg-surface-container text-primary'
                    }`}>
                      {rank.rank}
                    </div>

                    <div>
                      <h5 className="font-sans font-bold text-sm text-primary">{rank.name}</h5>
                      <span className="text-[10px] text-on-surface-variant uppercase font-semibold">{rank.category} • {rank.weapon}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-sm font-bold text-primary">{rank.points}</span>
                    <span className="text-[9px] font-sans text-on-surface-variant block uppercase tracking-wide leading-none">PT</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Standings Footer Info */}
            <div className="p-4 bg-surface-container-low border-t border-piste-silver/50 text-center text-[10px] font-sans text-on-surface-variant italic">
              Bijgewerkt t/m mei 2026. Officiële nationale KNAS puntentabel.
            </div>
          </div>

          {/* Fun Stat Promo Box */}
          <div className="bg-primary text-white p-6 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 fencing-mesh-pattern pointer-events-none"></div>
            <Sparkles className="w-6 h-6 text-royal-orange mb-3" />
            <h4 className="font-serif text-base font-bold mb-1.5">KNAS Wedstrijdlicenties</h4>
            <p className="font-sans text-xs text-white/80 leading-relaxed mb-4">
              Iedereen die deelneemt aan toernooien onder toezicht van de bond dient in het bezit te zijn van een geldige nationale licentie. Check direct hieronder of je in aanmerking komt.
            </p>
          </div>
        </div>
      </section>

      {/* 3. KNAS License check form section */}
      <section id="check-licentie" className="bg-surface-container py-16 px-4 md:px-10 border-t border-piste-silver">
        <div className="max-w-4xl mx-auto w-full bg-white rounded-lg border border-piste-silver shadow-md overflow-hidden">
          <div className="p-6 md:p-10">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0 text-primary">
                <HeartPulse className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-0.5 block">Licentie Beheer</span>
                <h3 className="font-serif text-2xl font-bold text-primary">KNAS Digitale Wedstrijdlicentie Check</h3>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-1">
                  Vraag direct digitaal een KNAS licentiekaart aan voor het seizoen 2026/2027 of controleer je huidige actieve status.
                </p>
              </div>
            </div>

            {/* Form layout */}
            <form onSubmit={handleLicenseCheck} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-sans font-bold text-xs text-primary uppercase tracking-wider block mb-2">Volledige Naam:</label>
                  <input 
                    type="text"
                    required
                    value={licenseName}
                    onChange={(e) => setLicenseName(e.target.value)}
                    placeholder="Bv. Carmen Berends"
                    className="w-full border border-piste-silver bg-white rounded p-3 text-xs sm:text-sm font-sans outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-sans font-bold text-xs text-primary uppercase tracking-wider block mb-2">Aangesloten Club:</label>
                  <input 
                    type="text"
                    required
                    value={licenseClub}
                    onChange={(e) => setLicenseClub(e.target.value)}
                    placeholder="Bv. Schermcentrum Amsterdam"
                    className="w-full border border-piste-silver bg-white rounded p-3 text-xs sm:text-sm font-sans outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-sans font-bold text-xs text-primary uppercase tracking-wider block mb-2">Primair Wapen:</label>
                  <select 
                    value={licenseWeapon}
                    onChange={(e) => setLicenseWeapon(e.target.value as any)}
                    className="w-full border border-piste-silver bg-white rounded p-3 text-xs sm:text-sm font-sans outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Degen">Degen (Steekwapen)</option>
                    <option value="Floret">Floret (Steekwapen)</option>
                    <option value="Sabel">Sabel (Slag- en steekwapen)</option>
                  </select>
                </div>
              </div>

              {/* Legal guidelines checks checklist */}
              <div className="p-4 bg-surface-container-low rounded-md border border-piste-silver/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-on-surface-variant">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" required className="rounded accent-primary w-4 h-4 shrink-0" />
                  <span>Medische geschiktheidsverklaring ingediend</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" required className="rounded accent-primary w-4 h-4 shrink-0" />
                  <span>KNAS Bondscontributie 2026/2027 voldaan</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" required className="rounded accent-primary w-4 h-4 shrink-0" />
                  <span>Akkoord met het dopingreglement van de KNAS</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" required className="rounded accent-primary w-4 h-4 shrink-0" />
                  <span>Reglementair lidmaatschap bij aangesloten club</span>
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  className="bg-primary text-white hover:bg-royal-orange px-8 py-4 rounded font-sans font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2 shadow-xs"
                >
                  Genereer Licentiekaart <UserCheck className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 4. Interactive Digital KNAS License Modal */}
      <AnimatePresence>
        {showLicenseModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-md w-full flex flex-col"
            >
              {/* License Card Header */}
              <div className="bg-primary p-6 text-white text-center border-b border-piste-silver shrink-0 relative">
                <button 
                  onClick={() => setShowLicenseModal(false)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full transition-colors"
                  aria-label="Sluiten"
                >
                  <X className="w-5 h-5" />
                </button>
                <img 
                  alt="KNAS Logo White" 
                  className="h-10 w-10 mx-auto mb-2 brightness-0 invert" 
                  src="https://lh3.googleusercontent.com/aida/AP1WRLsGt58bsqSQSarl_qXYrlBBMlf0FbNObEY19LRmrGMMMQcrrRsfA9FSvorYN1_-7t7GrgjBYx_ANdO-GoZ0S13SgKstOcFD35RdVW7-rcjOxa3lapAPrVDMaNAyeqsqle3v3TC1MPJFc6OHR8uVQXkYQmOD8uEAHy1EC0C14XOlUCuVBh7lZEq7oTF-L7ssV_EIg7hNDxz07PtcEC_NVKW0_M5RJLc3VirSetzBYpNyMh6jskvrbj2kNAg"
                />
                <h4 className="font-serif text-lg font-bold leading-none mb-0.5">Koninklijke Nederlandse Algemene Schermbond</h4>
                <p className="text-[10px] font-sans font-bold tracking-widest text-royal-orange uppercase">Officiële Wedstrijdlicentie</p>
              </div>

              {/* License Card Body representation */}
              <div className="p-8 relative overflow-hidden bg-gradient-to-br from-white to-surface-container-low flex-1">
                {/* Diagonal watermark text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/[0.03] text-5xl font-sans font-black uppercase tracking-widest transform -rotate-45 pointer-events-none select-none">
                  KNAS 2026
                </div>

                <div className="flex items-start gap-5 relative z-10">
                  {/* Mock athlete portrait icon */}
                  <div className="w-24 h-28 bg-surface-container border border-piste-silver rounded flex flex-col items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-4xl text-primary font-light">sports_martial_arts</span>
                    <span className="text-[9px] font-sans font-bold text-on-surface-variant uppercase mt-1">ATLEET</span>
                  </div>

                  {/* Athlete specs list */}
                  <div className="flex-1 space-y-3 font-sans">
                    <div>
                      <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider block">Naam Atleet:</span>
                      <span className="text-sm font-bold text-primary">{licenseName}</span>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider block">Vereniging:</span>
                      <span className="text-xs font-semibold text-primary">{licenseClub}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider block">Discipline:</span>
                        <span className="text-xs font-bold text-royal-orange">{licenseWeapon}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider block">Licentienummer:</span>
                        <span className="text-xs font-mono font-bold text-primary">NL-2026-9871</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="mt-8 bg-green-50 border border-green-200 text-green-800 rounded p-3 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase font-sans">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    Status: Gecertificeerd Actief
                  </div>
                  <span className="text-[10px] font-sans text-green-600 font-medium">Geldig t/m juni 2027</span>
                </div>
              </div>

              {/* License Card Footer action bar */}
              <div className="p-4 bg-surface-container border-t border-piste-silver flex justify-between items-center shrink-0">
                <span className="text-[10px] font-sans text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">gavel</span> NOC*NSF Gecertificeerd
                </span>
                <button 
                  onClick={() => {
                    window.print();
                  }}
                  className="bg-primary text-white px-4 py-2 rounded text-xs font-sans font-bold uppercase tracking-wider hover:bg-royal-orange transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">print</span> Print Kaart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
