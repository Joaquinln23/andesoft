/* ============================================================
   AndeSoft — Utilidades de seguridad y apoyo (A.util)

   REGLA DEL PROYECTO: ningún texto llega a innerHTML sin pasar por
   escapeHtml() / rich() / safeUrl(). Las vistas solo reciben datos del
   modelo, pero se tratan como no confiables por si algún día vienen de
   un CMS, una API o un formulario (defensa en profundidad contra XSS).
   ============================================================ */
(function (A) {
  'use strict';

  const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;' };

  /** Escapa texto para usarlo en HTML o en valores de atributos. */
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"'`]/g, ch => ESCAPES[ch]);
  }

  /**
   * Texto con formato mínimo y seguro (el texto se escapa PRIMERO):
   *   {{palabra}}  → <span class="accentClass">palabra</span>
   *   \n           → <br>
   * Sirve para títulos con una palabra destacada sin guardar HTML en el modelo.
   */
  function rich(text, accentClass) {
    return escapeHtml(text)
      .replace(/\{\{(.+?)\}\}/g, (_, inner) => (accentClass ? `<span class="${accentClass}">${inner}</span>` : inner))
      .replace(/\n/g, '<br>');
  }

  /**
   * Solo deja pasar enlaces internos (#ancla, /ruta) o https://.
   * Bloquea javascript:, data:, //host y cualquier otro esquema.
   */
  function safeUrl(url) {
    const value = String(url == null ? '' : url).trim();
    const internal = /^(#|\/(?!\/))/.test(value);
    const secure = /^https:\/\/[^\s]+$/i.test(value);
    return internal || secure ? value : '#';
  }

  /** Congela un objeto y todo lo que contiene (el modelo no se puede alterar). */
  function deepFreeze(obj) {
    Object.getOwnPropertyNames(obj).forEach(key => {
      const value = obj[key];
      if (value && typeof value === 'object' && !Object.isFrozen(value)) deepFreeze(value);
    });
    return Object.freeze(obj);
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  A.util = Object.freeze({ escapeHtml, rich, safeUrl, deepFreeze, prefersReducedMotion });
})(window.AndeSoft);
