export type WineType = 'red' | 'rose' | 'white';
export type MomentType = 'dinner' | 'relaxation' | 'celebration' | 'party' | 'romantic';

export interface Song {
  title: string;
  artist: string;
  spotifyId: string;
  uri: string;
}

export interface SpotifySong extends Song {
  previewUrl: string | null;
  status: 'found' | 'not_found';
}

export interface SongCollection {
  name: string;
  songs: SpotifySong[];
}

export interface PlaylistData {
  [key: string]: {
    [key: string]: Song[];
  };
} 