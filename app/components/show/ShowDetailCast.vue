<template>
  <div class="detail-card__cast">
    <template v-if="castToRender.length">
      <ul class="detail-card__cast-grid">
        <li v-for="member in visible" :key="member.id" class="detail-card__cast-row">
          <div class="detail-card__cast-avatar">
            <NuxtImg
              v-if="member.image && !errors[member.id]"
              :src="member.image"
              :alt="`Headshot of ${member.name}`"
              width="48"
              height="48"
              format="webp"
              quality="70"
              @error="onImageError(member.id)"
            />
            <div v-else class="detail-card__cast-placeholder">{{ member.name?.[0] }}</div>
          </div>
          <div>
            <div class="detail-card__cast-name">{{ member.name }}</div>
            <div class="detail-card__cast-role">as {{ member.character }}</div>
          </div>
        </li>
      </ul>
      <button
        v-if="hasMore"
        type="button"
        class="detail-card__cast-toggle"
        @click="showAll = !showAll"
      >
        {{ showAll ? 'Show less' : 'See more' }}
      </button>
    </template>
    <p v-else class="detail-card__text">Cast data not available for this show.</p>
  </div>
</template>

<script setup lang="ts">
import type { CastMember } from '../../types/shows'
import { useCastList } from '../../composables/useCastList'

const props = defineProps<{ cast: CastMember[] | null }>()

const castToRender = computed(() => props.cast || [])

const { visible, hasMore, showAll, errors, onImageError } = useCastList(castToRender)
</script>

<style scoped>
.detail-card__cast {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-card__cast-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 0;
  margin: 0;
  list-style: none;
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

.detail-card__text {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: var(--tracking-base);
  color: var(--color-muted);
}

@media (max-width: 640px) {
  .detail-card__text {
    font-size: 15px;
    line-height: 1.55;
  }
}
</style>
