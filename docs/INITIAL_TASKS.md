# NORTHCAT Initial Task List 📋

Начальный список задач, распределенный по 6 направлениям проекта.
Используй этот файл как основу для Todoist и как место для записи новых идей.

> **Аудит 14.06.2026:** предложения и задачи — `docs/project/PROPOSALS.md` · Реестр — `docs/project/INDEX.md`

---

## 🔴 Недочёты по направлениям (аудит 14.06.2026)

### P0 — критично

| Направление | Недочёт | ID |
|-------------|---------|-----|
| 🏗️ Infrastructure | docker-compose в `website/` не видит `tg-bot/` | BUG-001, TASK-011 |
| 🌐 Website + 🤖 Bot | Нет ключей, TON, реального контента, HTTPS | TASK-012 |
| 📋 Documentation | README/CLAUDE описывают Next.js, факт — static HTML | DEBT-001, TASK-013 |

### P1 — важно

| Направление | Недочёт | ID |
|-------------|---------|-----|
| 🎨 Дизайн | Нет `docs/VISUAL_IDENTITY.md`, `resources/` пуст | GAP-003 |
| 💼 Salon API | Только README, нет кода | GAP-001 |
| 💼 Database | Нет миграций и schema | GAP-002 |
| 🌐 Website | Заявки в localStorage, админка с клиентским паролем | DEBT-003, DEBT-004 |
| 🏗️ Infrastructure | CI без build/test, нет root compose | DEBT-002, GAP-004 |

### P2 — отложить

| Направление | Недочёт |
|-------------|---------|
| 🌐 Website | Дубликаты медиа в `ресурсы/` (~8.5 МБ) |
| 🌐 Website | Кириллица в Pirata One → fallback |
| 📋 Documentation | Architecture diagram |

---

## 🎨 ДИЗАЙН & БРЕНДИНГ (Design Direction)

> **Аудит 14.06:** Canva в работе, `resources/design/` — каркас без файлов, `VISUAL_IDENTITY.md` отсутствует (GAP-003).

### Недочёты design

**P0** (дедлайн 25.06)
- [ ] Создать `docs/VISUAL_IDENTITY.md` — GAP-003
- [ ] Экспортировать ассеты из Canva → `resources/design/brand-assets/`

**P1**
- [ ] Перенести медиа из `services/website/` в `resources/` (единый источник)
- [ ] Убрать дубликаты в `services/website/ресурсы/`

### Essential Tasks (до 25.06.2026)

