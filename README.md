# AndeSoft — Sitio web corporativo (DEMO)

Sitio estático de una página para una empresa de servicios informáticos.
Sin frameworks ni dependencias: HTML + CSS + JavaScript puro, fácil de leer,
de hospedar en cualquier lugar y con superficie de ataque mínima.

## Estructura

```
andesoft/
├─ public/                  ← ÚNICA carpeta que se publica en el servidor
│  ├─ index.html            Esqueleto, SEO y política de seguridad (CSP)
│  ├─ robots.txt · sitemap.xml
│  ├─ estilos/              CSS por módulo (base → componentes → secciones…)
│  └─ assets/
│     ├─ *.webp · logo · favicon · og-image.jpg · logos/
│     └─ js/
│        ├─ core/           namespace, utils de seguridad, íconos
│        ├─ config.js       ← lo único que cambia entre DEMO y producción
│        ├─ models/site.js  ← TODO el contenido (textos, servicios, FAQ…)
│        ├─ services/       acceso a red (solo el envío de formularios)
│        ├─ views/          una plantilla por sección → devuelve HTML
│        ├─ behaviors/      interacción: menú, animaciones, formularios…
│        └─ main.js         arma la página (LAYOUT) y activa comportamientos
├─ servidor/                Encabezados de seguridad (Netlify/CF, Apache, nginx)
├─ tools/verificar.js       Revisión automática del proyecto
├─ SEGURIDAD.md             Qué está protegido y qué debe hacer el servidor
└─ README.md
```

> Publica **solo `public/`**. Nada de `servidor/`, `tools/` ni los `.md`.

## Ver el sitio en tu computador

```bash
python3 -m http.server -d public 8000      # luego abre http://localhost:8000
```
(También funciona abriendo `public/index.html` con doble clic.)

## Tareas comunes

| Quiero… | Qué hago |
|---|---|
| Cambiar un texto | Edita `models/site.js`. Formato: `{{palabra}}` destaca, `\n` salta de línea. **No escribas HTML ahí.** |
| Agregar un servicio | Añade un objeto a `services.items` (con un `id` único en minúsculas). Aparece solo en tarjetas, menú y formularios. |
| Agregar una pregunta frecuente | Añade `{ q, a }` a `faq.items`. |
| Agregar un logo al stack | Copia el `.svg` a `assets/logos/` y añade `{ img, label }` a `stack.logos`. |
| Agregar una sección nueva | 1) `views/<nombre>.js`  2) agrégala a `LAYOUT.main` en `main.js`  3) `<script>` en `index.html`  4) su CSS en `estilos/` + `<link>`. |
| Quitar una sección | Haz lo inverso (y borra su archivo). |
| Agregar un ícono | Añádelo a `UI` en `core/icons.js` y úsalo por nombre desde el modelo. |
| Cambiar colores / tipografías | Edita los tokens `:root` de `estilos/base.css`. |
| Conectar el formulario | Ver "Pasar de DEMO a producción". |

## Pasar de DEMO a producción

1. Tener correo/servidor definitivo y un **endpoint https** que reciba el formulario (ver requisitos en `SEGURIDAD.md`).
2. Poner la URL en `config.js → formEndpoint` y agregarla a `connect-src` del CSP (en `index.html` **y** en `servidor/*`).
3. Cambiar el dominio `www.andesoft.cl` en `index.html`, `robots.txt` y `sitemap.xml` si es distinto.
4. Copiar el archivo de `servidor/` que corresponda a tu hosting.
5. Ejecutar `node tools/verificar.js` y revisar `SEGURIDAD.md → Lista antes de publicar`.

Mientras `formEndpoint` esté vacío el sitio funciona en **modo demostración**: los formularios validan y
muestran un aviso, pero **no envían ningún dato**.

## Reglas para mantener el código limpio y seguro

1. Ningún dato llega a una plantilla sin `esc()` / `rich()` / `Number()` (`core/utils.js`).
2. `innerHTML` solo en `main.js`. Las vistas **devuelven texto**, no tocan el DOM.
3. Sin `onclick=`, `style="…"`, `<script>` inline ni `eval`: el CSP los bloquea.
4. Contenido en el modelo, estilos en CSS, lógica en `behaviors/`. Un archivo = una responsabilidad.
5. Sin `!important` ni scripts/estilos de terceros (salvo las tipografías ya contempladas).
6. Antes de cada despliegue: `node tools/verificar.js`.
