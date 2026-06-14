---
id: TASK-012
type: task
title: "Готовность к публикации: ключи, контент, HTTPS"
status: backlog
area: website
phase: 2
created: 2026-06-14
updated: 2026-06-14
owner: andreihicatilooo
tags: [publish, secrets, content]
priority: P0

scores:
  urgency: 5
  impact: 5
  risk: 4
  complexity: 2
  dependency: 2

depends_on:
  - TASK-011

definition_of_done:
  - BOT_TOKEN и OPERATOR_CHAT_ID в .env (не в git)
  - Реальный TON-адрес в miniapp.html
  - Реальные контакты и фото в data.js
  - HTTPS + Menu Button в BotFather
---

# TASK-012: Готовность к публикации: ключи, контент, HTTPS

## Чек-лист (из СОСТОЯНИЕ_ПРОЕКТА.md §8)

| # | Задача | Сервис | Приоритет | Статус |
|---|--------|--------|-----------|--------|
| 1 | `BOT_TOKEN`, `OPERATOR_CHAT_ID` в `tg-bot/.env` | tg-bot | P0 | [ ] |
| 2 | `STUDIO_TON_ADDRESS` в `miniapp.html` | website | P0 | [ ] |
| 3 | Реальные фото работ/скетчей | website | P0 | [ ] |
| 4 | Контакты в `js/data.js` (STUDIO) | website | P0 | [ ] |
| 5 | Домен + HTTPS | infra | P0 | [ ] |
| 6 | BotFather Menu Button → miniapp URL | tg-bot | P0 | [ ] |
| 7 | `tonconnect-manifest.json` доступен по HTTPS | website | P0 | [ ] |
| 8 | Заменить демо-пароль админки / закрыть admin.html | website | P1 | [ ] |
| 9 | Удалить неиспользуемые видео из `ресурсы/` | website | P2 | [ ] |

## Заметки

Пункты 1–7 блокируют production. Пункт 8 — безопасность (P1). Пункт 9 — экономия ~8.5 МБ (P2).
