import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import RatingBadge from "@/components/RatingBadge.vue";
import ShowCard from "@/components/ShowCard.vue";

describe("ShowCard", () => {
  const mountOptions = {
    global: {
      stubs: {
        NuxtLink: {
          template: '<a :to="to"><slot /></a>',
          props: ['to'],
        },
      },
    },
  };

  it("renders title, year, and rating", () => {
    const wrapper = mount(ShowCard, {
      ...mountOptions,
      props: {
        id: 1,
        title: "Midnight Chronicles",
        year: "2023",
        rating: 8.7,
      },
    });

    expect(wrapper.get(".show-card__title").text()).toBe("Midnight Chronicles");
    expect(wrapper.get(".show-card__meta").text()).toBe("2023");
    expect(wrapper.findComponent(RatingBadge).exists()).toBe(true);
    expect(wrapper.get(".show-card__rating").text()).toContain("8.7");
  });

  it("uses poster alt text derived from the title when none is provided", () => {
    const wrapper = mount(ShowCard, {
      ...mountOptions,
      props: {
        id: 2,
        title: "Nebula Drift",
      },
    });

    const img = wrapper.get("img");
    expect(img.attributes("alt")).toBe("Nebula Drift poster");
    expect(img.attributes("src")).toBe("/images/show-card.png");
  });

  it("hides the rating badge when no rating is supplied", () => {
    const wrapper = mount(ShowCard, {
      ...mountOptions,
      props: {
        id: 3,
        title: "Signal Lost",
        rating: null,
      },
    });

    expect(wrapper.find(".show-card__rating").exists()).toBe(false);
  });
});
