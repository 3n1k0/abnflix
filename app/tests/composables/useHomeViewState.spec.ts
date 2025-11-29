import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { useHomeViewState } from '~/composables/ui/useHomeViewState'

describe('useHomeViewState', () => {
  it('returns loading when pending', async () => {
    const error = ref<unknown>(null)
    const pending = ref(true)
    const genres = ref<unknown[]>([])

    const state = useHomeViewState({ error, pending, genres })

    await nextTick()

    expect(state.isLoading.value).toBe(true)
    expect(state.viewState.value).toBe('loading')
  })

  it('returns error when error is present, regardless of other flags', async () => {
    const error = ref<unknown>(new Error('fail'))
    const pending = ref(true)
    const genres = ref<unknown[]>([{ id: 1 }])

    const state = useHomeViewState({ error, pending, genres })

    await nextTick()

    expect(state.isError.value).toBe(true)
    expect(state.viewState.value).toBe('error')
    expect(state.isLoading.value).toBe(false)
  })

  it('returns ready when data exists and no error/pending', async () => {
    const error = ref<unknown>(null)
    const pending = ref(false)
    const genres = ref<unknown[]>([{ id: 1 }])

    const state = useHomeViewState({ error, pending, genres })

    await nextTick()

    expect(state.isReady.value).toBe(true)
    expect(state.viewState.value).toBe('ready')
  })

  it('returns empty when no data and not pending/error', async () => {
    const error = ref<unknown>(null)
    const pending = ref(false)
    const genres = ref<unknown[]>([])

    const state = useHomeViewState({ error, pending, genres })

    await nextTick()

    expect(state.isEmpty.value).toBe(true)
    expect(state.viewState.value).toBe('empty')
  })
})
