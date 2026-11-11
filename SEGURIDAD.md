# Seguridad — AndeSoft

Un sitio estático tiene poca superficie de ataque, pero una empresa de servicios informáticos
es un blanco atractivo (bots, escaneos, defacement, phishing con su marca). Este documento separa
**lo que ya está resuelto en el código** de **lo que debe hacerse en el servidor y la cuenta**.

## 1) Ya implementado en el código

| Riesgo | Defensa |
|---|---|
| XSS (inyección de scripts) | Todo texto se escapa (`escapeHtml`, incluye comillas); `rich()` escapa antes de dar formato; `safeUrl()` bloquea `javascript:`/`data:`; el modelo no contiene HTML. |
| XSS aunque algo falle | **CSP estricta**: `script-src 'self'`, sin inline, `object-src 'none'`, `base-uri 'none'`, `form-action 'none'`. |
| Manipulación del código en caliente | `AndeSoft.model` y `AndeSoft.config` quedan **congelados** (`Object.freeze` profundo). |
| Clickjacking | `frame-ancestors 'none'` + `X-Frame-Options: DENY` (cabeceras de `servidor/`). |
| Spam y bots en formularios | Campo señuelo (honeypot), tiempo mínimo de llenado, enfriamiento entre envíos, bloqueo de doble clic. |
| Datos malformados | Lista blanca de campos, sin caracteres de control, límites de largo, servicio validado contra la lista real. |
| Fuga de datos al enviar | `credentials: 'omit'`, `referrerPolicy: 'no-referrer'`, solo https, tiempo máximo, sin seguir redirecciones. |
| Datos que "se pierden" por correo | Se eliminó el `mailto:` (exponía el correo a recolectores y dependía del cliente de correo). |
| Información sobre el servidor | Sin archivos ni rutas sensibles dentro de `public/`; `servidor/` y `tools/` quedan fuera. |
| Regresiones | `tools/verificar.js` falla si aparece `eval`, handlers inline, datos sin escapar, CSP desalineada, etc. |

## 2) Lo que NO puede hacer el navegador (y debe hacer el servidor)

El código del navegador **nunca** es una barrera de seguridad: cualquiera puede saltárselo. El endpoint
que reciba los formularios debe, sí o sí:

1. **Validar todo de nuevo**: tipos, largos (los mismos de `models/site.js`), lista blanca de campos y de `servicio`.
2. **Limitar tasa** por IP y global; rechazar cuerpos grandes (p. ej. > 10 KB).
3. **Verificar `Origin`/`Host`** y responder CORS solo para el dominio del sitio.
4. **CAPTCHA no intrusivo** (Cloudflare Turnstile o similar) si hay abuso. Requiere ajustar el CSP.
5. **Evitar inyección de cabeceras de correo**: nunca poner datos del usuario en `To/From/Subject` sin sanear saltos de línea.
6. **No reflejar** la entrada en respuestas HTML; responder JSON fijo.
7. **Registrar** intentos rechazados (sin guardar más datos personales de los necesarios).
8. Guardar secretos (claves SMTP/API) **solo** en variables de entorno del servidor, nunca en el repositorio ni en `public/`.

## 3) Infraestructura y cuentas

- **HTTPS obligatorio** + HSTS (ya incluido en `servidor/`). Cuando el dominio esté estable, evaluar HSTS *preload*.
- Aplicar los encabezados de `servidor/` y comprobarlos (securityheaders.com, Mozilla Observatory).
- **2FA** en: registrador del dominio, DNS, hosting, repositorio y correo de la empresa. Es la causa nº 1 de sitios secuestrados.
- DNS: activar **DNSSEC** y registros **CAA**.
- Cuando exista el **correo corporativo**: configurar **SPF, DKIM y DMARC** (evita que suplanten el dominio) y publicar `/.well-known/security.txt` con un contacto para reportes.
- Repositorio **privado**, rama protegida, sin secretos. Respaldos del repositorio y del DNS.
- Considerar un CDN/WAF delante (p. ej. Cloudflare) para DDoS y bots.
- Monitoreo de disponibilidad y vencimiento de dominio y certificado.

## 4) Terceros y privacidad

- **Tipografías de Google Fonts** es el único recurso externo. Antes de producción conviene **autoalojarlas**
  (descargar los `.woff2` a `assets/fonts/`, declarar `@font-face` y quitar `fonts.googleapis.com`/`fonts.gstatic.com` del CSP):
  mejora privacidad y velocidad, y elimina la dependencia.
- Al recopilar datos reales de personas, el sitio necesita una **política de privacidad** y revisar con asesoría
  legal las obligaciones de protección de datos personales aplicables. El aviso del formulario
  ("Usaremos tus datos solo para responder tu consulta") debe ser cierto en la práctica.
- Revisa que las afirmaciones comerciales del sitio (p. ej. "calidad garantizada", "equipo dedicado") sean ciertas para la empresa.

## 5) Lista antes de publicar

- [ ] `node tools/verificar.js` sin errores
- [ ] `formEndpoint` configurado y probado (o decidido mantener el demo)
- [ ] CSP actualizada con el endpoint, igual en `index.html` y en `servidor/*`
- [ ] Cabeceras activas en producción (comprobadas con una herramienta externa)
- [ ] 2FA en dominio, hosting, DNS y repositorio
- [ ] SPF/DKIM/DMARC listos (si ya hay correo corporativo)
- [ ] Política de privacidad publicada
- [ ] Solo `public/` desplegado
