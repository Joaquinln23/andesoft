/* ============================================================
   AndeSoft — Arranque (controlador)
   Arma la página con las vistas y activa los comportamientos.

   CÓMO AGREGAR / QUITAR UNA SECCIÓN
     1. Crea views/<nombre>.js  (A.views.<nombre> = model => 'HTML').
     2. Agrega <nombre> a LAYOUT.main (el orden aquí es el orden en pantalla).
     3. Incluye el <script> en public/index.html y su CSS en estilos/.
   Para quitarla, haz lo inverso. Un error en una sección no tumba el resto.
   ============================================================ */
(function (A) {
  'use strict';

  const LAYOUT = {
    header: ['nav'],
    main: ['hero', 'services', 'about', 'process', 'stack', 'faq', 'contact'],
    footer: ['footer']
  };
  const BEHAVIORS = ['nav', 'reveal', 'marquee', 'serviceLinks', 'forms'];

  function renderGroup(names) {
    return names.map(name => {
      try {
        return A.views[name](A.model);
      } catch (error) {
        console.error(`[AndeSoft] No se pudo dibujar la vista "${name}"`, error);
        return '';
      }
    }).join('');
  }

  function boot() {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML =
      renderGroup(LAYOUT.header) +
      `<main id="contenido" tabindex="-1">${renderGroup(LAYOUT.main)}</main>` +
      renderGroup(LAYOUT.footer);

    BEHAVIORS.forEach(name => {
      try {
        A.behaviors[name].init(app);
      } catch (error) {
        console.error(`[AndeSoft] Falló el comportamiento "${name}"`, error);
      }
    });
  }

  boot();   // los scripts llevan `defer`: el DOM ya está listo
})(window.AndeSoft);
