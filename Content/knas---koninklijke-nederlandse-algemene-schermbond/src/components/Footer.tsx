import { Share2, Youtube, MapPin, Mail, Globe } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
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
              src="https://lh3.googleusercontent.com/aida/AP1WRLsGt58bsqSQSarl_qXYrlBBMlf0FbNObEY19LRmrGMMMQcrrRsfA9FSvorYN1_-7t7GrgjBYx_ANdO-GoZ0S13SgKstOcFD35RdVW7-rcjOxa3lapAPrVDMaNAyeqsqle3v3TC1MPJFc6OHR8uVQXkYQmOD8uEAHy1EC0C14XOlUCuVBh7lZEq7oTF-L7ssV_EIg7hNDxz07PtcEC_NVKW0_M5RJLc3VirSetzBYpNyMh6jskvrbj2kNAg"
            />
            <span className="font-serif text-2xl text-white uppercase font-bold tracking-tight">KNAS</span>
          </div>
          <p className="font-sans text-[14px] text-on-tertiary-container leading-relaxed">
            De Koninklijke Nederlandse Algemene Schermbond bevordert de schermsport in al haar facetten, van recreatieve schoolsport tot Olympisch topsportniveau. Sinds 1904 de hoeder van de schermsport in Nederland.
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
                Wedstrijden & Kalender
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: Federatie & Regels */}
        <div>
          <h4 className="font-sans font-bold text-white text-[13px] uppercase tracking-wider mb-6">Federatie</h4>
          <ul className="space-y-3 font-sans text-[14px] text-on-tertiary-container">
            <li>
              <a href="#statuten" className="hover:text-royal-orange transition-colors">
                Statuten & Reglementen
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-royal-orange transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#anti-doping" className="hover:text-royal-orange transition-colors">
                Anti-Doping Richtlijnen
              </a>
            </li>
            <li>
              <a href="#vacatures" className="hover:text-royal-orange transition-colors">
                Vacatures & Vrijwilligers
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Volg ons */}
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
                <span>Nieuwegein, Utrecht<br />Nederland</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold text-white text-[13px] uppercase tracking-wider mb-3">Volg ons</h4>
            <div className="flex gap-3">
              <a 
                href="#share" 
                className="w-9 h-9 rounded-full border border-tertiary-container flex items-center justify-center text-on-tertiary hover:bg-royal-orange hover:border-royal-orange transition-colors"
                title="Deel deze pagina"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a 
                href="#youtube" 
                className="w-9 h-9 rounded-full border border-tertiary-container flex items-center justify-center text-on-tertiary hover:bg-royal-orange hover:border-royal-orange transition-colors"
                title="KNAS YouTube Kanaal"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="#public" 
                className="w-9 h-9 rounded-full border border-tertiary-container flex items-center justify-center text-on-tertiary hover:bg-royal-orange hover:border-royal-orange transition-colors"
                title="Internationale Federatie"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuRpQxnDq2TYWRkbR8wlVaNGxDPQ3_HLKwhZxfK5ndJ39dF6IGX3-iPpMYZHj03vpSCoGubm-u6xy-3x0Xp4VDCW0dS6TnSnipddwfG0l0bkY71msuH8NofR8zR_mM-8bPkemEIQNzJsxMs30bUag3ZHlYOjYMfsNXAn4RKgR5ThKciQWYJQxKjVA4WWbdZb6djlFTSEh95Qhi-O_xdf455lueYtnoI8utJo8EiHMy0BOqRTjp5vE45613N1qWAGvzndDZ4IGasPc"
          />
        </div>
      </div>
    </footer>
  );
}
