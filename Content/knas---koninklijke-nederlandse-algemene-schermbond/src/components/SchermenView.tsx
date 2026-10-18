import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Target, Award, Plus, Minus, Swords, ChevronDown } from 'lucide-react';
import { weaponsData, faqData } from '../data';

export default function SchermenView() {
  const [activeWeaponId, setActiveWeaponId] = useState('floret');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const activeWeapon = weaponsData.find(w => w.id === activeWeaponId) || weaponsData[0];

  const toggleFaq = (id: string) => {
    if (expandedFaqId === id) {
      setExpandedFaqId(null);
    } else {
      setExpandedFaqId(id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Intro Hero Header */}
      <section className="bg-primary text-white py-16 px-4 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 piste-pattern pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-2.5 block">Introductie</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Wat is Schermen?</h1>
          <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            Schermen is een gracieuze, tactische en bliksemsnelle gevechtssport. Het combineert de fysieke explosiviteit van een sprinter met het strategische inzicht van een schaker. Twee atleten staan tegenover elkaar op een metalen loper (piste) van 14 meter lang, gewapend met floret, degen of sabel.
          </p>
        </div>
      </section>

      {/* 2. core values / badges row */}
      <section className="py-8 border-b border-piste-silver bg-white px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-3">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-base font-bold text-primary mb-1">Eerlijk Spel & Respect</h3>
            <p className="font-sans text-xs text-on-surface-variant max-w-xs">Bij aanvang en afloop van elk gevecht groeten schermers elkaar, de scheidsrechter en het publiek.</p>
          </div>
          <div className="p-4 flex flex-col items-center border-y md:border-y-0 md:border-x border-piste-silver">
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-3">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-base font-bold text-primary mb-1">Focus & Reflexen</h3>
            <p className="font-sans text-xs text-on-surface-variant max-w-xs">Een treffer wordt beslist in milliseconden. Absolute focus en razendsnelle oog-handcoördinatie zijn essentieel.</p>
          </div>
          <div className="p-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-3">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-base font-bold text-primary mb-1">Drie Disciplines</h3>
            <p className="font-sans text-xs text-on-surface-variant max-w-xs">Elk wapen heeft eigen unieke reglementen, trefvlakken, tactieken en specifieke trainingsmethoden.</p>
          </div>
        </div>
      </section>

      {/* 3. Interactive Weapon Showcase section */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-1.5 block">Kies je discipline</span>
          <h2 className="font-serif text-2xl md:text-3xl text-primary font-bold">De Drie Bondswapens</h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-lg mx-auto mt-2">
            Klik op een wapen om de specifieke trefvlakken, tactiek en kenmerken te ontdekken.
          </p>
        </div>

        {/* Weapons layout grid with tabs and display pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Weapon Selector Tabs on left (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            {weaponsData.map((weapon) => {
              const isSelected = weapon.id === activeWeaponId;
              return (
                <button
                  key={weapon.id}
                  onClick={() => setActiveWeaponId(weapon.id)}
                  className={`w-full p-5 rounded-lg border text-left transition-all duration-300 relative overflow-hidden flex items-center justify-between group ${
                    isSelected 
                      ? 'border-primary bg-primary text-white shadow-md' 
                      : 'border-piste-silver bg-white text-primary hover:border-royal-orange hover:shadow-xs'
                  }`}
                  id={`weapon-tab-${weapon.id}`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <Swords className={`w-5 h-5 ${isSelected ? 'text-royal-orange' : 'text-primary'}`} />
                    <div>
                      <h3 className="font-serif text-lg font-bold leading-none mb-1">{weapon.name}</h3>
                      <p className={`font-sans text-xs ${isSelected ? 'text-white/80' : 'text-on-surface-variant'}`}>
                        {weapon.type}
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined font-light">
                    {isSelected ? 'arrow_circle_right' : 'arrow_forward'}
                  </span>
                </button>
              );
            })}

            {/* Quick Summary Tip Box */}
            <div className="bg-surface-container p-5 rounded-lg border border-piste-silver mt-4">
              <h4 className="font-serif text-sm font-bold text-primary mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-royal-orange">info</span> Wist je dat?
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Schermen was een van de weinige sporten die sinds de eerste moderne Olympische Spelen in 1896 (Athene) onafgebroken op het programma staan.
              </p>
            </div>
          </div>

          {/* Weapon Feature Panel on right (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-piste-silver rounded-lg p-6 md:p-10 shadow-xs flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWeapon.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                {/* Left block: Description & specs */}
                <div className="flex flex-col space-y-5">
                  <div>
                    <span className="text-xs font-sans font-bold text-royal-orange uppercase tracking-wider block mb-1">
                      {activeWeapon.type}
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-primary mb-3">
                      {activeWeapon.name}
                    </h3>
                    <div className="w-12 h-1 bg-royal-orange rounded-full mb-4"></div>
                  </div>

                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    {activeWeapon.description}
                  </p>

                  <div className="pt-3 space-y-3.5 border-t border-piste-silver">
                    <div>
                      <span className="font-sans font-bold text-xs text-primary uppercase tracking-wider block mb-0.5">
                        Trefvlak:
                      </span>
                      <span className="font-sans text-sm text-on-surface-variant flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-royal-orange"></span>
                        {activeWeapon.target}
                      </span>
                    </div>

                    <div>
                      <span className="font-sans font-bold text-xs text-primary uppercase tracking-wider block mb-0.5">
                        Wapentype:
                      </span>
                      <span className="font-sans text-sm text-on-surface-variant flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-royal-orange"></span>
                        {activeWeapon.type}
                      </span>
                    </div>
                  </div>

                  {/* Weapon tags list */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {activeWeapon.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="bg-surface-container text-primary font-sans text-xs px-2.5 py-1 rounded-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right block: Weapon Silhouette Hotlink */}
                <div className="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-lg border border-piste-silver/65 aspect-square relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-10 fencing-mesh-pattern pointer-events-none"></div>
                  <img 
                    alt={`${activeWeapon.name} wapen detail`}
                    className="max-h-64 object-contain relative z-10 drop-shadow-md transition-transform duration-500 group-hover:scale-105" 
                    referrerPolicy="no-referrer"
                    src={activeWeapon.image}
                  />
                  <span className="absolute bottom-3 right-3 text-[10px] font-mono text-on-surface-variant bg-white px-2 py-1 rounded-sm border border-piste-silver z-10 shadow-xs">
                    KNAS Licentie Wapen
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. FAQ Accordion section */}
      <section className="bg-surface-container-low py-20 px-4 md:px-10">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <span className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-1.5 block">FAQ</span>
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-bold">Veelgestelde Vragen</h2>
            <p className="font-sans text-sm text-on-surface-variant mt-2 max-w-md mx-auto">
              Alles wat je moet weten over de opstart, veiligheid, uitrusting en kosten van de schermsport.
            </p>
          </div>

          {/* Accordion container */}
          <div className="space-y-3.5">
            {faqData.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-lg border border-piste-silver overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 flex justify-between items-center text-left hover:bg-surface-container-low transition-colors duration-200 focus:outline-none group"
                    id={`faq-btn-${faq.id}`}
                  >
                    <span className="font-serif text-base font-bold text-primary group-hover:text-royal-orange transition-colors pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary shrink-0"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-piste-silver/40 font-sans text-sm text-on-surface-variant leading-relaxed bg-surface-container-low/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
