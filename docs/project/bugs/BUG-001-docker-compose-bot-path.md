---
id: BUG-001
type: bug
title: "docker-compose в website/ ссылается на несуществующий bot/"
status: open
area: infra
service: website
created: 2026-06-14
updated: 2026-06-14
priority: P0
scores:
  urgency: 5
  impact: 5
  risk: 5
  complexity: 2
  dependency: 4
---

# BUG-001: docker-compose в website/ ссылается на несуществующий bot/

## Симптом

`services/website/docker-compose.yml` собирает бота из контекста `.` с `Dockerfile.bot` и читает `./bot/.env`, но после импорта в монорепо бот лежит в `services/tg-bot/`, а `Dockerfile.bot` — там же.

## Влияние

Локальный деплой `./deploy.sh` из `website/` падает или собирает устаревший/пустой образ бота.

## Решение

- Вынести root `docker-compose.yml` в корень репо с путями `services/website` и `services/tg-bot`
- Или поправить `context`/`dockerfile`/`env_file` в `website/docker-compose.yml`
- Обновить `deploy.sh` и `СОСТОЯНИЕ_ПРОЕКТА.md`

## Связанные файлы

- `services/website/docker-compose.yml`
- `services/tg-bot/Dockerfile.bot`
- `services/tg-bot/.env.example`
