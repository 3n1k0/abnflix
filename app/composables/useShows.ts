import type { ShowItem, TvMazeShow } from "../../types/shows";
import { computed } from "vue";
import { useAsyncData } from "nuxt/app";

function transformShow(show: TvMazeShow): ShowItem {
  return {
    id: show.id,
    slug: show.url ? show.url.split("/").pop() : String(show.id),
    title: show.name,
    year: show.premiered ? new Date(show.premiered).getFullYear() : undefined,
    rating: show.rating?.average || null,
    imageSrc: show.image?.medium || show.image?.original || undefined,
    url: show.url,
  };
}

function filterAndTransform(
  tvMazeShows: TvMazeShow[],
  genre: string
): ShowItem[] {
  return tvMazeShows
    .filter((show) => show.genres?.includes(genre))
    .map(transformShow);
}

export function useShows() {
  const { data: rawShows } = useAsyncData<TvMazeShow[]>("shows", () =>
    $fetch("/api/shows")
  );

  const dramaShows = computed(() =>
    filterAndTransform(rawShows.value || [], "Drama").slice(0, 10)
  );

  const comedy = computed(() =>
    filterAndTransform(rawShows.value || [], "Comedy").slice(0, 10)
  );

  const horror = computed(() =>
    filterAndTransform(rawShows.value || [], "Horror").slice(0, 10)
  );

  const thriller = computed(() =>
    filterAndTransform(rawShows.value || [], "Thriller").slice(0, 10)
  );

  return {
    dramaShows,
    comedy,
    horror,
    thriller,
  };
}
