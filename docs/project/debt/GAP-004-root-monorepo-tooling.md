---
id: GAP-004
type: gap
title: "Нет корневого docker-compose и package.json"
status: open
area: infra
priority: P1
created: 2026-06-14
updated: 2026-06-14
scores:
  urgency: 3
  impact: 3
  risk: 2
  complexity: 2
  dependency: 3
---

# GAP-004: Нет корневого docker-compose и package.json

## Проблема

Корневой `README.md` описывает:
- `docker-compose up -d` в корне
- `npm run dev:website`, `npm run dev:bot`

Фактически:
- `docker-compose.yml` только в `services/website/`
- Нет root `package.json`
- `services/website/package-lock.json` — untracked артефакт без `package.json`

## Решение

Создать root `docker-compose.yml`, объединяющий web + bot + (опционально) postgres.
Либо обновить README: команды запуска из `services/website/`.
