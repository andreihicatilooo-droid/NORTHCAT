# 🎨 NORTHCAT Visual Identity

**Dark Gothic Tattoo Studio Brand Guidelines**

---

## 📋 Содержание

1. [Обзор](#обзор)
2. [Цветовая Палитра](#цветовая-палитра)
3. [Типография](#типография)
4. [Логотип & Эмблемы](#логотип--эмблемы)
5. [Иконография](#иконография)
6. [Фотография & Визуалы](#фотография--визуалы)
7. [Макеты & Структура](#макеты--структура)
8. [CSS Переменные](#css-переменные)
9. [Примеры использования](#примеры-использования)

---

## 📌 Обзор

**NORTHCAT** — премиум-бренд темной готической студии татуировок с мистическим уклоном.

- **Стиль**: Dark Gothic, Occult, Sacred Geometry
- **Основной мотив**: Магический кот сфинкс (Северный кот)
- **Целевая аудитория**: Любители черных татуировок, готика, духовность
- **Основной формат**: Печать + Web (цифровой)

### Ключевые Черты Бренда
- 🖤 **Темные, мистические** визуалы
- 🌸 **Горячий розовый** (#f4587e) как акцент на темном фоне
- 👁️ **Священная геометрия** (пентаграмма, руны, символы)
- 🐱 **Кот сфинкс** как центральный персонаж бренда
- ✨ **Минималистичный, но богатый** дизайн

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

## 🐱 Логотип & Эмблемы

### Основная Эмблема

**Дизайн**: Круговая печать с котом сфинкс в центре

**Характеристики**:
- Размер: 1080x1080px (квадрат)
- Формат: SVG (масштабируемо) + PNG (растр)
- Фон: Темный (#0c120e)
- Основной цвет: Hot Pink (#f4587e) + Purple (#9d4edd)

**Элементы эмблемы**:
1. **Кот сфинкс** (центр)
   - Голова с острыми ушами
   - Светящиеся глаза (hot pink)
   - Третий глаз на лбу (мистический символ)
   - Декоративные усы

2. **Текст по кругу** (верх)
   - "NORTHCAT" (blackletter)
   - Язык: English

3. **Текст по кругу** (низ)
   - "СЕВЕРНЫЙ КОТ" (кириллица)
   - "Тату студия" (подпись)

4. **Магические символы** (углы)
   - ⌛ Песочные часы (левый угол) — время, вечность
   - 🔮 Магическая руна (правый угол) — сила, магия
   - ♦️ Пентаграмма (фон) — защита, баланс

5. **Оформление**
   - Две концентрических окружности (граница)
   - Геометрическая сетка (фон)
   - Линии священной геометрии (диагонали)

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

## 🎨 CSS Переменные

### Цвета

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

## 📝 История Версий

| Версия | Дата | Изменения |
|--------|------|-----------|
| 1.0 | 18.06.2026 | Начальная версия. Определены цвета, типография, иконография |
| 1.1 | TBD | Добавлены примеры использования и CSS переменные |

---

**Дизайнер**: Dark Voio Studio  
**Бренд**: NORTHCAT / Северный Кот  
**Сайт**: northcat.top  
**Последнее обновление**: 18.06.2026
