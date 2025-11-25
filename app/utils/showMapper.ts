import type { ShowItem, TvMazeShow } from "../../types/shows";

const getYear = (premiered?: string | null) => premiered?.slice(0, 4);

export const mapTvMazeShowToShowItem = (show: TvMazeShow): ShowItem => {
  const year = getYear(show.premiered ?? undefined);
  const rating = show.rating?.average ?? null;
  const imageSrc = show.image?.medium || show.image?.original || "/images/show-card.png";

  return {
    id: show.id,
    title: show.name,
    year,
    rating,
    imageSrc,
    alt: `${show.name} poster`,
    url: show.url,
  };
};

export const mapTvMazeShowsToItems = (shows: TvMazeShow[]): ShowItem[] => shows.map(mapTvMazeShowToShowItem);
