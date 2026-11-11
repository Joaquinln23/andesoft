/* ============================================================
   AndeSoft — Servicio de contacto (único punto que habla con la red)

   A.services.contact.send(payload) → Promise<{ ok, demo }>

   · Sin endpoint configurado → modo demo (no sale ningún dato).
   · Con endpoint → POST JSON hacia una URL https validada.
   Nunca se lee el cuerpo de la respuesta ni se inserta en la página:
   los mensajes que ve el usuario son siempre textos fijos del sitio.
   ============================================================ */
(function (A) {
  'use strict';

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  /** Acepta solo https (o http en localhost para desarrollo). */
  function resolveEndpoint(raw) {
    try {
      const url = new URL(raw, window.location.href);
      const local = url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname);
      return url.protocol === 'https:' || local ? url.href : null;
    } catch (_) {
      return null;
    }
  }

  async function send(payload) {
    const raw = A.config.formEndpoint;

    if (!raw) {                       // MODO DEMO
      await delay(500);
      return { ok: true, demo: true };
    }

    const endpoint = resolveEndpoint(raw);
    if (!endpoint) {
      console.error('[AndeSoft] formEndpoint inválido: debe ser una URL segura (https)');
      return { ok: false, demo: false };
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), A.config.formTimeoutMs);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'omit',          // nunca enviar cookies
        referrerPolicy: 'no-referrer',
        cache: 'no-store',
        redirect: 'error',            // no seguir redirecciones inesperadas
        signal: controller.signal
      });
      return { ok: response.ok, demo: false };
    } catch (_) {
      return { ok: false, demo: false };
    } finally {
      clearTimeout(timer);
    }
  }

  A.services.contact = Object.freeze({ send });
})(window.AndeSoft);
