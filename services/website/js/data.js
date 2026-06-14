/* ===================================================================
   NORTHCAT — Данные сайта (демо-контент)
   Эти массивы используются для рендера каталога, галереи, скетчей,
   новостей. В реальном проекте приходят с бэкенда / Telegram API.
   =================================================================== */

// Изображения-ресурсы студии
const ASSETS = {
    circle: 'cat_circle.jpg',
    full: 'cat_full.jpg',
    typo: 'typography.jpg',
    promo: 'promo.mp4',
    p1: 'ресурсы/photo_2026-06-07_01-33-51.jpg',
    p2: 'ресурсы/photo_2026-06-07_01-33-54.jpg',
    p3: 'ресурсы/photo_2026-06-07_01-33-59.jpg',
    v1: 'ресурсы/video_2026-06-07_01-33-44.mp4',
    v2: 'ресурсы/video_2026-06-07_01-33-48.mp4'
};

// --- Альбом готовых работ ---
const WORKS = [
    { id: 'w1', cat: 'blackwork', title: 'Северный Кот', category: 'Ornamental Blackwork', img: ASSETS.full },
    { id: 'w2', cat: 'occult', title: 'Circle Sigil', category: 'Occult Graphic', img: ASSETS.circle },
    { id: 'w3', cat: 'gothic', title: 'Gothic Type Set', category: 'Gothic Calligraphy', img: ASSETS.typo },
    { id: 'w4', cat: 'occult', title: 'Runic Portrait', category: 'Sacred Geometry', img: ASSETS.p1 },
    { id: 'w5', cat: 'blackwork', title: 'Void Crafted', category: 'Dark Blackwork', img: ASSETS.p2 },
    { id: 'w6', cat: 'gothic', title: 'Eternal Creativity', category: 'Dark Urbanic', img: ASSETS.p3 },
    { id: 'w7', cat: 'occult', title: 'Pentagram Cat', category: 'Occult Graphic', img: ASSETS.circle },
    { id: 'w8', cat: 'blackwork', title: 'Reap The Void', category: 'Ornamental Blackwork', img: ASSETS.full }
];

// --- Коллекция скетчей / эскизов ---
const SKETCHES = [
    { id: 's1', style: 'Occult', img: ASSETS.circle },
    { id: 's2', style: 'Blackwork', img: ASSETS.full },
    { id: 's3', style: 'Gothic Type', img: ASSETS.typo },
    { id: 's4', style: 'Runic', img: ASSETS.p1 },
    { id: 's5', style: 'Sacred Geo', img: ASSETS.p2 },
    { id: 's6', style: 'Dark Urban', img: ASSETS.p3 },
    { id: 's7', style: 'Sigil', img: ASSETS.circle },
    { id: 's8', style: 'Lettering', img: ASSETS.full }
];

// --- Услуги дизайна ---
const SERVICES = [
    { icon: '✶', title: 'Авторский эскиз', desc: 'Индивидуальная разработка концепта под вашу анатомию и идею.', price: 'от 4 000 ₽' },
    { icon: '☩', title: 'Орнаментал / Blackwork', desc: 'Сложная графика, плотный блэк, сакральная геометрия.', price: 'от 6 000 ₽/час' },
    { icon: 'ᚱ', title: 'Готическая каллиграфия', desc: 'Леттеринг и руны в фирменном стиле студии.', price: 'от 3 500 ₽' },
    { icon: '✦', title: 'Перекрытие / Cover-up', desc: 'Художественное перекрытие старых тату новым сюжетом.', price: 'индивидуально' },
    { icon: '◑', title: 'Реставрация тату', desc: 'Обновление контура, цвета и контраста старых работ.', price: 'от 5 000 ₽' },
    { icon: '⚝', title: 'Digital-арт под печать', desc: 'Цифровая иллюстрация в стиле NORTHCAT для принта/постера.', price: 'от 2 500 ₽' }
];

// --- Примерная стоимость тату ---
const PRICING = [
    { size: 'Минимум', name: 'Small', ex: 'Мелкие символы, руны, надписи до 5 см.', val: 'от 3 000', unit: '₽' },
    { size: 'Средняя', name: 'Medium', ex: 'Эскизы 5–15 см: орнамент, графика, леттеринг.', val: 'от 6 000', unit: '₽' },
    { size: 'Почасовая', name: 'Large', ex: 'Объёмные сюжеты, блэкворк, рукава.', val: 'от 6 000', unit: '₽/час' },
    { size: 'Проект / рукав', name: 'Custom', ex: 'Масштабные проекты — индивидуальный расчёт.', val: 'от 25 000', unit: '₽' }
];

