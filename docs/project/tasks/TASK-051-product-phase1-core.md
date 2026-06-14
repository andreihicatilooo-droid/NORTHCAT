---
id: TASK-051
type: task
title: "Фаза 1: аккаунты + биллинг + прокси (M1–M4)"
status: backlog
area: product
phase: 1
created: 2026-06-14
updated: 2026-06-14
owner: andreihicatilooo
tags: [auth, billing, gemini]
priority: P0
due: 2026-08-31

depends_on:
  - TASK-050

definition_of_done:
  - M1 OAuth/TG/Passkey + единый user
  - M2 коды оплаты + активация
  - M3 прокси с валидацией успешной генерации
  - M4 events logging
---

# TASK-051: Фаза 1 — ядро (M1–M4)

## Модули

| Модуль | Ключевое |
|--------|----------|
| M1 | Google OAuth, Telegram Login, Passkey, httpOnly sessions |
| M2 | codes table, активация, credits balance |
| M3 | gemini-2.5-flash-image, op-billing, retries×3, request-id |
| M4 | events table, admin summaries |

## Блокируется ответами владельца (§7 REQUIREMENTS)

- Номиналы пакетов и кешбек %
- tg_id админов
- Gemini API key (server-only, не в git)

## Требования

[docs/NORTHCAT-REQUIREMENTS.md](../../NORTHCAT-REQUIREMENTS.md) §3, M1–M4
