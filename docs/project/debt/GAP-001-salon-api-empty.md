---
id: GAP-001
type: gap
title: "Salon API — только README, без исходного кода"
status: open
area: salon-api
service: salon-api
priority: P1
created: 2026-06-14
updated: 2026-06-14
scores:
  urgency: 3
  impact: 4
  risk: 2
  complexity: 5
  dependency: 2
---

# GAP-001: Salon API — только README, без исходного кода

## Текущее состояние

`services/salon-api/` содержит только `README.md` (~490 строк спецификации).
Нет `package.json`, `src/`, `.env.example`, Dockerfile.

## Зависимости

- Заявки с сайта сейчас в `localStorage` + Telegram (без API)
- Админка `admin.html` — клиентский localStorage
- BACKLOG планирует API к 31.07.2026

## Следующий шаг

Спроектировать schema → `database/migrations/` → минимальный Express/FastAPI с `/api/appointments`.
