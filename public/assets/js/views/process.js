/* Vista: Proceso de trabajo (A.views.process) */
(function (A) {
  'use strict';
  const { escapeHtml: esc, rich } = A.util;

  A.views.process = function (model) {
    const p = model.process;
    const steps = p.steps.map((s, i) => `
      <li class="process__step" data-reveal>
        <div class="process__step-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</div>
        <h3 class="process__step-title">${esc(s.title)}</h3>
        <p class="process__step-desc">${esc(s.text)}</p>
      </li>`).join('');

    return `
      <section class="section section--soft section--wave" id="proceso" aria-labelledby="proceso-title">
        <div class="container">
          <div class="section__header section__header--center" data-reveal>
            <p class="section__eyebrow">${esc(p.eyebrow)}</p>
            <h2 class="section__title" id="proceso-title">${rich(p.title)}</h2>
          </div>
          <ol class="process__steps" data-reveal-group>${steps}</ol>
        </div>
      </section>`;
  };
})(window.AndeSoft);
