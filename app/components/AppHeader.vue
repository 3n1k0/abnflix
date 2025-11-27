<template>
  <header class="app-header">
    <div class="header-inner container">
      <a class="brand" href="#" aria-label="TV Shows home">
        <span class="brand-icon" aria-hidden="true">
          <img src="/icons/tv-logo.svg" alt="" aria-hidden="true" width="32" height="32" >
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
  background: var(--color-bg-white-translucent);
  border-bottom: 0.66px solid var(--color-border-soft);
  box-shadow: var(--shadow-soft);
}

.header-inner {
  height: 64px;
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
  color: var(--color-ink);
  font-size: var(--text-base);
  line-height: 1.5;
  letter-spacing: var(--tracking-base);
  font-weight: 500;
}

.brand-icon {
  width: var(--icon-lg);
  height: var(--icon-lg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.brand-icon img {
  width: var(--icon-lg);
  height: var(--icon-lg);
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
  border: none;
  background: none;
  padding: 0;
  color: var(--color-muted);
  font-size: var(--text-base);
  line-height: 1.5;
  letter-spacing: var(--tracking-base);
  text-decoration: none;
  transition: color 0.15s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  color: var(--color-ink);
}

@media (max-width: 640px) {
  .header-inner {
    height: auto;
    gap: 16px;
  }

  .nav {
    gap: 16px;
  }
}
</style>
