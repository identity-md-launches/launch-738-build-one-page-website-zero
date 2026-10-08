// Match the home page's theme preference; the landing content is static HTML.
(() => {
  const root = document.documentElement;
  const preference = matchMedia('(prefers-color-scheme: light)');
  let chosen = false;
  let theme = preference.matches ? 'light' : 'dark';
  let button;

  try {
    const saved = localStorage.getItem('zto-theme');
    if (saved === 'light' || saved === 'dark') {
      chosen = true;
      theme = saved;
    }
  } catch { /* Theme still works without storage. */ }

  function render() {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#111110' : '#faf9f6';
    if (button) {
      const next = theme === 'dark' ? 'light' : 'dark';
      button.setAttribute('aria-label', `switch to ${next} theme`);
      button.querySelector('span').textContent = next;
    }
  }

  render();
  preference.addEventListener('change', () => {
    if (!chosen) {
      theme = preference.matches ? 'light' : 'dark';
      render();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    button = document.querySelector('.theme-toggle');
    render();
    button.hidden = false;
    button.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      chosen = true;
      try { localStorage.setItem('zto-theme', theme); } catch { /* Optional preference. */ }
      render();
    });
  });
})();
