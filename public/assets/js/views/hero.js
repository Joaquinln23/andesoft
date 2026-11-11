/* Vista: Portada con formulario de cotización rápida (A.views.hero) */
(function (A) {
  'use strict';
  const { escapeHtml: esc, rich, safeUrl } = A.util;
  const icon = A.icons.ui;
  const shared = A.views.shared;
  const VARIANTS = ['primary', 'outline'];

  function action(a) {
    const variant = VARIANTS.includes(a.variant) ? a.variant : 'primary';
    return `<a href="${esc(safeUrl(a.href))}" class="btn btn--${variant}">${icon(a.icon, a.icon === 'playCircle' ? 24 : 22)}${esc(a.label)}${a.trailingIcon ? icon(a.trailingIcon, 20) : ''}</a>`;
  }

  function quickField(model, field) {
    const id = 'q-' + field.name;
    const chevron = field.type === 'service' ? icon('chevronDown', 18).replace('<svg ', '<svg class="quick__chev" ') : '';
    return `
      <div class="quick__field">
        ${icon(field.icon, 20)}
        <label class="sr-only" for="${esc(id)}">${esc(field.label)}</label>
        ${shared.control(model, field, id)}
        ${chevron}
      </div>`;
  }

  A.views.hero = function (model) {
    const { hero } = model;
    const quick = model.forms.quick;
    return `
      <section class="hero" id="inicio" aria-labelledby="hero-title">
        <div class="container hero__main">
          <div class="hero__inner">
            <div class="hero__content">
              <span class="hero__badge">${icon(hero.badge.icon, 22)}${esc(hero.badge.text)}</span>
              <h1 class="hero__title" id="hero-title">
                ${hero.title.map(line => `<span class="l">${rich(line, 'text-gradient')}</span>`).join(' ')}
              </h1>
              <p class="hero__subtitle">${esc(hero.subtitle)}</p>
              <div class="hero__actions">${hero.actions.map(action).join('')}</div>
            </div>

            <form class="quick" data-form="quick" aria-labelledby="quick-title">
              <span class="quick__bar" aria-hidden="true"></span>
              <h2 class="quick__title" id="quick-title">${esc(quick.title)}</h2>
              <p class="quick__sub">${esc(quick.text)}</p>
              ${quick.fields.map(f => quickField(model, f)).join('')}
              ${shared.honeypot()}
              <button type="submit" class="quick__submit">${icon('send', 20)}<span class="btn-label">${esc(quick.submit)}</span>${icon('arrowRight', 20)}</button>
              ${shared.statusLine()}
              <p class="quick__note">${icon('lock', 15)}${esc(quick.note)}</p>
            </form>
          </div>
        </div>

        <div class="hero__features">
          <div class="container">
            <ul class="hf" role="list">
              ${hero.features.map(f => `
                <li class="hf__item" data-reveal>${icon(f.icon, 40)}<div><strong>${esc(f.title)}</strong><span>${esc(f.text)}</span></div></li>`).join('')}
            </ul>
          </div>
        </div>
      </section>`;
  };
})(window.AndeSoft);
