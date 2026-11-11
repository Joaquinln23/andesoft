/* ============================================================
   AndeSoft — Íconos SVG (única fuente de íconos del sitio)

   A.icons.ui(nombre, tamaño?)  Íconos de línea. Heredan el color del
                                texto (currentColor); se les da tamaño con
                                el 2.º argumento o desde CSS.
   A.icons.service[id]          Íconos grandes de colores de cada servicio.
   A.icons.trust[id]            Íconos de los sellos de confianza (Nosotros).
   A.icons.decor.rocket         Ícono decorativo de la barra CTA.

   Para agregar un ícono: súmalo a UI (o al grupo que corresponda) y
   úsalo por su nombre desde el modelo. No pegues SVG dentro de las vistas.
   Todo el contenido de este archivo es código propio (nunca datos del
   usuario), por eso puede contener marcado SVG.
   ============================================================ */
(function (A) {
  'use strict';

  const UI = {
    pin: '<path d="M12 21.5s-7-5.7-7-11.5a7 7 0 1 1 14 0c0 5.8-7 11.5-7 11.5Z"/><circle cx="12" cy="10" r="2.6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.9-3.4 3.7-5.4 7-5.4s6.1 2 7 5.4"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5"/>',
    briefcase: '<rect x="3" y="7.5" width="18" height="12" rx="2.5"/><path d="M9 7.5V6.2A2.2 2.2 0 0 1 11.2 4h1.6A2.2 2.2 0 0 1 15 6.2v1.3"/><path d="M3 12.5h18"/>',
    chat: '<path d="M21 12c0 4-4 7.2-9 7.2-1.1 0-2.2-.15-3.2-.45L4.5 20.5l1.3-3.4C4.4 15.9 3 14.05 3 12c0-4 4-7.2 9-7.2s9 3.2 9 7.2Z"/><path d="M8.5 11.5h7M8.5 14.5h4.5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    code: '<path d="m8 8-5 4 5 4"/><path d="m16 8 5 4-5 4"/><path d="m14 5-4 14"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7Z"/>',
    shieldCheck: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9s1.3-6.3 3.8-9Z"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    playCircle: '<circle cx="12" cy="12" r="10" fill="#4F86F7" stroke="none"/><path d="m10 8 6 4-6 4Z" fill="#fff" stroke="none"/>'
  };

  function ui(name, size) {
    const body = UI[name];
    if (!body) return '';
    const dim = size ? ` width="${size}" height="${size}"` : '';
    return `<svg${dim} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
  }

  const SERVICE = {
    web: `
      <svg viewBox="0 0 96 96" fill="none" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="svc-web-line" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD8FF"/><stop offset="1" stop-color="#3B82F6"/></linearGradient>
          <radialGradient id="svc-web-plat" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#5ED0FF" stop-opacity=".85"/><stop offset="1" stop-color="#5ED0FF" stop-opacity="0"/></radialGradient>
        </defs>
        <ellipse cx="48" cy="80" rx="33" ry="8" fill="url(#svc-web-plat)"/>
        <rect x="21" y="17" width="54" height="37" rx="4" stroke="url(#svc-web-line)" stroke-width="3" fill="rgba(59,130,246,.14)"/>
        <path d="M11 66 L19 55 H77 L85 66 Z" stroke="url(#svc-web-line)" stroke-width="3" stroke-linejoin="round" fill="rgba(59,130,246,.2)"/>
        <path d="M41 29 L33 35.5 L41 42 M55 29 L63 35.5 L55 42" stroke="#8FD8FF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    mobile: `
      <svg viewBox="0 0 96 96" fill="none" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="svc-mob-line" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD8FF"/><stop offset="1" stop-color="#3B82F6"/></linearGradient>
          <radialGradient id="svc-mob-plat" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#5ED0FF" stop-opacity=".85"/><stop offset="1" stop-color="#5ED0FF" stop-opacity="0"/></radialGradient>
        </defs>
        <ellipse cx="48" cy="80" rx="33" ry="8" fill="url(#svc-mob-plat)"/>
        <rect x="16" y="12" width="34" height="58" rx="6" stroke="url(#svc-mob-line)" stroke-width="3" fill="rgba(59,130,246,.14)"/>
        <rect x="23.5" y="27" width="19" height="29" rx="1.5" stroke="#8FD8FF" stroke-width="2" opacity=".9"/>
        <g fill="#8FD8FF"><rect x="26.5" y="31" width="3.4" height="3.4" rx=".8"/><rect x="32.8" y="31" width="3.4" height="3.4" rx=".8"/><rect x="39.1" y="31" width="3.4" height="3.4" rx=".8"/><rect x="26.5" y="39" width="3.4" height="3.4" rx=".8"/><rect x="32.8" y="39" width="3.4" height="3.4" rx=".8"/><rect x="39.1" y="39" width="3.4" height="3.4" rx=".8"/><rect x="26.5" y="47" width="3.4" height="3.4" rx=".8"/><rect x="32.8" y="47" width="3.4" height="3.4" rx=".8"/><rect x="39.1" y="47" width="3.4" height="3.4" rx=".8"/></g>
        <rect x="55" y="30" width="25" height="41" rx="5" stroke="url(#svc-mob-line)" stroke-width="3" fill="rgba(59,130,246,.2)"/>
        <rect x="61" y="41" width="13" height="19" rx="1.5" stroke="#8FD8FF" stroke-width="1.8" opacity=".9"/>
      </svg>`,
    ai: `
      <svg viewBox="0 0 96 96" fill="none" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="svc-ai-line" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD8FF"/><stop offset="1" stop-color="#3B82F6"/></linearGradient>
          <radialGradient id="svc-ai-plat" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#5ED0FF" stop-opacity=".85"/><stop offset="1" stop-color="#5ED0FF" stop-opacity="0"/></radialGradient>
        </defs>
        <ellipse cx="48" cy="80" rx="33" ry="8" fill="url(#svc-ai-plat)"/>
        <path d="M26 47a12.5 12.5 0 0 1 4.5-24 14.5 14.5 0 0 1 28 4.5A10.5 10.5 0 0 1 60 47z" stroke="url(#svc-ai-line)" stroke-width="3" stroke-linejoin="round" fill="rgba(59,130,246,.16)"/>
        <ellipse cx="65" cy="28" rx="12.5" ry="5" stroke="url(#svc-ai-line)" stroke-width="2.6" fill="rgba(59,130,246,.25)"/>
        <path d="M52.5 28 V55 c0 2.8 5.6 5 12.5 5 s12.5 -2.2 12.5 -5 V28" stroke="url(#svc-ai-line)" stroke-width="2.6" fill="rgba(59,130,246,.1)"/>
        <path d="M52.5 41.5 c0 2.8 5.6 5 12.5 5 s12.5 -2.2 12.5 -5" stroke="url(#svc-ai-line)" stroke-width="2.2" opacity=".85"/>
        <path d="M35 31.5v6M32 34.5h6" stroke="#8FD8FF" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    shield: `
      <svg viewBox="0 0 96 96" fill="none" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="svc-sh-line" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD8FF"/><stop offset="1" stop-color="#3B82F6"/></linearGradient>
          <radialGradient id="svc-sh-plat" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#5ED0FF" stop-opacity=".85"/><stop offset="1" stop-color="#5ED0FF" stop-opacity="0"/></radialGradient>
        </defs>
        <ellipse cx="48" cy="80" rx="33" ry="8" fill="url(#svc-sh-plat)"/>
        <path d="M48 9 L73 19 V44 C73 62.5 63 73 48 83 C33 73 23 62.5 23 44 V19 Z" stroke="url(#svc-sh-line)" stroke-width="3" stroke-linejoin="round" fill="rgba(59,130,246,.15)"/>
        <rect x="37" y="43" width="22" height="17" rx="3" stroke="#8FD8FF" stroke-width="2.6" fill="rgba(143,216,255,.15)"/>
        <path d="M42 43 v-5 a6 6 0 0 1 12 0 v5" stroke="#8FD8FF" stroke-width="2.6" stroke-linecap="round"/>
        <circle cx="48" cy="51.5" r="1.9" fill="#8FD8FF"/>
      </svg>`,
    gears: `
      <svg viewBox="0 0 96 96" fill="none" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="svc-gear-line" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD8FF"/><stop offset="1" stop-color="#3B82F6"/></linearGradient>
          <radialGradient id="svc-gear-plat" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#5ED0FF" stop-opacity=".85"/><stop offset="1" stop-color="#5ED0FF" stop-opacity="0"/></radialGradient>
        </defs>
        <ellipse cx="48" cy="80" rx="33" ry="8" fill="url(#svc-gear-plat)"/>
        <g stroke="url(#svc-gear-line)" stroke-width="7" stroke-dasharray="5.2 5.28"><circle cx="37" cy="47" r="14"/></g>
        <circle cx="37" cy="47" r="5.5" stroke="#8FD8FF" stroke-width="2.6" fill="rgba(59,130,246,.2)"/>
        <g stroke="url(#svc-gear-line)" stroke-width="6" stroke-dasharray="4.4 4.47"><circle cx="66" cy="25" r="11"/></g>
        <circle cx="66" cy="25" r="4.3" stroke="#8FD8FF" stroke-width="2.2" fill="rgba(59,130,246,.2)"/>
      </svg>`,
    cloud: `
      <svg viewBox="0 0 96 96" fill="none" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="svc-cloud-line" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD8FF"/><stop offset="1" stop-color="#3B82F6"/></linearGradient>
          <radialGradient id="svc-cloud-plat" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#5ED0FF" stop-opacity=".85"/><stop offset="1" stop-color="#5ED0FF" stop-opacity="0"/></radialGradient>
        </defs>
        <ellipse cx="48" cy="80" rx="33" ry="8" fill="url(#svc-cloud-plat)"/>
        <path d="M22 62 a14.5 14.5 0 0 1 5-28.5 16.5 16.5 0 0 1 32 5.5A12 12 0 0 1 67 62z" stroke="url(#svc-cloud-line)" stroke-width="3" stroke-linejoin="round" fill="rgba(59,130,246,.16)"/>
        <path d="M45 56 V33 M38 41 L45 33 L52 41" stroke="#8FD8FF" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
  };

  const TRUST = {
    shield: `
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs><linearGradient id="ab-shield" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD8FF"/><stop offset="1" stop-color="#3B82F6"/></linearGradient></defs>
        <path d="M20 4 L31 8.5 V20 C31 27.5 26 32 20 35.5 C14 32 9 27.5 9 20 V8.5 Z" stroke="url(#ab-shield)" stroke-width="2.4" stroke-linejoin="round" fill="rgba(59,130,246,.14)"/>
        <path d="M15.5 20 L18.5 23 L25 16" stroke="#8FD8FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    bolt: `
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs><linearGradient id="ab-bolt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD8FF"/><stop offset="1" stop-color="#3B82F6"/></linearGradient></defs>
        <path d="M22.5 3 L11 22 H19 L17.5 37 L29 18 H21 Z" stroke="url(#ab-bolt)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" fill="rgba(59,130,246,.14)"/>
      </svg>`,
    headphones: `
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs><linearGradient id="ab-head" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD8FF"/><stop offset="1" stop-color="#3B82F6"/></linearGradient></defs>
        <path d="M8 24 V21 a12 12 0 0 1 24 0 v3" stroke="url(#ab-head)" stroke-width="2.4" stroke-linecap="round"/>
        <rect x="6" y="22.5" width="7" height="10" rx="3" stroke="url(#ab-head)" stroke-width="2.2" fill="rgba(59,130,246,.18)"/>
        <rect x="27" y="22.5" width="7" height="10" rx="3" stroke="url(#ab-head)" stroke-width="2.2" fill="rgba(59,130,246,.18)"/>
        <path d="M29.5 32.5 c0 2.5 -1.5 3.8 -4 4" stroke="#8FD8FF" stroke-width="2" stroke-linecap="round"/>
      </svg>`
  };

  A.icons = Object.freeze({
    ui,
    service: Object.freeze(SERVICE),
    trust: Object.freeze(TRUST),
    decor: Object.freeze({ rocket: `
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
        <path d="M9 39c4-1.5 6.5-2 10-3.5M30.5 6.5c5 1 8 4 9 9-4 9.5-12 16-24 20l-4.5 1.5L10 32.5C14 20.5 21 12 30.5 6.5z" stroke="#6FB3FF" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="31.5" cy="16.5" r="4" stroke="#8FD8FF" stroke-width="2"/>
      </svg>` })
  });
})(window.AndeSoft);
