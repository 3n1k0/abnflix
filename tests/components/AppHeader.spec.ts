import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AppHeader from "@/components/AppHeader.vue";

describe("AppHeader", () => {
  it("renders the brand link with accessible label", () => {
    const wrapper = mount(AppHeader);

    const brandLink = wrapper.get("a.brand");
    expect(brandLink.text()).toContain("TV Shows");
    expect(brandLink.attributes("aria-label")).toBe("TV Shows home");
    expect(brandLink.attributes("href")).toBe("#");
  });

  it("shows primary navigation items", () => {
    const wrapper = mount(AppHeader);

    const nav = wrapper.get("nav");
    expect(nav.attributes("aria-label")).toBe("Primary");

    const links = wrapper.findAll(".nav-link");
    expect(links.map((link) => link.text())).toEqual(["Browse", "My List"]);
    expect(links.every((link) => link.attributes("href") === "#")).toBe(true);
  });
});
