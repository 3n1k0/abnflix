<template>
  <form class="hero-search" role="search" aria-label="Search for shows">
    <label class="sr-only" for="hero-search-input">Search for shows</label>
    <span class="hero-search__icon" aria-hidden="true">
      <img src="/icons/search-icon.svg" alt="" />
    </span>
    <input
      id="hero-search-input"
      name="query"
      type="search"
      placeholder="Search for shows..."
      autocomplete="off"
      class="form-control"
    />
  </form>
</template>

<style scoped>
.hero-search {
  position: relative;
  max-width: 672px;
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
