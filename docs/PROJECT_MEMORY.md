# PROJECT_MEMORY — NORTHCAT

> Живая память проекта: инфраструктура, интеграции, статус. Обновлено: 2026-06-14.

---

## Текущий этап (снимок 14.06.2026)

**Стадия:** L1 — операционный спринт (14–28 июня). Планирование ~67%, операции не начаты.

```
[✅ Планирование 67%] → [🔴 Операции 0%] → [⏳ MVP июль] → [⏳ Продукт июль–окт]
```

| Направление | Прогресс | Блокер |
|-------------|----------|--------|
| Планирование (TASK-001) | 6/9 шагов | S7–S9: ритуал, Todoist |
| Сайт static | ~90% | TASK-012: ключи, контент |
| TG-bot aiogram 3 | ~70% | TASK-012: `.env` |
| Инфра Docker | частично | BUG-001 → TASK-011 |
| Дизайн | в работе | TASK-017/040 до 25.06 |
| Продукт (примерочная) | только требования | TASK-050 после TASK-020 |

**P0 сейчас:** `TASK-020` → `TASK-011` → `TASK-012` → `TASK-013`  
**Git:** `main` = `origin/main` (8725f56), `cursor/cloud-agent` синхронизирован  
**Карта:** [DIRECTIONS-MAP.md](project/DIRECTIONS-MAP.md)

---

## Хосты

### Google Cloud (проект `cerber-495808`)

| Имя | IP | Зона | ОС | Назначение |
|---|---|---|---|---|
| `northcat-server` | `34.13.167.104` | `europe-west4-a` | Linux (Debian + Docker) | **Production**: сайт, бот, Caddy |
| `ai-workstation` | `35.237.149.21` | `us-east1-b` | — | Рабочая станция |

**Код на сервере:** `/home/G6E6N/northcat-project/`  
**SSH:** `gcloud compute ssh andreihicatilooo@northcat-server --zone=europe-west4-a --project=cerber-495808`  
**Контейнеры:** `northcat-web`, `northcat-bot`, `caddy`

**Импорт в репо:** `services/website/`, `services/tg-bot/` (коммиты `9911bc6`, `0ad1a8c` от 14.06 — **может быть устаревшим**)

### Синхронизация GCP → монорепо

| Этап | Где | Команда |
|------|-----|---------|
| Живой production | GCP `/home/G6E6N/northcat-project/` | SSH / scp |
| Локальное зеркало | `import/gcp-production/` (не в git) | `./scripts/gcp-pull-production.sh` |
| Сравнение | diff vs `services/` | `./scripts/gcp-diff-production.sh` |
| Слияние | `services/website/`, `services/tg-bot/` | см. `import/README.md` |

Задача: **TASK-020** · На сервере код **монолитный** (сайт + `bot/`), в репо — **раздельно**.

### LuxHost (VPS)

| Имя | ID | IP | ОС | Тариф |
|---|---|---|---|---|
| `NORTHCAT` | `6a2a2050311009554939e44c` | `31.76.118.165` | Windows Server 2012 R2 | `WINDOWS-1` (Poland) |

- **RDP:** порт 3389 открыт, SSH (22) — закрыт
- **Reinstall через API:** только Windows (2012 R2 / 2016 / 2019 / 2022), Linux на этом тарифе недоступен
- **northcat.top** может быть привязан сюда — уточнить в панели LuxHost

---

## LuxHost Public API

- **Документация:** https://api.luxhost.cc/public/api (OpenAPI 3.0, v2.0.0)
- **Base URL:** `https://api.luxhost.cc`
- **Авторизация:** `Authorization: Bearer <API_KEY>`

### Ключевые эндпоинты

```
GET  /public/api/users/me              — профиль, баланс
GET  /public/api/servers/list          — список VPS
GET  /public/api/servers/{id}          — детали, IP, credentials
POST /public/api/servers/{id}/reinstall — переустановка ОС {"os":"slug"}
POST /public/api/servers/{id}/start|stop|restart
GET  /public/api/domains/search        — поиск домена
POST /public/api/domains/purchase      — покупка домена
```

### GitHub (environment `NORTH KEY`)

| Тип | Имя | Назначение |
|---|---|---|
| secret | `LUXHOST` | API-ключ LuxHost |
| secret | `SSH_PRIVATE_KEY` | SSH для CI/deploy |
| variable | `SSH_PUBLIC_KEY` | Публичный SSH-ключ |
| secret | `CURSOR_GITHUB_TOKEN` | GitHub API из CI |

Workflow проверки: `.github/workflows/luxhost-check.yml` (`workflow_dispatch`)

---

## Полезные команды

```bash
# GCP — список VM
./scripts/gcp-list-vms.sh

# GCP — выгрузка production в import/gcp-production/
./scripts/gcp-pull-production.sh

# Сравнение выгрузки с services/website и services/tg-bot
./scripts/gcp-diff-production.sh

# LuxHost — список серверов (нужен ключ)
curl -sH "Authorization: Bearer $LUXHOST" \
  https://api.luxhost.cc/public/api/servers/list
```

---

## Заметки

- LuxHost `WINDOWS-1` — Windows-only; для Linux VPS нужен другой тариф или GCP
- Production код импортирован с `northcat-server` (коммиты 9911bc6, 0ad1a8c)

## Аудит репозитория (14.06.2026)

Полный реестр недочётов: `docs/project/INDEX.md`

| P0 | P1 | P2 |
|----|----|-----|
| BUG-001 docker paths | GAP-001 salon-api пуст | Очистка медиа |
| TASK-012 publish keys | GAP-002 database пуст | Architecture diagram |
| DEBT-001 docs ≠ code | GAP-003 VISUAL_IDENTITY | Next.js vs static |

- Секреты и пароли **не хранить** в git; шаблоны — `.env.example`
- `config/API_CONFIG.md` — локальные ключи (не в git)
