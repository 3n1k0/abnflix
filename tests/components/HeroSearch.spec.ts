import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import HeroSearch from "@/components/HeroSearch.vue";

describe("HeroSearch", () => {
  it("renders the search form with accessibility attributes", () => {
    const wrapper = mount(HeroSearch);

    const form = wrapper.get("form");
    expect(form.attributes("role")).toBe("search");
    expect(form.attributes("aria-label")).toBe("Search for shows");
  });

  it("displays a search input configured for show queries", () => {
    const wrapper = mount(HeroSearch);

    const input = wrapper.get('input[type="search"]');
    expect(input.attributes("id")).toBe("hero-search-input");
    expect(input.attributes("name")).toBe("query");
    expect(input.attributes("placeholder")).toBe("Search for shows...");
    expect(input.attributes("autocomplete")).toBe("off");
  });
});
