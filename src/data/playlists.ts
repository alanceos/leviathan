import type { WineType, MomentType, Song } from '../types';
import songsData from './spotify-songs.json';

type PlaylistData = {
  [key in WineType]: {
    [key in MomentType]: Song[];
  };
};

const momentMap: { [key: string]: MomentType } = {
  'Cena': 'dinner',
  'Relajación': 'relaxation',
  'Celebración': 'celebration',
  'Fiesta': 'party',
  'Romántico': 'romantic'
};

const wineMap: { [key: string]: WineType } = {
  'Vino Tinto': 'red',
  'Vino Blanco': 'white',
  'Vino Rosado': 'rose'
};

// Inicializar la estructura de datos
const playlistData: PlaylistData = {
  red: {
    dinner: [],
    relaxation: [],
    celebration: [],
    party: [],
    romantic: []
  },
  white: {
    dinner: [],
    relaxation: [],
    celebration: [],
    party: [],
    romantic: []
  },
  rose: {
    dinner: [],
    relaxation: [],
    celebration: [],
    party: [],
    romantic: []
  }
};

// Llenar la estructura con los datos de spotify-songs.json
songsData.forEach(moment => {
  const momentType = momentMap[moment.name];
  if (momentType) {
    moment.wines.forEach(wine => {
      const wineType = wineMap[wine.type];
      if (wineType) {
        const songs = wine.songs
          .filter(song => song.status === 'found')
          .map(song => ({
            title: song.title,
            artist: song.artist,
            spotifyId: song.spotifyId,
            uri: song.uri
          }));
        playlistData[wineType][momentType] = songs;
      }
    });
  }
});

export { playlistData };