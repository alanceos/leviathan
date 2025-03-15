import { spotifyApi, createPlaylist } from '../lib/spotify';
import songsData from '../data/spotify-songs.json';

async function main() {
  try {
    // Verificar autenticación
    const isAuth = await spotifyApi.currentUser.profile().catch(() => null);
    if (!isAuth) {
      console.error('Por favor, inicia sesión en Spotify primero.');
      return;
    }

    // Crear playlists para cada momento y tipo de vino
    for (const moment of songsData) {
      console.log(`\nCreando playlists para ${moment.name}...\n`);

      for (const wine of moment.wines) {
        // Filtrar solo las canciones encontradas
        const foundSongs = wine.songs.filter(song => song.status === 'found');
        const trackUris = foundSongs.map(song => song.uri);

        if (trackUris.length === 0) {
          console.log(`No hay canciones disponibles para ${wine.type} en ${moment.name}`);
          continue;
        }

        console.log(`Creando playlist para ${wine.type} en ${moment.name}...`);
        
        try {
          const playlist = await createPlaylist(
            `${wine.type} & ${moment.name}`,
            `Una selección de canciones para disfrutar ${wine.type} durante momentos de ${moment.name}.`,
            trackUris
          );

          console.log(`Playlist creada: ${playlist.external_urls.spotify}`);
          
          // Esperar un momento entre creaciones para evitar límites de tasa
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Error al crear playlist para ${wine.type} en ${moment.name}:`, error);
        }
      }
    }

    console.log('\n¡Todas las playlists han sido creadas!\n');
  } catch (error) {
    console.error('Error en el proceso de creación de playlists:', error);
  }
}

main().catch(console.error); 