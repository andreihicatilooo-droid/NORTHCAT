# 🐱 NORTHCAT (Северный Кот)

> Dark gothic tattoo studio brand + salon management infrastructure

NORTHCAT - полный цифровой экосистем для татуировочной студии с тёмным готическим брендингом, веб-сайтом, системой управления салоном и Telegram ботом на базе Claude AI.

---

## 🎯 Что это?

**NORTHCAT** объединяет:

- 🎨 **Tattoo Studio Brand** - Dark gothic брендинг с Sphinx котом
- 🌐 **Website** (northcat.top) - Портфолио, бронирование, контакты
- 💼 **Salon Management API** - Система управления клиентами, записями, платежами
- 🤖 **Telegram Bot** - Бронирование, консультации, AI ассистент (Claude)
- 🏗️ **Infrastructure** - Docker, K8s, CI/CD, мониторинг
- 📊 **Resources** - Дизайн ассеты, фото, видео, стили

---

## 📁 Структура проекта

```
NORTHCAT/
├── 🌐 services/                      # Микросервисы
│   ├── website/                      # Сайт northcat.top (Next.js)
│   │   ├── src/
│   │   │   ├── pages/               # Страницы (/, /portfolio, /booking, etc)
│   │   │   ├── components/          # React компоненты
│   │   │   └── styles/              # CSS/Tailwind стили
│   │   ├── public/                  # Static assets
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── salon-api/                    # API для управления салоном
│   │   ├── src/
│   │   │   ├── routes/              # API эндпоинты
│   │   │   ├── models/              # БД модели
│   │   │   └── config/              # Конфигурация
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── tg-bot/                       # Telegram бот
│       ├── src/
│       │   ├── commands/            # Bot команды
│       │   ├── handlers/            # Message handlers
│       │   └── services/            # Integration services
│       ├── config/
│       ├── package.json
│       └── README.md
│
├── 🎨 resources/                     # Ресурсы проекта
│   ├── design/                       # Дизайн-файлы
│   │   ├── canva/                   # Canva проекты (ссылки)
│   │   ├── brand-assets/            # Brand guidelines
│   │   └── colors/                  # Цветовые палитры
│   │
│   ├── images/                       # Изображения
│   │   ├── gallery/                 # Фото работ татуировок
│   │   ├── branding/                # Логотипы, иконки
│   │   └── logo-variations/         # Варианты логотипа
│   │
│   ├── videos/                       # Видео-контент
│   │   ├── tutorials/               # Видео туториалы
│   │   └── portfolio/               # Видео портфолио
│   │
│   ├── styles/                       # Глобальные стили
│   │   ├── colors.css               # Цвета (#f4587e, #0c120e)
│   │   ├── typography.css           # Шрифты
│   │   └── variables.css            # CSS переменные
│   │
│   └── fonts/                        # Шрифты
│       ├── blackletter/             # Blackletter шрифты
│       └── body/                    # Body шрифты
│
├── 📊 database/                      # БД конфигурация
│   ├── migrations/                  # SQL миграции
│   ├── seeds/                       # Тестовые данные
│   └── schemas/                     # DB schemas (ER диаграммы)
│
├── 📝 docs/                          # Документация
│   ├── CLAUDE.md                    # Гайд для Claude
│   ├── CLAUDE.md-ROADMAP.md         # 5-фазная дорожная карта
│   ├── PROJECT_MAP.md               # Карта проекта
│   ├── INITIAL_TASKS.md             # 75+ задач
│   ├── BACKLOG.md                   # Спринты и приоритеты
│   ├── IDEAS.md                     # 50+ идей
│   ├── AI_MANAGEMENT.md             # Управление с Claude
│   ├── MCP_SETUP.md                 # GitHub MCP интеграция
│   ├── VISUAL_IDENTITY.md           # Brand guidelines
│   ├── PROJECT_MEMORY.md            # История проекта
│   └── RESOURCES_LINKS.md           # Ссылки на интеграции
│
├── 🐳 docker/                        # Docker конфигурация
│   ├── Dockerfile.website
│   ├── Dockerfile.api
│   ├── Dockerfile.bot
│   └── docker-compose.yml
│
├── 🔧 .claude/                       # Claude Code конфиг
│   ├── mcp.json                     # MCP серверы
│   └── settings.json                # Claude settings
│
├── ⚙️ config/                        # Конфигурация
│   ├── API_CONFIG.md                # API ключи и интеграции
│   └── environment.example          # Шаблон .env
│
├── 🚀 scripts/                       # Скрипты для разработки
│   ├── setup.sh                     # Инициализация проекта
│   ├── deploy.sh                    # Развертывание
│   └── test.sh                      # Тестирование
│
├── CLAUDE.md                        # Основное руководство
├── README.md                        # Этот файл
├── .gitignore                       # Git ignore
└── docker-compose.yml               # Local development

```

