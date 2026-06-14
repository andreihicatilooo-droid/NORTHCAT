---
id: GAP-002
type: gap
title: "Database — нет схемы и миграций"
status: open
area: database
priority: P1
created: 2026-06-14
updated: 2026-06-14
scores:
  urgency: 3
  impact: 4
  risk: 2
  complexity: 4
  dependency: 3
---

# GAP-002: Database — нет схемы и миграций

## Текущее состояние

`database/migrations/README.md` — заглушка.
Нет `schemas/`, `seeds/`, SQL-файлов, docker-контейнера PostgreSQL.

## Блокирует

- Salon API (GAP-001)
- Сохранение заявок с бота/сайта на сервере
- Замену демо-админки серверной авторизацией

## Следующий шаг

Перенести schema из `services/salon-api/README.md` в `database/migrations/001_initial.sql`.
