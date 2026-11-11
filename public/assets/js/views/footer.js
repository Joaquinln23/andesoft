/* Vista: Pie de página (A.views.footer) */
(function (A) {
  'use strict';
  const { escapeHtml: esc, safeUrl } = A.util;

  A.views.footer = function (model) {
    const f = model.footer;
    const columns = f.columns.map(col => `
      <nav aria-label="${esc(col.title)}">
        <div class="footer__col-title">${esc(col.title)}</div>
        <ul class="footer__links" role="list">
          ${col.links.map(l => `<li><a href="${esc(safeUrl(l.href))}">${esc(l.label)}</a></li>`).join('')}
        </ul>
      </nav>`).join('');
    const copyright = f.copyright.replace('{year}', new Date().getFullYear());

    return `
      <footer class="footer" role="contentinfo">
        <div class="container">
          <div class="footer__grid">
            <div>
              <img class="footer__logo-img" src="${esc(f.logo.src)}" alt="${esc(f.logo.alt)}" width="${Number(f.logo.width)}" height="${Number(f.logo.height)}" loading="lazy">
              <p class="footer__brand-desc">${esc(f.description)}</p>
            </div>
            ${columns}
          </div>
          <div class="footer__bottom"><span>${esc(copyright)}</span></div>
        </div>
      </footer>`;
  };
})(window.AndeSoft);
