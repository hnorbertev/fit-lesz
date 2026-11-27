const icons = {
  weights: '<path d="M3 9v6m4-9v12m10-12v12m4-9v6M7 12h10"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m3 10v-3a6 6 0 0 0-3-5"/>',
  ticket: '<path d="M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4Zm12 0v3m0 3v2m0 3v3"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'
};
document.querySelector('#price-list').innerHTML = FITLESZ.prices.map(p => `<article class="price-row ${p.featured ? 'featured' : ''}"><div><h4>${p.name}</h4><p>${p.description}</p></div><strong>${p.price}<span> Ft</span></strong></article>`).join('');
document.querySelector('#benefit-list').innerHTML = FITLESZ.benefits.map(b => `<article class="benefit reveal"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[b.icon]}</svg><div><h3>${b.name}</h3><p>${b.text}</p></div></article>`).join('');
document.querySelector('#review-list').innerHTML = FITLESZ.reviews.map(r => `<figure class="review"><figcaption><span class="review-avatar" aria-hidden="true">${r.name.charAt(0)}</span><strong>${r.name}</strong><span class="stars" aria-label="5 az 5 csillagból">★★★★★</span></figcaption><blockquote>„${r.text}”</blockquote></figure>`).join('');
document.querySelector('#trainer-list').innerHTML = FITLESZ.trainers.map(t => `<article class="trainer reveal"><div class="trainer-photo"><img src="assets/optimized/${t.image}.webp" alt="${t.name} illusztratív edzői portréja" loading="lazy" width="600" height="900"><div class="trainer-label"><h3>${t.name}</h3><p>${t.specialization}</p></div></div><p class="trainer-description">${t.text}</p></article>`).join('');
document.querySelector('#product-list').innerHTML = FITLESZ.products.map(p => `<article class="product reveal"><div class="product-image"><img src="assets/optimized/${p.image}.webp" alt="${p.name} – rekonstruált terméklátványterv" loading="lazy" width="650" height="800"></div><div class="product-info"><h3>${p.name}</h3><p>${p.price}</p></div></article>`).join('');
document.querySelectorAll('[data-contact]').forEach(a => { const c = FITLESZ.contact[a.dataset.contact]; a.href = c.href; if (c.text) a.textContent = c.text; });
const dayNames = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
document.querySelector('#hours-list').innerHTML = dayNames.map((name, i) => `<div class="hours-row" data-day="${(i + 1) % 7}"><span>${name}</span><span>${(i < 5 ? FITLESZ.opening.weekdays : FITLESZ.opening.weekend).join('–')}</span></div>`).join('') + `<div class="hours-row holiday-row"><span>Ünnepnapokon</span><span>${FITLESZ.opening.holiday.join('–')}</span></div>`;
function updateStatus() {
  const state = OpeningHours.status();
  document.querySelectorAll('[data-status]').forEach(el => { el.classList.toggle('is-open', state.open); if (el.textContent !== state.text) el.textContent = state.text; });
  document.querySelectorAll('[data-day]').forEach(row => { const active = +row.dataset.day === state.day; row.classList.toggle('today', active && !state.holiday && !state.exception); if (active) row.setAttribute('aria-current', 'date'); else row.removeAttribute('aria-current'); });
  document.querySelector('.holiday-row').classList.toggle('today', state.holiday && !state.exception);
  const notice = document.querySelector('#hours-notice');
  notice.hidden = !state.exception;
  notice.textContent = state.exception ? `Mai rendkívüli nyitvatartás: ${state.hours ? state.hours.join('–') : 'zárva'}.` : '';
  document.querySelector('#year').textContent = state.date.slice(0, 4);
}
updateStatus();
setInterval(updateStatus, 15000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateStatus(); });
const toggle = document.querySelector('.menu-toggle'), nav = document.querySelector('.main-nav');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Menü megnyitása'); nav.classList.remove('is-open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása'); nav.classList.toggle('is-open', open); });
nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); toggle.focus(); } });
matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
const header = document.querySelector('.site-header');
function updateScroll() { header.classList.toggle('compact', window.scrollY > 40); }
addEventListener('scroll', updateScroll, { passive: true }); updateScroll();
const pause = document.querySelector('.marquee-pause');
pause.addEventListener('click', () => { const paused = pause.getAttribute('aria-pressed') !== 'true'; pause.setAttribute('aria-pressed', String(paused)); pause.setAttribute('aria-label', paused ? 'Futó szöveg folytatása' : 'Futó szöveg szüneteltetése'); pause.textContent = paused ? '▷' : 'Ⅱ'; document.querySelector('.marquee').classList.toggle('paused', paused); });
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('will-reveal'); revealObserver.observe(el); });
  const links = [...nav.querySelectorAll('a')];
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { links.forEach(a => { const active = a.hash === '#' + e.target.id; a.classList.toggle('active', active); if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); } }), { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  links.forEach(a => sectionObserver.observe(document.querySelector(a.hash)));
}
