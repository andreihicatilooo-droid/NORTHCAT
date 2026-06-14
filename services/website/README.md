# 🌐 NORTHCAT Website (northcat.top)

Веб-сайт студии NORTHCAT - Next.js приложение с портфолио, бронированием и управлением контентом.

---

## 📋 Что включено?

- ✅ Landing page с hero section
- ✅ Portfolio галерея с фильтрацией
- ✅ About page со историей студии
- ✅ Services & pricing
- ✅ Online booking system
- ✅ Contact form с email notification
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ SEO optimized
- ✅ Lighthouse optimized

---

## 🛠️ Стек технологий

- **Framework**: Next.js 14
- **Runtime**: Node.js 18+
- **Styling**: Tailwind CSS 3
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js (optional)
- **Deployment**: Vercel / Docker
- **Package Manager**: npm / yarn

---

## 🚀 Быстрый старт

### Установка

```bash
cd services/website

# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env.local

# Запустить dev сервер
npm run dev
```

Сайт откроется на `http://localhost:3000`

### Build для production

```bash
npm run build
npm start
```

---

## 📁 Структура проекта

```
website/
├── src/
│   ├── pages/
│   │   ├── _app.tsx              # App wrapper
│   │   ├── _document.tsx         # Document wrapper
│   │   ├── index.tsx             # / (Home)
│   │   ├── portfolio.tsx         # /portfolio
│   │   ├── about.tsx             # /about
│   │   ├── services.tsx          # /services
│   │   ├── booking.tsx           # /booking
│   │   ├── contact.tsx           # /contact
│   │   └── api/
│   │       ├── appointments.ts   # API endpoints
│   │       ├── gallery.ts
│   │       └── contact.ts
│   │
│   ├── components/
│   │   ├── Header.tsx            # Навигация
│   │   ├── Footer.tsx            # Подвал
│   │   ├── Gallery.tsx           # Галерея
│   │   ├── BookingForm.tsx       # Форма бронирования
│   │   ├── ContactForm.tsx       # Форма контактов
│   │   └── SEO.tsx               # SEO компонент
│   │
│   ├── styles/
│   │   ├── globals.css           # Глобальные стили
│   │   ├── Home.module.css       # Home page styles
│   │   ├── tailwind.config.js    # Tailwind конфиг
│   │   └── variables.css         # CSS переменные
│   │
│   ├── lib/
│   │   ├── api.ts                # API утилиты
│   │   ├── db.ts                 # БД конфиг
│   │   └── utils.ts              # Общие утилиты
│   │
│   └── types/
│       └── index.ts              # TypeScript типы
│
├── public/
│   ├── images/                   # Static images
│   ├── fonts/                    # Web fonts
│   └── favicons/                 # Favicons
│
├── prisma/
│   └── schema.prisma             # Prisma schema
│
├── tests/                        # Test files
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🎨 Pages (Страницы)

### Home (/)
- Hero section с логотипом NORTHCAT
- Featured gallery (6-8 работ)
- Quick services overview
- CTA buttons (Book, Gallery, Contact)

### Portfolio (/portfolio)
- Полная галерея всех работ
- Filter by style (Traditional, Dotwork, etc)
- Filter by artist
- High-res images
- Zoom на image click

### About (/about)
- История студии NORTHCAT
- Founders story
- Team members
- Values & philosophy
- Awards & achievements

### Services (/services)
- List of services
- Pricing table
- Service descriptions
- Duration & complexity
- Booking CTA

### Booking (/booking)
- Service selection
- Date picker (calendar)
- Time slot selection
- Client info form
- Email confirmation
- Success page

### Contact (/contact)
- Contact information (phone, email, address)
- Social links (Instagram, Telegram, etc)
- Contact form
- Map integration (optional)
- Hours of operation

---

## 🔌 API Endpoints

```
GET  /api/appointments           # Список записей
POST /api/appointments          # Создать запись
GET  /api/gallery               # Портфель работ
GET  /api/services              # Услуги
POST /api/contact               # Отправить сообщение
POST /api/email/send            # Отправить email
```

---

## 🎯 Компоненты

### Header
- Logo + navigation
- Mobile hamburger menu
- Dark mode toggle
- Sticky on scroll

### Footer
- Contact info
- Social links
- Copyright
- Links (About, Services, etc)

### Gallery
- Responsive grid
- Lazy loading
- Light box modal
- Filter/search

### Forms
- Contact form
- Booking form
- Validation
- Error handling
- Success messages

---

## 🔑 Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://northcat.top
DATABASE_URL=postgresql://user:password@localhost:5432/northcat
API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_ANALYTICS_ID=...
```

---

## 📱 Responsive Design

- **Mobile**: < 640px (Tailwind sm)
- **Tablet**: 640px - 1024px (Tailwind md/lg)
- **Desktop**: > 1024px (Tailwind xl/2xl)

Все компоненты mobile-first

---

## 🎨 Брендинг

### Цвета
- Primary: Hot pink `#f4587e`
- Dark: `#0c120e`
- Secondary: Purple/magenta

### Typography
- Heading: Blackletter font
- Body: Clean sans-serif
- Font size: Responsive

### Spacing
- Based on Tailwind (4px, 8px, 16px, etc)
- Consistent padding/margin

---

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm test:watch

# Coverage
npm test:coverage

# E2E tests
npm run test:e2e
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Connect GitHub repo
# Auto-deploys on push

# Or manual
vercel deploy
```

### Docker
```bash
docker build -t northcat-website .
docker run -p 3000:3000 northcat-website
```

### Manual
```bash
npm run build
npm start
```

---

## 📊 Performance

- ✅ Lighthouse score > 90
- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1

---

## 🔒 Security

- ✅ HTTPS everywhere
- ✅ XSS protection
- ✅ CSRF tokens
- ✅ Rate limiting
- ✅ Input validation

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

---

**Version**: 1.0.0  
**Created**: 14.06.2026  
**Status**: In Development 🚀
