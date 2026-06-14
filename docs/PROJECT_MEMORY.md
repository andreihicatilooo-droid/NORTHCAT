# PROJECT_MEMORY — NORTHCAT

> Живая память проекта: инфраструктура, интеграции, статус. Обновлено: 2026-06-14.

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

**Импорт в репо:** `services/website/`, `services/tg-bot/` (ветка `claude/import-production-website` → `main`)

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

# LuxHost — список серверов (нужен ключ)
curl -sH "Authorization: Bearer $LUXHOST" \
  https://api.luxhost.cc/public/api/servers/list
```

---

## Заметки

- LuxHost `WINDOWS-1` — Windows-only; для Linux VPS нужен другой тариф или GCP
- Секреты и пароли **не хранить** в git; шаблоны — `.env.example`
- `config/API_CONFIG.md` — локальные ключи (не в git)
