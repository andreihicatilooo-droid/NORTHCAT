# 🤖 NORTHCAT Telegram Bot

Telegram бот для студии NORTHCAT с интеграцией Claude AI для умных консультаций и автоматического бронирования.

---

## 📋 Что включено?

- ✅ /start - Приветствие и главное меню
- ✅ /help - Список команд
- ✅ /portfolio - Галерея работ
- ✅ /services - Услуги и цены
- ✅ /book - Система бронирования
- ✅ /contact - Контактная информация
- ✅ /ask - Вопросы Claude AI
- ✅ State management для conversations
- ✅ Database integration (PostgreSQL)
- ✅ Group/channel support (coming)

---

## 🛠️ Стек технологий

- **Framework**: Telegraf (Node.js)
- **AI**: Claude API + MCP
- **Database**: PostgreSQL + Prisma
- **Runtime**: Node.js 18+
- **Package Manager**: npm

---

## 🚀 Быстрый старт

### Требования
- Telegram Bot Token (от @BotFather)
- Claude API key
- PostgreSQL database

### Установка

```bash
cd services/tg-bot

# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env

# Заполнить переменные окружения
# TELEGRAM_BOT_TOKEN=your_token_here
# CLAUDE_API_KEY=your_api_key_here
# DATABASE_URL=postgresql://...

# Запустить бота
npm start

# Или в dev режиме
npm run dev
```

---

## 📁 Структура проекта

```
tg-bot/
├── src/
│   ├── index.ts                  # Entry point
│   ├── bot.ts                    # Bot initialization
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   │
│   ├── commands/
│   │   ├── start.ts              # /start
│   │   ├── help.ts               # /help
│   │   ├── portfolio.ts          # /portfolio
│   │   ├── services.ts           # /services
│   │   ├── book.ts               # /book
│   │   ├── contact.ts            # /contact
│   │   └── ask.ts                # /ask (Claude AI)
│   │
│   ├── handlers/
│   │   ├── message.ts            # Message handler
│   │   ├── callback.ts           # Callback button handler
│   │   ├── error.ts              # Error handler
│   │   └── middleware.ts         # Middleware
│   │
│   ├── services/
│   │   ├── claude.ts             # Claude AI service
│   │   ├── database.ts           # Database service
│   │   ├── appointment.ts        # Appointment booking
│   │   ├── gallery.ts            # Gallery retrieval
│   │   └── notification.ts       # Email/notifications
│   │
│   ├── keyboards/
│   │   ├── mainMenu.ts           # Main menu buttons
│   │   ├── bookingFlow.ts        # Booking keyboard
│   │   └── serviceList.ts        # Service keyboard
│   │
│   ├── states/
│   │   └── conversationState.ts  # User state management
│   │
│   ├── utils/
│   │   ├── formatting.ts         # Format messages
│   │   ├── validation.ts         # Validate input
│   │   └── helpers.ts            # Helper functions
│   │
│   └── config/
│       ├── database.ts           # DB config
│       ├── claude.ts             # Claude config
│       └── constants.ts          # Constants
│
├── prisma/
│   └── schema.prisma             # Prisma schema
│
├── tests/                        # Test files
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📱 Команды

### Основные команды

#### /start
```
Приветствие и главное меню

👋 Привет! Я NORTHCAT бот
🎨 Добро пожаловать в нашу студию татуировок

[Портфолио] [Услуги] [Забронировать]
```

#### /help
```
📋 Список всех команд

/portfolio - Мои работы
/services  - Услуги и цены
/book      - Забронировать сеанс
/contact   - Контакты
/ask       - Спросить у Claude AI
```

#### /portfolio
```
📸 Галерея работ

[Gallery images with filters]
Фильтры: Стиль, Размер, Дата
```

#### /services
```
💰 Услуги и цены

🎨 Traditional: 500₽ - 5000₽
⚫ Dotwork: 1000₽ - 8000₽
🔮 Sacred Geometry: 1500₽ - 10000₽
...
```

#### /book
```
🎯 Система бронирования

Выбери услугу → Выбери дату → Выбери время → Контакты
```

#### /contact
```
📞 Контакты

📱 Telegram: @northcat_studio
📧 Email: hello@northcat.top
📍 Адрес: Moscow, Russia
🕐 Часы: 12:00 - 22:00
```

#### /ask
```
💬 Спросить Claude AI

Спроси что угодно про студию, стили, процесс
```

---

## 🔄 Booking Flow

```
/book
  ↓
1. Выбери услугу
   [Traditional] [Dotwork] [Sacred Geometry]
  ↓
2. Выбери дату
   [Calendar]
  ↓
3. Выбери время
   [Time slots]
  ↓
4. Твои контакты
   Name, Phone, Email
  ↓
5. Подтверждение
   ✅ Запись подтверждена!
   Email отправлен
```

---

## 🤖 Claude AI Интеграция

### /ask Команда

```
Пользователь: /ask Какой стиль мне подойдет?

Claude: На основе твоего описания я рекомендую...
- Traditional для любителей классики
- Dotwork для точных фанов
- Sacred Geometry для мистиков
```

### Встроенные вопросы

- Рекомендации стилей
- История техник
- Информация о процессе
- Уход после татуировки
- Вопросы про студию

---

## 💾 Database Schema

```sql
-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  tg_id BIGINT UNIQUE,
  first_name VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  service_id INTEGER,
  date DATE,
  time TIME,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price_min DECIMAL(10,2),
  price_max DECIMAL(10,2),
  duration_min INTEGER,
  duration_max INTEGER
);

-- Gallery
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  image_url VARCHAR(255),
  style VARCHAR(50),
  artist_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔑 Environment Variables

```
# Bot
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/northcat_bot

# Claude AI
CLAUDE_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-opus-4.1

# Settings
NODE_ENV=production
DEBUG=false
LOG_LEVEL=info

# Webhooks (optional)
WEBHOOK_URL=https://northcat.top/bot/webhook
WEBHOOK_SECRET=your_secret_key

# Notifications
ADMIN_EMAIL=admin@northcat.top
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

---

## 📊 Статистика Бота

```
Метрики отслеживания:
- Активные пользователи
- Завершенные бронирования
- Популярные услуги
- AI запросы
- Сообщения в день
```

---

## 🔒 Security

- ✅ Input validation
- ✅ Rate limiting
- ✅ Auth tokens
- ✅ Database encryption
- ✅ Error handling

---

## 🚀 Deployment

### Docker

```bash
docker build -t northcat-bot .
docker run -e TELEGRAM_BOT_TOKEN=... northcat-bot
```

### Manual

```bash
npm install
npm run build
npm start
```

---

## 📚 Resources

- [Telegraf Docs](https://telegraf.js.org)
- [Claude API Docs](https://claude.ai/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)

---

## 🔗 Integration Points

- **Website API**: Fetch gallery, services, appointments
- **Salon API**: Create/manage appointments
- **Claude AI**: Answer questions, recommendations
- **Database**: Store user data, appointments
- **Email**: Send confirmations

---

**Version**: 1.0.0  
**Created**: 14.06.2026  
**Status**: In Development 🚀
