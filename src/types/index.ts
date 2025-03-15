export type WineType = 'red' | 'rose' | 'white';

export type MomentType = 'dinner' | 'relaxation' | 'celebration' | 'party' | 'romantic';

export interface Song {
  title: string;
  artist: string;
}

export interface SpotifySong {
  name: string;
  artist: string;
  spotifyId: string;
  spotifyUri: string;
  previewUrl: string | null;
  status: 'found' | 'found_loose' | 'not_found';
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