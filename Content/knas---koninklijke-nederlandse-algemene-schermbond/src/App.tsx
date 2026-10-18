import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import SchermenView from './components/SchermenView';
import VerenigingenView from './components/VerenigingenView';
import WedstrijdenView from './components/WedstrijdenView';
import OpleidingenView from './components/OpleidingenView';
import OverKnasView from './components/OverKnasView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchLocation, setSearchLocation] = useState<string>('');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            setActiveTab={setActiveTab} 
            setSearchLocation={setSearchLocation} 
          />
        );
      case 'schermen':
        return <SchermenView />;
      case 'verenigingen':
        return (
          <VerenigingenView 
            searchLocation={searchLocation} 
            setSearchLocation={setSearchLocation} 
          />
        );
      case 'wedstrijden':
        return <WedstrijdenView />;
      case 'opleidingen':
        return <OpleidingenView />;
      case 'over-knas':
        return <OverKnasView />;
      default:
        return <HomeView setActiveTab={setActiveTab} setSearchLocation={setSearchLocation} />;
    }
  };

  const handleGlobalSearch = (query: string) => {
    setSearchLocation(query);
    setActiveTab('verenigingen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans antialiased selection:bg-royal-orange/30 selection:text-primary">
      {/* Top Banner & Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSearch={handleGlobalSearch}
      />

      {/* Main Orchestration & Screen Transitions Container */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Brand Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

