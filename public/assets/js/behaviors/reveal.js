/* ============================================================
   Comportamiento: animación de entrada al hacer scroll (A.behaviors.reveal)
   Marca en las vistas:  data-reveal        → el elemento aparece animado
                         data-reveal-group  → sus hijos aparecen escalonados
   Sin JS, sin IntersectionObserver o con "reducir movimiento", todo
   se ve normal (la clase .js-animations nunca se activa).
   ============================================================ */
(function (A) {
  'use strict';

  A.behaviors.reveal = {
    init(root) {
      if (A.util.prefersReducedMotion() || !('IntersectionObserver' in window)) return;
      const targets = root.querySelectorAll('[data-reveal]');
      if (!targets.length) return;

      document.documentElement.classList.add('js-animations');

      root.querySelectorAll('[data-reveal-group]').forEach(group => {
        Array.from(group.children).forEach((child, i) => {
          child.style.transitionDelay = Math.min(i * 90, 450) + 'ms';   // CSSOM: permitido por el CSP
        });
      });

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          observer.unobserve(el);
          el.classList.add('is-visible');
          // Al terminar se quita la animación para no interferir con los :hover.
          setTimeout(() => {
            el.classList.remove('reveal', 'is-visible');
            el.style.transitionDelay = '';
          }, 950);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

      targets.forEach(el => { el.classList.add('reveal'); observer.observe(el); });
    }
  };
})(window.AndeSoft);
