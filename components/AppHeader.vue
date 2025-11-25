<template>
  <header class="app-header">
    <div class="header-inner">
      <a class="brand" href="#" aria-label="TV Shows home">
        <span class="brand-icon" aria-hidden="true">
          <img src="/icons/tv-logo.svg" alt="" />
        </span>
        <span class="brand-label">TV Shows</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a class="nav-link" href="#">Browse</a>
        <a class="nav-link" href="#">My List</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 0.66px solid rgba(254, 243, 198, 0.5);
  box-shadow: 0 1px 2px -1px rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.header-inner {
  height: 64px;
  max-width: 1216px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  text-decoration: none;
  color: #1e2939;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  font-weight: 500;
}

.brand-icon {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.brand-icon img {
  width: 32px;
  height: 32px;
  display: block;
}

.brand-label {
  white-space: nowrap;
}

.nav {
  display: inline-flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  color: #4a5565;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  text-decoration: none;
  transition: color 0.15s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  color: #1e2939;
}

@media (max-width: 640px) {
  .header-inner {
    height: auto;
    padding: 12px 16px;
    gap: 16px;
  }

  .nav {
    gap: 16px;
  }
}
</style>
