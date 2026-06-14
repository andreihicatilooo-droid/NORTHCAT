# import/ — выгрузка с GCP (не в git)

Папка для **зеркала production-кода** с Google Cloud. Сюда выгружается код с сервера, редактируется локально, затем вручную сливается в монорепо.

**Эта папка не коммитится** (см. `.gitignore`).

---

## Где код сейчас

| Место | Путь | Что там |
|-------|------|---------|
| **GCP production (живой)** | `/home/G6E6N/northcat-project/` на `northcat-server` | Сайт + бот + docker-compose, `.env`, `settings.json` |
| **Локальная выгрузка** | `import/gcp-production/` | Зеркало с сервера (после скрипта) |
| **Монорепо (уже слито частично)** | `services/website/`, `services/tg-bot/` | Импорт от 14.06.2026 (коммиты `9911bc6`, `0ad1a8c`) |

На сервере структура **монолитная** (сайт и `bot/` в одной папке).  
В монорепо — **разделено** на `services/website/` и `services/tg-bot/`. При слиянии это нужно учитывать.

---

## Workflow: выгрузить → отредактировать → слить

```
GCP northcat-server                import/gcp-production/          монорепо
/home/G6E6N/northcat-project/  →   (локальная копия)         →   services/website/
        │                              правки здесь                  services/tg-bot/
        │                              или в копии
        └─ gcp-pull-production.sh
```

### Шаг 1. Выгрузка с GCP

```bash
# Установить gcloud (если нет)
# https://cloud.google.com/sdk/docs/install

gcloud auth login
export GCP_PROJECT=cerber-495808

./scripts/gcp-pull-production.sh
```

Результат: `import/gcp-production/` — полная копия с сервера.

Проверка без скачивания:
```bash
./scripts/gcp-pull-production.sh --dry-run
```

SSH вручную (если нужно посмотреть на сервере):
```bash
gcloud compute ssh andreihicatilooo@northcat-server \
  --zone=europe-west4-a --project=cerber-495808

ls -la /home/G6E6N/northcat-project/
docker ps
```

### Шаг 2. Сравнение с монорепо

```bash
./scripts/gcp-diff-production.sh
```

Покажет отличия между `import/gcp-production/` и `services/website/` + `services/tg-bot/`.

### Шаг 3. Редактирование

Редактируй **в `import/gcp-production/`** (или сделай копию `import/gcp-production-edit/`):

- не трогай `.env` на сервере через git — секреты только локально
- типичные правки перед слиянием:
  - пути в `docker-compose.yml` под монорепо
  - удаление дубликатов `bot/` если бот уже в `services/tg-bot/`
  - обновление `deploy.sh`

### Шаг 4. Слияние в монорепо

**Сайт** (файлы из корня GCP → `services/website/`):

```bash
# Пример: один файл
cp import/gcp-production/index.html services/website/index.html

# Или выборочно (без bot/, .env, settings.json)
rsync -av --progress \
  --exclude='bot/' \
  --exclude='.env' \
  --exclude='settings.json' \
  --exclude='bot-data/' \
  import/gcp-production/ \
  services/website/
```

**Бот** (`import/gcp-production/bot/` → `services/tg-bot/`):

```bash
rsync -av --progress \
  --exclude='.env' \
  --exclude='settings.json' \
  --exclude='__pycache__/' \
  import/gcp-production/bot/ \
  services/tg-bot/
```

**После слияния — обязательно:**

1. Починить `docker-compose` paths (TASK-011 / BUG-001)
2. Проверить: `cd services/website && ./deploy.sh` или root compose
3. `git diff` — убедиться что нет `.env` в коммите
4. Коммит: `feat: синхронизация с GCP production YYYY-MM-DD`

### Шаг 5. Обратный деплой на GCP (опционально)

Только после теста локально — деплой на сервер отдельным процессом (не автоматизировано в этом README).

```bash
# Пример: залить только сайт (осторожно — бэкап на сервере!)
gcloud compute scp --recurse \
  --zone=europe-west4-a --project=cerber-495808 \
  services/website/index.html \
  andreihicatilooo@northcat-server:/home/G6E6N/northcat-project/
```

---

## Что НЕ попадает в git

| Файл | Причина |
|------|---------|
| `import/gcp-production/` | Локальное зеркало + секреты |
| `import/backups/` | Старые выгрузки |
| `.env`, `settings.json` | Токены бота |
| `bot-data/` | Данные бота на сервере |

---

## Связанные задачи

- **TASK-020** — workflow GCP sync (`docs/project/tasks/TASK-020-gcp-sync-workflow.md`)
- **TASK-011** — после слияния починить docker-compose в монорепо
- **BUG-001** — compose в website/ не видит tg-bot/

---

## Частые вопросы

**Код уже в репо — зачем выгрузка?**  
Импорт от 14.06 мог быть неполным. На сервере могли быть правки после импорта. Выгрузка даёт актуальный diff.

**Почему отдельная папка, а не сразу в services/?**  
Чтобы сравнить, отредактировать пути под монорепо и не затереть локальные изменения одним rsync.

**Где northcat.top крутится?**  
На GCP `northcat-server` (Docker: `northcat-web`, `northcat-bot`, `caddy`). См. `docs/PROJECT_MEMORY.md`.
