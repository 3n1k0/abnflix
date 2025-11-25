import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import HeroSearch from "@/components/HeroSearch.vue";
import HeroSection from "@/components/HeroSection.vue";

describe("HeroSection", () => {
  it("renders the headline and supporting copy", () => {
    const wrapper = mount(HeroSection);

    const heading = wrapper.get("#hero-title");
    expect(heading.text()).toBe("Discover Your Next Favorite Show");

    const copy = wrapper.get(".hero-copy");
    expect(copy.text()).toContain("Explore thousands of TV shows across all genres");
  });

  it("links the section to its title for accessibility", () => {
    const wrapper = mount(HeroSection);

    const section = wrapper.get("section.hero");
    expect(section.attributes("aria-labelledby")).toBe("hero-title");
  });

  it("includes the hero search component", () => {
    const wrapper = mount(HeroSection);

    expect(wrapper.findComponent(HeroSearch).exists()).toBe(true);
    expect(wrapper.find('input[type="search"]').exists()).toBe(true);
  });
});
