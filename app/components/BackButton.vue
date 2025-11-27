<template>
  <button class="back-button" aria-label="Go back" @click="goBack">
    <ChevronLeftIcon />
    <span>Back</span>
  </button>
</template>

<script setup>
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-bg-white);
  color: var(--color-ink);
  font-size: var(--text-base);
  line-height: 1.5;
  letter-spacing: var(--tracking-base);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-card);
}

.back-button:hover {
  background: var(--color-bg-amber-light);
  transform: translateX(-4px);
}

.back-button svg {
  width: 20px;
  height: 20px;
}
</style>
