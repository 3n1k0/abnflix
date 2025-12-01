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
      <ShowDetailCast v-else-if="activeTab === 'cast'" :show-id="show?.id" />
      <ShowDetailEpisodes v-else />
    </div>
  </ShowDetailCard>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Object,
    default: null,
  },
  summary: {
    type: String,
    default: '',
  },
  genres: {
    type: Array,
    default: () => [],
  },
  castCount: {
    type: Number,
    default: null,
  },
  episodeCount: {
    type: Number,
    default: null,
  },
})

const title = computed(() => props.show?.title || 'Untitled')
const year = computed(() => props.show?.year ?? '')
const displayRating = computed(() => (props.show?.rating != null ? String(props.show.rating) : '—'))
const language = computed(() => props.show?.language || '')

const summaryText = computed(() => {
  const trimmed = props.summary?.trim()
  if (trimmed) return trimmed
  return `${title.value} is a popular show${year.value ? ` from ${year.value}` : ''}. Rated ${displayRating.value}/10.`
})

const genresToRender = computed(() => props.genres || [])

const { active: activeTab, tabs } = useDetailTabs({
  castCount: toRef(props, 'castCount'),
  episodeCount: toRef(props, 'episodeCount'),
})
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
