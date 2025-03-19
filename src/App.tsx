import React, { useState, useEffect } from 'react';
import { Wine, Music, GlassWater, PartyPopper, Heart, ArrowLeft, Loader2 } from 'lucide-react';
import type { WineType, MomentType, Song } from './types';
import { playlistData } from './data/playlists';
import { cn } from './lib/utils';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Roadmap from './components/Roadmap';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { AppProvider, useApp } from './contexts/AppContext';
import TokenParallax from './components/TokenParallax';

const MainContent = () => {
  const { theme } = useApp();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-[#1A1E2E] text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      <Hero />
      <About />
      <TokenParallax />
      <HowItWorks />
      <Roadmap />
      <FAQ />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;