/* ==========================================================
   CANONICAL SITE HEADER BEHAVIOUR  (shared by every page)
   ----------------------------------------------------------
   Handles: scrolled state, mobile menu, dropdowns, smooth
   scroll-to-top for .js-top links, and inert "#" placeholders.
   Every lookup is guarded so this file is safe on any page.
========================================================== */
(function () {
  'use strict';

  var body = document.body;

  /* ---------- Header: solid background after scrolling ---------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- Dropdowns ----------
     Parent links with a real destination navigate normally; only the
     small caret opens the submenu, so mobile users can still reach
     the sub-items. Placeholder "#" parents just toggle. */
  function toggleDropdown(li) {
    var wasOpen = li.classList.contains('open');
    document.querySelectorAll('.has-dropdown.open').forEach(function (o) {
      o.classList.remove('open');
    });
    if (!wasOpen) li.classList.add('open');
  }

  document.querySelectorAll('.site-header .has-dropdown > a').forEach(function (link) {
    if (link.getAttribute('href') === '#') {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        toggleDropdown(link.parentElement);
      });
      return;
    }
    var caret = link.querySelector('.caret');
    if (caret) {
      caret.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown(link.parentElement);
      });
    }
  });

  /* ---------- Every other nav link closes the mobile menu ---------- */
  document.querySelectorAll('#siteNav a').forEach(function (link) {
    if (link.matches('.has-dropdown > a')) return;
    link.addEventListener('click', function () {
      body.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.has-dropdown.open').forEach(function (o) {
        o.classList.remove('open');
      });
    });
  });

  /* ---------- Close the menu / dropdowns on outside click ---------- */
  document.addEventListener('click', function (e) {
    if (header && !header.contains(e.target)) {
      document.querySelectorAll('.has-dropdown.open').forEach(function (o) {
        o.classList.remove('open');
      });
    }
  });

  /* ---------- Esc closes the mobile menu ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    body.classList.remove('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('.has-dropdown.open').forEach(function (o) {
      o.classList.remove('open');
    });
  });

  /* ---------- "Home" / logo -> smooth scroll to top (index only) ---------- */
  document.querySelectorAll('.js-top').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* ---------- Placeholder links (href="#") do nothing ---------- */
  document.querySelectorAll('a[href="#"]:not(.js-top)').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); });
  });
})();