// --- Каталог товаров ---
const PRODUCTS = [
    { id: 'p1', cat: 'merch', tag: 'NEW', name: 'Худи «Северный Кот»', desc: 'Чёрное худи с фирменным принтом сигила.', price: 4900, img: ASSETS.circle },
    { id: 'p2', cat: 'merch', tag: 'HIT', name: 'Футболка NORTHCAT', desc: 'Оверсайз с готической типографикой.', price: 2400, img: ASSETS.full },
    { id: 'p3', cat: 'print', tag: '', name: 'Постер «Reap The Void»', desc: 'Арт-печать A2 на дизайнерской бумаге.', price: 1800, img: ASSETS.typo },
    { id: 'p4', cat: 'cert', tag: '', name: 'Сертификат на сеанс', desc: 'Подарочный сертификат на тату-сеанс.', price: 6000, img: ASSETS.p1 },
    { id: 'p5', cat: 'care', tag: 'CARE', name: 'Заживляющий бальзам', desc: 'Премиальный уход за свежей татуировкой.', price: 990, img: ASSETS.p2 },
    { id: 'p6', cat: 'print', tag: '', name: 'Набор стикеров', desc: 'Винил-стикеры с эскизами студии.', price: 590, img: ASSETS.p3 },
    { id: 'p7', cat: 'merch', tag: '', name: 'Шоппер «Void Crafted»', desc: 'Плотная сумка-шоппер с шелкографией.', price: 1200, img: ASSETS.circle },
    { id: 'p8', cat: 'care', tag: '', name: 'Плёнка Second Skin', desc: 'Защитная плёнка для заживления, 10×15 см.', price: 350, img: ASSETS.full }
];

// --- Лента новостей ---
const NEWS = [
    { id: 'n1', tag: 'Студия', date: '05.06.2026', title: 'Открыт новый зал', excerpt: 'Расширили пространство: отдельный приватный зал для крупных проектов и кавер-апов.', img: ASSETS.p1 },
    { id: 'n2', tag: 'Эскизы', date: '01.06.2026', title: 'Дроп флэшей «Reap The Void»', excerpt: 'Новая коллекция готических флэш-эскизов уже в нашем Telegram-канале.', img: ASSETS.typo },
    { id: 'n3', tag: 'Акция', date: '28.05.2026', title: 'Скидка на блэкворк', excerpt: '−15% на орнаментал и блэкворк при записи через сайт до конца месяца.', img: ASSETS.full },
    { id: 'n4', tag: 'Гость', date: '20.05.2026', title: 'Гостевой мастер', excerpt: 'Приглашённый мастер по сакральной геометрии — ограниченное число слотов.', img: ASSETS.circle }
];

// Категории фильтров
const WORK_FILTERS = [
    { key: 'all', label: 'Все работы' },
    { key: 'blackwork', label: 'Blackwork' },
    { key: 'occult', label: 'Occult' },
    { key: 'gothic', label: 'Gothic' }
];
const PRODUCT_FILTERS = [
    { key: 'all', label: 'Всё' },
    { key: 'merch', label: 'Мерч' },
    { key: 'print', label: 'Принты' },
    { key: 'care', label: 'Уход' },
    { key: 'cert', label: 'Сертификаты' }
];

// Контакты / соцсети
const STUDIO = {
    name: 'NORTHCAT',
    tg: 'https://t.me/N0RTHCAT',
    tgHandle: '@N0RTHCAT',
    // Оператор студии — на него уходят примерки эскизов и заявки
    operator: 'https://t.me/N0RTHCAT',
    operatorHandle: '@N0RTHCAT',
    site: 'https://northcat.top',
    siteLabel: 'northcat.top',
    address: 'г. Москва, ул. Тёмная, 13',
    phone: '+7 (999) 013-13-13',
    email: 'ink@northcat.top',
    hours: 'Ежедневно 12:00 — 22:00',
    // Координаты студии для карты (демо: центр Москвы)
    lat: 55.760186,
    lng: 37.618711
};
