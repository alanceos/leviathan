import { SpotifySong } from '../types';
import songsData from './spotify-songs.json' assert { type: 'json' };

interface PlaylistCollection {
  name: string;
  songs: SpotifySong[];
}

export const spotifySongs: PlaylistCollection[] = songsData as PlaylistCollection[];