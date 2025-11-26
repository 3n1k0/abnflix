export type RatingValue = number | string;

export interface ShowItem {
  id?: string | number;
  slug?: string;
  title: string;
  year?: string | number;
  rating?: RatingValue | null;
  imageSrc?: string;
  alt?: string;
  url?: string;
}

export interface TvMazeShow {
  id: number;
  url?: string;
  name: string;
  premiered?: string | null;
  rating?: {
    average?: number | null;
  } | null;
  image?: {
    medium?: string | null;
    original?: string | null;
  } | null;
}
