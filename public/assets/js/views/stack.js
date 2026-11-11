/* Vista: Stack tecnológico — cinta de logos (A.views.stack) */
(function (A) {
  'use strict';
  const { escapeHtml: esc, rich } = A.util;

  A.views.stack = function (model) {
    const s = model.stack;
    const logos = s.logos.map(l => `
      <li class="logo-card">
        <img src="${esc(l.img)}" alt="" width="96" height="96" loading="lazy" decoding="async">
        <span>${esc(l.label)}</span>
      </li>`).join('');

    return `
      <section class="section section--dark" id="stack" aria-labelledby="stack-title">
        <div class="container">
          <div class="section__header" data-reveal>
            <p class="section__eyebrow">${esc(s.eyebrow)}</p>
            <h2 class="section__title" id="stack-title">${rich(s.title)}</h2>
            <p class="section__lead">${esc(s.lead)}</p>
          </div>
          <div class="marquee" aria-label="Tecnologías que usamos">
            <div class="marquee__track">
              <ul class="marquee__group" role="list">${logos}</ul>
            </div>
          </div>
        </div>
      </section>`;
  };
})(window.AndeSoft);
