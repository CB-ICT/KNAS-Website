import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Map, Calendar, ArrowRight, CheckCircle2, ChevronRight, X, Mail } from 'lucide-react';
import { newsData, tournamentsData } from '../data';
import { NewsItem } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  setSearchLocation: (location: string) => void;
}

export default function HomeView({ setActiveTab, setSearchLocation }: HomeViewProps) {
  const [postalQuery, setPostalQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Filter 3 news items (already 3 in data, but let's take first 3)
  const homeNews = newsData.slice(0, 3);
  // Filter 3 tournament items for homepage
  const homeTournaments = tournamentsData.slice(0, 3);

  const handlePostalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (postalQuery.trim()) {
      setSearchLocation(postalQuery.trim());
      setActiveTab('verenigingen');
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] min-h-[550px] w-full overflow-hidden flex items-center bg-fencing-blue">
        {/* Subtle Mask mesh watermark */}
        <div className="absolute inset-0 z-0 opacity-10 fencing-mesh-pattern pointer-events-none"></div>
        {/* Overlay gradient to ensure white text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent z-10"></div>
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 z-0 w-full h-full bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0qfNnRLfX7LKNpYozyJ-EOim8JyLAjs2oZ48Rh1V6LRcq07gKTKhfSNjNbbMbkM1ZTJoJJuKPgZTGrzVu8eougrnbkxytyIUXKw7eoYAmcYBxUgOaP5H08OsVE64aQuRs1bONEcRkmx49iyu4TRv1fCW-GFF8J_T4AAtNJbeLDKPmN8ZYx_iB8k9uD8rf_KbhkduFrTHjMLhMdF1kJQJBYbuA-ICBa0PrZwPAIDduTm2VysfrE7lI3pL5aOGOVcvRTQsMcLxKeDo')" 
          }}
          role="img"
          aria-label="Twee schermers in actie op de loper"
        ></div>

        {/* Hero Content Grid */}
        <div className="relative z-20 w-full px-4 md:px-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-royal-orange text-white px-4 py-1.5 rounded-sm font-sans font-bold text-xs uppercase tracking-widest mb-6"
            >
              Koninklijke Nederlandse Algemene Schermbond
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight font-bold tracking-tight"
            >
              Scherp op de <span className="italic font-normal">Toekomst</span>.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-base sm:text-lg md:text-xl text-white/95 mb-10 max-w-xl leading-relaxed"
            >
              Ontdek de elegantie, snelheid en strategie van de schermsport. Van breedtesport tot Olympisch niveau, wij faciliteren en stimuleren schermen in heel Nederland.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => setActiveTab('schermen')}
                className="bg-royal-orange text-white px-8 py-4 rounded font-sans font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
              >
                Begin met Schermen
              </button>
              <button 
                onClick={() => setActiveTab('wedstrijden')}
                className="border-2 border-white text-white px-8 py-4 rounded font-sans font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Bekijk Wedstrijden
              </button>
            </motion.div>
          </div>
        </div>

        {/* Geometric Mask Grid Accent */}
        <div className="absolute bottom-10 right-10 opacity-15 hidden lg:block z-20">
          <div className="w-56 h-56 fencing-mesh-pattern rounded-full border border-piste-silver"></div>
        </div>
      </section>

      {/* 2. Interactive Search CTA Bar */}
      <section className="relative z-30 mx-4 md:mx-10 max-w-7xl md:mx-auto -mt-16 bg-white rounded-lg shadow-xl border border-piste-silver overflow-hidden">
        <div className="px-6 py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-xl md:text-2xl text-primary font-bold mb-2">Vind een schermclub bij jou in de buurt</h2>
            <p className="font-sans text-[14px] text-on-surface-variant">Ontdek waar je direct kunt trainen en een proefles kunt aanvragen, van Amsterdam tot Maastricht.</p>
          </div>
          <form onSubmit={handlePostalSearch} className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">location_on</span>
              <input 
                type="text"
                value={postalQuery}
                onChange={(e) => setPostalQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 border border-piste-silver rounded bg-white text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                placeholder="Postcode of stad..." 
              />
            </div>
            <button 
              type="submit" 
              className="bg-royal-orange text-white px-6 h-[46px] rounded font-sans font-bold uppercase text-xs tracking-wider flex items-center gap-2 hover:bg-primary transition-all duration-300"
            >
              Zoeken <Map className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* 3. Latest News Cards */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-1.5 block">Update</span>
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-bold">Laatste Nieuws</h2>
          </div>
          <button 
            onClick={() => setActiveTab('schermen')}
            className="text-primary font-sans font-bold text-xs uppercase tracking-wider border-b-2 border-primary pb-1 hover:text-royal-orange hover:border-royal-orange transition-all flex items-center gap-1.5"
          >
            Wat is Schermen? <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homeNews.map((news) => (
            <article 
              key={news.id} 
              onClick={() => setSelectedArticle(news)}
              className="group bg-white rounded-lg border border-piste-silver overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              <div className="aspect-video overflow-hidden bg-surface-container relative">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={news.image} 
                  alt={news.title}
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-sans font-bold px-2.5 py-1 uppercase tracking-wider rounded-xs">
                  {news.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <time className="font-sans font-bold text-xs text-on-surface-variant uppercase tracking-wider">{news.date}</time>
                  <h3 className="font-serif text-lg md:text-xl text-primary font-bold mt-2 mb-3 leading-snug group-hover:text-royal-orange transition-colors">
                    {news.title}
                  </h3>
                  <p className="font-sans text-[14px] text-on-surface-variant line-clamp-3 leading-relaxed">
                    {news.summary}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-primary font-sans font-bold text-xs uppercase tracking-wider group-hover:text-royal-orange transition-colors mt-auto">
                  Lees Artikel <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Tournament Schedule Grid */}
      <section className="bg-surface-container-low py-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Calendar Info Side Column */}
            <div className="lg:sticky lg:top-32">
              <span className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-1.5 block">Toernooi Kalender</span>
              <h2 className="font-serif text-2xl md:text-3xl text-primary font-bold leading-tight mb-6">Komende Grote Toernooien</h2>
              <p className="font-sans text-[14px] text-on-surface-variant leading-relaxed mb-8">
                Blijf op de hoogte van de belangrijkste nationale en internationale schermcompetities. Support onze Nederlandse schermers live op locatie of via de live scoring streams.
              </p>
              <button 
                onClick={() => setActiveTab('wedstrijden')}
                className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3.5 rounded font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300"
              >
                Bekijk Volledige Kalender <Calendar className="w-4 h-4" />
              </button>
            </div>

            {/* List of 3 Home Tournaments */}
            <div className="lg:col-span-2 space-y-4">
              {homeTournaments.map((tour) => (
                <div 
                  key={tour.id}
                  className="bg-white p-5 rounded-lg border border-piste-silver flex flex-col md:flex-row md:items-center justify-between gap-5 hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="flex items-center gap-5">
                    {/* Date badge */}
                    <div className="w-16 h-16 flex flex-col items-center justify-center text-center border-r border-piste-silver pr-5 shrink-0">
                      <span className="font-sans font-bold text-xs text-on-surface-variant uppercase tracking-wider leading-none mb-1">{tour.dateMonth}</span>
                      <span className="font-serif text-2xl font-bold text-primary leading-none">{tour.dateDay}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        {tour.isLive && (
                          <span className="text-[10px] bg-royal-orange/15 text-royal-orange font-sans font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider animate-pulse">
                            Live Nu
                          </span>
                        )}
                        <span className="text-[10px] text-on-surface-variant font-sans font-bold uppercase tracking-wider">{tour.type}</span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-primary leading-snug group-hover:text-royal-orange transition-colors">
                        {tour.title}
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant mt-1">
                        {tour.location} • {tour.time}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab('wedstrijden')}
                    className={`px-5 py-2.5 rounded font-sans font-bold text-xs uppercase tracking-widest text-center transition-all ${
                      tour.isLive 
                        ? 'bg-fencing-blue text-white hover:bg-royal-orange' 
                        : 'border border-piste-silver text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {tour.actionLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Newsletter Signup Area */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        {/* Subtle Mask pattern in newsletter */}
        <div className="absolute inset-0 opacity-10 fencing-mesh-pattern pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
          <span className="text-royal-orange font-sans font-bold text-xs uppercase tracking-widest mb-3 block">Blijf Scherp</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">Mis geen enkele schermactie</h2>
          <p className="font-sans text-sm md:text-base mb-8 text-white/80 leading-relaxed">
            Meld je aan voor de officiële KNAS nieuwsbrief en ontvang maandelijks updates over toernooien, nationale selecties, reglementswijzigingen en clubnieuws.
          </p>

          <AnimatePresence mode="wait">
            {!newsletterSuccess ? (
              <motion.form 
                key="newsletter-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/55 w-5 h-5" />
                  <input 
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Je e-mailadres" 
                    className="w-full pl-11 pr-4 h-[50px] bg-white/10 border border-white/20 rounded focus:bg-white focus:text-primary transition-all outline-none text-white text-sm font-sans"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-royal-orange text-white px-8 h-[50px] rounded font-sans font-bold uppercase text-xs tracking-wider hover:bg-white hover:text-primary transition-all duration-300 shadow-md"
                >
                  Aanmelden
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success-msg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/10 border border-white/25 rounded-lg p-5 max-w-md mx-auto flex flex-col items-center gap-3"
              >
                <CheckCircle2 className="w-10 h-10 text-royal-orange" />
                <div>
                  <h4 className="font-sans font-bold text-white text-sm uppercase tracking-wider">Succesvol Aangemeld</h4>
                  <p className="font-sans text-xs text-white/80 mt-1">Bedankt voor je inschrijving! Je ontvangt binnenkort de eerste nieuwsbrief.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. News Reader Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col"
            >
              {/* Image banner */}
              <div className="relative h-64 sm:h-80 shrink-0">
                <img 
                  className="w-full h-full object-cover" 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                />
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                  aria-label="Sluiten"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-sans font-bold px-3 py-1 uppercase tracking-widest rounded-xs">
                  {selectedArticle.category}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <time className="font-sans font-bold text-xs text-on-surface-variant uppercase tracking-wider block mb-2">{selectedArticle.date}</time>
                <h3 className="font-serif text-2xl md:text-3xl text-primary font-bold mb-4 leading-tight">
                  {selectedArticle.title}
                </h3>
                <div className="w-12 h-[3px] bg-royal-orange mb-6"></div>
                
                <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-6 whitespace-pre-line">
                  {selectedArticle.summary}
                </p>
                
                <p className="font-sans text-xs md:text-sm text-on-surface-variant italic border-l-2 border-piste-silver pl-4 py-1">
                  Bron: Koninklijke Nederlandse Algemene Schermbond (KNAS). Dit artikel is gepubliceerd ter behoeve van aangesloten leden en schermclubs.
                </p>
              </div>

              {/* Action bar */}
              <div className="p-4 bg-surface-container border-t border-piste-silver flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="bg-primary text-white px-5 py-2.5 rounded text-xs font-sans font-bold uppercase tracking-wider hover:bg-royal-orange transition-colors"
                >
                  Sluiten
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
