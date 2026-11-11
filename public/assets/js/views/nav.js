/* Vista: Navegación principal (A.views.nav) */
(function (A) {
  'use strict';
  const { escapeHtml: esc, safeUrl } = A.util;
  const icon = A.icons.ui;

  function dropdown(services) {
    const items = services.items
      .map(s => `<li><a href="#contacto" data-service="${esc(s.id)}">${esc(s.short)}</a></li>`)
      .join('');
    return `<ul class="nav__dropdown" role="list">${items}</ul>`;
  }

  function link(item, model) {
    const href = safeUrl(item.href);
    if (item.dropdown) {
      return `<li class="has-dropdown"><a href="${esc(href)}">${esc(item.label)} ${icon('chevronDown', 16)}</a>${dropdown(model.services)}</li>`;
    }
    return `<li><a href="${esc(href)}">${item.icon ? icon(item.icon, 18) : ''}${esc(item.label)}</a></li>`;
  }

  A.views.nav = function (model) {
    const { logo, links, cta } = model.nav;
    return `
      <header role="banner">
        <nav class="nav" aria-label="Navegación principal">
          <div class="container nav__inner">
            <a href="#inicio" class="nav__logo">
              <img class="nav__logo-img" src="${esc(logo.src)}" alt="${esc(logo.alt)}" width="${Number(logo.width)}" height="${Number(logo.height)}">
            </a>
            <ul class="nav__links" id="nav-menu" role="list">
              ${links.map(item => link(item, model)).join('')}
              <li><a href="${esc(safeUrl(cta.href))}" class="nav__cta">${icon(cta.icon, 18)}${esc(cta.label)}${icon(cta.trailingIcon, 18)}</a></li>
            </ul>
            <button class="nav__hamburger" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-menu" data-nav-toggle>
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </header>`;
  };
})(window.AndeSoft);
