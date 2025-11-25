<script setup lang="ts">

const props = defineProps<{
  onHomeClick?: () => void;
}>();

const emit = defineEmits<{
  (e: "home"): void;
}>();

const handleHomeClick = () => {
  props.onHomeClick?.();
  emit("home");
};
</script>

<template>
  <header
    role="banner"
    class="relative bg-white/95 backdrop-blur-sm border-b border-amber-100/70 shadow-sm"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <button
          type="button"
          class="flex items-center gap-3 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition"
          @click="handleHomeClick"
          aria-label="Go to TV Shows home"
        >
          <span class="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center shadow-sm">
            <Tv class="w-5 h-5 text-white" aria-hidden="true" />
          </span>
          <span class="text-slate-800 font-medium">TV Shows</span>
        </button>

        <nav
          class="flex items-center gap-4 sm:gap-6 text-sm sm:text-base"
          aria-label="Primary"
        >
          <NuxtLink
            to="/browse"
            class="rounded text-slate-600 hover:text-amber-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Browse
          </NuxtLink>
          <NuxtLink
            to="/my-list"
            class="rounded text-slate-600 hover:text-amber-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            My List
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div
      aria-hidden="true"
      class="h-3 w-full bg-gradient-to-r from-amber-50 via-amber-50/70 to-white border-t border-amber-100/70 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
    />
  </header>
</template>
