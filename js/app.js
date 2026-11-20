/* =========================================================
   STGONJPARFUMS · motor del estante 3D
   Un solo bucle requestAnimationFrame + Web Animations API.
   ========================================================= */
(() => {
'use strict';

/* ---------- datos editables ---------- */
const WA = '573207620558';
const IMG = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=720&h=1368&q=80`;

// precio en pesos colombianos (precio de referencia, por validar)
const P = [
  { lomo:'Sauvage', nombre:'Sauvage', casa:'Dior', corta:'DIOR', tipo:'Eau de Parfum', sigla:'EDP', ml:'100 ML', genero:'Hombre', familia:'Ámbar fougère', precio:459000, img:'1747916148863-7164d8920b57', caja:'#16243F', tinta:'#E8ECF4',
    desc:'Fresco, especiado y con carácter. El aroma que se nota apenas entras.', salida:'Bergamota de Calabria, pimienta', corazon:'Lavanda, anís estrellado, nuez moscada', fondo:'Ambroxan, vainilla' },
  { lomo:'Bleu de Chanel', nombre:'Bleu de Chanel', casa:'Chanel', corta:'CHANEL', tipo:'Eau de Parfum', sigla:'EDP', ml:'100 ML', genero:'Hombre', familia:'Amaderada aromática', precio:529000, img:'1523293182086-7651a899d37f', caja:'#0E1630', tinta:'#C9D2E6',
    desc:'Elegante sin esfuerzo: cítricos limpios sobre maderas e incienso.', salida:'Pomelo, limón, menta', corazon:'Jengibre, nuez moscada, jazmín', fondo:'Incienso, cedro, sándalo' },
  { lomo:'1 Million', nombre:'1 Million', casa:'Paco Rabanne', corta:'RABANNE', tipo:'Eau de Toilette', sigla:'EDT', ml:'100 ML', genero:'Hombre', familia:'Cuero especiado', precio:329000, img:'1633072437275-ec3344b4b966', caja:'#B38B3F', tinta:'#1A1408',
    desc:'Dulce, especiado y seductor. Para las noches que quieres que te recuerden.', salida:'Pomelo, menta, mandarina', corazon:'Canela, rosa, especias', fondo:'Cuero, ámbar, pachulí' },
  { lomo:'Eros', nombre:'Eros', casa:'Versace', corta:'VERSACE', tipo:'Eau de Toilette', sigla:'EDT', ml:'100 ML', genero:'Hombre', familia:'Aromática fougère', precio:289000, img:'1587017539504-67cfbddac569', caja:'#0F6E72', tinta:'#EAF6F4',
    desc:'Menta, vainilla y haba tonka: intenso, juvenil y de los que más preguntan.', salida:'Menta, manzana verde, limón', corazon:'Haba tonka, ambroxan, geranio', fondo:'Vainilla, cedro, vetiver' },
  { lomo:'Acqua di Giò', nombre:'Acqua di Giò', casa:'Giorgio Armani', corta:'ARMANI', tipo:'Eau de Parfum', sigla:'EDP', ml:'100 ML', genero:'Hombre', familia:'Aromática acuática', precio:389000, img:'1759794108389-132d8bb4e87a', caja:'#E8E2D6', tinta:'#1B2B3A',
    desc:'El mar en un frasco, ahora más profundo. Fresco para todos los días.', salida:'Notas marinas, bergamota', corazon:'Salvia, romero', fondo:'Vetiver, pachulí, incienso' },
  { lomo:'Le Male', nombre:'Le Male Le Parfum', casa:'Jean Paul Gaultier', corta:'GAULTIER', tipo:'Eau de Parfum Intense', sigla:'EDP', ml:'125 ML', genero:'Hombre', familia:'Oriental amaderada', precio:389000, img:'1681935703733-5e9df028a318', caja:'#1E3A8A', tinta:'#F2F4FA',
    desc:'Lavanda y vainilla en versión intensa. Cálido, cercano y muy masculino.', salida:'Cardamomo', corazon:'Lavanda, iris', fondo:'Vainilla, maderas' },
  { lomo:'Y', nombre:'Y', casa:'Yves Saint Laurent', corta:'YSL', tipo:'Eau de Parfum', sigla:'EDP', ml:'100 ML', genero:'Hombre', familia:'Aromática fougère', precio:449000, img:'1761845047498-56827f416735', caja:'#121212', tinta:'#EDEDED',
    desc:'Fresco y moderno, con un fondo ambarado que acompaña todo el día.', salida:'Manzana, jengibre, bergamota', corazon:'Salvia, enebro, geranio', fondo:'Haba tonka, ámbar, cedro' },
  { lomo:'Ombré Leather', nombre:'Ombré Leather', casa:'Tom Ford', corta:'TOM FORD', tipo:'Eau de Parfum', sigla:'EDP', ml:'100 ML', genero:'Unisex', familia:'Cuero', precio:689000, img:'1654617058572-f1f473581778', caja:'#2A1E17', tinta:'#E6D5BF',
    desc:'Cuero suave y especias. Un clásico de nicho para él o para ella.', salida:'Cardamomo', corazon:'Cuero, jazmín sambac', fondo:'Ámbar, musgo, pachulí' },
  { lomo:'N°5', nombre:'N°5', casa:'Chanel', corta:'CHANEL', tipo:'Eau de Parfum', sigla:'EDP', ml:'100 ML', genero:'Mujer', familia:'Floral aldehídica', precio:589000, img:'1541643600914-78b084683601', caja:'#F4F1EB', tinta:'#141210',
    desc:'Un ícono de la perfumería: floral, limpio y atemporal.', salida:'Aldehídos, neroli, ylang-ylang', corazon:'Rosa de mayo, jazmín, iris', fondo:'Sándalo, vainilla, vetiver' },
  { lomo:'Coco Mademoiselle', nombre:'Coco Mademoiselle', casa:'Chanel', corta:'CHANEL', tipo:'Eau de Parfum', sigla:'EDP', ml:'100 ML', genero:'Mujer', familia:'Chipre floral', precio:579000, img:'1708733145706-82da0d0596e9', caja:'#E9CFC4', tinta:'#3A1E18',
    desc:'Fresca, oriental y segura de sí misma. Para el día y para la noche.', salida:'Naranja, bergamota', corazon:'Rosa, jazmín, lichi', fondo:'Pachulí, vetiver, vainilla' },
  { lomo:'La Vie Est Belle', nombre:'La Vie Est Belle', casa:'Lancôme', corta:'LANCÔME', tipo:'Eau de Parfum', sigla:'EDP', ml:'100 ML', genero:'Mujer', familia:'Floral gourmand', precio:419000, img:'1613521140785-e85e427f8002', caja:'#E6BFC3', tinta:'#3A1A22',
    desc:'Dulce y luminoso, con praliné y vainilla. La alegría hecha perfume.', salida:'Grosella negra, pera', corazon:'Iris, jazmín, azahar', fondo:'Praliné, vainilla, pachulí' },
  { lomo:'Miss Dior', nombre:'Miss Dior Blooming Bouquet', casa:'Dior', corta:'DIOR', tipo:'Eau de Toilette', sigla:'EDT', ml:'100 ML', genero:'Mujer', familia:'Floral fresca', precio:429000, img:'1761937841527-fac9281e53fa', caja:'#EFE0E3', tinta:'#3B2A2E',
    desc:'Floral, ligero y tierno. Peonía y rosa para todos los días.', salida:'Bergamota, mandarina', corazon:'Peonía, rosa de Damasco', fondo:'Almizcle blanco' },
  { lomo:'Libre', nombre:'Libre', casa:'Yves Saint Laurent', corta:'YSL', tipo:'Eau de Parfum', sigla:'EDP', ml:'90 ML', genero:'Mujer', familia:'Floral fougère', precio:489000, img:'1723391962154-8a2b6299bc09', caja:'#1A1714', tinta:'#D4AF6A',
    desc:'Lavanda francesa y azahar con un toque de vainilla. Libertad en un frasco.', salida:'Lavanda, mandarina, grosella negra', corazon:'Azahar, jazmín', fondo:'Vainilla, almizcle, cedro' },
  { lomo:'Light Blue', nombre:'Light Blue Eau Intense', casa:'Dolce & Gabbana', corta:'D&G', tipo:'Eau de Parfum', sigla:'EDP', ml:'100 ML', genero:'Mujer', familia:'Floral acuática', precio:399000, img:'1720414913669-87031493d7c9', caja:'#A9CFEA', tinta:'#10283D',
    desc:'Cítricos y manzana verde sobre un fondo cálido. El verano que no se acaba.', salida:'Limón, manzana verde', corazon:'Jazmín, flor de marina', fondo:'Ámbar, almizcle' },
];
const START = 0;           // abre en Sauvage

/* ---------- utilidades ---------- */
const N = P.length, COPIES = 3, TOTAL = N * COPIES;
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(pointer:fine)').matches;
const EASE = 'cubic-bezier(.2,.8,.2,1)', SHEET_EASE = 'cubic-bezier(.76,0,.18,1)';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const mod = (a, n) => ((a % n) + n) % n;
const smooth = x => x * x * (3 - 2 * x);
const fmt = n => '$' + n.toLocaleString('es-CO');
const waLink = msg => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const stage = $('.stage'), shelf = $('.shelf'), play = $('.play'), cursor = $('.cursor');
const capTitle = $('.cap-title'), capSub = $('.cap-sub'), capPrice = $('.cap-price');
const tabs = $$('.tab'), ind = $('.tabs-ind');
const detail = $('.detail'), envios = $('.envios');
const wa = $('.wa'), waFab = $('.wa-fab'), waRing = $('.wa-ring');
const intro = $('.intro'), sndBtn = $('.snd'), curLbl = $('.cur-lbl');
const store = {
  get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
  set(key, v) { try { localStorage.setItem(key, v); } catch (e) { /* sin almacenamiento */ } }
};
// mientras una capa está abierta, lo de atrás no recibe foco ni clics
const setInert = keep => $$('body > *').forEach(el => {
  if (el.tagName === 'SCRIPT' || el.matches('.wa,.cursor,.vapor,.grain')) return;
  el.inert = !!keep && el !== keep;
});

P.forEach(p => { const i = new Image(); i.src = IMG(p.img); });

/* ---------- construir las cajas (3 copias para el estante infinito) ---------- */
const tapes = [];
for (let c = 0; c < COPIES; c++) for (let i = 0; i < N; i++) {
  const p = P[i], v = c * N + i;
  const el = document.createElement('div');
  el.className = 'tape';
  el.style.setProperty('--box', p.caja);
  el.style.setProperty('--ink2', p.tinta);
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', `${p.nombre} de ${p.casa}, ${fmt(p.precio)}`);
  const fs = p.lomo.length > 11 ? Math.max(.6, 11 / p.lomo.length) : 1;
  el.innerHTML =
    `<div class="face sp" style="--fs:${fs}"><span class="sp-n">${String(i + 1).padStart(2, '0')}</span>` +
    `<span class="sp-t">${p.lomo}</span><span class="sp-b">${p.corta}</span><span class="sp-ml">${p.sigla}</span></div>` +
    `<div class="face cv"><div class="cv-img" style="background-image:url('${IMG(p.img)}')"></div>` +
    `<span class="cv-tag">STGONJPARFUMS</span><span class="cv-ml">${p.ml}</span>` +
    `<div class="cv-band"><span class="cv-name">${p.nombre}</span><span class="cv-house">${p.casa} · ${p.sigla}</span></div></div>`;
  el._v = v;
  stage.appendChild(el);
  tapes.push({ el, sp: el.children[0], cv: el.children[1], r: 0, hidden: false, lift: 0 });
  el.addEventListener('pointerenter', () => { hover = v; });
  el.addEventListener('pointerleave', () => { if (hover === v) hover = -1; });
  el.addEventListener('click', () => {
    if (suppress || openSheet) return;
    const r = tapes[v].r;
    if (Math.abs(r) < .5) openDetail();
    else T = Math.round(T + r);
  });
}

/* ---------- geometría ---------- */
let H, ws, d, gap, W, VH, CY;
const tagline = $('.tagline'), tabsEl = $('.tabs'), capEl = $('.caption'), footEl = $('.foot'), arrows = $$('.arrow');
const place = (el, y) => { el.style.top = Math.round(y) + 'px'; el.style.bottom = 'auto'; };
// reparte la pantalla con el alto visible real (en iPhone las barras de Safari lo reducen)
function measure() {
  W = innerWidth; VH = innerHeight;
  tagline.style.display = '';
  if (W >= 768) {
    H = Math.min(VH * .46, W * .31); CY = VH / 2;
    place(tagline, CY - H / 2 - 118 - tagline.offsetHeight);
    place(tabsEl, CY - H / 2 - 86);
    place(capEl, CY + H / 2 + 30);
    arrows.forEach(a => place(a, CY + H / 2 + 40));
    wa.style.bottom = '';
  } else {
    // el pie ya incluye la zona segura de la barra de inicio del iPhone
    const topH = 64, tabsH = 23, capH = 84, fabH = 88, footH = VH - footEl.getBoundingClientRect().top;
    let tagH = tagline.offsetHeight + 12;
    const rest = () => topH + 12 + tagH + tabsH + 30 + 22 + capH + 10 + fabH + footH;
    // en pantallas muy bajas la frase cede su lugar al estante
    if (VH - rest() < 190) { tagline.style.display = 'none'; tagH = 0; }
    H = Math.max(150, Math.min(W * .6, VH - rest(), 330));
    const stack = tagH + tabsH + 30 + H + 22 + capH;
    let y = topH + Math.max(12, (VH - topH - fabH - footH - 10 - stack) * .45);
    if (tagH) { place(tagline, y); y += tagH; }
    place(tabsEl, y); y += tabsH + 30;
    CY = y + H / 2;
    place(capEl, CY + H / 2 + 22);
    arrows.forEach(a => place(a, CY - 22));
    wa.style.bottom = footH + 16 + 'px';
  }
  document.documentElement.style.setProperty('--H', H + 'px');
  document.documentElement.style.setProperty('--cy', CY + 'px');
  ws = H * 142 / 840; d = H * 474 / 900; gap = H * .03;
  stage.style.setProperty('--ws', ws + 'px');
  stage.style.setProperty('--d', d + 'px');
}
const B = r => Math.abs(r) < 1 ? (r + Math.sin(Math.PI * r) / Math.PI) / 2 : Math.sign(r) * .5;
const F = r => r * (ws + gap) + (d - ws + 1.6 * gap) * B(r);

/* ---------- estado ---------- */
let T = N + START, s = RM ? T : T - 7;   // al cargar, el estante llega deslizándose
let hover = -1, active = -1;
let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
let tiltX = 0, tiltY = 0, onCover = false;
let dragging = false, down = null, suppress = false;
let openSheet = null, sheetBack = null;
let lastTarget = null, curState = '', ringA = 0;
let introOn = false, soundOn = false, puffFor = -1;

/* ---------- pie del estante: el texto cruza su máscara ---------- */
function swap(m, html, dir) {
  if (RM || !m.firstChild) { m.innerHTML = ''; const sp = document.createElement('span'); sp.innerHTML = html; m.appendChild(sp); return; }
  const n = document.createElement('span');
  n.innerHTML = html;
  m.appendChild(n);
  n.animate([{ transform: `translateY(${dir * 105}%)` }, { transform: 'translateY(0)' }], { duration: 650, easing: EASE, fill: 'both' });
  [...m.children].forEach(c => {
    if (c === n || c._leaving) return;
    c._leaving = true;
    const cur = getComputedStyle(c).transform;
    c.animate([{ transform: cur === 'none' ? 'translateY(0)' : cur }, { transform: `translateY(${-dir * 105}%)` }],
      { duration: 650, easing: EASE, fill: 'both' }).onfinish = () => c.remove();
  });
}
function setTab(cat) {
  const b = tabs.find(t => t.dataset.cat === cat);
  tabs.forEach(t => t.classList.toggle('on', t === b));
  if (!b) return;
  ind.style.width = b.offsetWidth + 'px';
  ind.style.transform = `translateX(${b.offsetLeft}px)`;
}
function setActive(a, dir) {
  active = a;
  const p = P[a];
  swap(capTitle, p.nombre, dir);
  swap(capSub, `${p.casa} / ${p.tipo} ${p.ml}`, dir);
  swap(capPrice, `${fmt(p.precio)} COP`, dir);
  setTab(p.genero);
}

/* ---------- bucle principal ---------- */
let last = performance.now();
function frame(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;

  // resorte del estante
  if (RM) s = T;
  else { s += (T - s) * (1 - Math.exp(-(dragging ? 18 : 5.2) * dt)); if (Math.abs(T - s) < 1e-4) s = T; }
  if (Math.abs(s) > TOTAL * 4) { const sh = Math.floor(s / TOTAL) * TOTAL; s -= sh; T -= sh; if (down) down.T0 -= sh; }

  const a = mod(Math.round(s), N);
  if (a !== active) setActive(a, Math.sign(T - s) || 1);

  // inclinación hacia el cursor
  const midY = CY, settled = Math.abs(T - s) < .3;
  // cuando la caja termina de girar, sube una bocanada de vapor
  if (!introOn && !openSheet && Math.abs(T - s) < .02 && puffFor !== active) {
    puffFor = active;
    Aroma.puff(W / 2, midY - H * .38);
    if (soundOn) Aroma.sound.tick();
  }
  onCover = FINE && !openSheet && !introOn && settled && Math.abs(mx - W / 2) < .55 * d && Math.abs(my - midY) < .55 * H
    && !(lastTarget && lastTarget.closest && lastTarget.closest('.wa,.play'));
  const tY = onCover ? (mx - W / 2) / (.55 * d) * 9 : (mx - W / 2) / W * 5;
  const tX = onCover ? -(my - midY) / (H / 2) * 6 : 0;
  const kt = RM ? 1 : 1 - Math.exp(-7 * dt);
  tiltY += (tY - tiltY) * kt; tiltX += (tX - tiltX) * kt;

  // cada caja
  const kl = RM ? 1 : 1 - Math.exp(-12 * dt), lim = W / 2 + 1.5 * d;
  for (let v = 0; v < TOTAL; v++) {
    const t = tapes[v];
    let r = mod(v - s, TOTAL); if (r > TOTAL / 2) r -= TOTAL;
    t.r = r;
    const x = F(r);
    if (Math.abs(x) > lim) { if (!t.hidden) { t.el.style.visibility = 'hidden'; t.hidden = true; } continue; }
    if (t.hidden) { t.el.style.visibility = ''; t.hidden = false; }
    t.lift += ((hover === v && Math.abs(r) > .5 && !openSheet ? 1 : 0) - t.lift) * kl;
    const o = smooth(Math.max(0, 1 - Math.abs(r)));
    const y = -o * .025 * H - t.lift * .045 * H;
    t.el.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${(o * .2 * H).toFixed(2)}px) rotateZ(${(-4.5 * o).toFixed(3)}deg) rotateX(${(tiltX * o).toFixed(3)}deg) rotateY(${(-90 * o + tiltY * o).toFixed(3)}deg)`;
    t.el.style.zIndex = Math.round(100 - Math.abs(r) * 4);
    t.sp.style.setProperty('--shade', (o * .55).toFixed(3));
    t.cv.style.setProperty('--shade', ((1 - o) * .5).toFixed(3));
  }

  // aro de abrir
  const ps = openSheet ? 0 : smooth(Math.max(0, 1 - Math.abs(T - s) * 3));
  play.style.transform = `translate(${W / 2 - .5 * d - 6}px,${midY + .36 * H}px) scale(${ps.toFixed(3)})`;

  // cursor
  if (FINE) {
    const kc = 1 - Math.exp(-16 * dt);
    cx += (mx - cx) * kc; cy += (my - cy) * kc;
    cursor.style.transform = `translate3d(${cx}px,${cy}px,0)`;
    let st = introOn ? 'dark' : '';
    const tg = lastTarget && lastTarget.closest ? lastTarget : null;
    if (tg) {
      if (introOn) st = tg.closest('.intro-go') ? 'spray' : tg.closest('a,button') ? 'btn dark' : 'dark';
      else if (openSheet || tg.closest('.wa')) st = tg.closest('a,button') ? 'btn' : '';
      else if (onCover) st = 'open';
      else {
        const tp = tg.closest('.tape');
        if (tp && Math.abs(tapes[tp._v].r) > .5) st = 'spine';
        else if (tg.closest('a,button')) st = 'btn';
      }
    }
    if (st !== curState) {
      cursor.className = 'cursor' + (st ? ' ' + st : '');
      curLbl.innerHTML = st === 'spray' ? 'ROCIAR' : 'VER<br>AROMA';
      curState = st;
    }
  }

  // texto giratorio del botón de WhatsApp
  if (!RM) { ringA = (ringA + dt * 14) % 360; waRing.style.transform = `rotate(${ringA.toFixed(2)}deg)`; }

  requestAnimationFrame(frame);
}

