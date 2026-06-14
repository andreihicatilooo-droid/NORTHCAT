---
id: IDEA-001
type: idea
title: "Миграция на Next.js vs оставить static MVP"
status: inbox
area: website
priority: P2
created: 2026-06-14
impact: medium
effort: high
---

# IDEA-001: Next.js vs static MVP

## Суть

Корневой README и INITIAL_TASKS планировали Next.js 14. Production — static HTML (~90% готов).

## Варианты

| Вариант | Плюсы | Минусы |
|---------|-------|--------|
| **Оставить static** | Быстрый launch, уже на GCP | Нет SSR, сложнее CMS |
| **Мигрировать на Next.js** | Единый стек с README, API routes | 1–2 недели работы, риск регрессий |
| **Гибрид** | Static сейчас, Next позже | Два стека временно |

## Когда рассмотреть

После TASK-012 (публикация static). Если нужны booking API на том же домене — скорее Next или отдельный salon-api.

## Если принято → TASK-021 (создать при решении)
