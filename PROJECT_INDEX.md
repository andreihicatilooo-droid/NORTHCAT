# 📍 NORTHCAT Project Index
**Индекс проекта для быстрой навигации и поиска информации**

> Последнее обновление: 2026-06-18 | Временная зона: Europe/Riga

---

## 🎯 О проекте

| Параметр | Значение |
|----------|----------|
| **Название** | NORTHCAT (Северный Кот) |
| **Тип** | Dark gothic tattoo studio + Salon management system |
| **Сайт** | northcat.top |
| **Язык** | Русский (документы) + English (код) |
| **Email** | andreihicatilooo@gmail.com |

---

## 📂 Структура репозитория

```
NORTHCAT/
├── docs/                      # 📚 Вся документация проекта
│   ├── PROJECT_MEMORY.md      # 📊 Статус проекта и прогресс
│   ├── PROJECT_MAP.md         # 🗺️ Карта 6 направлений проекта
│   ├── INITIAL_TASKS.md       # ✅ Полный список задач (75+)
│   ├── BACKLOG.md             # 📋 Приоритизированный список
│   ├── COMPLETED.md           # ✔️ Архив завершённых задач
│   ├── IDEAS.md               # 💡 Система захвата идей
│   ├── VISUAL_IDENTITY.md     # 🎨 Гайд по бренду (цвета, шрифты)
│   ├── RESOURCES_LINKS.md     # 🔗 Активные инструменты и интеграции
│   ├── API_CONFIG.md          # 🔑 Конфиги интеграций
│   └── AI_MANAGEMENT.md       # 🤖 Как использовать Claude как PM
├── services/                   # 💼 Микросервисы
│   ├── website/               # 🌐 northcat.top (frontend/backend)
│   ├── salon-api/             # 🛠️ API салона
│   ├── tg-bot/                # 🤖 Telegram-бот с Claude AI
│   └── admin-panel/           # ⚙️ Админ-панель
├── database/                  # 🗄️ БД (схемы, миграции, seeding)
├── design/                    # 🎨 Дизайн-проекты (Canva)
├── docker/                    # 🐳 Docker configs
├── k8s/                      # ☸️ Kubernetes manifests
├── monitoring/               # 📈 Prometheus, dashboards, alerts
├── scripts/                  # 🔧 Utility скрипты
├── config/                   # ⚙️ Конфигурация
├── .github/                  # 🤖 GitHub Actions
├── CLAUDE.md                 # 📖 **Полный гайд для Claude Code**
└── PROJECT_INDEX.md          # 📍 **Этот файл (индекс)**
```

---

## 🌳 Активные ветки

| Ветка | Статус | Назначение |
|-------|--------|-----------|
| `main` | Protected | Production-ready код |
| `claude/hopeful-pascal-8bsiym` | **Active** | 🚀 **Текущая ветка разработки** |
| `claude/*` | Feature branches | Другие задачи Claude |

**➡️ Разработка ведётся на:** `claude/hopeful-pascal-8bsiym`

---

## 📚 Где искать информацию

