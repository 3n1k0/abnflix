import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import ShowCard from "@/components/ShowCard.vue";
import ShowList from "@/components/ShowList.vue";

describe("ShowList", () => {
  it("renders the section title, action label, and default shows", () => {
    const wrapper = mount(ShowList);

    expect(wrapper.get(".show-list__title").text()).toBe("Drama");
    expect(wrapper.get(".show-list__action").text()).toBe("View All");

    const cards = wrapper.findAllComponents(ShowCard);
    expect(cards.length).toBeGreaterThanOrEqual(5);
  });

  it("emits a view-all event when the action is clicked", async () => {
    const wrapper = mount(ShowList);

    await wrapper.get(".show-list__action").trigger("click");
    expect(wrapper.emitted("view-all")).toBeTruthy();
  });

  it("renders provided shows and title", () => {
    const shows = [
      { title: "Custom One", year: "2020", rating: "7.0", imageSrc: "/foo.png" },
      { title: "Custom Two", year: "2021", rating: "8.0", imageSrc: "/bar.png" },
    ];

    const wrapper = mount(ShowList, {
      props: {
        title: "Comedy",
        actionLabel: "See more",
        shows,
      },
    });

    expect(wrapper.get(".show-list__title").text()).toBe("Comedy");
    expect(wrapper.get(".show-list__action").text()).toBe("See more");

    const cards = wrapper.findAllComponents(ShowCard);
    expect(cards).toHaveLength(2);
    expect(cards[0].props("title")).toBe("Custom One");
    expect(cards[1].props("title")).toBe("Custom Two");
  });

  it("scrolls the grid when the arrow button is clicked", async () => {
    const wrapper = mount(ShowList);

    const grid = wrapper.get(".show-list__grid").element as HTMLElement;
    const scrollBy = vi.fn();
    grid.scrollBy = scrollBy;

    await wrapper.get(".show-list__scroll").trigger("click");
    expect(scrollBy).toHaveBeenCalled();

    await wrapper.get(".show-list__scroll--prev").trigger("click");
    expect(scrollBy).toHaveBeenCalledTimes(2);
  });
});
