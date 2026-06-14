# ROADMAP — NORTHCAT

> Фазы и вехи. **Навигация по направлениям:** [DIRECTIONS-MAP.md](DIRECTIONS-MAP.md)  
> Детали — в TASK-*.md · Реестр: [INDEX.md](INDEX.md) · Предложения: [PROPOSALS.md](PROPOSALS.md)

**Обновлено:** 2026-06-14

## GitHub Roadmap

| Ресурс | Ссылка |
|--------|--------|
| **Issues (все задачи)** | https://github.com/andreihicatilooo-droid/NORTHCAT/issues |
| **Milestones (фазы)** | https://github.com/andreihicatilooo-droid/NORTHCAT/milestones |
| **P0 сейчас** | [#3 TASK-020](https://github.com/andreihicatilooo-droid/NORTHCAT/issues/3) → [#4 TASK-011](https://github.com/andreihicatilooo-droid/NORTHCAT/issues/4) → [#5 TASK-012](https://github.com/andreihicatilooo-droid/NORTHCAT/issues/5) |

**Labels:** `priority/P0–P2` · `phase/1–4` · `area/*` · `type/task|bug|debt|gap|idea`

**Синхронизация:** `./scripts/github-roadmap-setup.sh` — создаёт labels, milestones и issues из `docs/project/`.

**GitHub Project board** (Kanban / Roadmap view):
```bash
gh auth refresh -s project,read:project
./scripts/github-roadmap-setup.sh --project
```
Или вручную: **Projects → New project → Board** → Add items from repo → View **Roadmap** по Milestone.

## Phase 0: Product Foundation (июль 2026) — NORTHCAT-REQUIREMENTS

| Milestone | Задачи | Статус |
|-----------|--------|--------|
| GCP sync + monorepo fix | TASK-020, TASK-011 | ⏳ P0 |
| Виджет + прокси Gemini в репо | [TASK-050](tasks/TASK-050-product-phase0-foundation.md) | ⏳ backlog |
| PostgreSQL + migrations | TASK-016 | ⏳ |

## Phase 1: Core Product (август 2026) — M1–M4

| Milestone | Задачи | Статус |
|-----------|--------|--------|
| Auth + credits + proxy | [TASK-051](tasks/TASK-051-product-phase1-core.md) | 📅 after TASK-050 |

## Phase 1 (legacy): Design & Foundation (до 25.06.2026)

| Milestone | Задачи | Статус |
|-----------|--------|--------|
| Система планирования | [TASK-001](tasks/TASK-001-project-planning.md) | 🔄 active (6/9 шагов) |
| Visual Identity | [TASK-017](tasks/TASK-017-visual-identity.md) | ⏳ due 25.06 |
| Экспорт ассетов Canva | [TASK-040](tasks/TASK-040-export-design-assets.md) | ⏳ due 25.06 |
| Синхронизация docs | [TASK-013](tasks/TASK-013-sync-documentation.md) | ⏳ P0 |

## Phase 1.5: Production fix (июнь 2026) — аудит

| Milestone | Задачи | Статус |
|-----------|--------|--------|
| Docker monorepo fix | [TASK-011](tasks/TASK-011-fix-monorepo-docker.md) | 🔴 P0 — BUG-001 |
| Публикация (ключи, контент) | [TASK-012](tasks/TASK-012-production-readiness.md) | 🔴 P0 |
| Документация = код | [TASK-013](tasks/TASK-013-sync-documentation.md) | 🔴 P0 |

## Phase 2: MVP Infrastructure (июль 2026)

| Milestone | Задачи | Статус |
|-----------|--------|--------|
| Docker local dev | [TASK-010](tasks/TASK-010-docker-local-dev.md) | ⏳ after TASK-011 |
| CI build + smoke | [TASK-014](tasks/TASK-014-ci-build-smoke.md) | ⏳ due 30.06 |
| Database schema | [TASK-016](tasks/TASK-016-database-initial-migration.md) | ⏳ due 15.07 |
| Salon API MVP | [TASK-015](tasks/TASK-015-salon-api-mvp.md) | ⏳ due 31.07 |
| Backend заявок | [TASK-018](tasks/TASK-018-bookings-backend.md) | ⏳ due 31.07 |
| Защита админки | [TASK-019](tasks/TASK-019-admin-security.md) | ⏳ due 15.07 |

## Phase 2: MVP Product (уже частично готово)

| Milestone | Задачи | Статус |
|-----------|--------|--------|
| Website static | TASK-020 | ✅ ~90% (cancelled as new work) |
| TG-bot aiogram | TASK-030 | ✅ ~70% (keys pending) |
| NFT generator | — | ✅ готов |
| Mini App TON | — | 🟡 нужен TON + HTTPS |

## Phase 3: Integration (август–сентябрь 2026)

| Milestone | Задачи | Статус |
|-----------|--------|--------|
| Claude AI / MCP в боте | — | 📅 planned |
| Jira / Zapier sync | — | 📅 planned |
| Monitoring | — | 📅 planned |

## Phase 4: Production scale (октябрь 2026+)

| Milestone | Задачи | Статус |
|-----------|--------|--------|
| northcat.top full launch | TASK-012 | 📅 |
| Admin panel (server) | TASK-019 + API | 📅 |

## Идеи на рассмотрение (P2)

- [IDEA-001](ideas/IDEA-001-nextjs-vs-static.md) — Next.js vs static
- [IDEA-002](ideas/IDEA-002-media-cleanup.md) — очистка медиа
- [IDEA-003](ideas/IDEA-003-architecture-diagram.md) — диаграмма архитектуры

---

**Текущий фокус:** TASK-011 → TASK-012 → TASK-013 → TASK-017 (25.06)
