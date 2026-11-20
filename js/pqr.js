/* =========================================================
   STGONJPARFUMS · radicación de PQR por WhatsApp
   No guarda nada: arma el mensaje y lo abre en WhatsApp.
   ========================================================= */
(() => {
'use strict';
const WA = '573207620558';
const form = document.getElementById('pqr-form');
const out = form.querySelector('.pqr-out');
const pad = n => String(n).padStart(2, '0');

document.querySelectorAll('[data-print]').forEach(b => b.addEventListener('click', () => print()));

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const f = new FormData(form), d = new Date();
  const code = Math.random().toString(36).slice(2, 6).toUpperCase();
  const radicado = `PQR-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}-${code}`;
  const cuando = d.toLocaleString('es-CO', { dateStyle: 'long', timeStyle: 'short' });
  const msg = [
    `Radicado: ${radicado}`,
    `Fecha y hora: ${cuando}`,
    `Tipo: ${f.get('tipo')}`,
    `Nombre: ${f.get('nombre').trim()}`,
    f.get('pedido').trim() ? `Pedido o fecha de compra: ${f.get('pedido').trim()}` : '',
    `Detalle: ${f.get('detalle').trim()}`,
    'Autorizo el tratamiento de mis datos según la Política de datos de STGONJPARFUMS.'
  ].filter(Boolean).join('\n');
  out.textContent = `Tu número de radicado es ${radicado} (${cuando}). Se abrió WhatsApp con tu solicitud: envía el mensaje para que quede registrada y guarda este número para hacer seguimiento.`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});
})();
