import { computed } from "vue";
import { defaultShows } from "../app/data/shows";
import type { ShowItem } from "../types/shows";

export const useShows = () => {
  const dramaShows = computed<ShowItem[]>(() => defaultShows.slice());

  return {
    dramaShows,
  };
};
