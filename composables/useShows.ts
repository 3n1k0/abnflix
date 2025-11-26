import { computed } from "vue";
import { defaultShows, comedyShows, horrorShows, thrillerShows, musicalShows } from "../app/data/shows";
import type { ShowItem } from "../types/shows";

export const useShows = () => {
  const dramaShows = computed<ShowItem[]>(() => defaultShows.slice());
  const comedy = computed<ShowItem[]>(() => comedyShows.slice());
  const horror = computed<ShowItem[]>(() => horrorShows.slice());
  const thriller = computed<ShowItem[]>(() => thrillerShows.slice());
  const musical = computed<ShowItem[]>(() => musicalShows.slice());

  return {
    dramaShows,
    comedy,
    horror,
    thriller,
    musical,
  };
};