### 🎨 Дизайн & Брендинг
- **Visual Identity**: `docs/VISUAL_IDENTITY.md`
- **Цвета**: Hot pink (#f4587e) на Dark green-black (#0c120e)
- **Дизайн проект**: https://www.canva.com/d/1WIUhM7eGyk1FpF
- **Шрифты & иконки**: See `docs/VISUAL_IDENTITY.md`

### 📋 Планирование & Управление
| Документ | Для чего | Обновление |
|----------|----------|-----------|
| `docs/PROJECT_MAP.md` | Общая карта 6 направлений | еженедельно |
| `docs/INITIAL_TASKS.md` | Все задачи (75+, сортировка) | при изменениях |
| `docs/BACKLOG.md` | P0/P1 приоритеты для спринтов | еженедельно |
| `docs/IDEAS.md` | Новые идеи (перед BACKLOG) | постоянно |
| `docs/PROJECT_MEMORY.md` | Статус, прогресс, блокеры | еженедельно |
| `docs/COMPLETED.md` | Архив завершённых (создать) | при завершении |

### 🔧 Конфигурация & API
- **API ключи**: `config/API_CONFIG.md` (не в версион контроле!)
- **Интеграции**: `docs/RESOURCES_LINKS.md`
- **Secrets**: GitHub Secrets для CI/CD
- **Env vars**: `.env.example` как шаблон

### 🤖 Интеграции (Активные)

| Инструмент | Как использовать | Статус |
|-----------|------------------|--------|
| **Todoist** | Task management | ✅ Active |
| - Проект 1 | "Дизайн NORTHCAT" | 7 задач, deadline 25.06.2026 |
| - Проект 2 | "TG-бот / Агент" | MVP + extended features |
| **Canva** | Дизайн проекты | ✅ Active |
| - Основной | https://www.canva.com/d/1WIUhM7eGyk1FpF | Pinned candidate |
| **LuxHost API** | Хостинг | ✅ Active |
| - Docs | https://api.luxhost.cc/public/api | Config: API_CONFIG.md |
| **GitHub Actions** | CI/CD | ✅ Active |
| **Zapier** | Интеграции | ⏳ Pending Jira OAuth |

---

## 🚀 Частые команды

### Базовые
```bash
# Клонирование
git clone <repo>

# Переход на ветку
git checkout claude/hopeful-pascal-8bsiym

# Обновление
git pull origin claude/hopeful-pascal-8bsiym

# Закоммитить и запушить
git add .
git commit -m "feat: описание изменения"
git push -u origin claude/hopeful-pascal-8bsiym
```

### Website (northcat.top)
```bash
npm install          # Установить зависимости
npm run dev          # Dev сервер
npm run build        # Production build
npm run preview      # Просмотр build
npm run lint         # Линтинг
npm run type-check   # Проверка типов (TypeScript)
```

### Telegram Bot
```bash
cd services/tg-bot/
npm install
npm run dev          # Hot reload dev mode
npm start            # Запуск бота
```

### Docker & Deployment
```bash
docker-compose build            # Собрать образы
docker-compose up -d            # Запустить
docker-compose down             # Остановить
docker-compose logs -f <service> # Логи
docker-compose up -d --build <service> # Пересобрать сервис
```

### Database
```bash
npm run migrate              # Запустить миграции
npm run seed                 # Seeding данных
npm run rollback             # Откатить
npm run migration:status     # Статус
```

### Тестирование & Качество
```bash
npm test                     # Все тесты
npm test -- --watch         # Watch режим
npm test -- --coverage      # Coverage
npm run format              # Форматирование кода
npm run lint                # Линтинг
```

---

## 📅 Сроки & Вехи

| Задача | Дедлайн | Статус |
|--------|---------|--------|
| 🎨 Design NORTHCAT (7 tasks) | 25.06.2026 | In Progress |
| 🔐 Jira OAuth Setup | - | Pending |
| 🤖 TG-Bot MVP | - | In Development |
| 🌐 Website Launch | - | Planned |

---

## 🔍 Быстрые справки

### Структура сервисов
- **services/website/** - Next.js / React frontend + backend
- **services/salon-api/** - REST API для управления салоном
- **services/tg-bot/** - Node.js bot с Claude AI integration
- **services/admin-panel/** - Admin dashboard

### Важные файлы для ориентации
```
CLAUDE.md              ← 📖 ПОЛНЫЙ гайд (читай сначала)
PROJECT_INDEX.md       ← 📍 Этот файл (указатели)
docs/PROJECT_MEMORY.md ← 📊 Текущий статус
docs/BACKLOG.md        ← 📋 Что делать дальше
```

### Система управления проектом
```
Новая идея
    ↓
docs/IDEAS.md
    ↓
docs/INITIAL_TASKS.md
    ↓
docs/BACKLOG.md (P0/P1)
    ↓
Todoist (создать задачу)
    ↓
🚀 Разработка
    ↓
docs/COMPLETED.md
```

---

## 💡 Команды для Claude (PM-режим)

Используй `docs/AI_MANAGEMENT.md` для командования Claude как Project Manager:

```
"Что мне делать дальше?"
"Help me plan the sprint"
"Show me my progress"
"Какие задачи заблокированы?"
"Обнови PROJECT_MEMORY.md"
```

---

## 🔗 Полезные ссылки

| Ресурс | Ссылка |
|--------|--------|
| Canva Design | https://www.canva.com/d/1WIUhM7eGyk1FpF |
| LuxHost API | https://api.luxhost.cc/public/api |
| GitHub Repo | andreihicatilooo-droid/northcat |
| Todoist Account | Andreihicatilooo |
| Website | northcat.top |

---

## ⚠️ Важно помнить

1. ✅ **Всегда работай на ветке**: `claude/hopeful-pascal-8bsiym`
2. 🚫 **Не коммитиь в main** без явного указания
3. 🔐 **Секреты в GitHub Secrets**, не в коде
4. 📝 **Commit messages**: `<type>: описание` (feat, fix, design, docs)
5. 🐳 **Docker для изоляции сервисов**
6. 🧪 **Тесты перед push**
7. 🎨 **Канва дизайны в design/ папке**

---

**📞 Контакты:**
- Email: andreihicatilooo@gmail.com
- Timezone: Europe/Riga (UTC+2/3)
- Todoist: Andreihicatilooo

---
*Этот индекс служит быстрым указателем на основные ресурсы проекта. Для подробной информации смотри CLAUDE.md*
