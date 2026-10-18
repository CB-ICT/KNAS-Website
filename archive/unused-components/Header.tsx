import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Globe, ChevronRight, ChevronDown, ExternalLink } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearch?: (query: string) => void;
  onNavigate?: (tab: string, sectionId?: string) => void;
}

type NavChild = { id: string; label: string; sectionId?: string };
type NavItem = { id: string; label: string; children?: NavChild[] };

const knasLinks = [
  { label: 'Inschrijven wedstrijden', url: 'https://www.knas.nl/inschrijven' },
  { label: 'OnzeRelaties', url: 'https://www.knas.nl/inloggen-onzerelaties' },
  { label: 'Reglementen', url: 'https://www.knas.nl/bond_reglementen' },
];

export default function Header({ activeTab, setActiveTab, onSearch, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [openMobileDropdownId, setOpenMobileDropdownId] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      id: 'nieuws',
      label: 'Nieuws',
    },
    {
      id: 'schermen',
      label: 'Schermen',
      children: [
        { id: 'schermen', label: 'Begin met schermen' },
        { id: 'verenigingen', label: 'Vind een club' },
        { id: 'opleidingen', label: 'Opleidingen' },
        { id: 'inclusie', label: 'Diversiteit & inclusie' },
      ],
    },
    {
      id: 'over-knas',
      label: 'Over KNAS',
      children: [
        { id: 'over-knas', label: 'Wat we doen', sectionId: 'over-organisatie' },
        { id: 'bestuur', label: 'Bestuur' },
        { id: 'commissies', label: 'Commissies' },
        { id: 'lidmaatschap', label: 'Lidmaatschap' },
        { id: 'ereleden', label: 'Ereleden' },
      ],
    },
    {
      id: 'voor-clubs',
      label: 'Voor clubs',
    },
    {
      id: 'wedstrijden',
      label: 'Wedstrijden',
      children: [
        { id: 'wedstrijden', label: 'Wedstrijdkalender' },
        { id: 'wedstrijdinformatie', label: 'Hoe werken schermtoernooien?' },
        { id: 'ranglijsten', label: 'Ranglijsten' },
      ],
    },
    {
      id: 'topsport',
      label: 'Topsport',
    },
    {
      id: 'contact',
      label: 'Contact',
    },
  ];

  const navigateTo = (tab: string, sectionId?: string) => {
    if (onNavigate) {
      onNavigate(tab, sectionId);
    } else {
      setActiveTab(tab);
    }
    setOpenDropdownId(null);
    setOpenMobileDropdownId(null);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    setSearchOpen(false);
  };

  return (
    <header className="bg-white border-b border-piste-silver sticky top-0 z-50 shadow-xs">
      <div className="hidden md:block bg-primary text-white/80">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 font-sans text-xs md:px-10">
          <span>Officieel loket van de bond: <strong className="text-white">knas.nl</strong></span>
          <nav className="flex items-center gap-5" aria-label="Snel naar knas.nl">
            {knasLinks.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-royal-orange transition-colors">
                {link.label}
              </a>
            ))}
            <a
              href="https://www.knas.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-white hover:text-royal-orange transition-colors"
            >
              knas.nl <ExternalLink className="h-3 w-3" />
            </a>
          </nav>
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-7xl mx-auto h-20">
        {/* Brand Logo */}
        <div 
          onClick={() => { navigateTo('home'); }} 
          className="flex items-center gap-3 cursor-pointer group"
          id="logo-brand"
        >
          <img 
            alt="KNAS Logo" 
            className="h-12 w-12 object-contain transition-transform group-hover:scale-105" 
            src="images/brand/knas-logo.png"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl text-primary font-bold tracking-tight uppercase leading-none">KNAS</span>
            <span className="text-[9px] font-sans font-bold tracking-widest text-on-surface-variant uppercase hidden sm:block">Koninklijke Bond</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-1 h-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id || item.children?.some((child) => child.id === activeTab);
            return (
              <div
                key={item.id}
                className="relative h-full"
                onMouseEnter={() => item.children && setOpenDropdownId(item.id)}
                onMouseLeave={() => item.children && setOpenDropdownId((prev) => (prev === item.id ? null : prev))}
              >
                <button
                  onClick={() => navigateTo(item.id)}
                  className={`relative px-3 py-2 text-[14px] font-sans font-bold uppercase tracking-wider transition-colors duration-200 h-full flex items-center gap-1 ${
                    item.id === 'nieuws'
                      ? 'text-royal-orange hover:text-primary'
                      : isActive ? 'text-primary' : 'text-on-surface-variant hover:text-royal-orange'
                  }`}
                  id={`nav-${item.id}`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.children ? <ChevronDown className="w-3.5 h-3.5" /> : null}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full ${item.id === 'nieuws' ? 'bg-royal-orange' : 'bg-primary'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {item.children && openDropdownId === item.id ? (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute left-0 top-full mt-2 min-w-[220px] rounded-lg border border-piste-silver bg-white p-2 shadow-xl z-50"
                    >
                      {item.children.map((child) => (
                          <button
                            key={`${item.id}-${child.id}-${child.sectionId ?? 'root'}`}
                            onClick={() => navigateTo(child.id, child.sectionId)}
                          className="w-full rounded px-3 py-2 text-left text-sm font-sans font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
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
                    placeholder="Zoek een club op plaats of naam"
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
            onClick={() => navigateTo('verenigingen')}
            className="hidden sm:inline-flex bg-royal-orange text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-sans font-bold tracking-wide hover:bg-primary transition-all duration-300 shadow-xs hover:scale-[1.02] active:scale-[0.98]"
            id="cta-vind-club"
          >
            Vind een club
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-primary hover:text-royal-orange p-2 focus:outline-none"
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
            className="xl:hidden bg-white border-t border-piste-silver overflow-hidden shadow-lg z-40"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id || item.children?.some((child) => child.id === activeTab);
                return (
                  <div key={item.id} className="rounded border border-piste-silver/60 overflow-hidden">
                    <button
                      onClick={() => {
                        if (item.children) {
                          setOpenMobileDropdownId((prev) => (prev === item.id ? null : item.id));
                          return;
                        }
                        navigateTo(item.id);
                      }}
                      className={`flex justify-between items-center w-full px-4 py-3 text-[15px] font-sans font-bold uppercase tracking-wider text-left transition-colors ${
                        item.id === 'nieuws'
                          ? 'text-royal-orange hover:bg-royal-orange/10'
                          : isActive ? 'bg-primary/5 text-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-royal-orange'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.children ? <ChevronDown className="w-4 h-4 opacity-50" /> : <ChevronRight className="w-4 h-4 opacity-50" />}
                    </button>

                    {item.children && openMobileDropdownId === item.id ? (
                      <div className="border-t border-piste-silver/60 px-2 py-2 space-y-1">
                        {item.children.map((child) => (
                          <button
                            key={`${item.id}-mobile-${child.id}-${child.sectionId ?? 'root'}`}
                            onClick={() => navigateTo(child.id, child.sectionId)}
                            className="block w-full rounded px-3 py-2 text-left text-xs font-sans font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <div className="border-t border-piste-silver pt-4 mt-2 grid grid-cols-2 gap-2 px-1">
                {[...knasLinks, { label: 'Naar knas.nl', url: 'https://www.knas.nl' }].map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-1 rounded bg-surface-container-low px-3 py-2.5 font-sans text-xs font-semibold text-primary"
                  >
                    {link.label} <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-60" />
                  </a>
                ))}
              </div>
              <div className="pt-2 flex items-center justify-between px-4 text-xs font-sans text-on-surface-variant">
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
