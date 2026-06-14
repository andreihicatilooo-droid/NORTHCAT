---
id: TASK-010
type: task
title: "Docker local dev — полный monorepo"
status: backlog
area: infra
phase: 2
created: 2026-06-14
updated: 2026-06-14
owner: andreihicatilooo
tags: [docker, dev]
priority: P1
due: 2026-06-28

scores:
  urgency: 4
  impact: 4
  risk: 3
  complexity: 3
  dependency: 3

depends_on:
  - TASK-011
blocks:
  - TASK-014

definition_of_done:
  - Один compose поднимает web + bot (+ опц. postgres)
  - README описывает команды из одной директории
  - Новый разработчик запускает за < 10 мин
---

# TASK-010: Docker local dev — полный monorepo

## Цель

Единая команда для локальной разработки всего MVP без ручной сборки сервисов по отдельности.

## Шаги

| Step | Название | U | I | R | C | D | Score | Status |
|------|----------|---|---|---|---|---|-------|--------|
| S1 | Root `docker-compose.yml` (web, bot, caddy) | 4 | 4 | 3 | 2 | 3 | **28.5** | [ ] |
| S2 | Опционально: сервис `postgres` для dev | 3 | 4 | 2 | 2 | 2 | **22.5** | [ ] |
| S3 | `.env.example` в корне с ссылками на сервисы | 3 | 3 | 2 | 1 | 2 | **20.5** | [ ] |
| S4 | Quick start в README: `docker compose up` | 4 | 4 | 2 | 1 | 2 | **27.5** | [ ] |

## Закрывает

GAP-004 (частично)
