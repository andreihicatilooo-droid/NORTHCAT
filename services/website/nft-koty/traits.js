/* ===================================================================
   NORTHCAT NFT — traits.js
   Определения признаков кота. Каждый признак — категория с вариантами.
   У варианта есть: id, name (рус), weight (вес редкости, больше = чаще),
   и данные для отрисовки (цвета и т.п.).
   Итоговое число комбинаций = произведение количества вариантов категорий.
   =================================================================== */
(function (global) {
    'use strict';

    // Палитры окраса (основной, тень, светлый блик)
    const FUR = [
        { id: 'void',     name: 'Бездна',        weight: 60, base: '#1b1d24', shade: '#0e0f14', light: '#2c2f3a' },
        { id: 'shadow',   name: 'Тень',          weight: 80, base: '#33363f', shade: '#22242b', light: '#474b57' },
        { id: 'ash',      name: 'Пепел',         weight: 90, base: '#6b6e78', shade: '#4f525b', light: '#8a8d97' },
        { id: 'snow',     name: 'Снег',          weight: 70, base: '#e9eaef', shade: '#c3c4cc', light: '#ffffff' },
        { id: 'sand',     name: 'Песок',         weight: 75, base: '#caa873', shade: '#a4854f', light: '#e6cc9b' },
        { id: 'rust',     name: 'Ржавчина',      weight: 70, base: '#b06438', shade: '#834728', light: '#d3854f' },
        { id: 'blood',    name: 'Кровь',         weight: 40, base: '#8e2233', shade: '#651523', light: '#b8384b' },
        { id: 'amethyst', name: 'Аметист',       weight: 45, base: '#7a3ec0', shade: '#5a2a93', light: '#9d5ee0' },
        { id: 'neon',     name: 'Неон',          weight: 30, base: '#ff3b77', shade: '#cc2659', light: '#ff6a98' },
        { id: 'toxic',    name: 'Токсик',        weight: 28, base: '#5fd35f', shade: '#3da53d', light: '#88e988' },
        { id: 'ocean',    name: 'Океан',         weight: 35, base: '#229ed9', shade: '#1877a4', light: '#52bdf0' },
        { id: 'gold',     name: 'Золото',        weight: 14, base: '#e0b53b', shade: '#b08e26', light: '#ffd96a', metallic: true },
        { id: 'chrome',   name: 'Хром',          weight: 10, base: '#aeb6c4', shade: '#7d8696', light: '#e6ecf5', metallic: true },
        { id: 'spectral', name: 'Спектр',        weight: 6,  base: '#9be8ff', shade: '#5fa9c8', light: '#e6fbff', ghost: true }
    ];

    // Узор шерсти
    const PATTERN = [
        { id: 'plain',   name: 'Чистый',        weight: 120 },
        { id: 'tabby',   name: 'Полосы',        weight: 70 },
        { id: 'spots',   name: 'Пятна',         weight: 55 },
        { id: 'patch',   name: 'Заплатка',      weight: 45 },
        { id: 'tuxedo',  name: 'Смокинг',       weight: 40 },
        { id: 'runes',   name: 'Руны',          weight: 18, glow: true },
        { id: 'circuit', name: 'Схема',         weight: 14, glow: true }
    ];

    // Фон
    const BACKGROUND = [
        { id: 'graphite', name: 'Графит',       weight: 90, type: 'radial', c1: '#16181f', c2: '#0a0b0f' },
        { id: 'plum',     name: 'Слива',        weight: 70, type: 'radial', c1: '#241334', c2: '#0d0712' },
        { id: 'crimson',  name: 'Багрянец',     weight: 60, type: 'radial', c1: '#2e0d18', c2: '#0d0508' },
        { id: 'teal',     name: 'Бирюза',       weight: 55, type: 'radial', c1: '#0c2a30', c2: '#051013' },
        { id: 'ember',    name: 'Угли',         weight: 50, type: 'radial', c1: '#33180a', c2: '#0f0703' },
        { id: 'grid',     name: 'Сетка',        weight: 40, type: 'grid',   c1: '#10131a', c2: '#0a0c11', line: 'rgba(255,59,119,.18)' },
        { id: 'rays',     name: 'Лучи',         weight: 32, type: 'rays',   c1: '#180f24', c2: '#090611', ray: 'rgba(157,38,205,.16)' },
        { id: 'sigil',    name: 'Сигил',        weight: 26, type: 'sigil',  c1: '#14101c', c2: '#080610', mark: 'rgba(255,59,119,.14)' },
        { id: 'matrix',   name: 'Матрица',      weight: 18, type: 'grid',   c1: '#04120a', c2: '#020805', line: 'rgba(95,211,95,.20)' },
        { id: 'gold-room',name: 'Чертог',       weight: 9,  type: 'rays',   c1: '#241a06', c2: '#0c0902', ray: 'rgba(224,181,59,.22)' }
    ];

    // Форма глаз
    const EYE_SHAPE = [
        { id: 'round',   name: 'Круглые',       weight: 100 },
        { id: 'sleepy',  name: 'Сонные',        weight: 70 },
        { id: 'sharp',   name: 'Острые',        weight: 65 },
        { id: 'wide',    name: 'Широкие',       weight: 55 },
        { id: 'cyclops', name: 'Циклоп',        weight: 12 },
        { id: 'three',   name: 'Третий глаз',   weight: 16, mystic: true }
    ];

    // Цвет глаз (радужка, свечение)
    const EYE_COLOR = [
        { id: 'amber',   name: 'Янтарь',        weight: 90, iris: '#f2a93b', glow: 'rgba(242,169,59,.6)' },
        { id: 'emerald', name: 'Изумруд',       weight: 80, iris: '#3ad29f', glow: 'rgba(58,210,159,.6)' },
        { id: 'azure',   name: 'Лазурь',       weight: 75, iris: '#4db5f0', glow: 'rgba(77,181,240,.6)' },
        { id: 'rose',    name: 'Роза',          weight: 60, iris: '#ff3b77', glow: 'rgba(255,59,119,.65)' },
        { id: 'violet',  name: 'Фиалка',        weight: 55, iris: '#9d5ee0', glow: 'rgba(157,94,224,.65)' },
        { id: 'blood',   name: 'Кровь',         weight: 40, iris: '#e0334a', glow: 'rgba(224,51,74,.7)' },
        { id: 'toxic',   name: 'Токсик',        weight: 30, iris: '#7dff4d', glow: 'rgba(125,255,77,.7)' },
        { id: 'gold',    name: 'Золото',        weight: 16, iris: '#ffd24d', glow: 'rgba(255,210,77,.75)' },
        { id: 'void',    name: 'Пустота',       weight: 12, iris: '#0a0a0f', glow: 'rgba(180,80,255,.55)', dark: true }
    ];

    // Рот / выражение
    const MOUTH = [
        { id: 'neutral', name: 'Спокойный',     weight: 100 },
        { id: 'smile',   name: 'Улыбка',        weight: 70 },
        { id: 'smirk',   name: 'Ухмылка',       weight: 60 },
        { id: 'open',    name: 'Мяу',           weight: 45 },
        { id: 'fangs',   name: 'Клыки',         weight: 35 },
        { id: 'grin',    name: 'Оскал',         weight: 22 }
    ];

    // Головной убор (включая «без»)
    const HEADWEAR = [
        { id: 'none',    name: 'Без убора',     weight: 120 },
        { id: 'halo',    name: 'Нимб',          weight: 30, color: '#ffd96a' },
        { id: 'horns',   name: 'Рога',          weight: 40, color: '#2a2a30' },
        { id: 'crown',   name: 'Корона',        weight: 18, color: '#e0b53b' },
        { id: 'tophat',  name: 'Цилиндр',       weight: 35, color: '#15151b' },
        { id: 'beanie',  name: 'Шапка',         weight: 45, color: '#8e2233' },
        { id: 'hood',    name: 'Капюшон',       weight: 38, color: '#1b1d24' },
        { id: 'wizard',  name: 'Колпак мага',   weight: 22, color: '#3a1d6e' },
        { id: 'flame',   name: 'Пламя',         weight: 12, color: '#ff7a1a', glow: true },
        { id: 'antenna', name: 'Антенны',       weight: 16, color: '#aeb6c4' }
    ];

    // Очки / маска (включая «без»)
    const EYEWEAR = [
        { id: 'none',    name: 'Без очков',     weight: 150 },
        { id: 'round',   name: 'Круглые очки',  weight: 40, color: '#1a1a22' },
        { id: 'shades',  name: 'Тёмные очки',   weight: 45, color: '#0c0c10' },
        { id: 'visor',   name: 'Визор',         weight: 24, color: '#ff3b77', glow: true },
        { id: 'monocle', name: 'Монокль',       weight: 18, color: '#e0b53b' },
        { id: 'eyepatch',name: 'Повязка',       weight: 22, color: '#15151b' },
        { id: 'vr',      name: 'VR',            weight: 14, color: '#229ed9', glow: true }
    ];

    // Аксессуар на шее (включая «без»)
    const NECKWEAR = [
        { id: 'none',    name: 'Без аксессуара',weight: 130 },
        { id: 'collar',  name: 'Ошейник',       weight: 55, color: '#8e2233' },
        { id: 'bell',    name: 'Колокольчик',   weight: 45, color: '#e0b53b' },
        { id: 'bowtie',  name: 'Бабочка',       weight: 40, color: '#9d26cd' },
        { id: 'chain',   name: 'Цепь',          weight: 30, color: '#cfd6e2' },
        { id: 'scarf',   name: 'Шарф',          weight: 34, color: '#229ed9' },
        { id: 'amulet',  name: 'Амулет',        weight: 18, color: '#3ad29f', glow: true }
    ];

    // Особая аура / спецэффект (включая «без»)
    const AURA = [
        { id: 'none',    name: 'Без ауры',      weight: 160 },
        { id: 'sparks',  name: 'Искры',         weight: 40, color: 'rgba(255,59,119,.9)' },
        { id: 'mist',    name: 'Дымка',         weight: 35, color: 'rgba(157,38,205,.5)' },
        { id: 'stars',   name: 'Звёзды',        weight: 28, color: 'rgba(255,236,150,.95)' },
        { id: 'glitch',  name: 'Глитч',         weight: 16, color: 'rgba(95,211,95,.8)' },
        { id: 'halo-ring',name:'Кольцо',        weight: 12, color: 'rgba(255,210,77,.8)' },
        { id: 'flames',  name: 'Адское пламя',  weight: 8,  color: 'rgba(255,90,20,.9)' }
    ];

    // Категории в порядке отрисовки/отображения
    const TRAITS = [
        { key: 'background', label: 'Фон',          options: BACKGROUND },
        { key: 'fur',        label: 'Окрас',        options: FUR },
        { key: 'pattern',    label: 'Узор',         options: PATTERN },
        { key: 'eyeShape',   label: 'Глаза',        options: EYE_SHAPE },
        { key: 'eyeColor',   label: 'Цвет глаз',    options: EYE_COLOR },
        { key: 'mouth',      label: 'Рот',          options: MOUTH },
        { key: 'headwear',   label: 'Убор',         options: HEADWEAR },
        { key: 'eyewear',    label: 'Очки',         options: EYEWEAR },
        { key: 'neckwear',   label: 'Аксессуар',    options: NECKWEAR },
        { key: 'aura',       label: 'Аура',         options: AURA }
    ];

    function totalCombinations() {
        return TRAITS.reduce((acc, t) => acc * t.options.length, 1);
    }

    global.NC_TRAITS = { TRAITS, totalCombinations };

})(window);
