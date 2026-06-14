# Database Migrations

> ⚠️ **Статус аудита 14.06.2026:** миграций нет — только этот файл.
> См. **GAP-002** в `docs/project/INDEX.md`.

## План

1. Перенести schema из `services/salon-api/README.md` → `001_initial.sql`
2. Добавить seeds для демо-данных
3. Подключить PostgreSQL в root `docker-compose.yml`

## Приоритет: P1

Блокирует Salon API (GAP-001) и серверное хранение заявок (DEBT-003).
