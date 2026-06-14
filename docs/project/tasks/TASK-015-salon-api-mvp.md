---
id: TASK-015
type: task
title: "Salon API — минимальный MVP"
status: backlog
area: salon-api
phase: 2
created: 2026-06-14
updated: 2026-06-14
owner: andreihicatilooo
tags: [api, express]
priority: P1
due: 2026-07-31

scores:
  urgency: 3
  impact: 4
  risk: 2
  complexity: 4
  dependency: 3

depends_on:
  - TASK-016
blocks:
  - TASK-018

definition_of_done:
  - package.json, src/, .env.example
  - POST /api/appointments работает
  - GET /api/health
  - GAP-001 закрыт
---

# TASK-015: Salon API — минимальный MVP

## Цель

Минимальный backend для заявок с сайта и бота — без полного CRM.

## Шаги

| Step | Название | Status |
|------|----------|--------|
| S1 | `npm init` + Express/Fastify в `services/salon-api/` | [ ] |
| S2 | Подключение PostgreSQL (DATABASE_URL) | [ ] |
| S3 | `POST /api/appointments` — имя, контакт, услуга, дата, идея | [ ] |
| S4 | `GET /api/health` + `GET /api/appointments` (admin, позже auth) | [ ] |
| S5 | Dockerfile.api + добавить в compose | [ ] |
| S6 | README с curl-примерами | [ ] |

## Не входит в MVP

- JWT auth (отдельная задача)
- Analytics, gallery CRUD
- Swagger (P2)

## Закрывает

GAP-001
