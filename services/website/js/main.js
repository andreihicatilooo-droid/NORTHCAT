/* ===================================================================
   NORTHCAT — main.js
   Курсор, меню, эффекты, рендер контента, карта, чат, корзина, формы.
   =================================================================== */
(function () {
    'use strict';

    const $ = (s, ctx = document) => ctx.querySelector(s);
    const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
    const isTouch = window.matchMedia('(hover: none)').matches;

    /* =============================================================
       ПРЕЛОАДЕР
       ============================================================= */
    window.addEventListener('load', () => {
        const pre = $('#preloader');
        setTimeout(() => pre && pre.classList.add('hidden'), 600);
    });

    /* =============================================================
       КАСТОМНЫЙ КУРСОР
       ============================================================= */
    if (!isTouch) {
        const dot = $('#cursorDot');
        const ring = $('#cursorRing');
        let mx = 0, my = 0, rx = 0, ry = 0;

        window.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        });
        // Плавное следование кольца
        (function loop() {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            requestAnimationFrame(loop);
        })();

        document.addEventListener('mousedown', () => document.body.classList.add('cursor-down'));
        document.addEventListener('mouseup', () => document.body.classList.remove('cursor-down'));

        // Делегирование наведения на интерактивные элементы
        const hoverSel = 'a, button, input, select, textarea, label, [data-cursor], .gallery-item, .sketch-item, .product-card';
        document.addEventListener('mouseover', e => {
            if (e.target.closest(hoverSel)) document.body.classList.add('cursor-hover');
        });
        document.addEventListener('mouseout', e => {
            if (e.target.closest(hoverSel)) document.body.classList.remove('cursor-hover');
        });
    }

    /* =============================================================
       ПРОГРЕСС ПРОКРУТКИ + ШАПКА
       ============================================================= */
    const header = $('#header');
    const progress = $('#scrollProgress');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const sc = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (sc / h * 100) + '%';

        header.classList.toggle('scrolled', sc > 40);
        // Скрытие шапки при скролле вниз
        if (sc > lastScroll && sc > 300) header.classList.add('hide');
        else header.classList.remove('hide');
        lastScroll = sc;
    }, { passive: true });

    /* =============================================================
       БУРГЕР / МОБИЛЬНОЕ МЕНЮ
       ============================================================= */
    const burger = $('#burger');
    const mobileMenu = $('#mobileMenu');
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

    /* =============================================================
       SCROLLSPY (активная ссылка)
       ============================================================= */
    const navLinks = $$('nav.main-nav a');
    const sections = navLinks
        .map(a => a.getAttribute('href'))
        .filter(href => href && href.startsWith('#') && href.length > 1)
        .map(href => $(href))
        .filter(Boolean);
    const spy = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                const id = '#' + en.target.id;
                navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));

    /* =============================================================
       ПОЯВЛЕНИЕ ПРИ ПРОКРУТКЕ
       ============================================================= */
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) { en.target.classList.add('visible'); revealObs.unobserve(en.target); }
        });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => revealObs.observe(el));

    /* =============================================================
       СЧЁТЧИКИ
       ============================================================= */
    const countObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            const el = en.target;
            const target = +el.dataset.count;
            let cur = 0;
            const step = Math.max(1, Math.round(target / 60));
            const t = setInterval(() => {
                cur += step;
                if (cur >= target) { cur = target; clearInterval(t); }
                el.textContent = cur >= 1000 ? cur.toLocaleString('ru-RU') + '+' : cur + '+';
            }, 22);
            countObs.unobserve(el);
        });
    }, { threshold: 0.5 });
    $$('[data-count]').forEach(el => countObs.observe(el));

    /* =============================================================
       ТОСТЫ
       ============================================================= */
    function toast(title, msg, ok = true) {
        const t = document.createElement('div');
        t.className = 'toast' + (ok ? ' ok' : '');
        t.innerHTML = `<strong>${title}</strong>${msg}`;
        $('#toastWrap').appendChild(t);
        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3800);
    }
    window.ncToast = toast;

    /* =============================================================
       КОНТАКТНЫЕ ДАННЫЕ
       ============================================================= */
    $('#infoAddress').textContent = STUDIO.address;
    $('#infoHours').textContent = STUDIO.hours;
    $('#infoPhone').textContent = STUDIO.phone;
    $('#footAddress').textContent = STUDIO.address;
    $('#footPhone').textContent = STUDIO.phone;

    // Контакты в блоке записи
    (() => {
        const bcA = $('#bcAddress'); if (bcA) bcA.textContent = STUDIO.address;
        const bcH = $('#bcHours'); if (bcH) bcH.textContent = STUDIO.hours;
        const bcP = $('#bcPhone'); if (bcP) { bcP.textContent = STUDIO.phone; bcP.href = 'tel:' + STUDIO.phone.replace(/[^\d+]/g, ''); }
        const bcE = $('#bcEmail'); if (bcE) { bcE.textContent = STUDIO.email; bcE.href = 'mailto:' + STUDIO.email; }
    })();

    /* =============================================================
       РЕНДЕР: ПРИМЕРНАЯ СТОИМОСТЬ
       ============================================================= */
    (() => {
        const grid = $('#priceGrid');
        if (!grid || typeof PRICING === 'undefined') return;
        grid.innerHTML = PRICING.map(p => `
            <div class="price-card reveal">
                <div class="size">${p.size}</div>
                <div class="name">${p.name}</div>
                <p class="ex">${p.ex}</p>
                <div class="val">${p.val}<small>${p.unit}</small></div>
            </div>`).join('');
    })();

    /* =============================================================
       РЕНДЕР: УСЛУГИ
       ============================================================= */
    $('#servicesGrid').innerHTML = SERVICES.map(s => `
        <div class="service-card reveal">
            <span class="service-icon">${s.icon}</span>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
            <div class="service-price">${s.price}</div>
        </div>`).join('');

    /* =============================================================
       РЕНДЕР: АЛЬБОМ РАБОТ + ФИЛЬТР
       ============================================================= */
    const worksGrid = $('#worksGrid');
    function renderWorks(filter = 'all') {
        const items = WORKS.filter(w => filter === 'all' || w.cat === filter);
        worksGrid.innerHTML = items.map(w => `
            <div class="gallery-item" data-img="${w.img}" data-title="${w.title}">
                <div class="gallery-img-container">
                    <img src="${w.img}" alt="${w.title}" loading="lazy">
                    <span class="gallery-zoom">⤢</span>
                    <div class="gallery-overlay">
                        <div class="gallery-category">${w.category}</div>
                        <div class="gallery-title">${w.title}</div>
                    </div>
                </div>
                <div class="gallery-info">
                    <div class="gallery-category">${w.category}</div>
                    <div class="gallery-title">${w.title}</div>
                </div>
            </div>`).join('');
    }
    $('#worksFilter').innerHTML = WORK_FILTERS.map((f, i) =>
        `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${f.key}">${f.label}</button>`).join('');
    $('#worksFilter').addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        $$('#worksFilter .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderWorks(btn.dataset.filter);
    });
    renderWorks();

    /* =============================================================
       РЕНДЕР: СКЕТЧИ
       ============================================================= */
    $('#sketchGrid').innerHTML = SKETCHES.map(s => `
        <div class="sketch-item" data-img="${s.img}" data-title="${s.style}">
            <span class="sketch-badge">${s.style}</span>
            <img src="${s.img}" alt="${s.style}" loading="lazy">
        </div>`).join('');

    $('#sketchGrid').addEventListener('click', e => {
        const item = e.target.closest('.sketch-item');
        if (item) openLightbox(item.dataset.img, item.dataset.title);
    });

    /* =============================================================
       КАТАЛОГ — в разработке (рендер товаров отключён)
       ============================================================= */

    /* =============================================================
       РЕНДЕР: НОВОСТИ
       ============================================================= */
    $('#newsGrid').innerHTML = NEWS.map(n => `
        <article class="news-card reveal">
            <div class="news-thumb">
                <img src="${n.img}" alt="${n.title}" loading="lazy">
                <span class="news-date">${n.date}</span>
            </div>
            <div class="news-body">
                <div class="news-tag">${n.tag}</div>
                <h3 class="news-title">${n.title}</h3>
                <p class="news-excerpt">${n.excerpt}</p>
                <a href="${STUDIO.tg}" target="_blank" class="news-read">Читать в Telegram →</a>
            </div>
        </article>`).join('');
    // Повторно наблюдаем новые .reveal
    $$('.reveal:not(.visible)').forEach(el => revealObs.observe(el));

    /* =============================================================
       АЛЬБОМ РАБОТ -> LIGHTBOX
       ============================================================= */
    worksGrid.addEventListener('click', e => {
        const item = e.target.closest('.gallery-item');
        if (item) openLightbox(item.dataset.img, item.dataset.title);
    });
    const lightbox = $('#lightbox');
    function openLightbox(src, caption) {
        $('#lightboxImg').src = src;
        $('#lightboxCaption').textContent = caption || '';
        lightbox.classList.add('open');
    }
    $('#lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('open');
        }
    });

    /* =============================================================
       КАРТА (Leaflet)
       ============================================================= */
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
    // Инициализируем карту, когда секция близко
    const mapObs = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) { initMap(); obs.disconnect(); }
    }, { rootMargin: '200px' });
    mapObs.observe($('#location'));

    /* =============================================================
       ФОРМА ЗАПИСИ
       ============================================================= */
    $('#bookingForm').addEventListener('submit', e => {
        e.preventDefault();
        const f = e.target;
        const data = {
            name: f.name.value.trim(),
            contact: f.contact.value.trim(),
            service: f.service.value,
            date: f.date.value,
            idea: f.idea.value.trim()
        };
        if (!data.name || !data.contact) { toast('Заполните поля', 'Имя и контакт обязательны.', false); return; }

        // Сохраняем заявку (для админ-зоны)
        const reqs = JSON.parse(localStorage.getItem('nc_bookings') || '[]');
        reqs.unshift({ ...data, id: Date.now(), status: 'new', created: new Date().toISOString() });
        localStorage.setItem('nc_bookings', JSON.stringify(reqs));

        // Формируем ссылку в Telegram с предзаполненным текстом
        const text = encodeURIComponent(
            `Заявка на запись NORTHCAT%0AИмя: ${data.name}%0AКонтакт: ${data.contact}%0AУслуга: ${data.service}%0AДата: ${data.date || '—'}%0AИдея: ${data.idea || '—'}`
        );
        toast('Заявка отправлена', 'Откройте Telegram, чтобы подтвердить.');
        window.open(`${STUDIO.tg}?text=${text}`, '_blank');
        f.reset();
    });

    /* =============================================================
       ЧАТ ПОДДЕРЖКИ (бот-имитация + связь с TG)
       ============================================================= */
    const chatWindow = $('#chatWindow');
    const chatBody = $('#chatBody');
    function chatMsg(text, who = 'bot') {
        const m = document.createElement('div');
        m.className = 'chat-msg ' + who;
        m.innerHTML = text;
        chatBody.appendChild(m);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    function botReply(q) {
        q = q.toLowerCase();
        let ans;
        if (/цен|стоим|прайс|сколько/.test(q)) ans = `Авторский эскиз — от 4 000 ₽, сеанс блэкворк — от 6 000 ₽/час. Точную смету мастер посчитает по эскизу.`;
        else if (/запис|сеанс|время|слот/.test(q)) ans = `Записаться можно через форму на сайте или прямо в Telegram <a href="${STUDIO.tg}" target="_blank" style="color:#fff;text-decoration:underline;">${STUDIO.tgHandle}</a>.`;
        else if (/адрес|где|карт|как добрат/.test(q)) ans = `Мы находимся: ${STUDIO.address}. ${STUDIO.hours}. Смотрите карту в разделе «Карта».`;
        else if (/привет|здрав|хай|ку/.test(q)) ans = `Приветствуем в NORTHCAT! 🐈‍⬛ Чем помочь? Спросите про цены, запись или адрес.`;
        else ans = `Спасибо за вопрос! Чтобы ответить детально, напишите нам в Telegram <a href="${STUDIO.tg}" target="_blank" style="color:#fff;text-decoration:underline;">${STUDIO.tgHandle}</a> — там отвечает живой мастер.`;
        setTimeout(() => chatMsg(ans, 'bot'), 500);
    }
    let chatInit = false;
    $('#chatFab').addEventListener('click', () => {
        chatWindow.classList.add('open');
        $('#chatFab').style.display = 'none';
        if (!chatInit) {
            chatInit = true;
            chatMsg('Добро пожаловать в поддержку NORTHCAT! 🐈‍⬛<br>Задайте вопрос или выберите тему ниже.');
        }
    });
    $('#chatClose').addEventListener('click', () => {
        chatWindow.classList.remove('open');
        $('#chatFab').style.display = 'flex';
    });
    function sendChat(text) {
        if (!text.trim()) return;
        chatMsg(text, 'user');
        botReply(text);
    }
    $('#chatSend').addEventListener('click', () => { sendChat($('#chatInput').value); $('#chatInput').value = ''; });
    $('#chatInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') { sendChat($('#chatInput').value); $('#chatInput').value = ''; }
    });
    $('#chatQuick').addEventListener('click', e => {
        const b = e.target.closest('button');
        if (b) sendChat(b.textContent);
    });

})();
