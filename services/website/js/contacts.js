/* ===================================================================
   NORTHCAT — contacts.js
   Курсор, мобильное меню, контакты, карта для страницы контактов.
   =================================================================== */
(function () {
    'use strict';

    const $ = (s, ctx = document) => ctx.querySelector(s);
    const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
    const isTouch = window.matchMedia('(hover: none)').matches;

    /* ---------- Кастомный курсор ---------- */
    if (!isTouch) {
        const dot = $('#cursorDot');
        const ring = $('#cursorRing');
        let mx = 0, my = 0, rx = 0, ry = 0;
        window.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        });
        (function loop() {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            requestAnimationFrame(loop);
        })();
        document.addEventListener('mousedown', () => document.body.classList.add('cursor-down'));
        document.addEventListener('mouseup', () => document.body.classList.remove('cursor-down'));
        const hoverSel = 'a, button, input, select, textarea, label, [data-cursor]';
        document.addEventListener('mouseover', e => {
            if (e.target.closest(hoverSel)) document.body.classList.add('cursor-hover');
        });
        document.addEventListener('mouseout', e => {
            if (e.target.closest(hoverSel)) document.body.classList.remove('cursor-hover');
        });
    }

    /* ---------- Прогресс прокрутки ---------- */
    const progress = $('#scrollProgress');
    window.addEventListener('scroll', () => {
        const sc = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.width = (sc / (h || 1) * 100) + '%';
    }, { passive: true });

    /* ---------- Бургер / мобильное меню ---------- */
    const burger = $('#burger');
    const mobileMenu = $('#mobileMenu');
    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
        $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
            burger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }));
    }

    /* ---------- Появление .reveal ---------- */
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); revealObs.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => revealObs.observe(el));

    /* ---------- Контактные данные ---------- */
    const set = (id, val) => { const el = $(id); if (el) el.textContent = val; };
    set('#cAddress', STUDIO.address);
    set('#cHours', STUDIO.hours);
    set('#footAddress', STUDIO.address);
    set('#footPhone', STUDIO.phone);
    set('#year', new Date().getFullYear());

    const cPhone = $('#cPhone');
    if (cPhone) { cPhone.textContent = STUDIO.phone; cPhone.href = 'tel:' + STUDIO.phone.replace(/[^\d+]/g, ''); }
    const cEmail = $('#cEmail');
    if (cEmail) { cEmail.textContent = STUDIO.email; cEmail.href = 'mailto:' + STUDIO.email; }

    /* ---------- Карта (Leaflet) ---------- */
    function initMap() {
        if (typeof L === 'undefined') return;
        const map = L.map('map', { scrollWheelZoom: false }).setView([STUDIO.lat, STUDIO.lng], 15);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            maxZoom: 19
        }).addTo(map);
        const icon = L.divIcon({
            className: 'nc-marker',
            html: '<div style="width:26px;height:26px;background:#ff3b77;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 0 18px rgba(255,59,119,.8);border:2px solid #fff;"></div>',
            iconSize: [26, 26],
            iconAnchor: [13, 26]
        });
        L.marker([STUDIO.lat, STUDIO.lng], { icon }).addTo(map)
            .bindPopup(`<b>NORTHCAT</b><br>${STUDIO.address}<br>${STUDIO.hours}`)
            .openPopup();
        map.on('click', () => map.scrollWheelZoom.enable());
    }
    initMap();

})();
