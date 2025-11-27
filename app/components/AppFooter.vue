<template>
  <footer class="app-footer">
    <div class="footer-inner container">
      <div class="footer-brand">
        <FooterLogoIcon class="footer-logo" aria-hidden="true" />
        <span class="footer-copy">© 2025 TV Shows Dashboard</span>
      </div>

      <nav class="footer-links" aria-label="Legal">
        <a class="footer-link" href="#">Privacy</a>
        <a class="footer-link" href="#">Terms</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 0.66px solid var(--color-border-soft);
  background: var(--color-bg-white);
  padding: 24px 0;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
}

.footer-logo {
  width: 24px;
  height: 24px;
  display: block;
}

.footer-copy {
  color: var(--color-muted);
  font-size: var(--text-sm);
  line-height: 1.43;
  letter-spacing: var(--tracking-tight);
}

.footer-links {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}

.footer-link {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.43;
  letter-spacing: var(--tracking-tight);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-link:hover,
.footer-link:focus-visible {
  color: var(--color-ink);
}

@media (max-width: 640px) {
  .app-footer {
    padding: 20px 0 24px;
  }

  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
