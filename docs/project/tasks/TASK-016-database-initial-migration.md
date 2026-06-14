---
id: TASK-016
type: task
title: "Database — первая миграция"
status: backlog
area: database
phase: 2
created: 2026-06-14
updated: 2026-06-14
owner: andreihicatilooo
tags: [postgres, migrations]
priority: P1
due: 2026-07-15

scores:
  urgency: 3
  impact: 4
  risk: 2
  complexity: 3
  dependency: 3

depends_on:
  - TASK-010
blocks:
  - TASK-015
  - TASK-018

definition_of_done:
  - database/migrations/001_initial.sql
  - Таблицы clients, appointments, services (минимум)
  - Seed для демо-услуг (опционально)
  - GAP-002 закрыт
---

# TASK-016: Database — первая миграция

## Цель

Схема БД для записей клиентов — основа Salon API и замены localStorage.

## Шаги

| Step | Название | Status |
|------|----------|--------|
| S1 | Взять schema из `services/salon-api/README.md` → упростить до MVP | [ ] |
| S2 | `database/migrations/001_initial.sql` | [ ] |
| S3 | `database/seeds/001_services.sql` — 4 тарифа из data.js | [ ] |
| S4 | Postgres в docker-compose (dev) | [ ] |
| S5 | Скрипт `npm run migrate` или `psql -f` в README | [ ] |

## Таблицы MVP

```sql
clients (id, name, contact, created_at)
appointments (id, client_id, service, date, notes, source, created_at)
services (id, name, price_from, price_to)
```

## Закрывает

GAP-002
