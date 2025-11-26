import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import RatingBadge from "@/components/RatingBadge.vue";

describe("RatingBadge", () => {
  it("renders the rating value", () => {
    const wrapper = mount(RatingBadge, {
      props: { value: 9.1 },
    });

    expect(wrapper.get(".rating-badge__value").text()).toBe("9.1");
  });

  it("uses a default aria-label when none is provided", () => {
    const wrapper = mount(RatingBadge, {
      props: { value: 7.5 },
    });

    expect(wrapper.get(".rating-badge").attributes("aria-label")).toBe("User rating");
  });

  it("applies a custom aria-label when provided", () => {
    const wrapper = mount(RatingBadge, {
      props: { value: 8.0, label: "Critics score" },
    });

    expect(wrapper.get(".rating-badge").attributes("aria-label")).toBe("Critics score");
  });
});
