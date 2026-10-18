import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Globe, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearch?: (query: string) => void;
}

export default function Header({ activeTab, setActiveTab, onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'schermen', label: 'Schermen' },
    { id: 'verenigingen', label: 'Verenigingen' },
    { id: 'wedstrijden', label: 'Wedstrijden' },
    { id: 'opleidingen', label: 'Opleidingen' },
    { id: 'over-knas', label: 'Over KNAS' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    setSearchOpen(false);
  };

  return (
    <header className="bg-white border-b border-piste-silver sticky top-0 z-50 shadow-xs">
      <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-7xl mx-auto h-20">
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} 
          className="flex items-center gap-3 cursor-pointer group"
          id="logo-brand"
        >
          <img 
            alt="KNAS Logo" 
            className="h-12 w-12 object-contain transition-transform group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLsGt58bsqSQSarl_qXYrlBBMlf0FbNObEY19LRmrGMMMQcrrRsfA9FSvorYN1_-7t7GrgjBYx_ANdO-GoZ0S13SgKstOcFD35RdVW7-rcjOxa3lapAPrVDMaNAyeqsqle3v3TC1MPJFc6OHR8uVQXkYQmOD8uEAHy1EC0C14XOlUCuVBh7lZEq7oTF-L7ssV_EIg7hNDxz07PtcEC_NVKW0_M5RJLc3VirSetzBYpNyMh6jskvrbj2kNAg"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl text-primary font-bold tracking-tight uppercase leading-none">KNAS</span>
            <span className="text-[9px] font-sans font-bold tracking-widest text-on-surface-variant uppercase hidden sm:block">Koninklijke Bond</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-6 h-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`relative px-3 py-2 text-[14px] font-sans font-bold uppercase tracking-wider transition-colors duration-200 h-full flex items-center ${
                  isActive ? 'text-primary' : 'text-on-surface-variant hover:text-royal-orange'
                }`}
                id={`nav-${item.id}`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Search Toggle */}
          <div className="relative">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-primary hover:text-royal-orange p-2 transition-colors focus:outline-none"
              aria-label="Zoeken"
              id="search-btn"
            >
              <Search className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {searchOpen && (
                <motion.form 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 top-12 bg-white border border-piste-silver p-3 rounded-lg shadow-xl flex gap-2 z-50 w-72"
                >
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Zoek op verenigingen, toernooien..."
                    className="flex-1 border border-piste-silver rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-sans"
                    autoFocus
                  />
                  <button 
                    type="submit" 
                    className="bg-primary text-white text-xs px-3 py-1.5 rounded font-bold hover:bg-royal-orange transition-colors uppercase"
                  >
                    Zoek
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Call to Action button */}
          <button 
            onClick={() => setActiveTab('verenigingen')}
            className="bg-primary text-white px-5 py-2.5 rounded text-xs md:text-sm font-sans font-bold uppercase tracking-wider hover:bg-royal-orange transition-all duration-300 shadow-xs hover:scale-[1.02] active:scale-[0.98]"
            id="cta-vind-club"
          >
            Vind een club
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary hover:text-royal-orange p-2 focus:outline-none"
            aria-label="Menu openen"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-piste-silver overflow-hidden shadow-lg z-40"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                    className={`flex justify-between items-center w-full px-4 py-3 rounded text-[15px] font-sans font-bold uppercase tracking-wider text-left transition-colors ${
                      isActive ? 'bg-primary/5 text-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-royal-orange'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
              <div className="border-t border-piste-silver pt-4 mt-2 flex items-center justify-between px-4 text-xs font-sans text-on-surface-variant">
                <span className="flex items-center gap-1"><Globe className="w-4 h-4 text-primary" /> NL / EN</span>
                <span>Koninklijke Schermbond</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
