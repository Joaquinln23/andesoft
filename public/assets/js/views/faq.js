/* Vista: Preguntas frecuentes (A.views.faq) */
(function (A) {
  'use strict';
  const { escapeHtml: esc, rich } = A.util;

  A.views.faq = function (model) {
    const f = model.faq;
    const items = f.items.map(i => `<details><summary>${esc(i.q)}</summary><p>${esc(i.a)}</p></details>`).join('');
    return `
      <section class="section section--wave" id="faq" aria-labelledby="faq-title">
        <div class="container">
          <div class="section__header section__header--center" data-reveal>
            <p class="section__eyebrow">${esc(f.eyebrow)}</p>
            <h2 class="section__title" id="faq-title">${rich(f.title)}</h2>
          </div>
          <div class="faq">${items}</div>
        </div>
      </section>`;
  };
})(window.AndeSoft);
