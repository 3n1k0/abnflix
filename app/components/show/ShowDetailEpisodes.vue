<template>
  <p class="detail-card__text">Episode guide is on the way.</p>
</template>

<style scoped>
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
