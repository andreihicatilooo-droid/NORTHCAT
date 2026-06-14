---
id: TASK-014
type: task
title: "CI: сборка Docker и smoke-test"
status: backlog
area: infra
phase: 2
created: 2026-06-14
updated: 2026-06-14
owner: andreihicatilooo
tags: [ci, github-actions]
priority: P1
due: 2026-06-30

scores:
  urgency: 3
  impact: 4
  risk: 3
  complexity: 3
  dependency: 2

depends_on:
  - TASK-011

definition_of_done:
  - CI собирает Dockerfile.web и Dockerfile.bot
  - Smoke: nginx отдаёт index.html
  - DEBT-002 закрыт
---

# TASK-014: CI — сборка Docker и smoke-test

## Цель

Ловить поломки деплоя до merge в main.

## Шаги

| Step | Название | Status |
|------|----------|--------|
| S1 | Job `build-web`: `docker build -f services/website/Dockerfile.web` | [ ] |
| S2 | Job `build-bot`: `docker build -f services/tg-bot/Dockerfile.bot` | [ ] |
| S3 | `docker compose config` — валидация YAML | [ ] |
| S4 | Smoke: curl index.html из web-контейнера | [ ] |
| S5 | (Опц.) `ruff check` для tg-bot | [ ] |

## Файлы

- `.github/workflows/ci.yml`

## Закрывает

DEBT-002
