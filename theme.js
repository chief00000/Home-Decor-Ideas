/* Home Decor Ideas theme controller. Runs before stylesheets to avoid theme flash. */
(() => {
  'use strict';
  const KEY = 'hdi.theme.v1';
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch { /* Storage may be unavailable. */ }
  const valid = saved === 'light' || saved === 'dark';
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = valid ? saved : (prefersDark ? 'dark' : 'light');
  document.documentElement.dataset.theme = initial;
  document.documentElement.style.colorScheme = initial;
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('themeToggle');
    const meta = document.getElementById('themeColorMeta');
    const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const paint = theme => {
      const dark = theme === 'dark';
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      if (meta) meta.content = dark ? '#20251f' : '#f6f2eb';
      if (button) {
        button.setAttribute('aria-pressed', String(dark));
        button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
        const label = button.querySelector('.theme-toggle-label');
        if (label) label.textContent = dark ? 'Light mode' : 'Dark mode';
      }
    };
    paint(document.documentElement.dataset.theme || initial);
    button?.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch { /* Theme still changes for this visit. */ }
      paint(next);
    });
    media?.addEventListener?.('change', event => {
      let explicit = null;
      try { explicit = localStorage.getItem(KEY); } catch { /* Ignore. */ }
      if (explicit !== 'light' && explicit !== 'dark') paint(event.matches ? 'dark' : 'light');
    });
  });
})();