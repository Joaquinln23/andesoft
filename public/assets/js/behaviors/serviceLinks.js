/* ============================================================
   Comportamiento: preselecciona el servicio en los formularios
   (A.behaviors.serviceLinks)
   Cualquier enlace con data-service="<id>" elige ese servicio.
   Solo acepta ids que existan como opción real del <select>.
   ============================================================ */
(function (A) {
  'use strict';

  A.behaviors.serviceLinks = {
    init(root) {
      root.addEventListener('click', e => {
        const link = e.target.closest('[data-service]');
        if (!link) return;
        const id = link.getAttribute('data-service');
        root.querySelectorAll('select[data-service-select]').forEach(select => {
          if (Array.from(select.options).some(o => o.value === id)) select.value = id;
        });
      });
    }
  };
})(window.AndeSoft);
