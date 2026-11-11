/* ============================================================
   Comportamiento: formularios (A.behaviors.forms)

   Capas de protección en el navegador (NINGUNA reemplaza al servidor,
   que debe validar, limitar tasa y verificar el origen de nuevo):
     1. Validación nativa (required, minlength, maxlength, type=email).
     2. Lista blanca de campos: solo viajan nombre, email, servicio, mensaje.
     3. Saneado: sin caracteres de control, recorte y límite de largo.
     4. El servicio debe ser una opción real del <select>.
     5. Señuelo (honeypot) + tiempo mínimo de llenado contra robots.
     6. Enfriamiento entre envíos y bloqueo de doble clic.
   Los mensajes al usuario son textos fijos: jamás se muestra contenido
   recibido del servidor.
   ============================================================ */
(function (A) {
  'use strict';

  const FIELDS = ['nombre', 'email', 'servicio', 'mensaje'];
  const MESSAGES = {
    sending: 'Enviando…',
    ok: '¡Gracias! Recibimos tu solicitud y te responderemos pronto.',
    demo: 'Modo demostración: el formulario aún no está conectado, no se envió ningún dato.',
    error: 'No pudimos enviar tu solicitud. Inténtalo de nuevo en unos minutos.',
    tooFast: 'Revisa tus datos y vuelve a enviar.',
    cooldown: 'Espera unos segundos antes de enviar otra solicitud.'
  };
  const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

  const states = new WeakMap();

  function setStatus(form, text, kind) {
    const el = form.querySelector('[data-form-status]');
    if (!el) return;
    el.textContent = text;
    el.dataset.state = kind || '';
  }

  /** Limpia un valor: sin caracteres de control, recortado y con largo máximo. */
  function clean(value, maxLength, multiline) {
    let text = String(value == null ? '' : value).replace(CONTROL_CHARS, '');
    if (!multiline) text = text.replace(/[\r\n]+/g, ' ');
    return text.trim().slice(0, maxLength || 200);
  }

  /** Construye el cuerpo a enviar: solo campos permitidos, ya saneados. */
  function buildPayload(form) {
    const payload = { origen: form.dataset.form === 'quick' ? 'cotizacion-rapida' : 'contacto' };
    FIELDS.forEach(name => {
      const control = form.elements[name];
      if (!control) return;
      const max = control.maxLength > 0 ? control.maxLength : 200;
      let value = clean(control.value, max, control.tagName === 'TEXTAREA');
      if (control.tagName === 'SELECT' && !Array.from(control.options).some(o => o.value === value)) value = '';
      payload[name] = value;
    });
    return payload;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const state = states.get(form);
    if (state.busy) return;
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const honeypot = form.elements.website;
    if (honeypot && honeypot.value) {            // robot: se simula éxito, no se envía nada
      setStatus(form, MESSAGES.ok, 'ok');
      return;
    }
    if (Date.now() - state.renderedAt < A.config.formMinFillMs) { setStatus(form, MESSAGES.tooFast, 'error'); return; }
    if (Date.now() < state.blockedUntil) { setStatus(form, MESSAGES.cooldown, 'error'); return; }

    const button = form.querySelector('button[type="submit"]');
    state.busy = true;
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    setStatus(form, MESSAGES.sending, '');

    const result = await A.services.contact.send(buildPayload(form));

    state.busy = false;
    button.disabled = false;
    form.removeAttribute('aria-busy');

    if (result.ok) {
      state.blockedUntil = Date.now() + A.config.formCooldownMs;
      form.reset();
      setStatus(form, result.demo ? MESSAGES.demo : MESSAGES.ok, 'ok');
    } else {
      setStatus(form, MESSAGES.error, 'error');
    }
  }

  A.behaviors.forms = {
    init(root) {
      root.querySelectorAll('form[data-form]').forEach(form => {
        states.set(form, { busy: false, renderedAt: Date.now(), blockedUntil: 0 });
        form.addEventListener('submit', onSubmit);
      });
    }
  };
})(window.AndeSoft);
