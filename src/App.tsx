import React, { useState, useEffect } from 'react';
import { Wine, Music, GlassWater, PartyPopper, Heart, ArrowLeft, Loader2 } from 'lucide-react';
import type { WineType, MomentType, Song } from './types';
import { spotifyApi, createPlaylist } from './lib/spotify';
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#1A1E2E] text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TokenParallax />
        <HowItWorks />
        <Roadmap />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedWine, setSelectedWine] = useState<WineType | null>(null);
  const [selectedMoment, setSelectedMoment] = useState<MomentType | null>(null);
  const [step, setStep] = useState(0); // Start at welcome screen (step 0)
  const [randomSongs, setRandomSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const loadingMessages = [
    "Maridando tu vino con nuestra selección...",
    "Llamando a nuestro melómano de cabecera...",
    "El sommelier está configurando la lista...",
    "...disfrutando de un vino mientras trabajo.."
  ];

  useEffect(() => {
    // Check if we're already authenticated on mount
    spotifyApi.currentUser.profile()
      .then(() => {
        setIsAuthenticated(true);
        setStep(1);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setStep(0);
      });
  }, []);

  useEffect(() => {
    let messageInterval: number;
    let currentIndex = 0;

    if (isGenerating) {
      setLoadingMessage(loadingMessages[0]);
      messageInterval = window.setInterval(() => {
        currentIndex = (currentIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[currentIndex]);
      }, 2000);

      setTimeout(() => {
        setIsGenerating(false);
        setStep(3);
      }, 7000);
    }

    return () => {
      if (messageInterval) clearInterval(messageInterval);
    };
  }, [isGenerating]);

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector((this as HTMLAnchorElement).getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  const moments: { type: MomentType; icon: React.ReactNode; label: string }[] = [
    { type: 'dinner', icon: <Wine className="w-6 h-6" />, label: 'Cena' },
    { type: 'relaxation', icon: <GlassWater className="w-6 h-6" />, label: 'Relajación' },
    { type: 'celebration', icon: <PartyPopper className="w-6 h-6" />, label: 'Celebración' },
    { type: 'party', icon: <Music className="w-6 h-6" />, label: 'Fiesta' },
    { type: 'romantic', icon: <Heart className="w-6 h-6" />, label: 'Romántico' },
  ];

  const handleSpotifyAuth = async () => {
    try {
      await spotifyApi.authenticate();
      setIsAuthenticated(true);
      setStep(1);
    } catch (error) {
      console.error('Error authenticating with Spotify:', error);
      setError('Hubo un error al conectar con Spotify. Por favor, inténtalo de nuevo.');
    }
  };

  const handleWineSelect = (wine: WineType) => {
    setSelectedWine(wine);
    setStep(2);
  };

  const handleMomentSelect = (moment: MomentType) => {
    setSelectedMoment(moment);
    if (selectedWine) {
      const songs = playlistData[selectedWine][moment];
      const shuffled = [...songs].sort(() => Math.random() - 0.5).slice(0, 15);
      setRandomSongs(shuffled);
      setIsGenerating(true);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setSelectedWine(null);
      setStep(1);
    } else if (step === 3) {
      setSelectedMoment(null);
      setRandomSongs([]);
      setPlaylistUrl(null);
      setError(null);
      setStep(2);
    } else if (step === 5) {
      setStep(1);
    }
  };

  const handleCreatePlaylist = async () => {
    if (!selectedWine || !selectedMoment) return;

    setIsLoading(true);
    setIsGenerating(true);
    setError(null);

    try {
      const trackUris = randomSongs.map(song => song.uri);
      const playlist = await createPlaylist(
        `${getWineName(selectedWine)} & ${moments.find(m => m.type === selectedMoment)?.label || ''}`,
        `Una selección de canciones para disfrutar ${getWineName(selectedWine)} durante momentos de ${moments.find(m => m.type === selectedMoment)?.label || ''}.`,
        trackUris
      );
      setPlaylistUrl(playlist.external_urls.spotify);
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hubo un error al crear la lista de reproducción');
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  const getWineBackground = (wine: WineType) => {
    switch (wine) {
      case 'red': return 'bg-burgundy-600 hover:bg-burgundy-700';
      case 'rose': return 'bg-rose-300 hover:bg-rose-400';
      case 'white': return 'bg-amber-50 hover:bg-amber-100 text-gray-800';
      default: return '';
    }
  };

  const getWineName = (wine: WineType) => {
    switch (wine) {
      case 'red': return 'Vino Tinto';
      case 'rose': return 'Vino Rosado';
      case 'white': return 'Vino Blanco';
      default: return '';
    }
  };

  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;