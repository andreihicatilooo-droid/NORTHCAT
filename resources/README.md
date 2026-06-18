# 🎨 NORTHCAT Resources

Папка с ресурсами проекта: дизайн-ассеты, изображения, видео, стили и шрифты.

> **Аудит 14.06.2026:** папки созданы, ассетов почти нет. Медиа сейчас в `services/website/`.
> 
> **Обновление 18.06.2026:** ✅ Добавлены:
> - Интерактивная HTML5 эмблема (northcat-emblem.html - 1.4MB)
> - Видео портфолио (northcat-portfolio.mp4 - 2.1MB)
> - 6 фото-ассетов в `/images/assets/`
>
> Оставшиеся недочёты: **GAP-003** (нет `docs/VISUAL_IDENTITY.md`), CSS переменные & шрифты еще не загружены.

---

## 📁 Структура

```
resources/
├── design/                   # Дизайн-файлы и гайды
│   ├── canva/               # Canva проекты (ссылки)
│   ├── brand-assets/        # Brand guidelines
│   ├── emblems/             # ✅ Интерактивные эмблемы (HTML5)
│   └── colors/              # Цветовые палитры
│
├── images/                  # Изображения
│   ├── gallery/             # Фото работ (высокое разрешение)
│   ├── branding/            # Логотипы, иконки
│   ├── assets/              # ✅ 6 фото (добавлены 18.06.2026)
│   └── logo-variations/     # Варианты логотипа
│
├── videos/                  # Видео-контент
│   ├── portfolio/           # ✅ Видео портфолио (добавлено 18.06.2026)
│   └── tutorials/           # Видео туториалы
│
├── styles/                  # Глобальные CSS стили
│   ├── colors.css           # Цвета и палитра
│   ├── typography.css       # Шрифты
│   ├── variables.css        # CSS переменные
│   └── animations.css       # Анимации
│
└── fonts/                   # Веб-шрифты
    ├── blackletter/         # Blackletter (заголовки)
    └── body/                # Body шрифты
```

---

## 🎨 Design Assets

