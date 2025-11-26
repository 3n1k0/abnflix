import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import StarIcon from "@/components/icons/StarIcon.vue";

describe("StarIcon", () => {
  it("renders an svg element", () => {
    const wrapper = mount(StarIcon);
    const svg = wrapper.find("svg");

    expect(svg.exists()).toBe(true);
  });

  it("has correct viewBox attribute", () => {
    const wrapper = mount(StarIcon);
    const svg = wrapper.find("svg");

    expect(svg.attributes("viewBox")).toBe("0 0 24 24");
  });

  it("is hidden from screen readers", () => {
    const wrapper = mount(StarIcon);
    const svg = wrapper.find("svg");

    expect(svg.attributes("aria-hidden")).toBe("true");
  });

  it("contains a path element", () => {
    const wrapper = mount(StarIcon);
    const path = wrapper.find("path");

    expect(path.exists()).toBe(true);
  });

  it("path uses currentColor fill", () => {
    const wrapper = mount(StarIcon);
    const path = wrapper.find("path");

    expect(path.attributes("fill")).toBe("currentColor");
  });

  it("renders star icon path data", () => {
    const wrapper = mount(StarIcon);
    const path = wrapper.find("path");

    expect(path.attributes("d")).toContain("12 3.5");
  });
});
