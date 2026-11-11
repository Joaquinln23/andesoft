/* ============================================================
   Vistas — Piezas compartidas (A.views.shared)
   Atributos de campos, lista de servicios y trampas antirrobots
   que usan los dos formularios (cotización rápida y contacto).
   ============================================================ */
(function (A) {
  'use strict';
  const esc = A.util.escapeHtml;

  /** <option> de servicios: vacío + servicios del modelo + "Otro". El value es el id estable. */
  function serviceOptions(model, emptyLabel) {
    const { items, otherOption } = model.services;
    const options = [{ id: '', label: emptyLabel }]
      .concat(items.map(s => ({ id: s.id, label: s.optionLabel })))
      .concat([{ id: otherOption.id, label: otherOption.label }]);
    return options.map(o => `<option value="${esc(o.id)}">${esc(o.label)}</option>`).join('');
  }

  /** Atributos comunes de un campo, todos escapados y con tipos acotados. */
  function controlAttrs(field, id) {
    const attrs = [`id="${esc(id)}"`, `name="${esc(field.name)}"`];
    if (field.autocomplete) attrs.push(`autocomplete="${esc(field.autocomplete)}"`);
    if (field.placeholder) attrs.push(`placeholder="${esc(field.placeholder)}"`);
    if (field.required) attrs.push('required');
    if (field.minLength) attrs.push(`minlength="${Number(field.minLength)}"`);
    if (field.maxLength) attrs.push(`maxlength="${Number(field.maxLength)}"`);
    return attrs.join(' ');
  }

  /** Campo señuelo: invisible para personas, los robots lo rellenan. */
  function honeypot() {
    return `<div class="hp-field" aria-hidden="true"><label>Sitio web <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>`;
  }

  /** Zona donde se anuncian los resultados (accesible para lectores de pantalla). */
  function statusLine() {
    return '<p class="form-status" role="status" aria-live="polite" data-form-status></p>';
  }

  /** Control (input / textarea / select) según el tipo de campo. */
  function control(model, field, id, emptyLabel) {
    if (field.type === 'service') {
      return `<select ${controlAttrs(field, id)} data-service-select>${serviceOptions(model, field.emptyLabel || emptyLabel || '')}</select>`;
    }
    if (field.type === 'textarea') return `<textarea ${controlAttrs(field, id)}></textarea>`;
    const type = field.type === 'email' ? 'email' : 'text';
    return `<input type="${type}" ${controlAttrs(field, id)}${type === 'email' ? ' spellcheck="false"' : ''}>`;
  }

  A.views.shared = Object.freeze({ control, honeypot, statusLine });
})(window.AndeSoft);
