// main.js — shared behavior across all pages (ES module)

export function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.primary-nav ul');

  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // mark current page link for wayfinding
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navList.querySelectorAll('a').forEach((link) => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

export function initFooterYear() {
  const yearEl = document.querySelector('#current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

initNav();
initFooterYear();
