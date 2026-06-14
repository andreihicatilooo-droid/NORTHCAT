# Предложения задач — NORTHCAT

> Сводка предложений из аудита 14.06.2026.  
> Реестр: [INDEX.md](INDEX.md) · Дорожная карта: [ROADMAP.md](ROADMAP.md)

**Обновлено:** 2026-06-14

---

## Порядок выполнения (рекомендуемый)

```
TASK-020 (выгрузка GCP → import/) → правки → слияние в services/
       ↓
TASK-011 (Docker paths) → TASK-012 (публикация) → TASK-013 (документация)
```

---

## P0 — критично

### TASK-020: Выгрузка GCP и слияние в монорепо
- **Оценка:** 1–3 ч
- **Файл:** [tasks/TASK-020-gcp-sync-workflow.md](tasks/TASK-020-gcp-sync-workflow.md)
- **Документация:** [import/README.md](../../import/README.md)

```bash
gcloud auth login
export GCP_PROJECT=cerber-495808
./scripts/gcp-pull-production.sh      # → import/gcp-production/
./scripts/gcp-diff-production.sh      # сравнить с services/
# правки в import/ → rsync в services/website и services/tg-bot
```

---

### TASK-011: Починить Docker/monorepo
- **Проект Todoist:** TG-бот / Агент (или Infrastructure)
- **Оценка:** 1–2 ч
- **Файл:** [tasks/TASK-011-fix-monorepo-docker.md](tasks/TASK-011-fix-monorepo-docker.md)
- **Закрывает:** BUG-001, часть GAP-004

| Шаг | Действие | Время |
|-----|----------|-------|
| S1 | Исправить `context`, `dockerfile`, `env_file` в compose | 30 мин |
| S2 | (Опц.) Root `docker-compose.yml` | 30 мин |
| S3 | Обновить `deploy.sh`, README сервисов | 20 мин |
| S4 | `docker compose up` — сайт :8080, бот стартует | 15 мин |

---

### TASK-012: Готовность к публикации
- **Проект Todoist:** Дизайн NORTHCAT + TG-бот / Агент
- **Оценка:** 2–4 ч (без замены всех фото)
- **Файл:** [tasks/TASK-012-production-readiness.md](tasks/TASK-012-production-readiness.md)
- **Due:** до запуска northcat.top

| # | Действие | Кто | Приоритет |
|---|----------|-----|-----------|
| 1 | `services/tg-bot/.env` — BOT_TOKEN, OPERATOR_CHAT_ID | владелец | P0 |
| 2 | `miniapp.html` — STUDIO_TON_ADDRESS | владелец | P0 |
| 3 | `js/data.js` — реальные контакты STUDIO | владелец | P0 |
| 4 | Заменить демо-фото работ/скетчей | владелец | P0 |
| 5 | Домен + HTTPS (Caddy на GCP) | infra | P0 |
| 6 | BotFather → Menu Button → miniapp URL | владелец | P0 |
| 7 | Проверить `tonconnect-manifest.json` по HTTPS | проверка | P0 |
| 8 | Защита admin.html (nginx auth) | dev | P1 |
| 9 | Удалить лишние видео в `ресурсы/` | dev | P2 |

---

### TASK-013: Синхронизировать документацию
- **Проект Todoist:** —
- **Оценка:** 1–2 ч
- **Файл:** [tasks/TASK-013-sync-documentation.md](tasks/TASK-013-sync-documentation.md)
- **Закрывает:** DEBT-001

| Шаг | Файл |
|-----|------|
| S1 | `README.md` — static HTML + Python bot |
| S2 | `docs/PROJECT_MAP.md` — статусы |
| S3 | `docs/INITIAL_TASKS.md` — отметить выполненное |
| S4 | `docs/BACKLOG.md` — актуальный спринт |
| S5 | `services/website/README.md` — пометка «план vs факт» |

---

## P1 — важно

### TASK-010: Docker local dev (полный monorepo)
- **Блокируется:** TASK-011
- **Оценка:** 2 ч
- **Файл:** [tasks/TASK-010-docker-local-dev.md](tasks/TASK-010-docker-local-dev.md)

