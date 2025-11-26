import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon.vue";

describe("ChevronRightIcon", () => {
  it("renders an svg element", () => {
    const wrapper = mount(ChevronRightIcon);
    const svg = wrapper.find("svg");

    expect(svg.exists()).toBe(true);
  });

  it("has correct viewBox attribute", () => {
    const wrapper = mount(ChevronRightIcon);
    const svg = wrapper.find("svg");

    expect(svg.attributes("viewBox")).toBe("0 0 24 24");
  });

  it("is hidden from screen readers", () => {
    const wrapper = mount(ChevronRightIcon);
    const svg = wrapper.find("svg");

    expect(svg.attributes("aria-hidden")).toBe("true");
  });

  it("contains a path element", () => {
    const wrapper = mount(ChevronRightIcon);
    const path = wrapper.find("path");

    expect(path.exists()).toBe(true);
  });

  it("path uses currentColor fill", () => {
    const wrapper = mount(ChevronRightIcon);
    const path = wrapper.find("path");

    expect(path.attributes("fill")).toBe("currentColor");
  });

  it("renders chevron right path data", () => {
    const wrapper = mount(ChevronRightIcon);
    const path = wrapper.find("path");
    const pathData = path.attributes("d");

    expect(pathData).toBeDefined();
    expect(pathData).toContain("8.59");
  });
});
