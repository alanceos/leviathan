import { SpotifyApi, AccessToken } from '@spotify/web-api-ts-sdk';
import { Song, SpotifySong } from '../types';
import { spotifySongs } from '../data/spotify-songs';

// En el navegador, las variables de entorno de Vite están disponibles directamente a través de import.meta.env
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
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

const sdk = SpotifyApi.withUserAuthorization(
  CLIENT_ID,
  REDIRECT_URI,
  scopes
);

export const refreshSpotifyToken = async () => {
  try {
    const refreshToken = localStorage.getItem('spotifyRefreshToken');
    if (!refreshToken) {
      throw new Error('No hay token de actualización disponible');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al renovar el token');
    }

    const data = await response.json();
    localStorage.setItem('spotifyAccessToken', data.access_token);
    if (data.refresh_token) {
      localStorage.setItem('spotifyRefreshToken', data.refresh_token);
    }
    
    return data.access_token;
  } catch (error) {
    console.error('Error al renovar el token:', error);
    throw error;
  }
};

// Función para obtener el token actual o renovarlo si es necesario
async function getValidToken(): Promise<string> {
  try {
    const token = await sdk.getAccessToken();
    if (!token || !token.access_token) {
      throw new Error('Token no válido');
    }
    return token.access_token;
  } catch (error) {
    console.error('Error al obtener token:', error);
    // Si el token no es válido, intentamos renovarlo
    try {
      const newToken = await refreshSpotifyToken();
      if (!newToken) {
        throw new Error('No se pudo obtener un nuevo token');
      }
      return newToken;
    } catch (refreshError) {
      console.error('Error al renovar token:', refreshError);
      throw new Error('La sesión ha expirado. Por favor, inicia sesión nuevamente.');
    }
  }
}

export const spotifyApi = {
  authenticate: async () => {
    try {
      await sdk.authenticate();
      // Guardar el refresh token después de la autenticación inicial
      const token = await sdk.getAccessToken();
      if (token && token.refresh_token) {
        localStorage.setItem('spotifyRefreshToken', token.refresh_token);
      }
    } catch (error) {
      console.error('Error en authenticate:', error);
      throw error;
    }
  },
  currentUser: {
    profile: async () => {
      try {
        const token = await getValidToken();
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener perfil de usuario');
        }

        return response.json();
      } catch (error) {
        console.error('Error en profile:', error);
        throw error;
      }
    },
  },
  playlists: {
    createPlaylist: async (userId: string, options: { name: string; description: string; public: boolean }) => {
      const token = await getValidToken();
      const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
      });

      if (!response.ok) {
        throw new Error('Error al crear playlist');
      }

      return response.json();
    },
    updatePlaylistItems: async (playlistId: string, options: { uris: string[] }) => {
      const token = await getValidToken();
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: options.uris })
      });

      if (!response.ok) {
        throw new Error('Error al añadir canciones a la playlist');
      }

      return response.json();
    },
    deletePlaylist: async (playlistId: string) => {
      const token = await getValidToken();
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la playlist');
      }

      return true;
    }
  }
};

export async function searchSpotifyTracks(songs: Song[]): Promise<SpotifySong[]> {
  try {
    const results: SpotifySong[] = [];
    const token = await getValidToken();
    
    for (const song of songs) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(song.title + ' ' + song.artist)}&type=track&limit=1`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Error en la búsqueda de Spotify');
        }

        const data = await response.json();

        if (data.tracks.items.length > 0) {
          const track = data.tracks.items[0];
          results.push({
            title: track.name,
            artist: track.artists[0].name,
            spotifyId: track.id,
            uri: track.uri,
            previewUrl: track.preview_url,
            status: 'found'
          });
        } else {
          console.log(`No se encontró: ${song.title} - ${song.artist}`);
          results.push({
            title: song.title,
            artist: song.artist,
            spotifyId: '',
            uri: '',
            previewUrl: null,
            status: 'not_found'
          });
        }
      } catch (error) {
        console.error(`Error buscando ${song.title}:`, error);
        results.push({
          title: song.title,
          artist: song.artist,
          spotifyId: '',
          uri: '',
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
  const foundSongs = collection.songs.filter(s => s.status === 'found');
  
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