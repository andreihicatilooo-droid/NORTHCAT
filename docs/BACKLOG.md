# 📚 BACKLOG - Упорядоченный список для работы

Этот файл содержит идеи, которые уже отобраны и готовы к работе.
Отсортировано по приоритету и направлениям.

---

## 🔍 Продуктовая дорожная карта (14.06.2026)

> Полные требования: `docs/NORTHCAT-REQUIREMENTS.md`  
> Задачи: TASK-050 (Фаза 0), TASK-051 (Фаза 1)

| Фаза | Содержание | Задачи |
|------|------------|--------|
| **0** | GCP sync, виджет+прокси в монорепо, PostgreSQL | TASK-020, 050, 016 |
| **1** | M1–M4: auth, кредиты, Gemini proxy, логи | TASK-051 |
| **2** | M5–M10: Drive, шеринг, ТГ-админка | TBD |
| **3** | M7–M12: почта, кешбек, PWA | TBD |

---

## 🔍 Аудит репозитория (14.06.2026)

> Детали: `docs/project/INDEX.md` · **Предложения:** `docs/project/PROPOSALS.md`

### P0 — критично

| ID | Недочёт | Проект | Действие |
|----|---------|--------|----------|
| BUG-001 | `docker-compose` в `website/` ссылается на `./bot/`, бот в `tg-bot/` | infra | TASK-011 |
| — | Нет `BOT_TOKEN`, TON-адреса, реального контента | website + bot | TASK-012 |
| DEBT-001 | README описывает Next.js/Node, код — static/Python | docs | TASK-013 |

### P1 — важно

| ID | Недочёт | Проект |
|----|---------|--------|
| GAP-003 | Нет `docs/VISUAL_IDENTITY.md` (дедлайн 25.06) | design |
| GAP-001 | `salon-api/` — только README | salon-api |
| GAP-002 | `database/` — нет миграций | database |
| DEBT-003 | Заявки в localStorage, нет backend | website |
| DEBT-004 | Админка с клиентским паролем | website |
| DEBT-002 | CI без build/lint/test | infra |
| GAP-004 | Нет root `docker-compose` / `package.json` | infra |

### P2 — отложить

- Очистка дубликатов медиа в `services/website/ресурсы/` (~8.5 МБ)
- Кириллица в Pirata One → fallback шрифт
- Architecture diagram
- Решение: Next.js vs static (отдельная идея)

---

## 🎯 Current Sprint (14-28 июня 2026)

**Дедлайн**: 28 июня 2026 (это неделя после дизайна!)

### Priority P0 (Обязательно к 28 июня)

**Infrastructure** _(аудит: частично есть, нужен фикс)_
- [ ] **TASK-011** Починить docker-compose paths (web + tg-bot) — BUG-001
- [x] ~~Настроить Docker для website~~ — есть, но сломан путь к боту
- [ ] Создать root `docker-compose.yml` для monorepo — GAP-004
- [ ] Setup GitHub Actions: build Docker images — DEBT-002

**Production readiness**
- [ ] **TASK-012** Ключи бота, TON-адрес, контент в `data.js`, HTTPS
- [ ] **TASK-013** Синхронизировать README/PROJECT_MAP с фактическим стеком

**Design & Branding**
- [ ] Экспортировать финальные ассеты в PNG/SVG/PDF → `resources/design/`
- [ ] Завершить VISUAL_IDENTITY.md guide — GAP-003
- [ ] Создать 3+ logo variations

**Documentation**
- [ ] Обновить quick start guide (static site + Python bot, не Next.js)
- [ ] Создать architecture diagram

### Priority P1 (Хорошо бы, но не критично)

**Website** _(аудит: MVP ~90% готов, Next.js не нужен в спринте)_
- [x] ~~Инициализировать Next.js~~ — **отменено**: production static HTML импортирован
- [ ] Заменить демо-контент на реальные фото/тексты — TASK-012
- [ ] Серверная авторизация админки — DEBT-004

**TG-Bot** _(аудит: aiogram 3 готов, нужны ключи)_
- [x] ~~Инициализировать telegraf~~ — **готово**: Python aiogram 3 в `services/tg-bot/`
- [x] `/start`, `/menu`, `/setup` — реализованы
- [ ] Заполнить `.env` и проверить на production — TASK-012

**Salon API & Database**
- [ ] Начать `salon-api` (сейчас только README) — GAP-001
- [ ] Первая миграция БД — GAP-002

---

## 📅 Next Sprint (28 июня - 12 июля)

### Priority P0

**Website**
- [ ] Landing page с hero section
- [ ] Gallery preview
- [ ] Responsive navbar
- [ ] Footer

**TG-Bot MVP**
- [ ] `/portfolio` команда
- [ ] `/book` command для записи
- [ ] State management для user interactions
- [ ] Сохранение заявок в БД

**Salon Management**
- [ ] Спроектировать database schema
- [ ] Создать миграции для основных таблиц
- [ ] API endpoints для appointments

### Priority P1

**Infrastructure**
- [ ] Kubernetes manifests (basic)
- [ ] PostgreSQL Docker container
- [ ] Monitoring setup (basic)

**Documentation**
- [ ] Setup instructions для каждого сервиса
- [ ] Database schema documentation
- [ ] API documentation (Swagger/OpenAPI)

---

## 🗺️ Roadmap по направлениям

### 🎨 Design & Branding

**Immediate (по 25.06)**
- [ ] Финализировать Canva candidate
- [ ] Экспортировать ассеты
- [ ] Завершить Brand Guide

