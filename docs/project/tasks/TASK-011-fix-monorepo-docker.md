---
id: TASK-011
type: task
title: "Починить Docker/monorepo после импорта production"
status: backlog
area: infra
phase: 2
created: 2026-06-14
updated: 2026-06-14
owner: andreihicatilooo
tags: [docker, monorepo, deploy]
priority: P0

scores:
  urgency: 5
  impact: 5
  risk: 5
  complexity: 2
  dependency: 4

depends_on: []
blocks:
  - TASK-010

definition_of_done:
  - Root или исправленный docker-compose собирает web + bot из правильных путей
  - deploy.sh работает из документированной директории
  - BUG-001 закрыт
---

# TASK-011: Починить Docker/monorepo после импорта production

## Цель

Восстановить рабочий локальный деплой после разделения `website/` и `tg-bot/`.

## Шаги

| Step | Название | U | I | R | C | D | Score | Status |
|------|----------|---|---|---|---|---|-------|--------|
| S1 | Исправить пути в docker-compose (context, dockerfile, env_file) | 5 | 5 | 5 | 2 | 4 | **38.5** | [ ] |
| S2 | Создать root `docker-compose.yml` (опционально) | 3 | 4 | 3 | 2 | 3 | **25.5** | [ ] |
| S3 | Обновить `deploy.sh` и README обоих сервисов | 4 | 4 | 3 | 1 | 2 | **28.5** | [ ] |
| S4 | Проверить: `docker compose up` → сайт :8080, бот стартует | 5 | 5 | 5 | 1 | 2 | **38.5** | [ ] |

## Связано

- BUG-001
- GAP-004
