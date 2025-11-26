// Module-level cache for all shows
let cachedShows: any[] | null = null;
let isFetching = false; // Prevent concurrent fetches

export default defineEventHandler(async (event) => {
  // Return cached data immediately if available
  if (cachedShows !== null) {
    return cachedShows;
  }

  // If already fetching, wait and return cached result
  if (isFetching) {
    // Wait for the fetch to complete (max 30 seconds)
    const maxWait = 30000;
    const startTime = Date.now();
    while (isFetching && Date.now() - startTime < maxWait) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return cachedShows || [];
  }

  isFetching = true;

  try {
    // Fetch shows from TVMaze API with limits
    const allShows: any[] = [];
    let page = 0;
    const MAX_PAGES = 50; // Limit to first ~2500 shows (50 pages * ~50 shows/page)

    while (page < MAX_PAGES) {
      try {
        const response = await $fetch(`https://api.tvmaze.com/shows?page=${page}`);

        // Stop if response is not an array or is empty
        if (!Array.isArray(response) || response.length === 0) {
          break;
        }

        // Merge shows into the array
        allShows.push(...response);
        page++;

        // Add small delay to avoid rate limiting
        if (page < MAX_PAGES) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      } catch (error: any) {
        // Stop on 404 (no more pages)
        if (error?.statusCode === 404 || error?.response?.status === 404) {
          break;
        }

        // For other errors, log and stop to avoid breaking with partial data
        console.error(`Error fetching shows page ${page}:`, error.message || error);
        break;
      }
    }

    // Cache the results (even if partial)
    cachedShows = allShows;

    // Return plain JSON array
    return allShows;
  } finally {
    isFetching = false;
  }
});
