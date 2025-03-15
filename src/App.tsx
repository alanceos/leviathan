import React, { useState, useEffect } from 'react';
import { Wine, Music, GlassWater, PartyPopper, Heart, ArrowLeft, Loader2 } from 'lucide-react';
import type { WineType, MomentType, Song } from './types';
import { spotifyApi, createPlaylist } from './lib/spotify';
import { playlistData } from './data/playlists';
import { cn } from './lib/utils';

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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-wine-pattern bg-cover bg-center bg-opacity-20">
        <div className="backdrop-blur-sm bg-black/30 min-h-screen">
          {isGenerating && (
            <div className="fixed inset-0 bg-purple-900/90 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="text-center max-w-lg mx-auto px-4">
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <div className="absolute inset-0 border-8 border-white/20 rounded-full"></div>
                  <div className="absolute inset-0 border-8 border-white rounded-full animate-spin border-t-transparent"></div>
                </div>
                <p className="text-3xl font-medium text-white animate-float">
                  {loadingMessage}
                </p>
              </div>
            </div>
          )}

          <div className="container mx-auto px-4 py-12">
            {step > 1 && !isGenerating && (
              <button
                onClick={handleBack}
                className="fixed top-8 left-8 text-white hover:text-gray-300 
                  transition-colors flex items-center gap-2 bg-black/40 px-4 py-2 
                  rounded-full backdrop-blur-sm"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver</span>
              </button>
            )}

            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
                Maridaje de Vino y Música
              </h1>

              {step === 0 && (
                <div className="text-center space-y-8">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Bienvenido a la experiencia perfecta</h2>
                    <p className="text-lg mb-6">
                      Descubre la magia de maridar tu vino favorito con la música perfecta. 
                      Hemos creado una selección única de canciones que complementarán cada momento 
                      y cada copa, elevando tu experiencia a un nuevo nivel.
                    </p>
                    <p className="text-lg mb-8">
                      Para comenzar esta experiencia única, necesitamos conectarnos con tu cuenta de Spotify.
                    </p>
                    <button
                      onClick={handleSpotifyAuth}
                      className="inline-flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white 
                        px-8 py-3 rounded-full font-semibold transform transition-all hover:scale-105"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      Conectar con Spotify
                    </button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-center">Selecciona tu Vino</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(['red', 'rose', 'white'] as WineType[]).map((wine) => (
                      <button
                        key={wine}
                        onClick={() => handleWineSelect(wine)}
                        className={`${getWineBackground(wine)} 
                          p-6 rounded-lg shadow-lg transform transition-all 
                          hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 
                          focus:ring-opacity-50 text-center`}
                      >
                        <Wine className="w-12 h-12 mx-auto mb-2" />
                        {getWineName(wine)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-center">Elige el Momento</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {moments.map(({ type, icon, label }) => (
                      <button
                        key={type}
                        onClick={() => handleMomentSelect(type)}
                        className="bg-white/10 p-6 rounded-lg shadow-lg transform 
                          transition-all hover:scale-105 hover:bg-white/20 
                          focus:outline-none focus:ring-2 focus:ring-offset-2 
                          focus:ring-opacity-50 text-center"
                      >
                        <div className="flex flex-col items-center">
                          {icon}
                          <span className="mt-2">{label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && !isGenerating && (
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-6">
                    Tu Lista de Reproducción Personalizada
                  </h2>
                  <p className="mb-6 text-gray-300">
                    {getWineName(selectedWine!)} + {
                      moments.find(m => m.type === selectedMoment)?.label
                    }
                  </p>

                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-xl">
                    <h3 className="text-xl font-semibold mb-4 text-white">Canciones Seleccionadas</h3>
                    <ul className="space-y-3 text-left">
                      {randomSongs.map((song, index) => (
                        <li 
                          key={index} 
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-colors",
                            "bg-white/10 hover:bg-white/15"
                          )}
                        >
                          <Music className="w-5 h-5 flex-shrink-0 text-white/70" />
                          <div className="flex-1">
                            <span className="font-medium text-white block">{song.title}</span>
                            <span className="text-white/70 text-sm">{song.artist}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {error && (
                    <p className="text-red-400 mb-4 bg-red-900/20 p-4 rounded-lg">{error}</p>
                  )}

                  {playlistUrl ? (
                    <a
                      href={playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white 
                        px-8 py-3 rounded-full font-semibold transform transition-all hover:scale-105"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      Escuchar Playlist en Spotify
                    </a>
                  ) : (
                    <button
                      onClick={handleCreatePlaylist}
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white 
                        px-8 py-3 rounded-full font-semibold transform transition-all hover:scale-105
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Creando lista...
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                          Crear Lista en Spotify
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-6">
                    Lista de Reproducción creada exitosamente
                  </h2>
                  <p className="mb-6 text-gray-300">
                    Tu lista de reproducción personalizada ha sido creada y está lista para escucharse.
                  </p>

                  {playlistUrl && (
                    <a
                      href={playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white 
                        px-8 py-3 rounded-full font-semibold transform transition-all hover:scale-105"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      Escuchar Playlist en Spotify
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;