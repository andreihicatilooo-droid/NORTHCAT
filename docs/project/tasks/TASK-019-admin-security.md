---
id: TASK-019
type: task
title: "Защита admin.html"
status: backlog
area: website
phase: 2
created: 2026-06-14
updated: 2026-06-14
owner: andreihicatilooo
tags: [security, admin]
priority: P1
due: 2026-07-15

scores:
  urgency: 2
  impact: 3
  risk: 4
  complexity: 2
  dependency: 1

depends_on: []

definition_of_done:
  - admin.html недоступен без серверной авторизации
  - Клиентский пароль удалён или дополнен
  - DEBT-004 закрыт
---

# TASK-019: Защита admin.html

## Цель

Демо-админка не должна быть публично доступна с захардкоженным паролем.

## Варианты (выбрать один)

| Вариант | Сложность | Рекомендация |
|---------|-----------|--------------|
| A. Basic auth в nginx/Caddy | Низкая | ✅ Быстрый fix |
| B. Удалить admin.html до реальной админки | Низкая | ✅ Если не используется |
| C. Auth через salon-api + JWT | Высокая | Позже с TASK-015 |

## Шаги (вариант A)

| Step | Название | Status |
|------|----------|--------|
| S1 | `auth_basic` в nginx.conf для `/admin.html` | [ ] |
| S2 | Пароль в env / secrets (не в JS) | [ ] |
| S3 | Удалить `northcat` из `admin.js` или оставить как 2-й фактор | [ ] |

## Закрывает

DEBT-004
