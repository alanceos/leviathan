import { writeFileSync } from 'fs';
import { songLists } from '../data/song-lists';
import { spotifyApi } from '../lib/spotify.node';
import { Song, SpotifySong } from '../types';

interface PlaylistCollection {
  name: string;
  songs: SpotifySong[];
}

async function searchSpotifyTracks(songs: Song[]): Promise<SpotifySong[]> {
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
          console.log(`Encontrada: ${song.title} - ${song.artist}`);
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

async function main() {
  try {
    const collections: PlaylistCollection[] = [];

    // Procesar cada momento y tipo de vino
    for (const [moment, wines] of Object.entries(songLists)) {
      for (const [wine, songs] of Object.entries(wines)) {
        console.log(`Procesando ${wine} para ${moment}...`);
        const spotifySongs = await searchSpotifyTracks(songs);
        collections.push({
          name: `${wine} + ${moment}`,
          songs: spotifySongs
        });
      }
    }

    // Guardar resultados en un archivo JSON
    writeFileSync(
      'src/data/spotify-songs.json',
      JSON.stringify({ spotifySongs: collections }, null, 2)
    );

    console.log('Proceso completado. Resultados guardados en spotify-songs.json');
  } catch (error) {
    console.error('Error en el proceso:', error);
    process.exit(1);
  }
}

main(); 