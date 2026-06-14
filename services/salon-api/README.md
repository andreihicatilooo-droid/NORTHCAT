# 💼 NORTHCAT Salon API

REST API для управления салоном татуировок - управление клиентами, записями, услугами и аналитикой.

> ⚠️ **Статус аудита 14.06.2026:** в репозитории только этот README (спецификация).
> Исходного кода нет — см. **GAP-001** в `docs/project/INDEX.md`.

---

## 📋 Что включено?

- ✅ Управление клиентами (CRUD)
- ✅ Система бронирования сеансов
- ✅ Управление услугами и ценами
- ✅ Портфель работ (галерея)
- ✅ Аналитика и отчеты
- ✅ JWT аутентификация
- ✅ Role-based access control
- ✅ Pagination & filtering
- ✅ Swagger/OpenAPI документация
- ✅ Error handling & validation

---

## 🛠️ Стек технологий

- **Framework**: Node.js + Express
- **Database**: PostgreSQL + Sequelize/Prisma
- **Auth**: JWT (jsonwebtoken)
- **Validation**: Joi / Zod
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest + Supertest
- **Runtime**: Node.js 18+

---

## 🚀 Быстрый старт

### Требования
- Node.js 18+
- PostgreSQL 12+
- npm / yarn

### Установка

```bash
cd services/salon-api

# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env

# Заполнить переменные окружения
# DATABASE_URL=postgresql://user:password@localhost/northcat
# JWT_SECRET=your_secret_key
# PORT=3001

# Запустить миграции
npm run migrate

# Запустить сервер
npm start

# Или в dev режиме
npm run dev
```

API доступна на `http://localhost:3001`  
Swagger доков на `http://localhost:3001/api/docs`

---

## 📁 Структура проекта

```
salon-api/
├── src/
│   ├── index.ts                  # Entry point
│   ├── app.ts                    # Express app
│   ├── server.ts                 # Server startup
│   │
│   ├── routes/
│   │   ├── index.ts              # Route aggregator
│   │   ├── clients.ts            # /api/clients
│   │   ├── appointments.ts       # /api/appointments
│   │   ├── services.ts           # /api/services
│   │   ├── gallery.ts            # /api/gallery
│   │   ├── analytics.ts          # /api/analytics
│   │   ├── auth.ts               # /api/auth
│   │   └── health.ts             # /api/health
│   │
│   ├── controllers/
│   │   ├── clientController.ts
│   │   ├── appointmentController.ts
│   │   ├── serviceController.ts
│   │   ├── galleryController.ts
│   │   ├── analyticsController.ts
│   │   └── authController.ts
│   │
│   ├── models/
│   │   ├── Client.ts
│   │   ├── Appointment.ts
│   │   ├── Service.ts
│   │   ├── Gallery.ts
│   │   └── User.ts
│   │
│   ├── middleware/
│   │   ├── auth.ts               # JWT verification
│   │   ├── validation.ts         # Input validation
│   │   ├── errorHandler.ts       # Error handling
│   │   ├── logger.ts             # Logging
│   │   └── cors.ts               # CORS config
│   │
│   ├── services/
│   │   ├── clientService.ts
│   │   ├── appointmentService.ts
│   │   ├── emailService.ts       # Email notifications
│   │   └── analyticsService.ts
│   │
│   ├── utils/
│   │   ├── validators.ts         # Validation schemas
│   │   ├── errors.ts             # Custom errors
│   │   ├── formatters.ts         # Response formatting
│   │   └── helpers.ts            # Utility functions
│   │
│   ├── config/
│   │   ├── database.ts           # DB config
│   │   ├── jwt.ts                # JWT config
│   │   └── constants.ts          # Constants
│   │
│   └── types/
│       └── index.ts              # TypeScript types
│
├── prisma/ (or migrations/)
│   ├── migrations/               # SQL migrations
│   ├── seeds/                    # Test data
│   └── schema.prisma             # Prisma schema (optional)
│
├── tests/
│   ├── unit/                     # Unit tests
│   ├── integration/              # Integration tests
│   └── fixtures/                 # Test data
│
├── .env.example
├── package.json
├── tsconfig.json
├── jest.config.js
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register         # Регистрация
POST   /api/auth/login            # Вход
POST   /api/auth/refresh          # Обновить токен
POST   /api/auth/logout           # Выход
```

### Clients (Клиенты)
```
GET    /api/clients               # Список клиентов (paginated)
GET    /api/clients/:id           # Получить клиента
POST   /api/clients               # Создать клиента
PUT    /api/clients/:id           # Обновить клиента
DELETE /api/clients/:id           # Удалить клиента

# Filters & Pagination
GET    /api/clients?page=1&limit=10&search=ivan
```

