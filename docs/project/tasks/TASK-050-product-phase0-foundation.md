---
id: TASK-050
type: task
title: "Фаза 0: фундамент продукта (примерочная + backend)"
status: backlog
area: product
phase: 0
created: 2026-06-14
updated: 2026-06-14
owner: andreihicatilooo
tags: [monorepo, gemini, fitting-room]
priority: P0
due: 2026-07-15

scores:
  urgency: 5
  impact: 5
  risk: 3
  complexity: 4
  dependency: 3

depends_on:
  - TASK-020
  - TASK-011

blocks:
  - TASK-051

definition_of_done:
  - Виджет примерочной и прокси Gemini в монорепо
  - Структура frontend/ + backend/
  - PostgreSQL + миграции users/sessions/events
  - docs/NORTHCAT-REQUIREMENTS.md актуален
---

# TASK-050: Фаза 0 — фундамент продукта

## Цель

Объединить существующий сайт/бот с виджетом примерочной и прокси Gemini в единый монорепо с БД.

## Шаги

| Step | Действие | Status |
|------|----------|--------|
| S1 | TASK-020: выгрузка GCP, слияние в services/ | [ ] |
| S2 | Получить от владельца: исходники виджета + прокси (путь/репо) | [ ] |
| S3 | Создать `frontend/`, `backend/`, `infra/` | [ ] |
| S4 | Перенести виджет → `frontend/fitting-room/` | [ ] |
| S5 | Перенести прокси Gemini → `backend/gemini-proxy/` | [ ] |
| S6 | TASK-016: миграции users, sessions, events | [ ] |
| S7 | Docker compose: web + api + postgres + bot | [ ] |

## Источник требований

[docs/NORTHCAT-REQUIREMENTS.md](../../NORTHCAT-REQUIREMENTS.md)
