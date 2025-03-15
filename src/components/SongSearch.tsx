import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Song, SpotifySong } from '../types';
import { searchSpotifyTracks } from '../lib/spotify';

export function SongSearch() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchResults, setSearchResults] = useState<SpotifySong[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddSong = () => {
    setSongs([...songs, { title: '', artist: '' }]);
  };

  const handleSongChange = (index: number, field: 'title' | 'artist', value: string) => {
    const newSongs = [...songs];
    newSongs[index] = { ...newSongs[index], [field]: value };
    setSongs(newSongs);
  };

  const handleRemoveSong = (index: number) => {
    setSongs(songs.filter((_, i) => i !== index));
  };

  const handleSearch = async () => {
    if (songs.length === 0) {
      setError('Por favor, agrega al menos una canción');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchSpotifyTracks(songs);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar canciones');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Buscador de Canciones en Spotify</h2>
      
      <div className="space-y-4 mb-6">
        {songs.map((song, index) => (
          <div key={index} className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Título"
              value={song.title}
              onChange={(e) => handleSongChange(index, 'title', e.target.value)}
              className="flex-1 p-2 rounded bg-white/10 border border-white/20"
            />
            <input
              type="text"
              placeholder="Artista"
              value={song.artist}
              onChange={(e) => handleSongChange(index, 'artist', e.target.value)}
              className="flex-1 p-2 rounded bg-white/10 border border-white/20"
            />
            <button
              onClick={() => handleRemoveSong(index)}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleAddSong}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
        >
          Agregar Canción
        </button>
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Buscando...
            </span>
          ) : (
            'Buscar en Spotify'
          )}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded">
          {error}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Resultados:</h3>
          {searchResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded ${
                result.status === 'found'
                  ? 'bg-green-500/20 border border-green-500'
                  : 'bg-red-500/20 border border-red-500'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{result.name}</p>
                  <p className="text-sm opacity-80">{result.artist}</p>
                </div>
                {result.status === 'found' ? (
                  <div className="text-sm">
                    <p>ID: {result.spotifyId}</p>
                    <p>URI: {result.spotifyUri}</p>
                  </div>
                ) : (
                  <p className="text-sm">No encontrada</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 