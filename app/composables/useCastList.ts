import { computed, reactive, ref, type Ref } from 'vue'
import type { CastMember } from '../types/shows'

export function useCastList(cast: Ref<CastMember[]>) {
  const showAll = ref(false)
  const visible = computed(() => (showAll.value ? cast.value : cast.value.slice(0, 4)))
  const hasMore = computed(() => cast.value.length > 4)

  const errors = reactive<Record<number, boolean>>({})

  const onImageError = (id: number) => {
    errors[id] = true
  }

  return { visible, hasMore, showAll, errors, onImageError }
}
