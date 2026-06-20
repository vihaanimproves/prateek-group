// Mobile menu toggle
(function () {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('primary-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu when a link is tapped (mobile)
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 860) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

// Sticky header: fade in the white background + border as the user scrolls
// through the hero section. Fully opaque once the bottom of the hero passes
// under the fixed header.
(function () {
  const header = document.getElementById('site-header');
  const hero = document.querySelector('.hero');
  if (!header || !hero) return;

  let ticking = false;

  function update() {
    ticking = false;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const headerHeight = header.offsetHeight;
    // Distance the page must scroll for the hero's bottom edge to reach the
    // bottom of the fixed header. At/after this point, opacity = 1.
    const triggerEnd = Math.max(1, heroBottom - headerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / triggerEnd));
    header.style.setProperty('--header-bg-opacity', progress.toFixed(3));
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
})();
