---
id: TASK-018
type: task
title: "Backend для заявок с сайта"
status: backlog
area: website
phase: 2
created: 2026-06-14
updated: 2026-06-14
owner: andreihicatilooo
tags: [api, bookings]
priority: P1
due: 2026-07-31

scores:
  urgency: 3
  impact: 4
  risk: 3
  complexity: 3
  dependency: 3

depends_on:
  - TASK-015
  - TASK-016

definition_of_done:
  - Форма на index.html шлёт POST на API (не только localStorage)
  - Заявка сохраняется в PostgreSQL
  - Telegram-уведомление оператору сохраняется
  - DEBT-003 закрыт (частично — админка отдельно)
---

# TASK-018: Backend для заявок с сайта

## Цель

Заявки не теряются при смене браузера; единый источник данных для админки.

## Шаги

| Step | Название | Status |
|------|----------|--------|
| S1 | `POST /api/appointments` принимает поля формы | [ ] |
| S2 | `js/main.js` — fetch на API + fallback Telegram | [ ] |
| S3 | CORS в salon-api для northcat.top | [ ] |
| S4 | Бот дублирует заявку в API (опционально) | [ ] |
| S5 | Убрать зависимость от localStorage для новых заявок | [ ] |

## Файлы

- `services/website/js/main.js`
- `services/salon-api/src/routes/appointments.ts`

## Закрывает

DEBT-003