---

## 🚀 Быстрый старт

### Требования
- Node.js 18+
- Docker & Docker Compose
- Git

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/andreihicatilooo-droid/NORTHCAT.git
cd NORTHCAT

# Установить зависимости
npm install

# Setup local development
npm run setup

# Запустить все сервисы
docker-compose up -d

# Или запустить отдельные сервисы
npm run dev:website    # Сайт
npm run dev:api        # API
npm run dev:bot        # TG Bot
```

---

## 🌐 Website (northcat.top)

### Что включено?
- ✅ Landing page с hero section
- ✅ Portfolio/Gallery с фото работ
- ✅ About the studio
- ✅ Services & pricing
- ✅ Booking system
- ✅ Contact form
- ✅ Responsive design
- ✅ Dark mode support

### Стек
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL
- **Hosting**: LuxHost / Vercel

### Фичи
```
/ (Home)
  - Hero section с NORTHCAT логотипом
  - Featured gallery
  - CTA buttons

/portfolio
  - Full gallery с фильтрацией по стилям
  - High-res фото работ
  - Filter by: Style, Artist, Date

/about
  - История студии
  - Team members
  - Values & philosophy

/services
  - List of services
  - Pricing
  - Booking button

/booking
  - Service selection
  - Date & time picker
  - Contact form
  - Confirmation

/contact
  - Contact info (phone, email, address)
  - Social links (Instagram, Telegram)
  - Contact form
```

---

## 🤖 Telegram Bot

### Что включено?
- ✅ /start - Welcome message
- ✅ /help - Commands list
- ✅ /portfolio - Show tattoo gallery
- ✅ /services - Services & pricing
- ✅ /book - Start booking process
- ✅ /contact - Contact info
- ✅ /ask - Ask Claude AI questions
- ✅ Group/channel support (coming)

### Claude AI Интеграция
- AI ассистент для ответов на вопросы
- Style recommendations
- Tattoo advice
- Studio info queries
- Smart message handling

### Стек
- **Framework**: Telegraf (Node.js)
- **AI**: Claude API + MCP
- **Database**: PostgreSQL
- **Deployment**: Docker

### Примеры использования

```
Пользователь: /start
Bot: 👋 Привет! Я NORTHCAT бот...

Пользователь: /portfolio
Bot: 📸 Вот мои последние работы:
[Gallery images]

Пользователь: /book
Bot: 🎨 Выбери услугу:
[Inline keyboard с услугами]

Пользователь: /ask Какой стиль мне подойдет?
Claude AI: На основе твоего описания я рекомендую...
```

---

## 💼 Salon Management API

### Endpoints

#### Appointments
```
GET /api/appointments              # Список записей
POST /api/appointments             # Создать запись
GET /api/appointments/:id          # Получить запись
PUT /api/appointments/:id          # Обновить запись
DELETE /api/appointments/:id       # Удалить запись
```

#### Clients
```
GET /api/clients                   # Список клиентов
POST /api/clients                  # Добавить клиента
GET /api/clients/:id               # Получить клиента
PUT /api/clients/:id               # Обновить клиента
```

#### Services
```
GET /api/services                  # Список услуг
POST /api/services                 # Добавить услугу
```

#### Gallery
```
GET /api/gallery                   # Портфель работ
POST /api/gallery                  # Добавить работу
```

#### Analytics
```
GET /api/analytics/revenue         # Доход
GET /api/analytics/appointments    # Статистика записей
GET /api/analytics/clients         # Статистика клиентов
```

### Стек
- **Backend**: Node.js + Express
- **Database**: PostgreSQL + Sequelize
- **Auth**: JWT tokens
- **Docs**: Swagger/OpenAPI

---

## 🎨 Ресурсы проекта

### Design Assets (`resources/design/`)
- Canva проекты (ссылки)
- Brand guidelines
- Color palettes
- Typography specs

### Images (`resources/images/`)
- `/gallery/` - Фото работ (высокое разрешение)
- `/branding/` - Логотипы, иконки
- `/logo-variations/` - Варианты логотипа

### Videos (`resources/videos/`)
- Туториалы
- Portfolio videos
- Brand videos

### Styles (`resources/styles/`)
- Глобальные CSS переменные
- Color definitions
- Typography
- Component styles

### Fonts (`resources/fonts/`)
- Blackletter шрифты
- Body шрифты
- Web fonts

---

## 🎨 Брендинг

### Цвета
- **Primary Accent**: Hot pink `#f4587e`
- **Background**: Dark green-black `#0c120e`
- **Secondary**: Purple/magenta tones

