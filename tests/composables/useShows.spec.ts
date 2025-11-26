import { describe, expect, it } from "vitest";
import { useShows } from "@/composables/useShows";
import { defaultShows } from "@/app/data/shows";

describe("useShows", () => {
  it("returns dramaShows as a computed property", () => {
    const { dramaShows } = useShows();

    expect(dramaShows.value).toBeDefined();
    expect(Array.isArray(dramaShows.value)).toBe(true);
  });

  it("returns a copy of defaultShows", () => {
    const { dramaShows } = useShows();

    expect(dramaShows.value).toEqual(defaultShows);
    expect(dramaShows.value).not.toBe(defaultShows); // Should be a copy, not the same reference
  });

  it("returns all default shows", () => {
    const { dramaShows } = useShows();

    expect(dramaShows.value.length).toBe(defaultShows.length);
  });

  it("each show has required properties", () => {
    const { dramaShows } = useShows();

    dramaShows.value.forEach((show) => {
      expect(show).toHaveProperty("title");
      expect(typeof show.title).toBe("string");
    });
  });

  it("computed property is reactive", () => {
    const { dramaShows } = useShows();

    // First access should return the shows
    const firstAccess = dramaShows.value;
    expect(firstAccess).toHaveLength(defaultShows.length);

    // Computed properties cache, so same reference is returned
    const secondAccess = dramaShows.value;
    expect(firstAccess).toBe(secondAccess);
    expect(firstAccess).toEqual(secondAccess);
  });
});
