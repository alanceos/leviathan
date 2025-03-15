import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env.local
dotenv.config({ path: '.env.local' });

const CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error('CLIENT_ID o CLIENT_SECRET no están definidos en las variables de entorno');
}

// Crear una instancia de la API de Spotify para scripts de Node.js
export const spotifyApi = SpotifyApi.withClientCredentials(
  CLIENT_ID,
  CLIENT_SECRET
); 