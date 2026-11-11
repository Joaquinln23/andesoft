/* Vista: Contacto (A.views.contact) */
(function (A) {
  'use strict';
  const { escapeHtml: esc, rich } = A.util;
  const icon = A.icons.ui;
  const shared = A.views.shared;

  function field(model, f) {
    return `
      <div class="form-field">
        <label for="${esc(f.name)}"><span class="form-field__icon" aria-hidden="true">${icon(f.icon)}</span>${esc(f.label)}</label>
        ${shared.control(model, f, f.name)}
      </div>`;
  }

  A.views.contact = function (model) {
    const c = model.contact;
    const form = model.forms.contact;
    const info = c.info.map(item => `
      <div class="glass-card contact__info-card">
        <span class="contact__info-icon" aria-hidden="true">${icon(item.icon)}</span>
        <div class="contact__info-body">
          <div class="contact__info-title">${esc(item.title)}</div>
          <div class="contact__info-value">${esc(item.text)}</div>
        </div>
      </div>`).join('');

    // Primera fila: nombre + email lado a lado; el resto apilado.
    const firstRow = form.fields.slice(0, 2).map(f => field(model, f)).join('');
    const rest = form.fields.slice(2).map(f => field(model, f)).join('');

    return `
      <section class="section section--dark" id="contacto" aria-labelledby="contacto-title">
        <div class="container">
          <div class="section__header" data-reveal>
            <p class="section__eyebrow">${esc(c.eyebrow)}</p>
            <h2 class="section__title" id="contacto-title">${rich(c.title, 'text-gradient')}</h2>
            <p class="section__lead">${esc(c.lead)}</p>
          </div>
          <div class="contact__layout">
            <div class="contact__info">${info}</div>
            <form class="contact__panel" data-form="contact" aria-label="Formulario de contacto">
              <div class="form-row">${firstRow}</div>
              ${rest}
              ${shared.honeypot()}
              <button type="submit" class="btn btn--primary btn--submit">
                <span class="btn__icon" aria-hidden="true">${icon('send')}</span>
                <span class="btn-label">${esc(form.submit)}</span>
                <span class="btn__icon" aria-hidden="true">${icon('arrowRight')}</span>
              </button>
              ${shared.statusLine()}
            </form>
          </div>
        </div>
      </section>`;
  };
})(window.AndeSoft);
