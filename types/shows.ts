export type RatingValue = number | string;

export type GenreKey = "Drama" | "Comedy" | "Horror" | "Thriller";

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
  genres?: string[];
  premiered?: string | null;
  rating?: {
    average?: number | null;
  } | null;
  image?: {
    medium?: string | null;
    original?: string | null;
  } | null;
}

export interface ShowsByGenre {
  drama: ShowItem[];
  comedy: ShowItem[];
  horror: ShowItem[];
  thriller: ShowItem[];
}