### `/design/canva/`
Ссылки на Canva проекты:
- 🔗 [NORTHCAT Main Brand](https://www.canva.com/d/1WIUhM7eGyk1FpF)
- 🔗 [Logo Variations]()
- 🔗 [Social Media Templates]()

### `/design/brand-assets/`
- Brand guidelines document
- Color specifications (hex, RGB, CMYK)
- Typography rules
- Logo usage guidelines
- Icon set

### `/design/colors/`
- Hex color codes
- RGB values
- CMYK values (для печати)
- Palette exports

---

## 🖼️ Images

### `/images/gallery/`
High-resolution tattoo portfolio photos:
- **Naming**: `tattoo_001_style.jpg`
- **Format**: JPG (optimized), PNG (original)
- **Resolution**: 1920x1440 minimum
- **Size**: < 500KB (optimized)

#### Organization
```
gallery/
├── traditional/
├── dotwork/
├── sacred-geometry/
├── geometric/
├── blackwork/
├── watercolor/
└── experimental/
```

### `/images/branding/`
Logos and brand elements:
- `logo_circular_seal.png` - Full branding seal
- `logo_landscape.png` - Website header
- `logo_icon.png` - Favicon
- `logo_mark.svg` - Logo mark only

### `/images/logo-variations/`
Different logo versions:
- Color variants
- Monochrome
- Inverted
- With/without text

---

## 🎬 Videos

### `/videos/portfolio/`
Showcase videos:
- `portfolio_reel.mp4` - Main reel
- `process_timelapse.mp4` - Creation process
- `artist_intro.mp4` - Artist introduction

### `/videos/tutorials/`
Educational content:
- Aftercare instructions
- Tattoo style explanation
- Process walkthrough

---

## 🎨 Styles

### `/styles/colors.css`
```css
:root {
  /* Primary Colors */
  --color-primary-pink: #f4587e;
  --color-dark-bg: #0c120e;
  
  /* Secondary Colors */
  --color-purple: #9d4edd;
  --color-magenta: #e0aaff;
  
  /* Neutral */
  --color-white: #ffffff;
  --color-gray-light: #f5f5f5;
  --color-gray-dark: #2d2d2d;
  --color-black: #000000;
}
```

### `/styles/typography.css`
```css
/* Headings - Blackletter */
@font-face {
  font-family: 'Blackletter';
  src: url('../fonts/blackletter/...');
}

/* Body Text */
@font-face {
  font-family: 'Body';
  src: url('../fonts/body/...');
}

h1, h2, h3 {
  font-family: 'Blackletter';
  font-weight: bold;
  letter-spacing: 0.05em;
}

body {
  font-family: 'Body';
  font-size: 16px;
  line-height: 1.6;
}
```

### `/styles/variables.css`
CSS variables для удобства:
```css
--spacing-unit: 4px;
--border-radius: 4px;
--transition-speed: 0.3s;
--box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
```

### `/styles/animations.css`
Анимации для UI:
- Fade in/out
- Slide effects
- Hover effects
- Load animations

---

## 🔤 Fonts

### `/fonts/blackletter/`
Для заголовков (ready to use):
- `blackletter-bold.woff2`
- `blackletter-regular.woff2`
- `blackletter-italic.woff2`

### `/fonts/body/`
Для основного текста:
- `inter-regular.woff2`
- `inter-bold.woff2`
- `inter-medium.woff2`

---

## 📋 Usage Guide

### For Website
```html
<!-- Link in Next.js head -->
<link href="/resources/styles/colors.css" rel="stylesheet" />
<link href="/resources/fonts/..." rel="stylesheet" />
```

### For Tailwind
```js
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      'primary-pink': '#f4587e',
      'dark-bg': '#0c120e',
    },
    fontFamily: {
      'heading': ['Blackletter'],
      'body': ['Body'],
    },
  },
}
```

### For TG Bot
```
- Use optimized images < 300KB
- Logo for messages
- Gallery images in optimized format
```

---

## 🎯 Specifications

### Image Optimization
- **Website**: 
  - Hero: 1920x1080
  - Gallery: 600x600
  - Thumbnails: 300x300

- **TG Bot**:
  - Gallery: 800x800
  - Avatar: 256x256

- **Social Media**:
  - Instagram Square: 1080x1080
  - Instagram Story: 1080x1920

### Color Codes

| Color | Hex | RGB | Use |
|-------|-----|-----|-----|
| Primary Pink | #f4587e | 244, 88, 126 | Accents, CTA |
| Dark BG | #0c120e | 12, 18, 14 | Background |
| Purple | #9d4edd | 157, 78, 221 | Secondary |
| White | #ffffff | 255, 255, 255 | Text, Cards |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Blackletter | 48px | Bold |
| H2 | Blackletter | 36px | Bold |
| H3 | Blackletter | 24px | Bold |
| Body | Body | 16px | Regular |
| Small | Body | 14px | Regular |

---

## 📝 Adding New Assets

1. **Images**: Save to appropriate `/images/` folder
2. **Videos**: Add to `/videos/` with descriptive name
3. **Fonts**: Convert to `.woff2` format
4. **Styles**: Update CSS files in `/styles/`
5. **Design**: Update Canva links in `/design/canva/`

---

## 🔒 Storage Notes

### For Large Files
- Use optimized formats (WebP, HEIC)
- Compress images before adding
- Store videos separately (consider CDN)
- Use Git LFS for binary files (if needed)

### Optimization Tools
- **Images**: ImageMagick, Tinypng
- **Videos**: FFmpeg
- **Fonts**: Google Fonts optimizer

---

## 📊 File Size Targets

| Type | Max Size |
|------|----------|
| Website images | < 200KB |
| Gallery images | < 500KB |
| TG Bot images | < 300KB |
| Videos | < 50MB |
| Fonts | < 100KB each |

---

## 🔗 Related

- Website uses: `/public/images/`
- Bot uses: Optimized images
- Styles in: Each service directory
- Design docs: `/docs/VISUAL_IDENTITY.md`

---

**Version**: 1.0.0  
**Created**: 14.06.2026  
**Maintained**: Solo developer + Claude AI
