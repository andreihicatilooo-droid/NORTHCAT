/* ===================================================================
   NORTHCAT NFT — app.js
   Взвешенный рандом признаков, рендер, редкость, галерея, экспорт.
   =================================================================== */
(function () {
    'use strict';

    const { TRAITS, totalCombinations } = window.NC_TRAITS;
    const { render } = window.NC_RENDER;
    const $ = s => document.querySelector(s);
    const $$ = s => Array.from(document.querySelectorAll(s));

    const mainCanvas = $('#catCanvas');
    const mctx = mainCanvas.getContext('2d');
    let current = null;            // { dna, seed, token }
    let tokenCounter = 1;

    /* ---------- Взвешенный выбор варианта ---------- */
    function pickWeighted(options, rnd) {
        const total = options.reduce((s, o) => s + o.weight, 0);
        let r = rnd() * total;
        for (const o of options) { if ((r -= o.weight) <= 0) return o; }
        return options[options.length - 1];
    }

    /* ---------- Сгенерировать ДНК по сиду ---------- */
    function dnaFromSeed(seed) {
        // отдельный поток случайностей для выбора признаков
        const rnd = window.NC_RENDER.mulberry32((seed ^ 0x9e3779b9) >>> 0);
        const dna = {};
        TRAITS.forEach(t => { dna[t.key] = pickWeighted(t.options, rnd); });
        return dna;
    }

    /* ---------- Редкость варианта (% появления) ---------- */
    function optionRarity(trait, option) {
        const total = trait.options.reduce((s, o) => s + o.weight, 0);
        return option.weight / total * 100;
    }

    /* ---------- Оценка редкости всего кота ---------- */
    function rarityScore(dna) {
        // score = сумма «очков редкости» = сумма (1/частота). Выше = реже.
        let score = 0;
        TRAITS.forEach(t => {
            const r = optionRarity(t, dna[t.key]) / 100;
            score += 1 / r;
        });
        return score;
    }
    function rarityTier(score) {
        if (score > 230) return { name: 'Мифический', cls: 'mythic' };
        if (score > 150) return { name: 'Легендарный', cls: 'legendary' };
        if (score > 95)  return { name: 'Эпический', cls: 'epic' };
        if (score > 62)  return { name: 'Редкий', cls: 'rare' };
        return { name: 'Обычный', cls: 'common' };
    }

    /* ---------- Показать кота на главном холсте ---------- */
    function show(seed, token) {
        const dna = dnaFromSeed(seed);
        current = { dna, seed, token };
        render(mctx, mainCanvas.width, dna, seed);
        $('#tokenLabel').textContent = '#' + String(token).padStart(4, '0');

        const score = rarityScore(dna);
        const tier = rarityTier(score);
        const badge = $('#rarityBadge');
        badge.textContent = tier.name + ' · ' + score.toFixed(0);
        badge.className = 'rarity-badge ' + tier.cls;

        // таблица признаков
        $('#traitList').innerHTML = TRAITS.map(t => {
            const opt = dna[t.key];
            const r = optionRarity(t, opt).toFixed(1);
            return `<div class="trait-row">
                <span class="t-label">${t.label}</span>
                <span class="t-value">${opt.name}</span>
                <span class="t-rar">${r}%</span>
            </div>`;
        }).join('');
    }

    /* ---------- Случайный кот ---------- */
    function randomSeed() {
        return (Math.random() * 0xFFFFFFFF) >>> 0;
    }
    function generateOne() {
        show(randomSeed(), tokenCounter++);
    }

    /* ---------- Галерея (коллекция) ---------- */
    function generateGallery(n) {
        const grid = $('#galleryGrid');
        grid.innerHTML = '';
        for (let i = 0; i < n; i++) {
            const seed = randomSeed();
            const token = tokenCounter++;
            const dna = dnaFromSeed(seed);
            const c = document.createElement('canvas');
            c.width = c.height = 240;
            render(c.getContext('2d'), 240, dna, seed);

            const tier = rarityTier(rarityScore(dna));
            const cell = document.createElement('div');
            cell.className = 'g-cell';
            cell.appendChild(c);
            const cap = document.createElement('div');
            cap.className = 'g-cap';
            cap.innerHTML = `<span>#${String(token).padStart(4, '0')}</span><span class="dot ${tier.cls}"></span>`;
            cell.appendChild(cap);
            cell.addEventListener('click', () => {
                show(seed, token);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            grid.appendChild(cell);
        }
        $('#galleryCount').textContent = n;
    }

    /* ---------- Экспорт PNG ---------- */
    function downloadPNG(scale) {
        if (!current) return;
        const size = 1000 * (scale || 1);
        const c = document.createElement('canvas');
        c.width = c.height = size;
        render(c.getContext('2d'), size, current.dna, current.seed);
        const a = document.createElement('a');
        a.download = `northcat-${String(current.token).padStart(4, '0')}.png`;
        a.href = c.toDataURL('image/png');
        a.click();
    }

    /* ---------- Экспорт метаданных (JSON) ---------- */
    function downloadJSON() {
        if (!current) return;
        const meta = {
            name: `NORTHCAT #${String(current.token).padStart(4, '0')}`,
            description: 'Процедурный кот коллекции NORTHCAT. Сгенерирован случайно.',
            seed: current.seed,
            rarity: { score: +rarityScore(current.dna).toFixed(1), tier: rarityTier(rarityScore(current.dna)).name },
            attributes: TRAITS.map(t => ({
                trait_type: t.label,
                value: current.dna[t.key].name,
                rarity_pct: +optionRarity(t, current.dna[t.key]).toFixed(2)
            }))
        };
        const blob = new Blob([JSON.stringify(meta, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.download = `northcat-${String(current.token).padStart(4, '0')}.json`;
        a.href = URL.createObjectURL(blob);
        a.click();
        URL.revokeObjectURL(a.href);
    }

    /* ---------- Кнопки ---------- */
    $('#btnGenerate').addEventListener('click', generateOne);
    $('#btnDownload').addEventListener('click', () => downloadPNG(1));
    $('#btnDownload2x').addEventListener('click', () => downloadPNG(2));
    $('#btnJson').addEventListener('click', downloadJSON);
    $('#btnGallery').addEventListener('click', () => {
        const n = parseInt($('#gallerySize').value, 10) || 12;
        generateGallery(Math.min(n, 120));
    });
    document.addEventListener('keydown', e => {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') { e.preventDefault(); generateOne(); }
    });

    /* ---------- Старт ---------- */
    const combos = totalCombinations();
    $('#comboCount').textContent = combos.toLocaleString('ru-RU');
    $('#traitCats').textContent = TRAITS.length;
    generateOne();
    generateGallery(12);

})();
