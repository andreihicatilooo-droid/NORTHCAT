---
id: TASK-020
type: task
title: "Workflow: выгрузка GCP → import/ → слияние в монорепо"
status: backlog
area: infra
phase: 1.5
created: 2026-06-14
updated: 2026-06-14
owner: andreihicatilooo
tags: [gcp, sync, import]
priority: P0
due: 2026-06-20

scores:
  urgency: 5
  impact: 5
  risk: 4
  complexity: 2
  dependency: 2

depends_on: []
blocks:
  - TASK-011
  - TASK-012

definition_of_done:
  - Актуальный код с northcat-server в import/gcp-production/
  - diff с services/ просмотрен
  - Изменения слиты в services/website и services/tg-bot
  - docker-compose paths исправлены (TASK-011)
  - Нет секретов в git
---

# TASK-020: GCP sync — выгрузка, правка, слияние

## Контекст

Production на GCP: `/home/G6E6N/northcat-project/` (`northcat-server`).  
В монорепо код **частично** импортирован 14.06 (`9911bc6`, `0ad1a8c`), но:

- на сервере структура **монолитная** (сайт + `bot/` в одной папке)
- в репо — **раздельно** `services/website/` + `services/tg-bot/`
- compose paths сломаны (BUG-001)
- сервер мог обновиться после импорта

## Шаги

| Step | Действие | Status |
|------|----------|--------|
| S1 | `gcloud auth login` + `./scripts/gcp-pull-production.sh` | [ ] |
| S2 | `./scripts/gcp-diff-production.sh` — список отличий | [ ] |
| S3 | Редактировать в `import/gcp-production/` (пути, compose) | [ ] |
| S4 | `rsync` сайт → `services/website/`, бот → `services/tg-bot/` | [ ] |
| S5 | TASK-011: починить docker-compose под монорепо | [ ] |
| S6 | Локальный тест: `deploy.sh` / docker compose up | [ ] |
| S7 | `git diff` — нет `.env`; коммит синхронизации | [ ] |

## Документация

- `import/README.md` — полный workflow
- `scripts/gcp-pull-production.sh`
- `scripts/gcp-diff-production.sh`

## Маппинг путей (сервер → монорепо)

| На GCP (`northcat-project/`) | В монорепо |
|------------------------------|------------|
| `index.html`, `css/`, `js/`, … | `services/website/` |
| `bot/bot.py`, `bot/config.py`, … | `services/tg-bot/` |
| `docker-compose.yml` | root или `services/website/` (после правки) |
| `.env`, `settings.json` | **не в git** — только `.env.example` |
