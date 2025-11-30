import { computed, ref, unref, type MaybeRef } from 'vue'

export type DetailTabKey = 'summary' | 'cast' | 'episodes'

export function useDetailTabs(props: {
  castCount?: MaybeRef<number | null>
  episodeCount?: MaybeRef<number | null>
}) {
  const active = ref<DetailTabKey>('summary')

  const tabs = computed(() => [
    { key: 'summary' as DetailTabKey, label: 'Summary', count: null },
    { key: 'cast' as DetailTabKey, label: 'Cast', count: unref(props.castCount) ?? null },
    {
      key: 'episodes' as DetailTabKey,
      label: 'Episodes',
      count: unref(props.episodeCount) ?? null,
    },
  ])

  return { active, tabs }
}
