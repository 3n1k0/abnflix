<template>
  <section class="detail-card" aria-labelledby="detail-card-title">
    <div class="detail-card__accent" aria-hidden="true" />

    <header class="detail-card__header">
      <div>
        <h1 id="detail-card-title" class="detail-card__title">{{ title }}</h1>
        <div class="detail-card__meta" role="list">
          <div class="detail-card__pill detail-card__pill--rating" role="listitem">
            <StarIcon class="pill-icon" aria-hidden="true" />
            <span class="pill-value">{{ displayRating }}</span>
          </div>
          <span v-if="year" class="detail-card__meta-text" role="listitem">{{ year }}</span>
          <span v-if="language" class="detail-card__pill" role="listitem">{{ language }}</span>
          <span
            v-for="genre in genresToRender"
            :key="genre"
            class="detail-card__pill"
            role="listitem"
          >
            {{ genre }}
          </span>
        </div>
      </div>
    </header>

    <nav class="detail-card__tabs" aria-label="Show detail sections">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        :class="['detail-card__tab', { 'is-active': activeTab === tab.key }]"
        :aria-current="activeTab === tab.key ? 'page' : undefined"
        @click="activeTab = tab.key"
      >
        <span>{{ tab.label }}</span>
        <span v-if="tab.count != null" class="detail-card__badge">{{ tab.count }}</span>
      </button>
    </nav>

    <div class="detail-card__body">
      <p v-if="activeTab === 'summary'" class="detail-card__text">{{ summaryText }}</p>

      <div v-else-if="activeTab === 'cast'" class="detail-card__cast">
        <template v-if="castToRender.length">
          <div class="detail-card__cast-grid">
            <div v-for="member in visibleCast" :key="member.id" class="detail-card__cast-row">
              <div class="detail-card__cast-avatar" aria-hidden="true">
                <NuxtImg
                  v-if="member.image && !castImageErrors[member.id]"
                  :src="member.image"
                  alt=""
                  width="48"
                  height="48"
                  format="webp"
                  quality="70"
                  @error="handleCastImageError(member.id, member.name)"
                />
                <div v-else class="detail-card__cast-placeholder">{{ member.name[0] }}</div>
              </div>
              <div>
                <div class="detail-card__cast-name">{{ member.name }}</div>
                <div class="detail-card__cast-role">as {{ member.character }}</div>
              </div>
            </div>
          </div>
          <button
            v-if="hasMoreCast"
            type="button"
            class="detail-card__cast-toggle"
            @click="showAllCast = !showAllCast"
          >
            {{ showAllCast ? 'Show less' : 'See more' }}
          </button>
        </template>
        <p v-else class="detail-card__text">Cast data not available for this show.</p>
      </div>

      <p v-else class="detail-card__text">Episode guide is on the way.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ShowItem, CastMember } from '../../types/shows'
import StarIcon from './icons/StarIcon.vue'

type TabKey = 'summary' | 'cast' | 'episodes'

const props = defineProps<{
  show: ShowItem
  genres?: string[]
  summary?: string
  cast?: CastMember[] | null
  castCount?: number | null
  episodeCount?: number | null
}>()

const activeTab = ref<TabKey>('summary')
const castImageErrors = reactive<Record<number, boolean>>({})

const handleCastImageError = (memberId: number, memberName: string) => {
  castImageErrors[memberId] = true
  console.warn(`Failed to load cast image for: ${memberName}`)
}

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

const showAllCast = ref(false)
const visibleCast = computed(() =>
  showAllCast.value ? castToRender.value : castToRender.value.slice(0, 4)
)
const hasMoreCast = computed(() => castToRender.value.length > 4)

const tabs = computed(() => {
  return [
    { key: 'summary' as TabKey, label: 'Summary', count: null },
    { key: 'cast' as TabKey, label: 'Cast', count: props.castCount ?? null },
    { key: 'episodes' as TabKey, label: 'Episodes', count: props.episodeCount ?? null },
  ]
})
</script>

<style scoped>
.detail-card {
  position: relative;
  background: var(--color-bg-white);
  border-radius: 18px;
  box-shadow: 0 12px 38px rgba(0, 0, 0, 0.12);
  padding: 32px 36px 32px;
  color: var(--color-ink);
  overflow: hidden;
}

.detail-card__accent {
  position: absolute;
  top: 26px;
  left: 28px;
  width: 74px;
  height: 4px;
  border-radius: 999px;
  background: var(--color-primary);
}

.detail-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.detail-card__title {
  margin: 12px 0 12px 0;
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: var(--tracking-heading);
  font-weight: 600;
}

.detail-card__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.detail-card__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(225, 113, 0, 0.08);
  color: var(--color-primary);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-tight);
  line-height: 1.4;
}

.detail-card__pill--rating {
  background: rgba(254, 154, 0, 0.18);
  color: var(--color-ink);
  box-shadow: inset 0 0 0 1px rgba(254, 154, 0, 0.26);
}

.pill-icon {
  width: 18px;
  height: 18px;
  color: var(--color-rating);
}

.pill-value {
  font-weight: 600;
}

.detail-card__meta-text {
  color: var(--color-muted);
  font-size: var(--text-sm);
  line-height: 1.4;
}

.detail-card__tabs {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(225, 113, 0, 0.18);
  padding-bottom: 8px;
}

.detail-card__tab {
  position: relative;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  letter-spacing: var(--tracking-base);
  padding: 8px 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color var(--transition-fast);
}

.detail-card__tab:hover,
.detail-card__tab:focus-visible {
  color: var(--color-ink);
}

.detail-card__tab.is-active {
  color: var(--color-primary);
}

.detail-card__tab.is-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -9px;
  height: 3px;
  border-radius: 999px;
  background: var(--color-primary);
}

.detail-card__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(225, 113, 0, 0.16);
  color: var(--color-primary);
  font-size: 12px;
  line-height: 1.2;
}

.detail-card__body {
  padding-top: 4px;
}

.detail-card__text {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: var(--tracking-base);
  color: var(--color-muted);
}

.detail-card__cast {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-card__cast-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.detail-card__cast-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: center;
}

.detail-card__cast-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(225, 113, 0, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-weight: 700;
}

.detail-card__cast-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-card__cast-placeholder {
  font-size: 18px;
}

.detail-card__cast-name {
  font-weight: 600;
  color: var(--color-ink);
}

.detail-card__cast-role {
  color: var(--color-muted);
  font-size: 14px;
}

.detail-card__cast-toggle {
  align-self: flex-start;
  border: none;
  background: transparent;
  color: var(--color-primary);
  font-weight: 600;
  cursor: pointer;
  padding: 4px 0;
}

.detail-card__cast-toggle:hover,
.detail-card__cast-toggle:focus-visible {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .detail-card {
    padding: 24px;
  }

  .detail-card__tabs {
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .detail-card {
    padding: 18px 16px 20px;
    border-radius: 14px;
  }

  .detail-card__accent {
    top: 16px;
    left: 16px;
    width: 60px;
  }

  .detail-card__header {
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }

  .detail-card__title {
    margin: 8px 0;
    font-size: 18px;
    line-height: 1.4;
  }

  .detail-card__meta {
    gap: 8px;
  }

  .detail-card__pill {
    padding: 6px 10px;
    font-size: 13px;
  }

  .detail-card__tabs {
    gap: 8px;
    padding-bottom: 6px;
  }

  .detail-card__tab {
    font-size: var(--text-sm);
    padding: 6px 0;
  }

  .detail-card__body {
    padding-top: 2px;
  }

  .detail-card__text {
    font-size: 15px;
    line-height: 1.55;
  }
}
</style>
