---
id: DEBT-003
type: debt
title: "Нет серверного backend — заявки в localStorage"
status: open
area: website
service: website
priority: P1
created: 2026-06-14
updated: 2026-06-14
scores:
  urgency: 3
  impact: 4
  risk: 3
  complexity: 4
  dependency: 2
---

# DEBT-003: Нет серверного backend — заявки в localStorage

## Текущее поведение

- Форма записи на `index.html` → `localStorage` + открытие Telegram
- `admin.html` — все данные в `localStorage` браузера
- Бот принимает заявки через Telegram (работает)

## Риск

Данные не переживают смену браузера/устройства. Админка не масштабируется.

## Решение

Salon API + БД (GAP-001, GAP-002) или минимальный endpoint для заявок.

## Связано

- `services/website/js/main.js`, `js/admin.js`
- GAP-001, GAP-002
