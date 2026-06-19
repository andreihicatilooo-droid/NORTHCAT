# 🎨 NORTHCAT Visual Identity

**Полное руководство визуальной идентичности NORTHCAT (Северный Кот)**

Темная готическая студия татуировок с мистическим и оккультным подтекстом.

---

## 📋 Содержание

1. [Философия Бренда](#философия-бренда)
2. [Цветовая Палитра](#цветовая-палитра)
3. [Типография](#типография)
4. [Логотип & Эмблемы](#логотип--эмблемы)
5. [Магические Элементы & Символы](#магические-элементы--символы)
6. [Анимации & Эффекты](#анимации--эффекты)
7. [Иконография](#иконография)
8. [CSS Переменные](#css-переменные)
9. [Гайдлайны Использования](#гайдлайны-использования)

---

## 🌙 Философия Бренда

**NORTHCAT** — это символ магии, силы и мистицизма.

### Ключевые Принципы
- **Мистика**: Оккультные символы, пентаграммы, третий глаз
- **Сила**: Сфинкс как мудрый, защищающий, магический персонаж
- **Баланс**: Священная геометрия как отражение гармонии
- **Элегантность**: Blackletter типография, минималистичные линии

### Целевая Аудитория
- Любители черных (blackwork) татуировок
- Поклонники готики и оккультизма
- Люди с интересом к священной геометрии
- Ценители премиум-дизайна и мастерства

### Основные Характеристики
- **Стиль**: Dark Gothic, Occult, Sacred Geometry
- **Главный мотив**: Sphinx Cat (магический кот сфинкс) — Северный Кот
- **Цветовая схема**: Hot Pink (#f4587e) на Dark Green-Black (#0c120e)
- **Формат**: Печать (300 DPI) + Web (72 DPI)
- **Язык**: Русский + English (Cyrillic + Latin)

---

## 🎨 Цветовая Палитра

### Основные Цвета

| Название | Hex | RGB | CMYK | Использование | Пример |
|----------|-----|-----|------|---|---|
| **Primary Pink** | `#f4587e` | 244, 88, 126 | 10, 85, 30, 0 | Основные акценты, текст, иконки | 🔴 |
| **Dark BG** | `#0c120e` | 12, 18, 14 | 55, 30, 40, 85 | Фон, базовый цвет | ⬛ |
| **Secondary Purple** | `#9d4edd` | 157, 78, 221 | 35, 65, 0, 13 | Вторичные акценты, тени | 🟣 |
| **Magenta** | `#e0aaff` | 224, 170, 255 | 12, 33, 0, 0 | Highlights, светлые акценты | 🌸 |

### Нейтральные Цвета

| Название | Hex | RGB | Использование |
|----------|-----|-----|---|
| **White** | `#ffffff` | 255, 255, 255 | Текст, контрастные элементы |
| **Light Gray** | `#f5f5f5` | 245, 245, 245 | Фон карточек, легкие элементы |
| **Dark Gray** | `#2d2d2d` | 45, 45, 45 | Вторичный текст, линии |
| **Black** | `#000000` | 0, 0, 0 | Максимальный контраст, границы |

### Цветовые Комбинации

**Основная схема**: Hot Pink на Dark Green-Black
```
Primary Pink (#f4587e) + Dark BG (#0c120e)
```

**Альтернативная схема**: Purple + Pink + Dark
```
Secondary Purple (#9d4edd) + Magenta (#e0aaff) + Dark BG (#0c120e)
```

**Монохроматическая** (для печати):
```
Черный (#000000) + Белый (#ffffff) + Серый (#2d2d2d)
```

---

## 🔤 Типография

### Заголовки (Headings)

**Font**: Blackletter (готический стиль)

```
h1 {
  font-family: 'Blackletter', 'Georgia', serif;
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #f4587e;
}

h2 {
  font-family: 'Blackletter', 'Georgia', serif;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 0.04em;
  color: #f4587e;
}

h3 {
  font-family: 'Blackletter', 'Georgia', serif;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.03em;
  color: #9d4edd;
}
```

### Основной Текст (Body)

**Font**: Inter, Open Sans (или похожий modern sans-serif)

```
body {
  font-family: 'Inter', 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #ffffff;
  font-weight: 400;
}

p {
  font-size: 16px;
  line-height: 1.8;
  letter-spacing: 0.02em;
}
```

### Акцентный Текст

**Font**: Georgia (классический serif)

```
.accent {
  font-family: 'Georgia', serif;
  font-style: italic;
  color: #e0aaff;
}
```

### Специальные Элементы

| Тип | Font | Размер | Стиль |
|-----|------|--------|-------|
| Логотип | Blackletter | 48-72px | Bold, Uppercase |
| Подзаголовок | Georgia | 18-24px | Regular, Italic |
| Кнопки | Inter | 14px | Bold, Uppercase |
| Подпись | Inter | 12px | Regular |

---

## 🎭 Магические Элементы & Символы

### Основные Символы

#### 1. Пентаграмма (Pentagram)
- **Значение**: Защита, баланс, магия
- **Использование**: Геометрический фон, сетка эмблемы
- **Стиль**: Тонкие линии (#f4587e), opacity 0.3
- **Размер**: По размеру эмблемы

#### 2. Третий Глаз (Third Eye)
- **Значение**: Мистическое видение, интуиция, просветление
- **Позиция**: На лбу кота (центральный элемент)
- **Цвет**: Hot Pink (#f4587e) с glow фильтром
- **Размер**: 15px радиус
- **Анимация**: Непрерывный glow эффект

#### 3. Песочные Часы (Hourglass)
- **Значение**: Время, вечность, бесконечность
- **Позиция**: Левый угол эмблемы
- **Стиль**: Минималистичные линии, 2-3px stroke

#### 4. Магическая Руна (Rune)
- **Значение**: Сила, защита, магическая мощь
- **Позиция**: Правый угол эмблемы
- **Стиль**: Геометрические кресты и линии

---

## 🐱 Логотип & Эмблемы

### Основная Эмблема — Магическая Печать

**Официальный файл**: `/resources/design/emblems/northcat-seal-design.html`

**Характеристики**:
- **Размер**: 1080x1080px (квадрат, фиксированный)
- **Формат**: Self-contained HTML5 с embedded SVG + CSS + JS
- **Фон**: Dark green-black (#0c120e)
- **Цвета**: Hot Pink (#f4587e) основной, Purple (#9d4edd) вторичный
- **Язык**: Русский (Cyrillic) + English

**Элементы Структуры**:

1. **Центральный Элемент — Sphinx Cat**
   - Голова с острыми ушами
   - Два основных глаза (светящиеся Hot Pink)
   - Миндалевидные зрачки (черные)
   - Белые блики в глазах (реалистичность)
   - Третий глаз на лбу (мистический центр)
   - Нос (Hot Pink, эллиптический)
   - Рот (две дуги, улыбка)
   - 4 длинных усов (по 2 с каждой стороны)
   - Контур головы (Purple stroke)

2. **Концентрические Круги**
   - Внешний круг 1: r=500px (граница эмблемы)
   - Внешний круг 2: r=480px (основной stroke)
   - Внешний круг 3: r=460px (тонкая линия)
   - Внутренний круг: r=300px (граница кота)
   - Все анимированы (rotate 60s linear infinite reverse)

3. **Текст по Кругу**
   - **Верхний текст**: "NORTHCAT" (72px, Blackletter, bold, letter-spacing 8px)
   - **Нижний текст**: "СЕВЕРНЫЙ КОТ" (48px, Cyrillic, letter-spacing 4px)
   - **Подпись внизу**: "Тату студия" (24px, центр по X, y=850)

4. **Геометрические Элементы**
   - Пентаграмма (сетка пересечений)
   - Вертикальная линия: x=500, y1=80, y2=920
   - Горизонтальная линия: y=500, x1=80, x2=920
   - Диагональ 1: (150,150) → (850,850)
   - Диагональ 2: (850,150) → (150,850)
   - Все со stroke="#f4587e", opacity 0.3

5. **Магические Символы в Углах**
   - **Левый угол** (100, 150): Песочные часы (hourglass)
   - **Правый угол** (850, 180): Магическая руна (cross pattern)

6. **Декоративный Элемент**
   - Хвост кота: Bezier curve, Purple (#9d4edd), stroke-width 8, opacity 0.6

7. **Фоновая Сетка**
   - SVG pattern с диагональными линиями
   - Angle 45° и -45°
   - Opacity 0.2, stroke-width 1

### Анимации Эмблемы

**Rotate Animation**
```css
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.outer-circle { animation: rotate 60s linear infinite reverse; }
```
- Применяется к: Оба внешних круга (r=500 и r=480)
- Скорость: 60 секунд полный оборот
- Направление: Reverse (против часовой стрелки)

**Pulse Animation** (Пульсирование глаз)
```css
@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.cat-eyes { animation: pulse 2s ease-in-out infinite; }
```
- Применяется к: Весь элемент `.cat-eyes` (оба глаза + третий глаз)
- Скорость: 2 секунды на цикл
- Эффект: Мягкое мигание, создающее ощущение жизни

**Glow Animation** (Магическое сияние)
```css
@keyframes glow {
  0%, 100% { filter: drop-shadow(0 0 10px rgba(244, 88, 126, 0.3)); }
  50% { filter: drop-shadow(0 0 30px rgba(244, 88, 126, 0.8)); }
}
.inner-glow { animation: glow 3s ease-in-out infinite; }
```
- Применяется к: Внутренний круг (r=300)
- Скорость: 3 секунды на цикл
- Эффект: Дыхание светом, усиление/ослабление glow

**SVG Filters**
```xml
<filter id="glow">
  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
  <feMerge>
    <feMergeNode in="coloredBlur"/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>
```
- Применяется к: Глазам кота и третьему глазу
- Эффект: Размытый свет вокруг элементов

**Drop Shadow на SVG**
```css
svg { filter: drop-shadow(0 0 20px rgba(244, 88, 126, 0.3)); }
```

### JavaScript Интерактивность

**Mouse Events**
```javascript
emblem.addEventListener('mouseenter', function() {
  const outerCircles = document.querySelectorAll('.outer-circle');
  outerCircles.forEach(circle => {
    circle.style.animationPlayState = 'running';
  });
});
```
- При наведении мыши: анимация продолжает работать (обычно так и есть)

**Click Event**
```javascript
emblem.addEventListener('click', function() {
  const catEyes = document.querySelector('.cat-eyes');
  catEyes.style.animation = 'none';
  setTimeout(() => {
    catEyes.style.animation = '';
  }, 100);
});
```
- При клике: глаза перезапускают animation, создавая эффект "вспышки"

---

### Горизонтальные Варианты Логотипа

**Использование**: Веб-сайт, социальные сети, печать

### Горизонтальный Логотип

**Использование**: Веб-сайт, соцсети, печать

```
[KOT] NORTHCAT [TAIL]
      Тату студия
```

**Варианты**:
- С текстом (полный)
- Только иконка (сокращенный)
- Монохроматический (черный/белый)

### Иконка Логотипа

**Размер**: 256x256px (веб), 512x512px (высокое разрешение)

**Использование**:
- Favicon в браузере
- Avatar в соцсетях
- Мобильное приложение
- Меркендайз

---

## 🎭 Иконография

### Стиль Иконок

- **Linestyle**: Тонкие линии, 1-2px
- **Цвет**: Hot Pink (#f4587e) или White (#ffffff)
- **Размер**: 16px, 24px, 32px, 48px
- **Стиль**: Минималистичный, геометрический

### Базовый Набор Иконок

| Иконка | Использование | SVG Code |
|--------|----------------|----------|
| 🐱 Кот | Логотип, меню | `<path>` |
| 📍 Локация | Адрес студии | Простая иконка |
| 📞 Телефон | Контакты | Простая иконка |
| 📧 Письмо | Email | Простая иконка |
| ⭐ Звезда | Рейтинг | Простая иконка |
| ❤️ Сердце | Нравится | Простая иконка |
| 🔔 Уведомление | Алерт | Простая иконка |
| ✨ Магия | Спецэффекты | Звездочка |

### Примеры SVG

```svg
<!-- Кот иконка (простая) -->
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="12" cy="14" rx="8" ry="9" fill="none" stroke="#f4587e" stroke-width="1"/>
  <path d="M 8 4 L 4 2 M 16 4 L 20 2" stroke="#f4587e" stroke-width="1"/>
  <circle cx="10" cy="13" r="2" fill="#f4587e"/>
  <circle cx="14" cy="13" r="2" fill="#f4587e"/>
  <path d="M 12 16 L 12 18" stroke="#f4587e" stroke-width="1"/>
</svg>

<!-- Пентаграмма (символ) -->
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <polygon points="12,2 15,10 23,10 17,16 20,24 12,19 4,24 7,16 1,10 9,10" 
           fill="none" stroke="#f4587e" stroke-width="1"/>
</svg>
```

---

## 📸 Фотография & Визуалы

### Стиль Фотографии

**Характеристики**:
- **Освещение**: Темное, с контрастным светом
- **Контрастность**: Высокая контрастность (черное + розовое)
- **Композиция**: Крупные планы, детали, минимализм
- **Цветокоррекция**: Холодный оттенок + теплые акценты

### Типы Визуалов

#### 1. Портфолио Татуировок
- Разрешение: 1920x1440 px минимум
- Формат: JPG (оптимизированный), PNG (оригинал)
- Размер файла: < 500KB (веб), < 10MB (печать)
- Категории: Traditional, Dotwork, Sacred Geometry, Geometric, Blackwork

#### 2. Портреты Студии
- Оборудование, интерьер
- Портреты мастеров
- Процесс работы (timelapse)

#### 3. Социальные Медиа
- **Instagram Square**: 1080x1080px
- **Instagram Story**: 1080x1920px
- **Facebook**: 1200x628px
- **Twitter**: 1024x512px

### Обработка Изображений

```css
/* Фильтр для темного стиля */
filter: brightness(0.8) contrast(1.2) saturate(1.1) hue-rotate(-10deg);

/* Для экстремного вида */
filter: grayscale(0.3) contrast(1.5) brightness(0.7);

/* Для выделения деталей */
filter: brightness(1.1) contrast(1.3) saturate(1.2);
```

---

## 🏗️ Макеты & Структура

### Веб-сайт (northcat.top)

```
┌─────────────────────────────────┐
│  LOGO   [Menu]        [CTA]     │  Header
├─────────────────────────────────┤
│                                 │
│    HERO IMAGE / VIDEO           │  Hero Section
│                                 │
├─────────────────────────────────┤
│  PORTFOLIO GRID (3 колонки)     │  Portfolio
├─────────────────────────────────┤
│  ABOUT / ARTISTS                │  About Section
├─────────────────────────────────┤
│  TESTIMONIALS                   │  Social Proof
├─────────────────────────────────┤
│  BOOKING FORM                   │  CTA
├─────────────────────────────────┤
│  Footer [Links] [Social] [Info] │  Footer
└─────────────────────────────────┘
```

### Гайдлайны Макета

- **Ширина контента**: 1200px (max)
- **Гутер**: 20px (мобильный), 40px (desktop)
- **Межстрочный интервал**: 1.6
- **Отступы секций**: 60px (top/bottom)

### Spacing (Отступы)

```css
/* CSS Переменные для отступов */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

---

---

## 🎨 Анимации & Эффекты

### CSS Animations (встроены в northcat-seal-design.html)

#### Rotate - Вращение Внешних Кругов
- **Скорость**: 60 сек на полный оборот
- **Направление**: Обратное (reverse)
- **Применение**: `.outer-circle` элементы
- **Эффект**: Создает ощущение магического движения

#### Pulse - Пульсирование Глаз
- **Скорость**: 2 сек на цикл
- **Диапазон opacity**: 0.6 → 1.0
- **Эффект**: Глаза "дышат", создавая жизнь в дизайне

#### Glow - Магическое Сияние
- **Скорость**: 3 сек на цикл
- **Эффект**: Усиление/ослабление drop-shadow
- **Цвет**: Hot Pink с вариацией интенсивности
- **Применение**: `.inner-glow` элементы

### SVG Filters

**Gaussian Blur Filter** (для glow эффектов)
```xml
<filter id="glow">
  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
  <feMerge>
    <feMergeNode in="coloredBlur"/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>
```

**Drop Shadow Filter**
```css
svg { filter: drop-shadow(0 0 20px rgba(244, 88, 126, 0.3)); }
```

---

## 🎨 CSS Переменные и Дизайн Система

### Основные Цвета

```css
:root {
  /* Primary Colors */
  --color-primary-pink: #f4587e;
  --color-primary-pink-rgb: 244, 88, 126;
  --color-dark-bg: #0c120e;
  --color-dark-bg-rgb: 12, 18, 14;
  
  /* Secondary Colors */
  --color-secondary-purple: #9d4edd;
  --color-magenta: #e0aaff;
  
  /* Neutral */
  --color-white: #ffffff;
  --color-gray-light: #f5f5f5;
  --color-gray-dark: #2d2d2d;
  --color-black: #000000;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #f4587e 0%, #9d4edd 100%);
  --gradient-dark: linear-gradient(135deg, #0c120e 0%, #1a1a1f 100%);
  --gradient-ghost: linear-gradient(135deg, rgba(244, 88, 126, 0.1) 0%, rgba(157, 78, 221, 0.1) 100%);
  
  /* Shadow & Glow */
  --shadow-glow: 0 0 20px rgba(244, 88, 126, 0.3);
  --shadow-glow-strong: 0 0 30px rgba(244, 88, 126, 0.8);
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  --box-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.25);
}
```

### Типография

```css
:root {
  /* Fonts */
  --font-heading: 'Blackletter', 'Georgia', serif;
  --font-body: 'Inter', 'Open Sans', sans-serif;
  --font-accent: 'Georgia', serif;
  
  /* Font Sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;
  
  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-black: 900;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.6;
  --line-height-relaxed: 1.8;
}
```

### Spacing & Sizing

```css
:root {
  /* Spacing Scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 999px;
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(244, 88, 126, 0.15);
  --shadow-lg: 0 8px 16px rgba(244, 88, 126, 0.2);
  --shadow-xl: 0 16px 32px rgba(244, 88, 126, 0.25);
  
  /* Transitions */
  --transition-fast: 0.15s ease-in-out;
  --transition-base: 0.3s ease-in-out;
  --transition-slow: 0.5s ease-in-out;
}
```

### Breakpoints (Адаптивность)

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* tablets */
--breakpoint-md: 768px;   /* small tablets */
--breakpoint-lg: 1024px;  /* desktops */
--breakpoint-xl: 1280px;  /* large desktops */
--breakpoint-2xl: 1536px; /* very large screens */
```

---

## 📏 Размеры и Применение

### Веб-сайт (northcat.top)

| Использование | Размер | Формат | DPI |
|---|---|---|---|
| Hero Section | 1920x1080px | PNG/SVG | 72 |
| Header Logo | 256x256px | PNG/SVG | 72 |
| Footer Logo | 200x200px | PNG/SVG | 72 |
| Favicon | 64x64px | ICO/PNG | 72 |
| Social Profile | 1080x1080px | PNG | 72 |
| Background Pattern | Full width | SVG/PNG | 72 |

### Социальные Сети

| Платформа | Размер | Формат | Примечание |
|---|---|---|---|
| **Instagram** Profile | 1080x1080px | PNG | Seal design |
| **Instagram** Post | 1080x1080px | PNG | Landscape logo v2 |
| **Instagram** Story | 1080x1920px | PNG | Vertical variant |
| **TikTok** Video | 1080x1920px | MP4 | With animation |
| **Facebook** Cover | 1200x628px | PNG | Landscape v1 |
| **Twitter** Header | 1024x512px | PNG | Landscape v2 |

### Печать & Меркендайз

| Товар | Размер | DPI | Формат |
|---|---|---|---|
| T-Shirt Design | 1200x1200px | 300 | PNG + Transparency |
| Sticker | 800x800px | 300 | PNG + Transparency |
| Patch | 600x600px | 300 | PNG + Transparency |
| Business Card | 200x200px | 300 | PNG/PDF |
| Poster | Full Seal | 300 | PDF/PNG |

### Telegram Bot

| Использование | Размер | Формат | Размер файла |
|---|---|---|---|
| Avatar | 256x256px | PNG | < 100KB |
| Inline Image | 800x800px | PNG | < 300KB |
| Profile Logo | 200x200px | PNG | < 50KB |

---

## ✅ Гайдлайны Использования

### Do's (Правила)

✅ **Используйте основные цвета**
- Hot Pink (#f4587e) на Dark Background (#0c120e)
- Поддерживайте высокий контраст

✅ **Сохраняйте пропорции**
- Не растягивайте логотип (aspect ratio 1:1)
- Оставляйте пространство вокруг эмблемы

✅ **Применяйте магический дух**
- Используйте glow эффекты на интерактивных элементах
- Поддерживайте мистический/готический стиль

✅ **Соблюдайте типографию**
- Blackletter для заголовков
- Inter/Open Sans для основного текста

✅ **Адаптируйте для платформ**
- Web: 72 DPI
- Печать: 300 DPI

### Don'ts (Запреты)

❌ **Не изменяйте основные элементы**
- Не убирайте третий глаз кота (ключевой символ)
- Не перекрашивайте без необходимости

❌ **Не нарушайте пропорции**
- Не растягивайте горизонтально/вертикально
- Не масштабируйте неравномерно

❌ **Не упрощайте без согласования**
- Сохраняйте детали (усы, геометрия, символы)
- Не удаляйте магические элементы

❌ **Не смешивайте стили**
- Не добавляйте casual элементы в готический дизайн
- Не комбинируйте с несовместимыми шрифтами

❌ **Не используйте неправильные цвета**
- Не применяйте яркие, неоновые варианты
- Сохраняйте темную палитру

---

## 🔗 Связанные Файлы

### Основные Ассеты
- **HTML5 Emblem**: `/resources/design/emblems/northcat-seal-design.html`
- **Logos**: `/resources/images/branding/logos/`
- **Seals**: `/resources/images/branding/seals/`
- **Fonts**: `/resources/fonts/`
- **Styles**: `/resources/styles/`

### Документация
- **Project Memory**: `/docs/PROJECT_MEMORY.md`
- **Resources Links**: `/docs/RESOURCES_LINKS.md`
- **Brand Assets README**: `/resources/README.md`

### External Links
- **Canva Project**: https://www.canva.com/d/1WIUhM7eGyk1FpF
- **Website**: https://northcat.top

---

## 💡 Примеры Использования

### HTML + CSS

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <style>
    :root {
      --color-primary-pink: #f4587e;
      --color-dark-bg: #0c120e;
      --font-heading: 'Blackletter', serif;
    }
    
    body {
      background: var(--color-dark-bg);
      color: #ffffff;
      font-family: var(--font-body);
    }
    
    h1 {
      font-family: var(--font-heading);
      color: var(--color-primary-pink);
      font-size: 48px;
    }
    
    .btn-primary {
      background: var(--color-primary-pink);
      color: var(--color-dark-bg);
      padding: 12px 24px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    
    .btn-primary:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 16px rgba(244, 88, 126, 0.3);
    }
  </style>
</head>
<body>
  <header>
    <img src="/logo.svg" alt="NORTHCAT" />
    <nav>
      <a href="#portfolio">Портфолио</a>
      <a href="#about">О нас</a>
      <a href="#contact">Контакты</a>
    </nav>
  </header>
  
  <section class="hero">
    <h1>Магические Татуировки</h1>
    <p>Премиум студия темной готической татуировки</p>
    <button class="btn-primary">Забронировать сеанс</button>
  </section>
</body>
</html>
```

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      'northcat-pink': '#f4587e',
      'northcat-dark': '#0c120e',
      'northcat-purple': '#9d4edd',
      'northcat-magenta': '#e0aaff',
    },
    fontFamily: {
      'heading': ['Blackletter', 'Georgia', 'serif'],
      'body': ['Inter', 'Open Sans', 'sans-serif'],
      'accent': ['Georgia', 'serif'],
    },
    spacing: {
      'xs': '4px',
      'sm': '8px',
      'md': '16px',
      'lg': '24px',
      'xl': '32px',
      '2xl': '48px',
      '3xl': '64px',
    },
  },
}
```

---

## 📱 Адаптивность

### Mobile First Approach

```css
/* Mobile (320px+) */
body { font-size: 14px; }
h1 { font-size: 24px; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  body { font-size: 16px; }
  h1 { font-size: 36px; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  body { font-size: 16px; }
  h1 { font-size: 48px; }
}
```

---

## 🔗 Связанные Документы

- **[docs/RESOURCES_LINKS.md](./RESOURCES_LINKS.md)** — Ссылки на инструменты
- **[resources/README.md](../resources/README.md)** — Структура медиа-ассетов
- **[docs/NORTHCAT-REQUIREMENTS.md](./NORTHCAT-REQUIREMENTS.md)** — Технические требования

---

---

## 📝 История Версий

| Версия | Дата | Статус | Изменения |
|--------|------|--------|-----------|
| 1.0 | 18.06.2026 | ✅ Завершено | Начальная версия. Определены цвета, типография, иконография |
| 2.0 | 19.06.2026 | ✅ Завершено | **Крупное обновление**: Добавлены полные спецификации эмблемы, анимации, SVG фильтры, магические элементы, гайдлайны использования |
| 2.1 | TBD | ⏳ Планируется | Экспорты в PNG/SVG, дополнительные варианты логотипов, Canva интеграция |

---

## 🎯 Статус Завершения

- ✅ **Философия бренда** — определена и документирована
- ✅ **Цветовая палитра** — установлена (Primary Pink + Dark BG + вторичные)
- ✅ **Типография** — Blackletter (headings) + Inter (body)
- ✅ **Главная эмблема** — создана и экспортирована в Adobe Express
  - Sphinx cat с третьим глазом
  - Концентрические анимированные круги
  - Магические символы (песочные часы, руна)
  - Пентаграмма и священная геометрия
  - Полные текстуры (English + Cyrillic)
- ✅ **Анимации & эффекты** — реализованы (rotate, pulse, glow)
- ✅ **SVG фильтры** — настроены (Gaussian blur, drop shadow)
- ✅ **Гайдлайны** — составлены (do's & don'ts)
- ⏳ **PNG/SVG экспорты** — в процессе
- ⏳ **Горизонтальные логотипы** — готовятся (v1-v3)
- ⏳ **Веб-интеграция** — предстоит

---

**Проект**: NORTHCAT / Северный Кот  
**Дизайнер**: Dark Voio Studio  
**Тип**: Dark Gothic Tattoo Studio Brand  
**Веб-сайт**: https://northcat.top  
**Главный Ассет**: `/resources/design/emblems/northcat-seal-design.html`  
**Последнее обновление**: 19.06.2026  
**Версия**: 2.0  
**Статус**: 🟢 Active Development
