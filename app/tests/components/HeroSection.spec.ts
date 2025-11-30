import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import HeroSearch from '@/components/HeroSearch.vue'
import HeroSection from '@/components/HeroSection.vue'

const pushMock = vi.fn()

vi.mock('nuxt/app', () => ({
  useRouter: () => ({ push: pushMock }),
}))

beforeEach(() => {
  vi.useFakeTimers()
  pushMock.mockReset()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('HeroSection', () => {
  it('renders the headline and supporting copy', () => {
    const wrapper = mountHero()

    const heading = wrapper.get('#hero-title')
    expect(heading.text()).toBe('Discover Your Next Favorite Show')

    const copy = wrapper.get('.hero-copy')
    expect(copy.text()).toContain('Explore thousands of TV shows across all genres')
  })

  it('links the section to its title for accessibility', () => {
    const wrapper = mountHero()

    const section = wrapper.get('section.hero')
    expect(section.attributes('aria-labelledby')).toBe('hero-title')
  })

  it('includes the hero search component', () => {
    const wrapper = mountHero()

    expect(wrapper.findComponent(HeroSearch).exists()).toBe(true)
    expect(wrapper.find('input[type="search"]').exists()).toBe(true)
  })

  it('navigates to the search page when submitting a query', async () => {
    const wrapper = mountHero()

    const input = wrapper.get('input[type="search"]')
    await input.setValue('Severance')
    await vi.advanceTimersByTimeAsync(500) // Wait for debounce
    await wrapper.get('form').trigger('submit.prevent')

    expect(pushMock).toHaveBeenCalledWith({ path: '/search', query: { q: 'Severance' } })
  })
})
function mountHero(options?: Parameters<typeof mount<typeof HeroSection>>[1]) {
  return mount(HeroSection, options)
}