### TASK-014: Расширить CI (build + smoke)
- **Закрывает:** DEBT-002
- **Оценка:** 2–3 ч
- **Файл:** [tasks/TASK-014-ci-build-smoke.md](tasks/TASK-014-ci-build-smoke.md)

### TASK-015: Salon API — минимальный MVP
- **Закрывает:** GAP-001, часть DEBT-003
- **Оценка:** 1–2 дня
- **Файл:** [tasks/TASK-015-salon-api-mvp.md](tasks/TASK-015-salon-api-mvp.md)
- **Depends:** TASK-016

### TASK-016: Database — первая миграция
- **Закрывает:** GAP-002
- **Оценка:** 3–4 ч
- **Файл:** [tasks/TASK-016-database-initial-migration.md](tasks/TASK-016-database-initial-migration.md)

### TASK-017: Visual Identity Guide
- **Закрывает:** GAP-003
- **Due:** 25.06.2026
- **Оценка:** 3–5 ч
- **Файл:** [tasks/TASK-017-visual-identity.md](tasks/TASK-017-visual-identity.md)
- **Проект Todoist:** Дизайн NORTHCAT

### TASK-018: Backend для заявок (API endpoint)
- **Закрывает:** DEBT-003
- **Оценка:** 4–6 ч
- **Файл:** [tasks/TASK-018-bookings-backend.md](tasks/TASK-018-bookings-backend.md)
- **Depends:** TASK-015, TASK-016

### TASK-019: Защита админки
- **Закрывает:** DEBT-004
- **Оценка:** 1–2 ч
- **Файл:** [tasks/TASK-019-admin-security.md](tasks/TASK-019-admin-security.md)

### TASK-040: Экспорт дизайн-ассетов из Canva
- **Проект Todoist:** Дизайн NORTHCAT
- **Due:** 25.06.2026
- **Оценка:** 2–4 ч
- **Файл:** [tasks/TASK-040-export-design-assets.md](tasks/TASK-040-export-design-assets.md)

---

## P2 — предложения / отложить

| ID | Предложение | Тип | Файл |
|----|-------------|-----|------|
| IDEA-001 | Миграция на Next.js vs оставить static | idea | [ideas/IDEA-001-nextjs-vs-static.md](ideas/IDEA-001-nextjs-vs-static.md) |
| IDEA-002 | Очистка медиа `ресурсы/` (~8.5 МБ) | idea | [ideas/IDEA-002-media-cleanup.md](ideas/IDEA-002-media-cleanup.md) |
| IDEA-003 | Architecture diagram | idea | [ideas/IDEA-003-architecture-diagram.md](ideas/IDEA-003-architecture-diagram.md) |
| — | Кириллица в Pirata One — локальный шрифт с кириллицей | note | в TASK-017 |

---

## Todoist — готовые формулировки

Скопируй в проект **«TG-бот / Агент»** или **«Дизайн NORTHCAT»**:

```
TASK-011 Починить docker-compose (web + tg-bot paths)
TASK-011/S1 Исправить пути в docker-compose.yml
TASK-012 Заполнить .env бота и TON-адрес miniapp
TASK-012/S3 Обновить контакты и фото в data.js
TASK-013 Синхронизировать README с фактическим стеком
TASK-017 Создать docs/VISUAL_IDENTITY.md
TASK-040 Экспорт ассетов из Canva в resources/design/
TASK-014 CI: сборка Docker-образов
TASK-016 Первая SQL-миграция database/
TASK-015 Salon API MVP (appointments endpoint)
```

**Due strings (Europe/Riga):**
- TASK-017, TASK-040 → `25 июня`
- TASK-011, TASK-012, TASK-013 → `20 июня` (или `завтра` для срочного)

---

## Связь типов записей

| Тип | Когда использовать | Пример |
|-----|-------------------|--------|
| **BUG** | Что-то сломано сейчас | BUG-001 compose paths |
| **DEBT** | Работает, но плохо / риск | DEBT-003 localStorage |
| **GAP** | Компонент отсутствует | GAP-001 salon-api |
| **TASK** | Конкретная работа с шагами | TASK-011 |
| **IDEA** | Предложение на обсуждение | IDEA-001 Next.js |
