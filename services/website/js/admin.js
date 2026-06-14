/* ===================================================================
   NORTHCAT — admin.js
   Демо админ-зона на localStorage: записи, новости, товары, статистика.
   ВНИМАНИЕ: это клиентская демонстрация. В реальном проекте авторизация
   и данные обязаны обрабатываться на защищённом бэкенде.
   =================================================================== */
(function () {
    'use strict';
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => Array.from(document.querySelectorAll(s));

    const DEMO_PWD = 'northcat';
    const SESSION_KEY = 'nc_admin_auth';

    function toast(title, msg, ok = true) {
        const t = document.createElement('div');
        t.className = 'toast' + (ok ? ' ok' : '');
        t.innerHTML = `<strong>${title}</strong>${msg}`;
        $('#toastWrap').appendChild(t);
        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
    }

    /* ---------------- Авторизация ---------------- */
    function showApp() {
        $('#loginScreen').style.display = 'none';
        $('#adminWrap').style.display = 'flex';
        renderAll();
    }
    function login() {
        if ($('#pwd').value === DEMO_PWD) {
            sessionStorage.setItem(SESSION_KEY, '1');
            showApp();
        } else {
            toast('Доступ запрещён', 'Неверный пароль.', false);
            $('#pwd').value = '';
        }
    }
    $('#loginBtn').addEventListener('click', login);
    $('#pwd').addEventListener('keydown', e => { if (e.key === 'Enter') login(); });
    $('#logoutBtn').addEventListener('click', () => { sessionStorage.removeItem(SESSION_KEY); location.reload(); });
    if (sessionStorage.getItem(SESSION_KEY) === '1') showApp();

    /* ---------------- Навигация по вкладкам ---------------- */
    $('#adminNav').addEventListener('click', e => {
        const btn = e.target.closest('button[data-tab]');
        if (!btn) return;
        $$('.admin-nav button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        $$('.admin-panel').forEach(p => p.classList.remove('active'));
        $('#tab-' + btn.dataset.tab).classList.add('active');
    });

    /* ---------------- Хранилище ---------------- */
    const get = (k, def) => JSON.parse(localStorage.getItem(k) || JSON.stringify(def));
    const set = (k, v) => localStorage.setItem(k, JSON.stringify(v));

    function getBookings() { return get('nc_bookings', []); }
    function getNews() { return get('nc_news_custom', []); }
    function getPriceOverrides() { return get('nc_price_overrides', {}); }

    /* ---------------- Дашборд ---------------- */
    function renderDashboard() {
        const bookings = getBookings();
        const news = getNews();
        const newCount = bookings.filter(b => b.status === 'new').length;
        const cards = [
            { v: bookings.length, l: 'Всего заявок' },
            { v: newCount, l: 'Новых' },
            { v: NEWS.length + news.length, l: 'Новостей' },
            { v: PRODUCTS.length, l: 'Товаров' }
        ];
        $('#statCards').innerHTML = cards.map(c => `<div class="stat-card"><div class="v">${c.v}</div><div class="l">${c.l}</div></div>`).join('');

        const recent = bookings.slice(0, 5);
        $('#recentBookings').innerHTML = recent.length ? bookingTable(recent) : '<div class="empty">Заявок пока нет.</div>';
    }

    /* ---------------- Записи ---------------- */
    function bookingTable(list) {
        return `<table class="admin-table">
            <thead><tr><th>Дата заявки</th><th>Имя</th><th>Контакт</th><th>Услуга</th><th>Сеанс</th><th>Статус</th><th>Действия</th></tr></thead>
            <tbody>${list.map(b => `
                <tr>
                    <td>${new Date(b.created).toLocaleString('ru-RU')}</td>
                    <td>${esc(b.name)}</td>
                    <td>${esc(b.contact)}</td>
                    <td>${esc(b.service)}</td>
                    <td>${esc(b.date) || '—'}</td>
                    <td><span class="badge ${b.status}">${b.status === 'new' ? 'Новая' : 'Готово'}</span></td>
                    <td>
                        <button class="admin-btn" data-toggle="${b.id}">${b.status === 'new' ? '✓ Обработать' : '↺ В новые'}</button>
                        <button class="admin-btn danger" data-del="${b.id}">Удалить</button>
                    </td>
                </tr>`).join('')}</tbody>
        </table>`;
    }
    function renderBookings() {
        const list = getBookings();
        $('#bookingsTable').innerHTML = list.length ? bookingTable(list) : '<div class="empty">Заявок пока нет. Оставьте заявку на сайте — она появится здесь.</div>';
    }
    $('#bookingsTable').addEventListener('click', e => {
        const tg = e.target.closest('[data-toggle]');
        const dl = e.target.closest('[data-del]');
        let list = getBookings();
        if (tg) {
            list = list.map(b => b.id == tg.dataset.toggle ? { ...b, status: b.status === 'new' ? 'done' : 'new' } : b);
            set('nc_bookings', list); renderBookings(); renderDashboard();
        }
        if (dl) {
            list = list.filter(b => b.id != dl.dataset.del);
            set('nc_bookings', list); renderBookings(); renderDashboard();
            toast('Удалено', 'Заявка удалена.');
        }
    });
    $('#clearBookings').addEventListener('click', () => {
        if (confirm('Удалить все заявки?')) { set('nc_bookings', []); renderBookings(); renderDashboard(); toast('Очищено', 'Все заявки удалены.'); }
    });

    /* ---------------- Новости ---------------- */
    function renderNews() {
        const custom = getNews();
        const all = [...custom, ...NEWS.map(n => ({ ...n, builtin: true }))];
        $('#newsTable').innerHTML = `<table class="admin-table">
            <thead><tr><th>Дата</th><th>Тег</th><th>Заголовок</th><th>Текст</th><th></th></tr></thead>
            <tbody>${all.map(n => `
                <tr>
                    <td>${esc(n.date)}</td>
                    <td>${esc(n.tag)}</td>
                    <td>${esc(n.title)}</td>
                    <td style="max-width:280px;">${esc(n.excerpt)}</td>
                    <td>${n.builtin ? '<span style="color:var(--text-dim);font-size:.72rem;">базовая</span>' : `<button class="admin-btn danger" data-delnews="${n.id}">Удалить</button>`}</td>
                </tr>`).join('')}</tbody>
        </table>`;
    }
    $('#newsForm').addEventListener('submit', e => {
        e.preventDefault();
        const f = e.target;
        const item = {
            id: 'cn' + Date.now(),
            title: f.title.value.trim(),
            tag: f.tag.value.trim(),
            excerpt: f.excerpt.value.trim(),
            date: new Date().toLocaleDateString('ru-RU'),
            img: ASSETS.circle
        };
        const custom = getNews();
        custom.unshift(item);
        set('nc_news_custom', custom);
        f.reset(); renderNews(); renderDashboard();
        toast('Опубликовано', 'Новость добавлена в ленту.');
    });
    $('#newsTable').addEventListener('click', e => {
        const d = e.target.closest('[data-delnews]');
        if (!d) return;
        let custom = getNews().filter(n => n.id !== d.dataset.delnews);
        set('nc_news_custom', custom); renderNews(); renderDashboard();
        toast('Удалено', 'Новость удалена.');
    });

    /* ---------------- Товары ---------------- */
    function renderProducts() {
        const ov = getPriceOverrides();
        $('#productsTable').innerHTML = `<table class="admin-table">
            <thead><tr><th>Товар</th><th>Категория</th><th>Цена, ₽</th><th></th></tr></thead>
            <tbody>${PRODUCTS.map(p => `
                <tr>
                    <td>${esc(p.name)}</td>
                    <td>${esc(p.cat)}</td>
                    <td><input type="number" data-price="${p.id}" value="${ov[p.id] ?? p.price}" style="width:110px;background:var(--bg-deep);border:1px solid var(--border-soft);color:var(--text-light);padding:7px;border-radius:4px;"></td>
                    <td><button class="admin-btn" data-savep="${p.id}">Сохранить</button></td>
                </tr>`).join('')}</tbody>
        </table>`;
    }
    $('#productsTable').addEventListener('click', e => {
        const s = e.target.closest('[data-savep]');
        if (!s) return;
        const input = document.querySelector(`[data-price="${s.dataset.savep}"]`);
        const ov = getPriceOverrides();
        ov[s.dataset.savep] = +input.value;
        set('nc_price_overrides', ov);
        toast('Сохранено', 'Цена обновлена.');
    });

    /* ---------------- Сообщения ---------------- */
    function renderMessages() {
        const bookings = getBookings().filter(b => b.idea);
        $('#messagesTable').innerHTML = bookings.length ? `<table class="admin-table">
            <thead><tr><th>Дата</th><th>Имя</th><th>Контакт</th><th>Сообщение / идея</th></tr></thead>
            <tbody>${bookings.map(b => `
                <tr><td>${new Date(b.created).toLocaleDateString('ru-RU')}</td><td>${esc(b.name)}</td><td>${esc(b.contact)}</td><td>${esc(b.idea)}</td></tr>`).join('')}</tbody>
        </table>` : '<div class="empty">Сообщений пока нет.</div>';
    }

    /* ---------------- Утилиты ---------------- */
    function esc(s) { return String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

    function renderAll() {
        renderDashboard();
        renderBookings();
        renderNews();
        renderProducts();
        renderMessages();
    }
})();