**1.1 Design & Assets**
- [ ] Финализировать Canva design candidate (https://www.canva.com/d/1WIUhM7eGyk1FpF)
- [ ] Создать 3+ logo variations (circular seal, landscape, icon only)
- [ ] Экспортировать все ассеты в необходимых форматах (PNG, SVG, PDF)
- [ ] Создать assets library для website и bot

**1.2 Visual Identity**
- [ ] Завершить VISUAL_IDENTITY.md guide
- [ ] Определить font pairings для website
- [ ] Создать color palette с hex codes для всех элементов
- [ ] Документировать иконографию (Sphinx, geometric elements)

**1.3 Brand Guidelines**
- [ ] Создать brand voice guide (tone, messaging)
- [ ] Определить правила использования логотипа
- [ ] Создать примеры правильного/неправильного использования
- [ ] Оформить в едиаоном документе

### Nice-to-Have Ideas 💡
- [ ] Создать brand animation (logo intro, transitions)
- [ ] Разработать печатные материалы (business cards, posters)
- [ ] Создать секцию "Behind the Brand" с историей

---

## 🌐 WEBSITE (northcat.top)

> **Статус аудита 14.06:** production static HTML ~90% готов (`services/website/`).
> Next.js из плана ниже — **отложен** (см. DEBT-001). Актуальные недочёты: TASK-012, DEBT-003, DEBT-004.

### Phase 1: Landing Page & Structure ✅ (выполнено — static MVP)

**2.1 Frontend Setup**
- [x] ~~Инициализировать Next.js/React~~ → **static HTML/CSS/JS** (импорт production)
- [x] Базовая структура: `index.html`, `css/`, `js/`, `nft-koty/`
- [ ] _(P2)_ Решить: оставить static или мигрировать на Next.js

**2.2 Landing Page** ✅
- [x] Hero section с логотипом NORTHCAT
- [x] Gallery preview (альбом работ + скетчи)
- [x] CTA (запись, Telegram, NFT, Mini App)

**2.3 Navigation & Layout** ✅
- [x] Responsive navbar/header
- [x] Footer с контактами и ссылками
- [x] Mobile-friendly design

**2.4 Pages Structure** (частично — одностраничник + отдельные страницы)
- [x] `/` — Landing/Home (`index.html`)
- [x] Галерея работ — секция на главной
- [x] Услуги и цены — секции на главной
- [x] `/contacts.html` — контакты
- [x] `/miniapp.html` — Telegram Web3 Mini App
- [x] `/nft-koty/` — NFT-генератор
- [x] `/admin.html` — демо-админка (DEBT-004)
- [ ] `/portfolio`, `/about`, `/booking` как отдельные страницы — не нужны в static MVP

### Недочёты website (P0–P2)

**P0**
- [ ] Реальные фото работ/скетчей вместо демо (`js/data.js`) — TASK-012
- [ ] Реальные контакты в `STUDIO` (`js/data.js`) — TASK-012
- [ ] `STUDIO_TON_ADDRESS` в `miniapp.html` — TASK-012

**P1**
- [ ] Backend для заявок вместо localStorage — DEBT-003
- [ ] Серверная защита `admin.html` — DEBT-004
- [ ] Удалить артефакт `package-lock.json` без `package.json`

**P2**
- [ ] Очистить дубликаты в `ресурсы/` (~8.5 МБ неиспользуемых видео)
- [ ] Кириллица в заголовках — fallback шрифт (ограничение Pirata One)

### Phase 1 (устаревший план Next.js — архив)

### Phase 2: Backend & Integration

**2.5 Backend API**
- [ ] Создать простой backend (Node.js/Express или Next.js API)
- [ ] Настроить базовую аутентификацию
- [ ] Создать endpoints для booking, contact, gallery

**2.6 Database Integration**
- [ ] Выбрать БД (PostgreSQL/MongoDB)
- [ ] Создать schema для tattoos, bookings, clients
- [ ] Настроить миграции

### Nice-to-Have Ideas 💡
- [ ] Интегрировать с Instagram API для автоматического импорта фото
- [ ] Создать online appointment calendar
- [ ] Добавить blog/news section
- [ ] Реализовать dark mode toggle (соответствует бренду)

---

## 💼 SALON MANAGEMENT (Infrastructure Direction)

> **Статус аудита 14.06:** `services/salon-api/` — только README (GAP-001).
> `database/migrations/` — заглушка (GAP-002).

### Недочёты salon-api & database

**P1**
- [ ] Создать минимальный проект в `services/salon-api/` (package.json, src/) — GAP-001
- [ ] Первая SQL-миграция в `database/migrations/` — GAP-002
- [ ] Endpoint `POST /api/appointments` для заявок с сайта/бота — DEBT-003

### Phase 1: Core API

**3.1 Database Schema**
- [ ] Спроектировать schema для salon (clients, appointments, services, artists)
- [ ] Создать таблицы для tattoo portfolio (designs, categories)
- [ ] Добавить таблицы для analytics и reports
- [ ] Документировать relationships и constraints

**3.2 API Endpoints**
- [ ] `GET /api/clients` - список клиентов
- [ ] `POST /api/clients` - добавить клиента
- [ ] `GET /api/appointments` - список записей
- [ ] `POST /api/appointments` - создать запись
- [ ] `GET /api/services` - услуги и цены
- [ ] `GET /api/portfolio` - портфель работ

**3.3 Authentication & Authorization**
- [ ] Реализовать JWT токены
- [ ] Создать role-based access (admin, artist, client, bot)
- [ ] Настроить refresh token механизм

### Phase 2: Admin Panel & Tools

**3.4 Admin Dashboard**
- [ ] Создать админ-панель для управления клиентами
- [ ] Добавить управление расписанием
- [ ] Создать отчеты и статистику
- [ ] Реализовать экспорт данных

### Nice-to-Have Ideas 💡
- [ ] Интегрировать платежи (Stripe, PayPal)
- [ ] Создать CRM систему
- [ ] Добавить SMS/Email уведомления
- [ ] Реализовать loyalty program

---

## 🤖 TELEGRAM BOT (Automation Direction)

> **Статус аудита 14.06:** Python aiogram 3 готов в `services/tg-bot/`.
> Нужны ключи и фикс Docker paths (BUG-001).

### Недочёты tg-bot

**P0**
- [ ] Заполнить `.env`: `BOT_TOKEN`, `OPERATOR_CHAT_ID` — TASK-012
- [ ] Починить путь в `website/docker-compose.yml` → `tg-bot/` — BUG-001

**P1**
- [ ] Сохранение заявок в БД (сейчас только Telegram + пересылка) — DEBT-003
- [ ] Claude AI / MCP интеграция — запланировано на август

### Phase 1: MVP Commands ✅ (базовый функционал готов)

**4.1 Bot Setup**
- [x] Проект в `services/tg-bot/` — Python aiogram 3
- [x] Dockerfile.bot
- [ ] Зарегистрировать/проверить бота в BotFather — TASK-012
- [x] Polling (в `bot.py`)

**4.2 Basic Commands**
- [x] `/start` — приветствие и главное меню
- [x] `/menu` — меню
- [x] `/setup` — настройщик для оператора
- [ ] `/help` — отдельная команда (есть в меню)
- [ ] `/portfolio` — показать работы (есть ссылка на сайт)
- [x] Запись — через Mini App и текстовые заявки
- [x] Контакты и цены — в меню

### Phase 1 (устаревший план Node.js — архив)

**4.1 Bot Setup (архив)**
- [ ] ~~Инициализировать TG-bot проект~~ → готово (Python)
- [ ] ~~Выбрать framework (telegraf)~~ → aiogram 3

**4.3 Booking Flow**
- [ ] Создать inline keyboard для выбора услуги
- [ ] Реализовать выбор даты/времени
- [ ] Запросить контактные данные
- [ ] Сохранить запись в БД и отправить подтверждение

**4.4 State Management**
- [ ] Реализовать session management для конверсаций
- [ ] Добавить middleware для разных типов сообщений
- [ ] Обработать ошибки и edge cases

### Phase 2: Claude AI Integration

**4.5 MCP Integration**
- [ ] Настроить Claude AI/MCP conexion
- [ ] Создать prompt для NORTHCAT assistant persona
- [ ] Интегрировать Claude в chat flow
- [ ] Добавить контекст о студии в system prompt

**4.6 AI Features**
- [ ] `/ask` - спросить у Claude про NORTHCAT
- [ ] Chat with bot - обычная беседа с AI
- [ ] Recommendations - рекомендации стилей
- [ ] Info lookup - поиск информации о услугах

### Phase 3: Extended Features

**4.7 Group/Channel Support**
- [ ] Поддержка группo/канала (welcome message)
- [ ] Admin commands для управления группой
- [ ] Auto-moderation (pinned messages, rules)

**4.8 Analytics & Management**
- [ ] Логирование всех взаимодействий
- [ ] Dashboard с метриками бота
- [ ] User analytics (статистика использования)

### Nice-to-Have Ideas 💡
- [ ] Интегрировать с Instagram для шарингa работ
- [ ] Добавить голосовые сообщения
- [ ] Реализовать sharing appointments с друзьями
- [ ] Создать рейтинг/отзывы систему

---

## 🏗️ INFRASTRUCTURE (DevOps Direction)

> **Статус аудита 14.06:** Docker есть в `services/website/`, но путь к боту сломан (BUG-001).
> CI минимальный (DEBT-002). Production на GCP `northcat-server`.

### Недочёты infrastructure

**P0**
- [ ] Исправить docker-compose paths web ↔ tg-bot — BUG-001, TASK-011

**P1**
- [ ] Root `docker-compose.yml` для monorepo — GAP-004
- [ ] CI: build Docker images, smoke-test nginx — DEBT-002
- [ ] Синхронизировать README (команды запуска) — TASK-013

**P2**
- [ ] Architecture diagram
- [ ] Kubernetes manifests

### Phase 1: Containerization (частично готово)

**5.1 Docker Setup**
- [x] Dockerfile.web (nginx + static)
- [x] Dockerfile.bot (Python) — в `services/tg-bot/`
- [x] docker-compose.yml — в `services/website/` (**нужен фикс путей**)
- [x] .dockerignore

**5.2 Services Configuration**
- [ ] Создать environment configs для разных stages
- [ ] Настроить networking между контейнерами
- [ ] Добавить health checks

### Phase 2: Orchestration & Deployment

**5.3 Kubernetes (optional, when scaling)**
- [ ] Создать K8s manifests для основных сервисов
- [ ] Настроить ingress для маршрутизации
- [ ] Создать persistent volumes для БД
- [ ] Настроить resource limits

**5.4 CI/CD Pipeline**
- [ ] Настроить GitHub Actions
- [ ] Создать workflow для testing
- [ ] Добавить automatic deployment на staging
- [ ] Создать manual approval для production

### Phase 3: Monitoring & Logging

**5.5 Observability**
- [ ] Настроить логирование (ELK stack или аналог)
- [ ] Добавить метрики (Prometheus)
- [ ] Создать dashboards (Grafana)
- [ ] Настроить alerts для критических событий

**5.6 Backup & Recovery**
- [ ] Настроить автоматические backup БД
- [ ] Создать recovery procedures
- [ ] Документировать disaster recovery plan

### Nice-to-Have Ideas 💡
- [ ] Настроить CDN для ассетов
- [ ] Реализовать load balancing
- [ ] Добавить rate limiting для API
- [ ] Настроить WAF (Web Application Firewall)

---

## 📋 DOCUMENTATION & TOOLS (Knowledge Direction)

### Essential Documentation

**6.1 Architecture**
- [ ] Создать architecture diagram (система, сервисы, взаимосвязи)
- [ ] Документировать API структуру (endpoints, parameters)
- [ ] Описать database schema (диаграмма, relationships)
- [ ] Написать deployment guide

**6.2 Setup & Onboarding**
- [ ] Создать quick start guide
- [ ] Написать local setup instructions
- [ ] Документировать переменные окружения (.env.example)
- [ ] Создать troubleshooting guide

**6.3 Project Management**
- [ ] Обновить PROJECT_MEMORY.md с текущим статусом
- [ ] Поддерживать актуальность PROJECT_MAP.md
- [ ] Создать CHANGELOG.md
- [ ] Документировать major decisions (ADRs)

### Tools & Integrations Setup

**6.4 Integrations**
- [ ] Настроить Todoist integraton (if API available)
- [ ] Завершить Jira OAuth с Zapier
- [ ] Настроить Canva API для автоматического импорта
- [ ] Интегрировать LuxHost для хостинга

**6.5 Automation**
- [ ] Создать скрипты для repetitive tasks
- [ ] Настроить backup automation
- [ ] Создать monitoring alerts
- [ ] Реализовать auto-deploy scripts

### Nice-to-Have Ideas 💡
- [ ] Создать video tutorials для setup
- [ ] Написать best practices guide
- [ ] Создать style guide для кода
- [ ] Настроить automated documentation generation

---

## 💡 IDEAS CAPTURE SYSTEM

### Как использовать этот файл:

1. **📌 Основная структура**: 6 направлений разработки
2. **✅ Checkboxes**: Отмечай завершенные задачи
3. **💭 Идеи**: Добавляй новые идеи в "Nice-to-Have Ideas" на каждый раздел
4. **🔄 Обновления**: Регулярно обновляй этот файл при добавлении новых задач в Todoist

### Процесс добавления идеи:
```
1. Новая идея появляется → Запиши в IDEAS.md
2. Идея получила форму → Добавь в INITIAL_TASKS.md
3. Готово к работе → Создай задачу в Todoist
4. В процессе → Обновляй checkbox
5. Завершена → Отметь ✅
6. Архивируй → Переведи в COMPLETED.md
```

---

## 📊 Progress Tracking

| Направление | Total Tasks | Completed | % Complete |
|------------|-------------|-----------|-----------|
| 🎨 Дизайн | 8 | 0 | 0% |
| 🌐 Website | 13 | 0 | 0% |
| 💼 Salon API | 10 | 0 | 0% |
| 🤖 TG-Bot | 16 | 0 | 0% |
| 🏗️ Infrastructure | 15 | 0 | 0% |
| 📋 Documentation | 13 | 0 | 0% |
| **ИТОГО** | **75** | **0** | **0%** |

---

**Дата создания**: 14 июня 2026  
**Версия**: 1.0 - Initial Task List  
**Управление**: Один человек + Claude AI + Todoist
