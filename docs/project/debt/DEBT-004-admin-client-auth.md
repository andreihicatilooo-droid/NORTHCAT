---
id: DEBT-004
type: debt
title: "Админка admin.html — клиентский пароль"
status: open
area: website
service: website
priority: P1
created: 2026-06-14
updated: 2026-06-14
scores:
  urgency: 2
  impact: 3
  risk: 4
  complexity: 3
  dependency: 1
---

# DEBT-004: Админка admin.html — клиентский пароль

## Проблема

Пароль `northcat` захардкожен в `js/admin.js`. Страница помечена `noindex`, но не защищена на уровне сервера.

## Решение (на выбор)

1. Закрыть `admin.html` basic auth на nginx/Caddy
2. Серверная авторизация через API
3. Удалить страницу до появления реальной админки

## Файлы

- `services/website/admin.html`
- `services/website/js/admin.js`