**Q3 2026 (июль-сентябрь)**
- [ ] Печатные материалы (визитки, постеры)
- [ ] Видео-интро
- [ ] Seasonal themes

**Later (Q4 2026)**
- [ ] Мерч дизайны
- [ ] Animation effects
- [ ] Easter eggs в дизайне

---

### 🌐 Website (northcat.top)

**Phase 1: MVP (июнь-июль)**
- [ ] Инициализировать проект
- [ ] Landing page
- [ ] Basic gallery
- [ ] Contact form

**Phase 2: Booking (июль-август)**
- [ ] Booking system
- [ ] Calendar integration
- [ ] Client registration
- [ ] Payment integration (если нужно)

**Phase 3: Enhancement (август-сентябрь)**
- [ ] Blog system
- [ ] Instagram integration
- [ ] Analytics dashboard
- [ ] Admin panel

**Phase 4: Advanced (сентябрь+)**
- [ ] Multi-language support
- [ ] PWA
- [ ] Video portfolio
- [ ] Reviews system

---

### 💼 Salon Management

**Phase 1: Core API (июль)**
- [ ] Database schema design
- [ ] API endpoints (CRUD)
- [ ] Authentication

**Phase 2: Admin Panel (август)**
- [ ] Базовый админ-интерфейс
- [ ] Client management
- [ ] Appointment management
- [ ] Reports

**Phase 3: Advanced Features (сентябрь+)**
- [ ] CRM функции
- [ ] Loyalty program
- [ ] Advanced analytics
- [ ] Inventory management

---

### 🤖 Telegram Bot

**Phase 1: MVP (июль)**
- [ ] Базовые команды
- [ ] Booking flow
- [ ] State management
- [ ] Database integration

**Phase 2: Claude AI Integration (август)**
- [ ] MCP connection
- [ ] AI assistant
- [ ] Recommendation engine
- [ ] Q&A system

**Phase 3: Extended Features (сентябрь+)**
- [ ] Group support
- [ ] Advanced analytics
- [ ] Image generation
- [ ] AR preview

---

### 🏗️ Infrastructure

**Phase 1: Basics (июнь-июль)**
- [ ] Docker для всех сервисов
- [ ] Docker-compose
- [ ] GitHub Actions CI/CD

**Phase 2: Monitoring (август)**
- [ ] Prometheus + Grafana
- [ ] Error tracking (Sentry)
- [ ] Log aggregation

**Phase 3: Scaling (сентябрь+)**
- [ ] Kubernetes
- [ ] Load balancing
- [ ] Auto-scaling
- [ ] CDN

---

### 📋 Documentation

**Always (Ongoing)**
- [ ] Keep PROJECT_MEMORY.md updated
- [ ] Update INITIAL_TASKS.md with progress
- [ ] Document decisions in ADRs
- [ ] Maintain API docs

**By each sprint**
- [ ] Setup guides for new components
- [ ] Architecture diagrams updates
- [ ] Troubleshooting additions

---

## 📊 Prioritization Matrix

```
Impact (High to Low)
   ↑
   │  P0 Critical   P0 Important
   │  (Do Now)      (Do Soon)
   │
   │  P1 Nice-to-   P1 Can Wait
   │  Have          (Low Priority)
   └─────────────────────────────→
      Effort (Low to High)
```

**P0 Critical** (High Impact, Low Effort)
- Finishing design assets
- Basic TG-Bot setup
- Docker configuration

**P0 Important** (High Impact, High Effort)
- Website development
- API development
- Database design

**P1 Nice-to-Have** (Low Impact, Low Effort)
- Brand animation
- Seasonal themes
- Extra bot commands

**P1 Can Wait** (Low Impact, High Effort)
- Advanced analytics
- VR features
- Blockchain integration

---

## 🔄 Процесс работы с Backlog

1. **Еженедельный review** (в четверг):
   - Посмотри текущий sprint
   - Выбери P0 и P1 задачи для next sprint
   - Обнови INITIAL_TASKS.md
   - Создай задачи в Todoist

2. **При добавлении идеи**:
   - Запиши в IDEAS.md
   - Оцени: Impact (High/Medium/Low), Effort (Low/Medium/High)
   - Если Hit: добавь в BACKLOG.md в нужный приоритет
   - Создай в Todoist когда будет слот

3. **Завершение задачи**:
   - Отметь ✅ в INITIAL_TASKS.md
   - Обнови PROJECT_MEMORY.md
   - Добавь в COMPLETED.md если major task
   - Перейди к следующей P0 задаче

---

## 🎓 Управление с AI

**Как использовать Claude для управления:**

```
Команды для Claude:

1. "Что мне делать дальше?"
   → Claude смотрит P0 задачи, предлагает next step

2. "Я закончил X, что дальше?"
   → Claude помогает приоритизировать следующую

3. "Дай мне обзор прогресса"
   → Claude анализирует INITIAL_TASKS.md и PROJECT_MEMORY.md

4. "Какие P1 задачи я должен учитывать?"
   → Claude подсказывает что не забыть

5. "Перепланируй спринт с учетом Y"
   → Claude помогает переорганизовать приоритеты
```

---

## 📝 Template для добавления в Backlog

```markdown
**[Title]**
- Description: ...
- Impact: High/Medium/Low
- Effort: Low/Medium/High
- Priority: P0/P1
- Depends on: [other tasks if any]
- Est. time: ...
```

---

**Последнее обновление**: 14 июня 2026 (аудит + INDEX)  
**Версия**: 1.1 - Backlog + Audit Findings  
**Управление**: Один человек + Claude AI assistant  
**Реестр**: `docs/project/INDEX.md`
