import { computed, ref } from 'vue'

export type DetailTabKey = 'summary' | 'cast' | 'episodes'

export function useDetailTabs(props: { castCount?: number | null; episodeCount?: number | null }) {
  const active = ref<DetailTabKey>('summary')

  const tabs = computed(() => [
    { key: 'summary' as DetailTabKey, label: 'Summary', count: null },
    { key: 'cast' as DetailTabKey, label: 'Cast', count: props.castCount ?? null },
    { key: 'episodes' as DetailTabKey, label: 'Episodes', count: props.episodeCount ?? null },
  ])

  return { active, tabs }
}
