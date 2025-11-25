<template>
  <form class="hero-search" role="search" aria-label="Search for shows" @submit.prevent="handleSubmit">
    <label class="sr-only" for="hero-search-input">Search for shows</label>
    <span class="hero-search__icon" aria-hidden="true">
      <img src="/icons/search-icon.svg" alt="" aria-hidden="true" />
    </span>
    <input
      id="hero-search-input"
      name="query"
      type="search"
      placeholder="Search for shows..."
      autocomplete="off"
      class="form-control"
      :value="query"
      @input="onInput"
    />
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "search", value: string): void;
}>();

const query = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    query.value = value ?? "";
  },
);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  query.value = target.value;
  emit("update:modelValue", target.value);
};

const handleSubmit = () => {
  emit("search", query.value.trim());
};
</script>

<style scoped>
.hero-search {
  position: relative;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}

.hero-search__icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.hero-search__icon img {
  width: 20px;
  height: 20px;
  display: block;
}
</style>
