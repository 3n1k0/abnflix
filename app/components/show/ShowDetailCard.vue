<template>
  <section class="detail-card" aria-labelledby="detail-card-title">
    <div class="detail-card__accent" aria-hidden="true" />
    <slot />
  </section>
</template>

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

@media (max-width: 900px) {
  .detail-card {
    padding: 24px;
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
}
</style>