/* ---------- hojas: crecen desde la caja o el botón ---------- */
const insetOf = r => `inset(${r.top}px ${W - r.right}px ${VH - r.bottom}px ${r.left}px round 3px)`;
function growSheet(sheet, rect, rot, back) {
  sheet.getAnimations({ subtree: true }).forEach(an => an.cancel());
  sheet.scrollTop = 0;
  sheet.classList.add('is-open');
  openSheet = sheet; sheetBack = back;
  setInert(sheet);
  Aroma.layer('sheet');
  sheet.style.transformOrigin = `${(rect.left + rect.right) / 2}px ${(rect.top + rect.bottom) / 2}px`;
  sheet.animate([
    { clipPath: insetOf(rect), transform: `rotate(${rot}deg)` },
    { clipPath: 'inset(0px 0px 0px 0px round 0px)', transform: 'rotate(0deg)' }
  ], { duration: RM ? 1 : 1050, easing: SHEET_EASE, fill: 'both' });
  $$('.mask', sheet).forEach((m, i) => {
    m.firstElementChild.animate([{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }],
      { duration: RM ? 1 : 900, delay: RM ? 0 : 620 + i * 75, easing: EASE, fill: 'both' });
  });
  $('[data-close]', sheet).focus({ preventScroll: true });
}
function closeSheet() {
  const sheet = openSheet;
  if (!sheet) return;
  const { rect, rot, focus } = sheetBack();
  openSheet = null;
  setInert(null);
  Aroma.layer('hero');
  history.replaceState(null, '', location.pathname + location.search);
  sheet.style.transformOrigin = `${(rect.left + rect.right) / 2}px ${(rect.top + rect.bottom) / 2}px`;
  sheet.animate([
    { clipPath: 'inset(0px 0px 0px 0px round 0px)', transform: 'rotate(0deg)' },
    { clipPath: insetOf(rect), transform: `rotate(${rot}deg)` }
  ], { duration: RM ? 1 : 850, easing: SHEET_EASE, fill: 'both' }).onfinish = () => {
    if (openSheet === sheet) return;
    sheet.classList.remove('is-open');
    sheet.getAnimations({ subtree: true }).forEach(an => an.cancel());
  };
  if (focus) focus.focus({ preventScroll: true });
}
$$('[data-close]').forEach(b => b.addEventListener('click', closeSheet));

