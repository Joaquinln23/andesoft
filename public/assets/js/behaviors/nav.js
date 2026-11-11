/* Comportamiento: menú móvil y resaltado de la sección activa (A.behaviors.nav) */
(function (A) {
  'use strict';

  function initMenu(menu, toggle) {
    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
    menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }

  function initScrollSpy(nav, menu) {
    // Las secciones a vigilar salen de los propios enlaces del menú (nada que mantener aparte).
    const links = Array.from(menu.querySelectorAll('li > a[href^="#"]:not(.nav__cta)'));
    const targets = links.map(a => ({ link: a, section: document.getElementById(a.hash.slice(1)) }));
    let ticking = false;

    function update() {
      ticking = false;
      nav.classList.toggle('is-scrolled', window.scrollY > 20);
      let current = null;
      targets.forEach(t => { if (t.section && t.section.getBoundingClientRect().top <= 140) current = t.link; });
      links.forEach(a => a.classList.toggle('is-active', a === current));
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  A.behaviors.nav = {
    init(root) {
      const nav = root.querySelector('.nav');
      const menu = root.querySelector('#nav-menu');
      const toggle = root.querySelector('[data-nav-toggle]');
      if (!nav || !menu || !toggle) return;
      initMenu(menu, toggle);
      initScrollSpy(nav, menu);
    }
  };
})(window.AndeSoft);
