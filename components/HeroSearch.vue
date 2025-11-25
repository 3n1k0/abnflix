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
    />
  </form>
</template>

<style scoped>
.hero-search {
  position: relative;
  max-width: 672px;
}

.hero-search input {
  width: 100%;
  height: 57px;
  padding: 16px 16px 16px 48px;
  border-radius: 14px;
  border: 0.66px solid rgba(254, 230, 133, 0.5);
  background: #fff;
  box-shadow: 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  color: #0f172a;
  font-size: 16px;
  line-height: 1.21;
  letter-spacing: -0.0195em;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.hero-search input::placeholder {
  color: #6a7282;
}

.hero-search input:focus-visible {
  border-color: rgba(250, 204, 21, 0.7);
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.12), 0 6px 14px -3px rgba(0, 0, 0, 0.08);
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
