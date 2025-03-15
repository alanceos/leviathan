import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { Song, SpotifySong } from '../types';
import { spotifySongs } from '../data/spotify-songs';

// En el navegador, las variables de entorno de Vite están disponibles directamente a través de import.meta.env
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.DEV
  ? 'http://localhost:5175/callback'
  : `${window.location.origin}/callback`;

if (!CLIENT_ID) {
  throw new Error('CLIENT_ID no está definido en las variables de entorno');
}

const scopes = [
  'playlist-modify-public',
  'playlist-modify-private',
  'user-read-private'
];

// Crear una instancia de la API de Spotify con autorización de usuario
export const spotifyApi = SpotifyApi.withUserAuthorization(
  CLIENT_ID,
  REDIRECT_URI,
  scopes
);

export async function searchSpotifyTracks(songs: Song[]): Promise<SpotifySong[]> {
  try {
    const results: SpotifySong[] = [];
    
    for (const song of songs) {
      try {
        // Buscar la canción en Spotify
        const searchResult = await spotifyApi.search(song.title + ' ' + song.artist, ['track'], undefined, 1);

        if (searchResult.tracks.items.length > 0) {
          const track = searchResult.tracks.items[0];
          results.push({
            name: track.name,
            artist: track.artists[0].name,
            spotifyId: track.id,
            spotifyUri: track.uri,
            previewUrl: track.preview_url,
            status: 'found'
          });
        } else {
          console.log(`No se encontró: ${song.title} - ${song.artist}`);
          results.push({
            name: song.title,
            artist: song.artist,
            spotifyId: '',
            spotifyUri: '',
            previewUrl: null,
            status: 'not_found'
          });
        }
      } catch (error) {
        console.error(`Error buscando ${song.title}:`, error);
        results.push({
          name: song.title,
          artist: song.artist,
          spotifyId: '',
          spotifyUri: '',
          previewUrl: null,
          status: 'not_found'
        });
      }
    }

    return results;
  } catch (error) {
    console.error('Error en searchSpotifyTracks:', error);
    throw new Error('Error al buscar canciones en Spotify');
  }
}

export async function searchAllSpotifyTracks(songs: Song[]): Promise<SpotifySong[]> {
  try {
    const results: SpotifySong[] = [];
    
    for (const song of songs) {
      try {
        // Buscar la canción en Spotify
        const searchResult = await spotifyApi.search(song.title + ' ' + song.artist, ['track'], undefined, 1);

        if (searchResult.tracks.items.length > 0) {
          const track = searchResult.tracks.items[0];
          results.push({
            name: track.name,
            artist: track.artists[0].name,
            spotifyId: track.id,
            spotifyUri: track.uri,
            previewUrl: track.preview_url,
            status: 'found'
          });
        } else {
          console.log(`No se encontró: ${song.title} - ${song.artist}`);
          results.push({
            name: song.title,
            artist: song.artist,
            spotifyId: '',
            spotifyUri: '',
            previewUrl: null,
            status: 'not_found'
          });
        }
      } catch (error) {
        console.error(`Error buscando ${song.title}:`, error);
        results.push({
          name: song.title,
          artist: song.artist,
          spotifyId: '',
          spotifyUri: '',
          previewUrl: null,
          status: 'not_found'
        });
      }
    }

    return results;
  } catch (error) {
    console.error('Error en searchAllSpotifyTracks:', error);
    throw new Error('Error al buscar canciones en Spotify');
  }
}

function findSpotifySongs(wineMoment: string, count: number = 15): SpotifySong[] {
  // Split the input string to get wine and moment separately
  const [wine, moment] = wineMoment.split(' + ');

  // Map wine types to match collection names
  const wineMap: { [key: string]: string } = {
    'Vino Tinto': 'Tinto',
    'Vino Rosado': 'Rosado',
    'Vino Blanco': 'Blanco'
  };

  // Get the mapped wine name
  const mappedWine = wineMap[wine];
  if (!mappedWine) {
    console.error(`Invalid wine type: ${wine}`);
    throw new Error('Tipo de vino no válido');
  }
  
  // Create the collection name
  const collectionName = `${mappedWine} + ${moment}`;
  console.log(`Looking for collection: "${collectionName}"`);
  
  const collection = spotifySongs.find(c => c.name === collectionName);
  
  if (!collection) {
    console.error(`No collection found for: ${collectionName}`);
    throw new Error(`No se encontraron canciones para la combinación seleccionada`);
  }
  
  // Get only found songs
  const foundSongs = collection.songs.filter(s => s.status === 'found' || s.status === 'found_loose');
  
  if (foundSongs.length === 0) {
    console.error(`No found songs in collection: ${collectionName}`);
    throw new Error(`No se encontraron canciones disponibles para la combinación seleccionada`);
  }

  // Shuffle and get requested number of songs
  return [...foundSongs]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, foundSongs.length));
}

export async function clearSpotifyAuth() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('spotify-sdk:AuthorizationCodeWithPKCE:token');
    window.localStorage.removeItem('spotify-sdk:AuthorizationCodeWithPKCE:state');
  }
}

export async function createPlaylist(name: string, description: string, trackUris: string[]) {
  try {
    // Obtener el ID del usuario actual
    const user = await spotifyApi.currentUser.profile();
    
    // Crear la playlist
    const playlist = await spotifyApi.playlists.createPlaylist(user.id, {
      name,
      description,
      public: true
    });

    // Añadir canciones en lotes de 100 (límite de la API de Spotify)
    for (let i = 0; i < trackUris.length; i += 100) {
      const batch = trackUris.slice(i, i + 100);
      try {
        await spotifyApi.playlists.updatePlaylistItems(playlist.id, {
          uris: batch
        });
      } catch (error) {
        console.error('Error al añadir canciones a la playlist:', error);
        throw new Error('No se pudieron añadir las canciones a la playlist');
      }
    }

    return playlist;
  } catch (error) {
    console.error('Error al crear la playlist:', error);
    throw new Error('No se pudo crear la playlist');
  }
}

export async function isAuthenticated() {
  try {
    await spotifyApi.currentUser.profile();
    return true;
  } catch (error) {
    return false;
  }
}