/* ---------- detalle del perfume ---------- */
const blobs = $$('mask circle', detail), delays = [0, 120, 220, 300, 360, 420, 180];
const dImg = $('.d-img', detail);
const field = k => $(`[data-f="${k}"]`, detail);
function coverRect() {
  let best = tapes[0];
  tapes.forEach(t => { if (!t.hidden && Math.abs(t.r) < Math.abs(best.r)) best = t; });
  return best.cv.getBoundingClientRect();
}
function openDetail() {
  if (openSheet) return;
  T = Math.round(T);
  const p = P[mod(T, N)];
  field('sub').textContent = `${p.casa} / ${p.tipo}`;
  field('title').textContent = p.nombre;
  field('meta').textContent = `${p.genero} / ${p.familia} / ${p.ml}`;
  field('price').textContent = fmt(p.precio);
  field('desc').textContent = p.desc;
  field('salida').textContent = p.salida;
  field('corazon').textContent = p.corazon;
  field('fondo').textContent = p.fondo;
  field('wa').href = waLink(`Hola Santiago, quiero pedir el perfume ${p.nombre} de ${p.casa} (${p.tipo}, ${p.ml.toLowerCase()}) por ${fmt(p.precio)}. ¿Está disponible? Ciudad de entrega y forma de pago (Nequi o contraentrega): `);
  dImg.setAttribute('href', IMG(p.img));
  shareAlt.hidden = true;
  blobs.forEach(b => b.setAttribute('r', 0));
  history.replaceState(null, '', '#' + slug(p));
  const cr = coverRect();
  growSheet(detail, cr, -4.5, () => ({ rect: coverRect(), rot: -4.5 }));
  // el frasco "rocía" al abrirse
  Aroma.burst((cr.left + cr.right) / 2, cr.top + (cr.bottom - cr.top) * .3, .55);
  if (soundOn) Aroma.sound.spray();
  // la foto aparece como tinta que se esparce sobre el papel
  const t0 = performance.now() + (RM ? -5000 : 520);
  const step = now => {
    const e = now - t0;
    blobs.forEach((b, i) => {
      const k = Math.min(1, Math.max(0, (e - delays[i]) / 1250));
      b.setAttribute('r', (720 * (1 - Math.pow(1 - k, 3))).toFixed(1));
    });
    if (e < 2400 && openSheet === detail) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
play.addEventListener('click', openDetail);

/* ---------- compartir el perfume: menú nativo del celular o enlaces en computador ---------- */
const shareAlt = $('.share-alt', detail), copyBtn = $('[data-sh="copy"]', detail);
let shareUrl = '';
$('[data-share]', detail).addEventListener('click', async () => {
  const p = P[mod(Math.round(T), N)];
  shareUrl = location.origin + location.pathname + '#' + slug(p);
  const text = `Mira este perfume en STGONJPARFUMS: ${p.nombre} de ${p.casa}, ${fmt(p.precio)}.`;
  if (navigator.share) {
    try { await navigator.share({ title: `${p.nombre} · STGONJPARFUMS`, text, url: shareUrl }); return; }
    catch (e) { if (e.name === 'AbortError') return; }
  }
  $('[data-sh="wa"]', shareAlt).href = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
  $('[data-sh="fb"]', shareAlt).href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  copyBtn.textContent = 'Copiar enlace';
  shareAlt.hidden = false;
});
copyBtn.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(shareUrl); copyBtn.textContent = '¡Enlace copiado!'; }
  catch (e) { prompt('Copia este enlace:', shareUrl); }
});

