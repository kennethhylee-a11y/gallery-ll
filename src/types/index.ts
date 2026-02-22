// 作品類型
export interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  category?: string;
}

// 留言類型
export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
  avatar?: string;
}

// 藝術家資料
export interface ArtistProfile {
  name: string;
  age: number;
  bio: string;
  photoUrl: string;
  stats: {
    artworks: number;
    awards: number;
    themes: number;
  };
}
