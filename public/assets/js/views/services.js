/* Vista: Servicios (A.views.services) */
(function (A) {
  'use strict';
  const { escapeHtml: esc, rich, safeUrl } = A.util;

  function card(item, cta) {
    return `
      <article class="glass-card service-card" role="listitem" data-reveal>
        <div class="service-card__icon" aria-hidden="true">${A.icons.service[item.icon] || ''}</div>
        <div class="service-card__body">
          <h3 class="service-card__title">${esc(item.title)}</h3>
          <p class="service-card__desc">${esc(item.desc)}</p>
          <div class="service-card__tags">${item.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
          <a class="service-card__cta" href="#contacto" data-service="${esc(item.id)}">${esc(cta)}</a>
        </div>
      </article>`;
  }

  A.views.services = function (model) {
    const s = model.services;
    return `
      <section class="section section--dark" id="servicios" aria-labelledby="servicios-title">
        <div class="container">
          <div class="services__header" data-reveal>
            <div class="eyebrow-row">
              <p class="eyebrow-pill">${esc(s.eyebrow)}</p>
              <span class="eyebrow-line" aria-hidden="true"></span>
            </div>
            <h2 class="services__title" id="servicios-title">${rich(s.title, 'text-gradient')}</h2>
            <p class="services__lead">${esc(s.lead)}</p>
          </div>
          <div class="services__grid" role="list" data-reveal-group>
            ${s.items.map(item => card(item, s.itemCta)).join('')}
          </div>
          <div class="services__cta" data-reveal>
            <span class="services__cta-icon" aria-hidden="true">${A.icons.decor.rocket}</span>
            <div class="services__cta-text">
              <p class="services__cta-title">${esc(s.cta.title)}</p>
              <p class="services__cta-sub">${esc(s.cta.text)}</p>
            </div>
            <a class="services__cta-btn" href="${esc(safeUrl(s.cta.href))}">${esc(s.cta.label)} →</a>
          </div>
        </div>
      </section>`;
  };
})(window.AndeSoft);
