/* Comportamiento: cinta infinita de logos (A.behaviors.marquee) */
(function (A) {
  'use strict';

  A.behaviors.marquee = {
    init(root) {
      const marquee = root.querySelector('.marquee');
      const track = marquee && marquee.querySelector('.marquee__track');
      if (!track) return;

      // Si un logo no carga, se quita (el evento "error" no burbujea: se escucha en captura).
      marquee.addEventListener('error', e => {
        if (e.target instanceof HTMLImageElement) e.target.closest('li')?.remove();
      }, true);

      if (A.util.prefersReducedMotion()) { marquee.classList.add('is-static'); return; }

      const clone = track.firstElementChild.cloneNode(true);   // segunda copia para el bucle continuo
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
      marquee.classList.add('is-ready');
    }
  };
})(window.AndeSoft);