/* ---------- envíos ---------- */
$$('[data-envios]').forEach(btn => btn.addEventListener('click', () => {
  if (openSheet) return;
  closeWa();
  const back = () => ({ rect: btn.getBoundingClientRect(), rot: 0, focus: btn });
  history.replaceState(null, '', '#envios');
  growSheet(envios, btn.getBoundingClientRect(), 0, back);
}));

/* ---------- WhatsApp flotante ---------- */
function closeWa() { wa.classList.remove('is-open'); waFab.setAttribute('aria-expanded', 'false'); }
waFab.addEventListener('click', e => {
  e.stopPropagation();
  const open = !wa.classList.contains('is-open');
  wa.classList.toggle('is-open', open);
  waFab.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', e => { if (!e.target.closest('.wa')) closeWa(); });

/* ---------- pestañas ---------- */
tabs.forEach(b => b.addEventListener('click', () => {
  const i = b.dataset.cat === 'Todos' ? 0 : P.findIndex(p => p.genero === b.dataset.cat);
  const cur = Math.round(T);
  let diff = i - mod(cur, N);
  if (diff > N / 2) diff -= N; else if (diff < -N / 2) diff += N;
  T = cur + diff;
}));

/* ---------- flechas, teclado, rueda y arrastre ---------- */
$('.arrow-l').addEventListener('click', () => { T = Math.round(T) - 1; });
$('.arrow-r').addEventListener('click', () => { T = Math.round(T) + 1; });

addEventListener('keydown', e => {
  if (introOn) { enterSite(); return; }
  if (e.key === 'Escape') { if (wa.classList.contains('is-open')) closeWa(); else closeSheet(); return; }
  if (openSheet) return;
  if (e.key === 'ArrowRight') T = Math.round(T) + 1;
  else if (e.key === 'ArrowLeft') T = Math.round(T) - 1;
  else if (e.key === 'Enter' && document.activeElement === document.body) openDetail();
});

let wheelT;
addEventListener('wheel', e => {
  if (introOn || openSheet || e.target.closest('.wa')) return;
  let dl = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if (e.deltaMode === 1) dl *= 16;
  T += dl / (ws + gap) * .5;
  clearTimeout(wheelT);
  wheelT = setTimeout(() => { T = Math.round(T); }, 160);
}, { passive: true });

shelf.addEventListener('pointerdown', e => {
  if (e.button !== 0 || openSheet) return;
  down = { x: e.clientX, T0: T };
});
addEventListener('pointermove', e => {
  mx = e.clientX; my = e.clientY; lastTarget = e.target;
  if (!down) return;
  const dx = e.clientX - down.x;
  if (!dragging && Math.abs(dx) > 5) dragging = true;
  if (dragging) T = down.T0 - dx / (ws + gap);
});
addEventListener('pointerover', e => { lastTarget = e.target; });
const endDrag = () => {
  if (dragging) { T = Math.round(T); suppress = true; setTimeout(() => { suppress = false; }, 0); }
  down = null; dragging = false;
};
addEventListener('pointerup', endDrag);
addEventListener('pointercancel', endDrag);

const relayout = () => { measure(); if (active >= 0) setTab(P[active].genero); };
addEventListener('resize', relayout);
if (window.visualViewport) visualViewport.addEventListener('resize', relayout);
// cuando cargan las fuentes cambia el alto de la frase
if (document.fonts) document.fonts.ready.then(relayout);

/* ---------- enlaces directos: #sauvage abre ese perfume, #envios la hoja de envíos ---------- */
const slug = p => p.lomo.normalize('NFD').replace(/[̀-ͯ°]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const hash = decodeURIComponent(location.hash.slice(1)).toLowerCase();
const deep = P.findIndex(p => slug(p) === hash);

/* ---------- sonido ---------- */
function setSound(on) {
  soundOn = on;
  sndBtn.setAttribute('aria-pressed', String(on));
  sndBtn.setAttribute('aria-label', on ? 'Silenciar sonido' : 'Activar sonido');
  store.set('stgo-sonido', on ? '1' : '0');
}
sndBtn.addEventListener('click', () => { setSound(!soundOn); if (soundOn) Aroma.sound.spray(); });

/* ---------- bienvenida: niebla, logo y el atomizador que abre la tienda ---------- */
function introIn() {
  setInert(intro);
  Aroma.layer('intro');
  Aroma.ambient(true);
  // dura 2.5 s: logo letra por letra (0–0.9 s), rocío a 0.95 s y el vapor abre la tienda hasta 2.45 s
  intro.addEventListener('pointerdown', enterSite);
  setTimeout(enterSite, RM ? 300 : 950);
  const word = $('.intro-word', intro);
  word.innerHTML = [...word.textContent].map(c => `<span class="ch">${c}</span>`).join('');
  if (RM) return;
  const OUT = 'cubic-bezier(.16,1,.3,1)';
  const rise = (el, delay) => el.animate([{ transform: 'translateY(115%)' }, { transform: 'translateY(0)' }],
    { duration: 600, delay, easing: EASE, fill: 'both' });
  rise($('.intro-k > span', intro), 60);
  $$('.ch', intro).forEach((c, i) => c.animate(
    [{ transform: 'translateY(118%) rotate(10deg)' }, { transform: 'translateY(0) rotate(0deg)' }],
    { duration: 640, delay: 90 + i * 45, easing: OUT, fill: 'both' }));
  rise($('.intro-b > span', intro), 340);
  $('.intro-b > span', intro).animate([{ letterSpacing: '1.5em' }, { letterSpacing: '.62em' }],
    { duration: 900, delay: 340, easing: OUT, fill: 'both' });
  rise($('.intro-s > span', intro), 420);
  // destello dorado que cruza el logo
  $('.intro-sweep', intro).animate([{ backgroundPosition: '150% 0' }, { backgroundPosition: '-50% 0' }],
    { duration: 800, delay: 400, easing: 'cubic-bezier(.45,0,.2,1)', fill: 'both' });
  $('.intro-go', intro).animate([{ transform: 'scale(0) rotate(-120deg)' }, { transform: 'scale(1) rotate(0deg)' }],
    { duration: 520, delay: 260, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' });
  $('.intro-ring', intro).animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
    { duration: 4000, iterations: Infinity });
  // el dedo presiona el atomizador justo antes del rocío
  $('.intro-ico', intro).animate(
    [{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(3px) scale(.9)' }, { transform: 'translateY(0) scale(1)' }],
    { duration: 220, delay: 760, easing: 'ease-in-out' });
}
function enterSite() {
  if (!introOn || intro.classList.contains('leaving')) return;
  intro.classList.add('leaving');
  // el navegador solo deja sonar si la persona ya tocó la página
  if (soundOn) Aroma.sound.intro();
  const b = $('.intro-go', intro).getBoundingClientRect();
  const ox = b.left + b.width / 2, oy = b.top + b.height / 2;
  intro.style.setProperty('--ox', ox + 'px');
  intro.style.setProperty('--oy', oy + 'px');
  Aroma.ambient(false);
  Aroma.burst(ox, oy - 20, 1.6);
  if (!RM) {
    s = T - 7;
    // ondas expansivas, destello de luz y la cámara que atraviesa el vapor
    $$('.intro-wave', intro).forEach((w, i) => w.animate(
      [{ transform: 'scale(1)', borderWidth: '1.5px' }, { transform: 'scale(18)', borderWidth: '.1px' }],
      { duration: 1300, delay: i * 130, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }));
    $('.intro-glow', intro).animate(
      [{ transform: 'scale(1)', filter: 'brightness(1)' }, { transform: 'scale(1.4)', filter: 'brightness(2.4)' }],
      { duration: 700, easing: EASE, fill: 'both' });
    $('.intro-c', intro).animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }],
      { duration: 1500, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'both' });
  }
  // el vapor abre un agujero desde el atomizador hasta descubrir la tienda
  const D = Math.hypot(Math.max(ox, W - ox), Math.max(oy, VH - oy)) + 240;
  const t0 = performance.now(), dur = RM ? 1 : 1500;
  const step = now => {
    const p = Math.min(1, (now - t0) / dur);
    const e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    intro.style.setProperty('--r', (-220 + (D + 220) * e).toFixed(1) + 'px');
    if (p < 1) { requestAnimationFrame(step); return; }
    intro.remove();
    introOn = false;
    setInert(null);
    Aroma.layer('hero');
  };
  requestAnimationFrame(step);
}
// el primer toque desbloquea el audio para los rocíos siguientes
addEventListener('pointerdown', () => { if (soundOn) Aroma.sound.init(); }, { once: true, capture: true });

/* ---------- arranque ---------- */
measure();
setSound(store.get('stgo-sonido') !== '0');
introOn = !!intro && deep < 0 && hash !== 'envios';
if (introOn) { s = T; introIn(); }
else { if (intro) intro.remove(); Aroma.layer('hero'); }
if (deep >= 0) { T = s = N + deep; setTimeout(openDetail, 450); }
else if (hash === 'envios') setTimeout(() => $('[data-envios]').click(), 450);
requestAnimationFrame(frame);
})();
