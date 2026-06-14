---
id: DEBT-001
type: debt
title: "Документация описывает Next.js/Node, код — static HTML/Python"
status: open
area: docs
priority: P0
created: 2026-06-14
updated: 2026-06-14
scores:
  urgency: 4
  impact: 4
  risk: 3
  complexity: 2
  dependency: 3
---

# DEBT-001: Документация описывает Next.js/Node, код — static HTML/Python

## Проблема

| Документ | Утверждает | Факт |
|----------|------------|------|
| `README.md` (корень) | Next.js 14, Telegraf, root docker-compose | Static HTML, aiogram 3, compose только в website/ |
| `services/website/README.md` | Next.js, Prisma, Tailwind | Static HTML/CSS/JS |
| `services/tg-bot` в BACKLOG | telegraf / node-telegram-bot-api | Python aiogram 3 (готов) |
| `INITIAL_TASKS.md` §2.1 | Инициализировать Next.js | Сайт уже готов (импорт production) |

## Риск

Новый разработчик или AI-ассистент начнёт с неверного стека, дублирует работу.

## Решение

1. Обновить корневой `README.md` под фактический стек
2. Пометить `services/website/README.md` как «целевой» или «устаревший план»
3. В `INITIAL_TASKS.md` отметить выполненные пункты website/bot
4. Решить: миграция на Next.js (отдельная задача) или зафиксировать static как MVP

## Затронутые файлы

- `README.md`, `CLAUDE.md`
- `services/website/README.md`
- `docs/BACKLOG.md`, `docs/INITIAL_TASKS.md`
- `docs/PROJECT_MAP.md`
