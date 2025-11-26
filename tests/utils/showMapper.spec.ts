import { describe, expect, it } from "vitest";
import { mapTvMazeShowToShowItem, mapTvMazeShowsToItems } from "@/app/utils/showMapper";
import type { TvMazeShow } from "@/types/shows";

describe("showMapper", () => {
  describe("mapTvMazeShowToShowItem", () => {
    it("maps a complete TvMaze show to ShowItem", () => {
      const tvMazeShow: TvMazeShow = {
        id: 123,
        name: "Breaking Bad",
        url: "https://www.tvmaze.com/shows/123/breaking-bad",
        premiered: "2008-01-20",
        rating: { average: 9.5 },
        image: {
          medium: "https://example.com/medium.jpg",
          original: "https://example.com/original.jpg",
        },
      };

      const result = mapTvMazeShowToShowItem(tvMazeShow);

      expect(result).toEqual({
        id: 123,
        title: "Breaking Bad",
        year: "2008",
        rating: 9.5,
        imageSrc: "https://example.com/medium.jpg",
        alt: "Breaking Bad poster",
        url: "https://www.tvmaze.com/shows/123/breaking-bad",
      });
    });

    it("handles missing premiered date", () => {
      const tvMazeShow: TvMazeShow = {
        id: 456,
        name: "Upcoming Show",
        premiered: null,
        rating: { average: 8.0 },
        image: { medium: "https://example.com/medium.jpg", original: null },
      };

      const result = mapTvMazeShowToShowItem(tvMazeShow);

      expect(result.year).toBeUndefined();
      expect(result.title).toBe("Upcoming Show");
    });

    it("handles missing rating", () => {
      const tvMazeShow: TvMazeShow = {
        id: 789,
        name: "Unrated Show",
        premiered: "2023-05-15",
        rating: null,
        image: { medium: "https://example.com/medium.jpg", original: null },
      };

      const result = mapTvMazeShowToShowItem(tvMazeShow);

      expect(result.rating).toBeNull();
    });

    it("handles missing average rating", () => {
      const tvMazeShow: TvMazeShow = {
        id: 101,
        name: "New Show",
        premiered: "2024-01-01",
        rating: { average: null },
        image: { medium: "https://example.com/medium.jpg", original: null },
      };

      const result = mapTvMazeShowToShowItem(tvMazeShow);

      expect(result.rating).toBeNull();
    });

    it("uses medium image when available", () => {
      const tvMazeShow: TvMazeShow = {
        id: 111,
        name: "Show with Medium",
        premiered: "2022-03-10",
        rating: { average: 7.5 },
        image: {
          medium: "https://example.com/medium.jpg",
          original: "https://example.com/original.jpg",
        },
      };

      const result = mapTvMazeShowToShowItem(tvMazeShow);

      expect(result.imageSrc).toBe("https://example.com/medium.jpg");
    });

    it("falls back to original image when medium is missing", () => {
      const tvMazeShow: TvMazeShow = {
        id: 222,
        name: "Show with Original Only",
        premiered: "2021-07-20",
        rating: { average: 6.8 },
        image: {
          medium: null,
          original: "https://example.com/original.jpg",
        },
      };

      const result = mapTvMazeShowToShowItem(tvMazeShow);

      expect(result.imageSrc).toBe("https://example.com/original.jpg");
    });

    it("uses default image when no images are available", () => {
      const tvMazeShow: TvMazeShow = {
        id: 333,
        name: "Show without Images",
        premiered: "2020-11-05",
        rating: { average: 5.5 },
        image: null,
      };

      const result = mapTvMazeShowToShowItem(tvMazeShow);

      expect(result.imageSrc).toBe("/images/show-card.png");
    });

    it("uses default image when image object has no urls", () => {
      const tvMazeShow: TvMazeShow = {
        id: 444,
        name: "Show with Empty Images",
        premiered: "2019-08-12",
        rating: { average: 4.2 },
        image: {
          medium: null,
          original: null,
        },
      };

      const result = mapTvMazeShowToShowItem(tvMazeShow);

      expect(result.imageSrc).toBe("/images/show-card.png");
    });

    it("generates alt text from show name", () => {
      const tvMazeShow: TvMazeShow = {
        id: 555,
        name: "Game of Thrones",
        premiered: "2011-04-17",
        rating: { average: 9.2 },
        image: { medium: "https://example.com/got.jpg", original: null },
      };

      const result = mapTvMazeShowToShowItem(tvMazeShow);

      expect(result.alt).toBe("Game of Thrones poster");
    });
  });

  describe("mapTvMazeShowsToItems", () => {
    it("maps an array of TvMaze shows to ShowItems", () => {
      const tvMazeShows: TvMazeShow[] = [
        {
          id: 1,
          name: "Show One",
          premiered: "2020-01-01",
          rating: { average: 8.0 },
          image: { medium: "https://example.com/show1.jpg", original: null },
        },
        {
          id: 2,
          name: "Show Two",
          premiered: "2021-02-02",
          rating: { average: 7.5 },
          image: { medium: "https://example.com/show2.jpg", original: null },
        },
      ];

      const result = mapTvMazeShowsToItems(tvMazeShows);

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe("Show One");
      expect(result[1].title).toBe("Show Two");
    });

    it("returns empty array when given empty array", () => {
      const result = mapTvMazeShowsToItems([]);

      expect(result).toEqual([]);
    });
  });
});
