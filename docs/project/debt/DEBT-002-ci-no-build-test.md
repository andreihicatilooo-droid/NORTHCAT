---
id: DEBT-002
type: debt
title: "CI не проверяет сборку Docker, lint и тесты"
status: open
area: infra
priority: P1
created: 2026-06-14
updated: 2026-06-14
scores:
  urgency: 3
  impact: 4
  risk: 3
  complexity: 3
  dependency: 2
---

# DEBT-002: CI не проверяет сборку Docker, lint и тесты

## Текущее состояние

`.github/workflows/ci.yml` — только проверка `gh api` (доступ к GitHub).
`luxhost-check.yml` — ручная проверка LuxHost VPS.

## Чего нет

- Сборка `Dockerfile.web` и `Dockerfile.bot`
- Валидация `docker-compose.yml` (пути сервисов)
- Lint Python (`ruff`/`flake8`) для бота
- Проверка HTML/JS (опционально)
- Smoke-test: nginx отдаёт `index.html`

## Решение

Добавить job `build` в CI после исправления BUG-001.
