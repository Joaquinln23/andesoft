#!/usr/bin/env node
/* ============================================================
   AndeSoft — Verificador del proyecto (sin dependencias)
   Uso:  node tools/verificar.js        (desde la raíz del proyecto)

   Revisa en segundos que el sitio siga limpio y seguro después de
   cualquier cambio. Termina con código 1 si encuentra un problema,
   así puede usarse también en CI antes de publicar.
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const PUBLIC = path.join(__dirname, '..', 'public');
const problems = [];
const fail = (msg) => problems.push(msg);
const read = (file) => fs.readFileSync(file, 'utf8');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const rel = (file) => path.relative(PUBLIC, file);

const html = read(path.join(PUBLIC, 'index.html'));

// 1) Todo lo que index.html carga debe existir (y nada local sin cargar).
const refs = [...html.matchAll(/(?:src|href)="([^"#:]+?)"/g)].map(m => m[1])
  .filter(r => !/^(https?:|\/\/|mailto:)/.test(r));
refs.forEach(r => { if (!fs.existsSync(path.join(PUBLIC, r))) fail(`index.html referencia un archivo que no existe: ${r}`); });

const jsFiles = walk(path.join(PUBLIC, 'assets', 'js')).filter(f => f.endsWith('.js'));
jsFiles.forEach(f => {
  if (!html.includes(`assets/js/${path.relative(path.join(PUBLIC, 'assets', 'js'), f).replace(/\\/g, '/')}`)) {
    fail(`Script sin cargar en index.html (¿huérfano?): ${rel(f)}`);
  }
});
walk(path.join(PUBLIC, 'estilos')).filter(f => f.endsWith('.css')).forEach(f => {
  if (!html.includes(`estilos/${path.basename(f)}`)) fail(`CSS sin cargar en index.html (¿huérfano?): ${rel(f)}`);
});

// 2) Cada url() de los CSS apunta a un archivo real.
walk(path.join(PUBLIC, 'estilos')).filter(f => f.endsWith('.css')).forEach(f => {
  for (const m of read(f).matchAll(/url\(\s*['"]?(?!data:)([^'")]+)['"]?\s*\)/g)) {
    if (!fs.existsSync(path.resolve(path.dirname(f), m[1]))) fail(`${rel(f)}: url() inexistente → ${m[1]}`);
  }
  if (/!important/.test(read(f)) && path.basename(f) !== 'base.css') fail(`${rel(f)}: evita !important (solo permitido en la regla de movimiento reducido de base.css)`);
});

// 3) Sintaxis JS y patrones peligrosos.
const DANGEROUS = [
  [/\beval\s*\(/, 'eval()'],
  [/\bnew\s+Function\s*\(/, 'new Function()'],
  [/\bdocument\.write\s*\(/, 'document.write()'],
  [/\.(outerHTML|insertAdjacentHTML)\s*[=(]/, 'outerHTML / insertAdjacentHTML'],
  [/\bsetTimeout\s*\(\s*['"`]/, 'setTimeout con texto'],
  [/\bon[a-z]+\s*=\s*["']/i, 'manejador inline (onclick=, onerror=…)'],
  [/\sstyle\s*=\s*["']/, 'style="" inline (rompe el CSP)'],
  [/https?:\/\/(?!www\.andesoft\.cl|www\.w3\.org)/, 'URL externa dentro del JS (usa el modelo/config y ajusta el CSP)'],
  [/\b(localStorage|sessionStorage|document\.cookie)\b/, 'almacenamiento del navegador (no debe guardarse nada sensible)']
];
jsFiles.forEach(f => {
  const src = read(f);
  try { new vm.Script(src, { filename: f }); } catch (e) { fail(`${rel(f)}: error de sintaxis → ${e.message}`); }
  if (!/^\/\*[\s\S]*?\*\/\s*\(function|^\/\*[\s\S]*?\*\/\s*\n?\(function/.test(src)) fail(`${rel(f)}: debe ir envuelto en (function (A) { 'use strict'; … })(window.AndeSoft)`);
  if (!/'use strict'/.test(src)) fail(`${rel(f)}: falta 'use strict'`);
  const codeOnly = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const isIcons = f.endsWith('icons.js');
  DANGEROUS.forEach(([re, what]) => { if (!isIcons && re.test(codeOnly)) fail(`${rel(f)}: ${what}`); });
  if (/\.innerHTML\s*=/.test(codeOnly) && !f.endsWith('main.js')) fail(`${rel(f)}: innerHTML solo se permite en main.js (las vistas devuelven texto)`);
});

// 4) Vistas: ningún dato del modelo se interpola sin escapar.
//    Se permiten: esc()/rich()/Number()/llamadas a helpers, y variables locales
//    que ya contienen HTML armado con las funciones anteriores.
walk(path.join(PUBLIC, 'assets', 'js', 'views')).forEach(f => {
  const src = read(f).replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of src.matchAll(/\$\{([^}]+)\}/g)) {
    const expr = m[1].trim();
    if (expr.startsWith('A.icons.')) continue;   // SVG propio del proyecto, nunca datos
    if (/^[A-Za-z_$][\w$]*\.[\w$.]+$/.test(expr)) fail(`${rel(f)}: dato sin escapar en plantilla → \${${expr}} (usa esc(), rich() o Number())`);
  }
});

// 5) La página y las configuraciones de servidor comparten la misma CSP.
const cspMeta = (html.match(/Content-Security-Policy" content="([^"]+)"/) || [])[1];
if (!cspMeta) fail('index.html no tiene Content-Security-Policy');
else {
  const base = d => d.split(';').map(s => s.trim()).filter(Boolean)
    .filter(s => !/^(frame-ancestors|upgrade-insecure-requests)/.test(s)).sort().join(';');
  ['servidor/_headers', 'servidor/.htaccess', 'servidor/nginx.conf'].forEach(file => {
    const text = read(path.join(__dirname, '..', file));
    const m = text.match(/default-src[^"\n]+/);
    if (!m) fail(`${file}: no contiene la CSP`);
    else if (base(m[0]) !== base(cspMeta)) fail(`${file}: la CSP difiere de la de index.html (mantenlas iguales)`);
  });
}
if (/<script(?![^>]*(src=|type="application\/ld\+json"))[^>]*>/i.test(html)) fail('index.html contiene un <script> inline ejecutable (rompe el CSP)');
if (/\sstyle\s*=|\son[a-z]+\s*=/i.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) fail('index.html contiene atributos inline (style/on…)');

// 6) Peso de imágenes (rendimiento).
walk(path.join(PUBLIC, 'assets')).filter(f => /\.(webp|jpe?g|png)$/i.test(f)).forEach(f => {
  const kb = fs.statSync(f).size / 1024;
  if (kb > 400) fail(`${rel(f)} pesa ${Math.round(kb)} KB (comprime a WebP, máx. ~400 KB)`);
});

// ---- Resultado ----
if (problems.length) {
  console.error(`\n✗ ${problems.length} problema(s):\n` + problems.map(p => '  • ' + p).join('\n') + '\n');
  process.exit(1);
}
console.log(`✓ Todo en orden: ${jsFiles.length} scripts, CSS, CSP y plantillas verificados.`);
