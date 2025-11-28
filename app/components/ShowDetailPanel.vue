<template>
  <ShowDetailCard>
    <ShowDetailHeader
      :title="title"
      :year="year"
      :display-rating="displayRating"
      :language="language"
      :genres="genresToRender"
    />

    <ShowDetailTabs :tabs="tabs" :active-tab="activeTab" @update:active-tab="activeTab = $event" />

    <div class="detail-card__body">
      <ShowDetailSummary v-if="activeTab === 'summary'" :text="summaryText" />
      <ShowDetailCast v-else-if="activeTab === 'cast'" :cast="castToRender" />
      <ShowDetailEpisodes v-else />
    </div>
  </ShowDetailCard>
</template>

<script setup lang="ts">
import type { ShowItem, CastMember } from '../../types/shows'
import ShowDetailCard from './show/ShowDetailCard.vue'
import ShowDetailHeader from './show/ShowDetailHeader.vue'
import ShowDetailTabs from './show/ShowDetailTabs.vue'
import ShowDetailSummary from './show/ShowDetailSummary.vue'
import ShowDetailCast from './show/ShowDetailCast.vue'
import ShowDetailEpisodes from './show/ShowDetailEpisodes.vue'
import { useDetailTabs } from '../composables/ui/useDetailTabs'

const props = defineProps<{
  show: ShowItem
  genres?: string[]
  summary?: string
  cast?: CastMember[] | null
  castCount?: number | null
  episodeCount?: number | null
}>()
const { active: activeTab, tabs } = useDetailTabs(props)

const title = computed(() => props.show?.title || 'Untitled')
const year = computed(() => props.show?.year ?? '')
const displayRating = computed(() => props.show?.rating ?? '—')
const language = computed(() => props.show?.language || '')

const summaryText = computed(() => {
  const trimmed = props.summary?.trim()
  if (trimmed) return trimmed

  return `${title.value} is a popular show${year.value ? ` from ${year.value}` : ''}. Rated ${displayRating.value}/10.`
})

const genresToRender = computed(() => {
  if (props.genres?.length) return props.genres
  return []
})

const castToRender = computed(() => props.cast || [])
</script>

<style scoped>
.detail-card__body {
  padding-top: 4px;
}

@media (max-width: 640px) {
  .detail-card__body {
    padding-top: 2px;
  }
}
</style>
