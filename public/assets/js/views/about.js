/* Vista: Nosotros (A.views.about) */
(function (A) {
  'use strict';
  const { escapeHtml: esc, rich } = A.util;

  A.views.about = function (model) {
    const a = model.about;
    const chips = a.chips.map(c => `
      <div class="about__chip">
        <span class="about__chip-icon" aria-hidden="true">${A.icons.trust[c.icon] || ''}</span>
        <span class="about__chip-label">${rich(c.label)}</span>
      </div>`).join('');
    const points = a.points.map(p => `
      <article class="glass-card about-card" data-reveal>
        <span class="about-card__arrow" aria-hidden="true">→</span>
        <h3 class="about-card__title">${esc(p.title)}</h3>
        <p class="about-card__desc">${esc(p.text)}</p>
      </article>`).join('');

    return `
      <section class="section section--dark" id="nosotros" aria-labelledby="nosotros-title">
        <div class="container">
          <div class="about__header" data-reveal>
            <div class="about__header-text">
              <div class="eyebrow-row">
                <p class="eyebrow-pill">${esc(a.eyebrow)}</p>
                <span class="eyebrow-line" aria-hidden="true"></span>
              </div>
              <h2 class="about__title" id="nosotros-title">${rich(a.title, 'text-gradient')}</h2>
              <p class="about__lead">${esc(a.lead)}</p>
              <div class="about__chips">${chips}</div>
            </div>
            <figure class="about__photo">
              <img src="${esc(a.photo.src)}" alt="${esc(a.photo.alt)}" width="${Number(a.photo.width)}" height="${Number(a.photo.height)}" loading="lazy" decoding="async">
            </figure>
          </div>
          <div class="about__points" data-reveal-group>${points}</div>
        </div>
      </section>`;
  };
})(window.AndeSoft);
