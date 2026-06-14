# INDEX — реестр активных записей

> Обновляй при смене статуса. Сортировка: active/blocked → priority desc.  
> **Предложения и Todoist:** [PROPOSALS.md](PROPOSALS.md)

**Обновлено:** 2026-06-14

## Активные задачи (P0)

| ID | Title | Area | Due | Status | Next step |
|----|-------|------|-----|--------|-----------|
| [TASK-001](tasks/TASK-001-project-planning.md) | Планировка проекта | docs | 28.06 | active | S4 ideas |
| [TASK-020](tasks/TASK-020-gcp-sync-workflow.md) | GCP sync → import/ → merge | infra | 20.06 | backlog | gcloud pull |
| [TASK-011](tasks/TASK-011-fix-monorepo-docker.md) | Починить Docker/monorepo | infra | 20.06 | backlog | after TASK-020 |
| [TASK-012](tasks/TASK-012-production-readiness.md) | Готовность к публикации | website | 20.06 | backlog | .env бота |
| [TASK-013](tasks/TASK-013-sync-documentation.md) | Синхронизировать документацию | docs | 20.06 | backlog | README |

## Backlog (P1)

| ID | Title | Area | Due | Blocked by |
|----|-------|------|-----|------------|
| [TASK-010](tasks/TASK-010-docker-local-dev.md) | Docker local dev monorepo | infra | 28.06 | TASK-011 |
| [TASK-014](tasks/TASK-014-ci-build-smoke.md) | CI build + smoke | infra | 30.06 | TASK-011 |
| [TASK-016](tasks/TASK-016-database-initial-migration.md) | Первая миграция БД | database | 15.07 | TASK-010 |
| [TASK-015](tasks/TASK-015-salon-api-mvp.md) | Salon API MVP | salon-api | 31.07 | TASK-016 |
| [TASK-018](tasks/TASK-018-bookings-backend.md) | Backend заявок | website | 31.07 | TASK-015 |
| [TASK-017](tasks/TASK-017-visual-identity.md) | VISUAL_IDENTITY.md | design | **25.06** | — |
| [TASK-040](tasks/TASK-040-export-design-assets.md) | Экспорт из Canva | design | **25.06** | TASK-017 |
| [TASK-019](tasks/TASK-019-admin-security.md) | Защита admin.html | website | 15.07 | — |

## Отменено / готово

| ID | Title | Статус |
|----|-------|--------|
| TASK-020 | Website MVP landing | cancelled (static ~90%) |
| TASK-030 | TG-bot MVP commands | mostly done (aiogram 3) |

## Баги

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [BUG-001](bugs/BUG-001-docker-compose-bot-path.md) | docker-compose → bot/ | **P0** | open |

## Техдолг

| ID | Title | Priority | Закрывает задача |
|----|-------|----------|------------------|
| [DEBT-001](debt/DEBT-001-docs-stack-mismatch.md) | Документация ≠ стек | **P0** | TASK-013 |
| [DEBT-002](debt/DEBT-002-ci-no-build-test.md) | CI без build | P1 | TASK-014 |
| [DEBT-003](debt/DEBT-003-no-backend-localstorage.md) | localStorage | P1 | TASK-018 |
| [DEBT-004](debt/DEBT-004-admin-client-auth.md) | Пароль админки | P1 | TASK-019 |

## Пробелы (GAP)

| ID | Title | Priority | Закрывает задача |
|----|-------|----------|------------------|
| [GAP-001](debt/GAP-001-salon-api-empty.md) | Salon API пуст | P1 | TASK-015 |
| [GAP-002](debt/GAP-002-database-empty.md) | Нет миграций | P1 | TASK-016 |
| [GAP-003](debt/GAP-003-visual-identity-missing.md) | Нет VISUAL_IDENTITY | P1 | TASK-017 |
| [GAP-004](debt/GAP-004-root-monorepo-tooling.md) | Нет root compose | P1 | TASK-010 |

## Идеи (inbox)

| ID | Title | Priority | Файл |
|----|-------|----------|------|
| [IDEA-001](ideas/IDEA-001-nextjs-vs-static.md) | Next.js vs static | P2 | |
| [IDEA-002](ideas/IDEA-002-media-cleanup.md) | Очистка медиа | P2 | |
| [IDEA-003](ideas/IDEA-003-architecture-diagram.md) | Architecture diagram | P2 | |

---

## Быстрые команды

- «Что делать дальше?» → [PROPOSALS.md](PROPOSALS.md) порядок: 011 → 012 → 013
- «Задачи в Todoist» → секция в PROPOSALS.md
- «Статус дизайна» → TASK-017, TASK-040 (due 25.06)