### Typography
- **Heading**: Blackletter (occult style)
- **Body**: Clean sans-serif
- **Style**: Bold, angular, gothic

### Иконография
- **Icon**: Sphinx cat (angry/mystical)
- **Elements**: Hourglass, runes, sacred geometry
- **Style**: High contrast, symmetrical

### Logo Variations
1. **Circular seal** - Full branding with arcs
2. **Landscape** - Website/horizontal
3. **Icon only** - Favicon, social

---

## 📊 Дедлайны

| Компонент | Дедлайн | Статус |
|-----------|---------|--------|
| **Дизайн финальный** | 25.06.2026 | 🔴 Критично |
| Website MVP | 31.07.2026 | 🟡 В процессе |
| TG-Bot MVP | 31.07.2026 | 🟡 В процессе |
| API готов | 31.07.2026 | 🟡 В процессе |
| Claude AI интеграция | 31.08.2026 | ⏳ Ожидание |
| Production launch | НОЯБРЬ 2026 | 🎯 Целевая |

---

## 📚 Документация

### Для разработки
- **CLAUDE.md** - Основное руководство проекта
- **docs/NORTHCAT-ROADMAP.md** - 5-фазная дорожная карта
- **docs/AI_MANAGEMENT.md** - Управление с Claude AI
- **docs/MCP_SETUP.md** - GitHub MCP интеграция

### Для проектирования
- **docs/PROJECT_MAP.md** - Карта 6 направлений
- **docs/VISUAL_IDENTITY.md** - Brand guidelines
- **docs/BACKLOG.md** - Спринты и приоритеты
- **docs/IDEAS.md** - 50+ идей

### Для менеджмента
- **docs/INITIAL_TASKS.md** - 75+ задач
- **docs/PROJECT_MEMORY.md** - История проекта
- **docs/RESOURCES_LINKS.md** - Интеграции и ссылки

---

## 🔧 Инструменты & Интеграции

### ✅ Активные
- **Todoist** - Task management (2 проекта)
- **Canva** - Design (pinned candidate)
- **LuxHost** - Hosting infrastructure
- **GitHub** - Version control + MCP

### ⏳ В процессе
- **Jira/Zapier** - Task sync (OAuth pending)
- **Claude AI/MCP** - TG-Bot AI integration

### 📚 В будущем
- **Figma** - Design system
- **Stripe** - Payments
- **Instagram API** - Photo sync
- **Google Analytics** - Analytics

---

## 👨‍💻 Разработка

### Commands

```bash
# Установка
npm install

# Development
npm run dev              # All services
npm run dev:website      # Website only
npm run dev:api          # API only
npm run dev:bot          # Bot only

# Testing
npm test
npm test:watch

# Linting
npm run lint
npm run format

# Building
npm run build
npm run build:website
npm run build:api

# Docker
docker-compose up -d
docker-compose down
docker-compose logs -f

# Database
npm run migrate
npm run seed
npm run migrate:rollback
```

---

## 📋 Структура коммитов

Все коммиты на **РУССКОМ языке**:

```
<тип>: <описание>

<подробное описание если нужно>
```

### Типы коммитов
- `документация:` - Doc updates
- `функция:` - New features
- `инфраструктура:` - Setup/config
- `исправление:` - Bug fixes
- `улучшение:` - Improvements
- `рефактор:` - Code refactoring

### Примеры
```
документация: добавить CLAUDE.md с руководством
функция: добавить систему управления проектом
инфраструктура: добавить MCP конфигурацию
исправление: исправить баг в booking форме
```

---

## 🤖 Управление проектом

### С Claude AI
Спроси Claude:
```
"Что мне делать дальше?"
"Помоги спланировать спринт"
"Какой мой прогресс?"
"Создай issue для [задача]"
```

### С GitHub
- Issues для отслеживания задач
- Pull Requests для изменений
- GitHub Actions для CI/CD
- Projects для планирования

### С Todoist
- 2 проекта:
  - "Дизайн NORTHCAT" (7 tasks, deadline 25.06)
  - "TG-бот / Агент" (MVP + extended features)

---

## 📞 Контакты

- **Email**: andreihicatilooo@gmail.com
- **Timezone**: Europe/Riga (UTC+2/3)
- **Website**: northcat.top
- **Todoist**: Andreihicatilooo

---

## 📄 Лицензия

MIT License - See LICENSE file

---

## 🙏 Credits

Спроектировано для:
- 🎨 Dark gothic tattoo studio brand
- 💼 Salon management infrastructure
- 🤖 Claude AI-powered Telegram bot
- 📊 Full digital ecosystem

**Solo разработчик + Claude AI assistant**

---

**Версия**: 1.0.0  
**Дата**: 14 июня 2026  
**Статус**: In Development 🚀

