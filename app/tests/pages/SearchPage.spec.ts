import { mount } from '@vue/test-utils'
import { computed, ref } from 'vue'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import SearchPage from '@/pages/search.vue'

const mockResults = ref([
  { id: 1, title: 'Mock Show', slug: 'mock-show' },
  { id: 2, title: 'Another Show', slug: 'another-show' },
])
const mockPending = ref(false)
const mockError = ref(null)
const routeMock = ref({ path: '/search', query: {} as Record<string, string> })
const replaceMock = vi.fn()

vi.mock('nuxt/app', async () => {
  return {
    useRouter: () => ({ replace: replaceMock, push: vi.fn() }),
    useRoute: () => routeMock.value,
    useSeoMeta: vi.fn(),
  }
})

vi.mock('~/composables/useShowSearch', () => ({
  useShowSearch: (queryRef = ref('')) => ({
    results: mockResults,
    pending: mockPending,
    error: mockError,
    hasQuery: computed(() => Boolean(queryRef.value.trim())),
    hasResults: computed(() => Boolean(queryRef.value.trim()) && mockResults.value.length > 0),
    trimmedQuery: computed(() => queryRef.value.trim()),
  }),
}))

const heroSearchStub = {
  template:
    '<form class="hero-search-stub" @submit.prevent="$emit(\'search\', modelValue)"><input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" /></form>',
  props: ['modelValue'],
  emits: ['update:modelValue', 'search'],
}

const showCardStub = {
  template: '<div class="show-card-stub">Card</div>',
  props: ['id', 'slug', 'title'],
}

const mountSearchPage = (routeQuery = {}) => {
  routeMock.value = { path: '/search', query: routeQuery }

  const wrapper = mount(SearchPage, {
    global: {
      stubs: {
        BackButton: {
          template: '<button class="back-stub">Back</button>',
        },
        HeroSearch: heroSearchStub,
        ShowCard: showCardStub,
        NuxtLink: {
          template: '<a><slot /></a>',
        },
        NuxtImg: true,
      },
    },
  })

  return { wrapper }
}

describe('SearchPage', () => {
  beforeEach(() => {
    mockResults.value = [
      { id: 1, title: 'Mock Show', slug: 'mock-show' },
      { id: 2, title: 'Another Show', slug: 'another-show' },
    ]
    mockPending.value = false
    mockError.value = null
    replaceMock.mockReset()
    routeMock.value = { path: '/search', query: {} }
  })

  it('renders search results when available', () => {
    const { wrapper } = mountSearchPage({ q: 'mock' })

    const cards = wrapper.findAll('.show-card-stub')
    expect(cards).toHaveLength(2)
  })

  it('routes to the search page with the query when submitted', async () => {
    mockResults.value = []
    const { wrapper } = mountSearchPage()

    const input = wrapper.get('input')
    await input.setValue('Lost')
    await wrapper.get('form.hero-search-stub').trigger('submit.prevent')

    expect(replaceMock).toHaveBeenCalledWith({ path: '/search', query: { q: 'Lost' } })
  })
})
