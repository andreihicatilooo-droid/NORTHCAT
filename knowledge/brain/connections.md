# 🔗 Связи между проектами и идеями

Визуальная карта как всё связано. Помогает понять когда одна задача влияет на другую.

## Проектные направления NORTHCAT

```
┌─────────────────────────────────────┐
│  NORTHCAT (Северный Кот)            │
├─────────────────────────────────────┤
│                                     │
│  1️⃣ БРЕНДИНГ & ДИЗАЙН              │
│  ├─ Sphinx иллюстрация              │
│  ├─ Sacred geometry                 │
│  └─ Dark gothic aesthetic          │
│      ↓ влияет на...                │
│                                     │
│  2️⃣ WEBSITE (northcat.top)          │
│  ├─ Landing page                    │
│  ├─ Gallery (тату работы)           │
│  ├─ Info + контакты                │
│  └─ SEO оптимизация                │
│      ↓ зависит от...               │
│                                     │
│  3️⃣ SALON MANAGEMENT SYSTEM         │
│  ├─ API (appointments, payments)    │
│  ├─ Database (PostgreSQL)           │
│  ├─ Admin Panel                     │
│  └─ Интеграции (Zapier, etc)       │
│      ↓ нужно для...                │
│                                     │
│  4️⃣ TELEGRAM BOT MVP                │
│  ├─ Booking commands                │
│  ├─ Claude AI integration           │
│  ├─ Notifications                   │
│  └─ User management                │
│      ↓ может улучшить...           │
│                                     │
│  5️⃣ INFRASTRUCTURE & DEVOPS         │
│  ├─ Docker контейнеры               │
│  ├─ Kubernetes/Helm                 │
│  ├─ CI/CD (GitHub Actions)          │
│  └─ Monitoring (Prometheus)         │
│      ↓ обслуживает все...          │
│                                     │
│  6️⃣ KNOWLEDGE BASE & DOCUMENTATION  │
│  └─ Этот файл + всё остальное      │
│                                     │
└─────────────────────────────────────┘
```

## Зависимости между задачами

```
ДИЗАЙН КОШКИ
  ↓
  ├─→ Website Frontend (нужна визуальность)
  │    ↓
  │    ├─→ Landing Page готов
  │    └─→ Gallery готов
  │
  └─→ Brand Guidelines (документация дизайна)
       ↓
       ├─→ Admin Panel UI
       ├─→ TG-Bot UI
       └─→ Маркетинг материалы

DATABASE SCHEMA
  ↓
  ├─→ Salon API разработка
  │    ↓
  │    ├─→ Admin Panel (показывает данные)
  │    └─→ TG-Bot (читает/пишет в БД)
  │
  └─→ Миграции и бэкапы

TG-BOT MVP
  ↓
  ├─→ Claude AI интеграция
  ├─→ Booking система
  └─→ Customer management (в Salon API)
```

## Критические пути (что блокирует другое)

| Блокирует | На задаче | Решение |
|-----------|----------|---------|
| Дизайн | Website Frontend | Нужна утверждённая концепция сфинкса |
| DB Schema | API разработка | Нужна финальная версия схемы |
| TG-Bot API | Claude MCP | Нужны endpoints для AI |
| Infrastructure | Deployment | Нужны Docker + CI/CD |

## Параллельная работа (можно делать одновременно)

- ✅ Дизайн + Database schema (не зависят друг от друга)
- ✅ Website frontend + Salon API (могут быть mock-данные)
- ✅ Infrastructure + код разработка (CI/CD можно подготовить параллельно)
- ✅ TG-Bot MVP + Claude AI (можно интегрировать incrementally)

---

## 🤔 Как читать эту карту

1. **Выбирай задачу** из current-sprint.md
2. **Смотри кто зависит** от неё (вниз по стрелкам)
3. **Проверь блокирует ли** её что-то другое (вверх)
4. **Параллельная работа?** → можешь браться за соседний блок

Пример: если ты в дизайне, а потом переходишь на DB, это параллельно = OK!
Но если сделал DB, то API можешь делать сразу = находятся в depends-on отношениях.