### Appointments (Записи)
```
GET    /api/appointments          # Список записей
GET    /api/appointments/:id      # Получить запись
POST   /api/appointments          # Создать запись
PUT    /api/appointments/:id      # Обновить запись
DELETE /api/appointments/:id      # Отменить запись

# Filters
GET    /api/appointments?date=2026-06-25&status=confirmed
```

### Services (Услуги)
```
GET    /api/services              # Список услуг
GET    /api/services/:id          # Получить услугу
POST   /api/services              # Создать услугу
PUT    /api/services/:id          # Обновить услугу
DELETE /api/services/:id          # Удалить услугу
```

### Gallery (Портфель)
```
GET    /api/gallery               # Список работ
GET    /api/gallery/:id           # Получить работу
POST   /api/gallery               # Добавить работу
PUT    /api/gallery/:id           # Обновить работу
DELETE /api/gallery/:id           # Удалить работу

# Filters
GET    /api/gallery?style=dotwork&artist=ivan
```

### Analytics (Аналитика)
```
GET    /api/analytics/revenue     # Доход
GET    /api/analytics/appointments # Статистика записей
GET    /api/analytics/clients     # Статистика клиентов
GET    /api/analytics/services    # Популярные услуги

# Date range
GET    /api/analytics/revenue?from=2026-01-01&to=2026-12-31
```

### Health Check
```
GET    /api/health                # Server status
GET    /api/health/db             # Database check
```

---

## 📦 Request/Response Examples

### Create Appointment
```json
POST /api/appointments

Request:
{
  "client_id": 1,
  "service_id": 5,
  "appointment_date": "2026-06-25",
  "appointment_time": "14:00",
  "notes": "First tattoo"
}

Response (201):
{
  "id": 42,
  "client_id": 1,
  "service_id": 5,
  "appointment_date": "2026-06-25",
  "appointment_time": "14:00",
  "status": "confirmed",
  "notes": "First tattoo",
  "created_at": "2026-06-14T10:30:00Z",
  "updated_at": "2026-06-14T10:30:00Z"
}
```

### List Appointments with Pagination
```json
GET /api/appointments?page=1&limit=10

Response (200):
{
  "data": [
    { /* appointment object */ },
    { /* appointment object */ }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

### Get Analytics
```json
GET /api/analytics/revenue?from=2026-01-01&to=2026-12-31

Response (200):
{
  "period": {
    "from": "2026-01-01",
    "to": "2026-12-31"
  },
  "total_revenue": 150000,
  "by_month": [
    { "month": "2026-01", "revenue": 12000 },
    { "month": "2026-02", "revenue": 15000 },
    ...
  ],
  "by_service": [
    { "service": "Traditional", "revenue": 50000 },
    { "service": "Dotwork", "revenue": 75000 },
    ...
  ]
}
```

---

## 🔐 Authentication

### JWT Token Structure
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@northcat.top", "password": "password"}'
```

### Response
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "expires_in": 3600,
  "user": {
    "id": 1,
    "email": "user@northcat.top",
    "role": "admin"
  }
}
```

---

## 🗄️ Database Schema

```sql
-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  instagram VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  price_min DECIMAL(10,2),
  price_max DECIMAL(10,2),
  duration_min INTEGER,
  duration_max INTEGER,
  active BOOLEAN DEFAULT true
);

-- Appointments
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  service_id INTEGER REFERENCES services(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255),
  style VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔑 Environment Variables

```
# Server
NODE_ENV=production
PORT=3001
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/northcat

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_SECRET=another_secret
REFRESH_TOKEN_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000,https://northcat.top

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@northcat.top
SMTP_PASS=your_app_password
SMTP_FROM=NORTHCAT <noreply@northcat.top>

# Logging
LOG_LEVEL=info
DEBUG=false
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test:coverage

# Run specific test file
npm test -- __tests__/clients.test.ts

# Watch mode
npm test:watch
```

---

## 🚀 Deployment

### Docker
```bash
docker build -t northcat-api .
docker run -e DATABASE_URL=... -p 3001:3001 northcat-api
```

### Production
```bash
npm run build
npm start
```

---

## 📊 Performance

- Rate limiting: 100 requests/minute
- Database pooling: 10-20 connections
- Caching: Redis (optional)
- Compression: gzip

---

## 🔒 Security

- ✅ JWT authentication
- ✅ Input validation
- ✅ SQL injection prevention (Sequelize/Prisma)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ HTTPS enforced

---

## 📚 Documentation

- Swagger Docs: `/api/docs`
- Postman Collection: `/docs/postman_collection.json`

---

**Version**: 1.0.0  
**Created**: 14.06.2026  
**Status**: In Development 🚀
