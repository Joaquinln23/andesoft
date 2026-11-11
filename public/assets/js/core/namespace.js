/* ============================================================
   AndeSoft — Espacio de nombres
   Es el ÚNICO objeto global del sitio. Todo lo demás cuelga de aquí
   (window.AndeSoft), así no se pisan nombres entre archivos y es fácil
   ver qué piezas existen.

   Cada archivo se registra a sí mismo:
     A.util / A.icons / A.config / A.model   → core y datos
     A.views.<nombre>      = function (model) { return 'HTML'; }
     A.behaviors.<nombre>  = { init(root) { … } }
     A.services.<nombre>   = { … }            → acceso a red
   El orden de carga está en public/index.html.
   ============================================================ */
(function (root) {
  'use strict';
  root.AndeSoft = { config: null, model: null, util: {}, icons: {}, views: {}, behaviors: {}, services: {} };
})(window);
