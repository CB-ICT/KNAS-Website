import { MapPin, Mail, Globe } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const partnerNames = ['Decathlon', 'Nederlandse Loterij', 'NOC*NSF', 'FIE', 'EFC', 'AON'];

  return (
    <footer className="bg-tertiary text-on-tertiary border-t border-tertiary-container mt-auto">
      {/* Primary Footer Content Grid */}
      <div className="w-full py-12 md:py-16 px-4 md:px-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Information */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <img 
              alt="KNAS Logo White" 
              className="h-10 w-10 brightness-0 invert" 
              src="images/brand/knas-logo.png"
            />
            <span className="font-serif text-2xl text-white uppercase font-bold tracking-tight">KNAS</span>
          </div>
          <p className="font-sans text-[14px] text-on-tertiary-container leading-relaxed">
            De Koninklijke Nederlandse Algemene Schermbond bevordert de schermsport in al haar facetten, van recreatieve schoolsport tot Olympisch topsportniveau. Sinds 1908 de hoeder van de schermsport in Nederland.
          </p>
        </div>

        {/* Column 1: De Sport */}
        <div>
          <h4 className="font-sans font-bold text-white text-[13px] uppercase tracking-wider mb-6">De Sport</h4>
          <ul className="space-y-3 font-sans text-[14px] text-on-tertiary-container">
            <li>
              <button 
                onClick={() => { setActiveTab('schermen'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-royal-orange text-left transition-colors cursor-pointer"
              >
                Wat is schermen?
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveTab('schermen'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-royal-orange text-left transition-colors cursor-pointer"
              >
                De drie wapens (Floret, Degen, Sabel)
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveTab('verenigingen'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-royal-orange text-left transition-colors cursor-pointer"
              >
                Vind een schermclub
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveTab('wedstrijden'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-royal-orange text-left transition-colors cursor-pointer"
              >
                Wedstrijden (Kalender)
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveTab('ranglijsten'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-royal-orange text-left transition-colors cursor-pointer"
              >
                Ranglijsten
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveTab('nieuws'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-royal-orange text-left transition-colors cursor-pointer"
              >
                Nieuws
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: Federatie & Regels */}
        <div>
          <h4 className="font-sans font-bold text-white text-[13px] uppercase tracking-wider mb-6">Federatie</h4>
          <ul className="space-y-3 font-sans text-[14px] text-on-tertiary-container">
            <li>
              <a href="docs/policy/algemeen-reglement-2025.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-royal-orange transition-colors">
                Algemeen Reglement
              </a>
            </li>
            <li>
              <a href="docs/policy/privacyverklaring.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-royal-orange transition-colors">
                Privacyverklaring
              </a>
            </li>
            <li>
              <a href="docs/policy/meerjarenbeleidsplan-2025-2028.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-royal-orange transition-colors">
                Meerjarenbeleidsplan
              </a>
            </li>
            <li>
              <button
                onClick={() => { setActiveTab('voor-clubs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-royal-orange transition-colors text-left cursor-pointer"
              >
                Voor clubs
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveTab('commissies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-royal-orange transition-colors text-left cursor-pointer"
              >
                Commissies
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-royal-orange transition-colors text-left cursor-pointer"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col space-y-6">
          <div>
            <h4 className="font-sans font-bold text-white text-[13px] uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 font-sans text-[14px] text-on-tertiary-container">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-royal-orange shrink-0" />
                <a href="mailto:info@knas.nl" className="hover:text-royal-orange transition-colors">info@knas.nl</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-royal-orange shrink-0 mt-0.5" />
                <span>Kelvinbaan 48<br />3439 MT Nieuwegein</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-royal-orange shrink-0" />
                <button
                  onClick={() => { setActiveTab('over-knas'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-royal-orange transition-colors text-left cursor-pointer"
                >
                  Over de KNAS
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-tertiary-container/30 px-4 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h4 className="font-sans text-[13px] font-bold uppercase tracking-wider text-white">Partners van de schermsport</h4>
            <button
              onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-sans text-xs font-semibold text-on-tertiary-container transition-colors hover:text-royal-orange"
            >
              Word partner
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
            {partnerNames.map((partner) => (
              <div key={partner} className="flex min-h-14 items-center justify-center border border-white/15 bg-white/5 px-3 text-center font-serif text-sm font-bold text-white/85">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Area */}
      <div className="w-full py-6 px-4 md:px-10 max-w-7xl mx-auto border-t border-tertiary-container/30 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-sans text-[12px] text-on-tertiary-container text-center sm:text-left">
          © 2026 Koninklijke Nederlandse Algemene Schermbond (KNAS). Alle rechten voorbehouden.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-sans text-on-tertiary-container">Lid van NOC*NSF & FIE</span>
          <img 
            alt="Dutch Flag" 
            className="w-6 h-4 object-cover border border-white/10 rounded-xs shadow-xs" 
            src="images/brand/nl-flag.svg"
          />
        </div>
      </div>
    </footer>
  );
}
