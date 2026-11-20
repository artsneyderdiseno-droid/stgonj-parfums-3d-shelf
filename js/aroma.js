/* =========================================================
   STGONJPARFUMS · vapor y sonido de perfume
   Vapor: partículas en un <canvas>. Sonido: sintetizado con
   Web Audio (no descarga archivos de audio).
   ========================================================= */
window.Aroma = (() => {
'use strict';

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const cv = document.querySelector('.vapor');
const g = cv.getContext('2d');
let W = 0, H = 0;

function size() {
  const dpr = Math.min(innerWidth < 768 ? 1.5 : 2, devicePixelRatio || 1);
  W = innerWidth; H = innerHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
}
size();
addEventListener('resize', size);

/* ---------- vapor ---------- */
// una nube suave pre-dibujada que se reutiliza para cada partícula
const sprite = document.createElement('canvas');
sprite.width = sprite.height = 128;
const sg = sprite.getContext('2d');
const grad = sg.createRadialGradient(64, 64, 0, 64, 64, 64);
grad.addColorStop(0, 'rgba(255,252,246,1)');
grad.addColorStop(.35, 'rgba(255,250,242,.55)');
grad.addColorStop(.7, 'rgba(255,248,238,.16)');
grad.addColorStop(1, 'rgba(255,248,238,0)');
sg.fillStyle = grad;
sg.fillRect(0, 0, 128, 128);

const GOLD = '233,201,138', CREAM = '255,246,228';
const puffs = [], drops = [];
let emit = null, running = false, last = 0;
const k = () => innerWidth < 768 ? .6 : 1;
const rnd = (a, b) => a + Math.random() * (b - a);

function vap(x, y, vx, vy, r, grow, life, a) { puffs.push({ x, y, vx, vy, r, grow, life, a, t: 0, seed: Math.random() * 6.28 }); }
function drop(x, y, vx, vy, life, c) { drops.push({ x, y, vx, vy, life, c, t: 0, s: rnd(.6, 2) }); }

// atomizador: chorro en abanico hacia arriba con gotas doradas
function burst(x, y, power = 1) {
  if (RM) return;
  const n = k() * power;
  for (let i = 0; i < 70 * n; i++) {
    const a = -Math.PI / 2 + rnd(-.75, .75), v = rnd(150, 150 + 650 * power);
    vap(x, y, Math.cos(a) * v, Math.sin(a) * v, rnd(10, 40), rnd(60, 200), rnd(1.8, 4), rnd(.1, .24));
  }
  for (let i = 0; i < 150 * n; i++) {
    const a = -Math.PI / 2 + rnd(-.6, .6), v = rnd(250, 250 + 1100 * power);
    drop(x, y, Math.cos(a) * v, Math.sin(a) * v, rnd(.9, 2.5), Math.random() < .6 ? GOLD : CREAM);
  }
  start();
}
// bocanada suave que sube desde la caja activa
function puff(x, y) {
  if (RM) return;
  const n = k();
  for (let i = 0; i < 16 * n; i++) vap(x + rnd(-30, 30), y + rnd(0, 20), rnd(-15, 15), rnd(-90, -30), rnd(18, 42), rnd(30, 80), rnd(2.4, 4.2), rnd(.12, .22));
  for (let i = 0; i < 18 * n; i++) drop(x + rnd(-40, 40), y, rnd(-30, 30), rnd(-130, -40), rnd(1.2, 2.6), GOLD);
  start();
}
// niebla que sube del fondo (solo en la bienvenida)
function ambient(on) {
  emit = on && !RM ? { acc: 0 } : null;
  if (emit) start();
}
function start() {
  if (running) return;
  running = true; last = performance.now();
  requestAnimationFrame(tick);
}
function tick(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (emit) {
    emit.acc += dt * 14 * k();
    while (emit.acc > 1) { emit.acc--; vap(W * rnd(.25, .75), H + 40, rnd(-10, 10), rnd(-110, -40), rnd(40, 100), rnd(20, 60), rnd(6, 10), rnd(.05, .12)); }
    if (Math.random() < dt * 20) drop(W * rnd(.2, .8), H * rnd(.5, 1), rnd(-5, 5), rnd(-40, -10), rnd(3, 6), GOLD);
  }
  g.clearRect(0, 0, W, H);
  for (let i = puffs.length - 1; i >= 0; i--) {
    const p = puffs[i];
    p.t += dt;
    if (p.t >= p.life) { puffs.splice(i, 1); continue; }
    const dr = Math.exp(-2.4 * dt);
    p.vx *= dr; p.vy = p.vy * dr - 14 * dt;
    p.x += p.vx * dt + Math.sin(p.seed + p.t * 1.3) * 8 * dt;
    p.y += p.vy * dt;
    p.r += p.grow * dt;
    const u = p.t / p.life;
    g.globalAlpha = p.a * Math.min(1, u * 6) * (1 - u) * (1 - u);
    g.drawImage(sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
  }
  for (let i = drops.length - 1; i >= 0; i--) {
    const d = drops[i];
    d.t += dt;
    if (d.t >= d.life) { drops.splice(i, 1); continue; }
    const dr = Math.exp(-3.2 * dt);
    d.vx *= dr; d.vy = d.vy * dr + 40 * dt;
    d.x += d.vx * dt; d.y += d.vy * dt;
    g.globalAlpha = (1 - d.t / d.life) * .85 * (.6 + .4 * Math.sin(d.t * 18 + d.s * 9));
    g.fillStyle = `rgb(${d.c})`;
    g.beginPath(); g.arc(d.x, d.y, d.s, 0, 6.283); g.fill();
  }
  g.globalAlpha = 1;
  if (puffs.length || drops.length || emit) requestAnimationFrame(tick);
  else { running = false; g.clearRect(0, 0, W, H); }
}
function layer(name) { cv.dataset.layer = name; }

/* ---------- sonido ---------- */
let ctx = null, master, wet, noise;
function init() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return true; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  ctx = new AC();
  master = ctx.createGain(); master.gain.value = .32; master.connect(ctx.destination);
  // reverberación: una sala pequeña generada con ruido que se apaga
  const len = Math.floor(ctx.sampleRate * 3), ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
  const conv = ctx.createConvolver(); conv.buffer = ir;
  wet = ctx.createGain(); wet.connect(conv);
  const wetOut = ctx.createGain(); wetOut.gain.value = .32;
  conv.connect(wetOut).connect(master);
  noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const nd = noise.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  return true;
}
// "psst" del atomizador: ruido filtrado con un barrido hacia abajo
function spritz(t, dur, lvl) {
  const s = ctx.createBufferSource(); s.buffer = noise;
  const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2200;
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = .8;
  bp.frequency.setValueAtTime(8200, t); bp.frequency.exponentialRampToValueAtTime(5200, t + dur);
  const sh = ctx.createBiquadFilter(); sh.type = 'highshelf'; sh.frequency.value = 7000; sh.gain.value = -14;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 6500; lp.Q.value = .5;
  const e = ctx.createGain();
  // entrada y salida suaves: suena a bruma, no a siseo
  e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(lvl, t + .045);
  e.gain.setValueAtTime(lvl * .85, t + dur * .5); e.gain.exponentialRampToValueAtTime(.0005, t + dur);
  s.connect(hp).connect(bp).connect(sh).connect(lp).connect(e);
  e.connect(master);
  const send = ctx.createGain(); send.gain.value = .25; e.connect(send).connect(wet);
  s.start(t, Math.random() * 1.2); s.stop(t + dur + .05);
}
// campanita de cristal
function bell(t, f, lvl, dec) {
  const o = ctx.createOscillator(); o.frequency.value = f;
  const o2 = ctx.createOscillator(); o2.frequency.value = f * 2.01;
  const e = ctx.createGain();
  e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(lvl, t + .006); e.gain.exponentialRampToValueAtTime(.0001, t + dec);
  const e2 = ctx.createGain(); e2.gain.value = .18;
  o.connect(e); o2.connect(e2).connect(e);
  e.connect(master);
  const s = ctx.createGain(); s.gain.value = 1.4; e.connect(s).connect(wet);
  o.start(t); o2.start(t); o.stop(t + dec + .05); o2.stop(t + dec + .05);
}
// colchón cálido de fondo
function pad(t, fs, lvl, dur) {
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1200;
  const e = ctx.createGain();
  e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(lvl, t + .9);
  e.gain.setValueAtTime(lvl, t + dur * .4); e.gain.exponentialRampToValueAtTime(.0001, t + dur);
  lp.connect(e); e.connect(master); e.connect(wet);
  fs.forEach(f => [-4, 4].forEach(dt => {
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = f; o.detune.value = dt;
    o.connect(lp); o.start(t); o.stop(t + dur + .1);
  }));
}

const sound = {
  init,
  intro() {
    if (!init()) return;
    const t = ctx.currentTime + .03;
    spritz(t, .42, .16);
    spritz(t + .5, .62, .2);
    pad(t + .35, [164.81, 246.94, 329.63, 415.3], .035, 4.8);
    [659.25, 830.61, 987.77, 1318.51, 1661.22, 1975.53].forEach((f, i) => bell(t + .55 + i * .085, f, .05 - i * .004, 2.6 + i * .2));
  },
  spray() {
    if (!init()) return;
    const t = ctx.currentTime + .02;
    spritz(t, .38, .14);
    [987.77, 1318.51, 1661.22].forEach((f, i) => bell(t + .12 + i * .07, f, .03, 1.8));
  },
  tick() {
    if (!ctx || ctx.state !== 'running') return;
    bell(ctx.currentTime + .01, 1318.51, .014, .9);
  }
};

return { burst, puff, ambient, layer, sound };
})();
