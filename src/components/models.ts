export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Playlist {
  id: string;
  title: string;
  items_count: number;
  created_at: string;
  type: string;
  subtype: string;
  share_link: string;
  count: number;
  followers: number;
  public: boolean;
  last_updated_at: string;
  bg_color: string;
  custom_photo: boolean;
  bg_colors: string;
  desc: string;
  photo: string;
  thumbnail: string;
  photo_player: string;
  created_by: string;
  created_title: string;
  myplaylist: boolean;
  items: Song[];
}
export interface Song {
  id: number;
  title: string;
  explicit: boolean;
  link: string;
  photo: string;
  thumbnail: string;
  plays: string;
  artist: string;
  song: string;
  photo_240: string;
  likes: string;
  dislikes: string;
  downloads: string;
  photo_player: string;
  permlink: string;
  share_link: string;
  created_at: string;
  type: string;
  duration: number;
  sample_start: number;
  hls_link: string;
  lq_link: string;
  hq_link: string;
  lq_hls: string;
  hq_hls: string;
  lufs: number;
  artist_tags: [];
  bg_colors: string[];
  artist_farsi: string;
  song_farsi: string;
  video_item: object;
  item: number;
  related: [];
}
