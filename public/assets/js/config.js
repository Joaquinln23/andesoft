/* ============================================================
   AndeSoft — Configuración
   Lo único que cambia entre DEMO y producción vive aquí.
   El objeto queda congelado: nada en la página puede modificarlo.
   ============================================================ */
(function (A) {
  'use strict';

  A.config = Object.freeze({
    /*
     * Endpoint HTTPS que recibe los formularios (POST, JSON).
     *   ''  → MODO DEMO: el formulario valida y muestra el resultado,
     *         pero NO envía ningún dato a ninguna parte.
     * Cuando exista el correo/servidor de la empresa, pon aquí la URL
     * (debe ser https://). Recuerda añadirla a `connect-src` del CSP
     * (ver SEGURIDAD.md) o el navegador bloqueará el envío.
     */
    formEndpoint: '',

    // Antirrobots del formulario (el servidor SIEMPRE debe validar de nuevo).
    formMinFillMs: 1500,    // un humano no completa y envía en menos de esto
    formCooldownMs: 15000,  // espera mínima entre dos envíos del mismo formulario
    formTimeoutMs: 10000    // se cancela la petición si el servidor no responde
  });
})(window.AndeSoft);
