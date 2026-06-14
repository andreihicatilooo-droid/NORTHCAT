#!/usr/bin/env bash
# =============================================================================
#  Выгрузка production-кода с GCP northcat-server в локальную папку
#
#  НЕ коммитит в git — только зеркало для сравнения и ручного слияния.
#  Результат: import/gcp-production/
#
#  Использование:
#    ./scripts/gcp-pull-production.sh
#    ./scripts/gcp-pull-production.sh --dry-run
#
#  Требует: gcloud CLI + SSH-доступ к VM
# =============================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${GCP_IMPORT_DEST:-$ROOT/import/gcp-production}"
REMOTE_PATH="${GCP_REMOTE_PATH:-/home/G6E6N/northcat-project}"
INSTANCE="${GCP_INSTANCE:-northcat-server}"
ZONE="${GCP_ZONE:-europe-west4-a}"
PROJECT="${GCP_PROJECT:-cerber-495808}"
USER="${GCP_SSH_USER:-andreihicatilooo}"
DRY_RUN=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    -h|--help)
      sed -n '2,20p' "$0" | sed 's/^# \{0,2\}//'
      exit 0
      ;;
  esac
done

step() { printf "\n\033[35m=== %s ===\033[0m\n" "$1"; }

if ! command -v gcloud >/dev/null 2>&1; then
  echo "Ошибка: gcloud не установлен." >&2
  echo "  https://cloud.google.com/sdk/docs/install" >&2
  echo "  или: sudo apt-get install -y google-cloud-cli" >&2
  exit 1
fi

if ! gcloud auth list --filter=status:ACTIVE --format='value(account)' 2>/dev/null | grep -q .; then
  echo "Ошибка: нет активного gcloud-аккаунта. Выполни: gcloud auth login" >&2
  exit 1
fi

gcloud config set project "$PROJECT" --quiet 2>/dev/null || true

step "Проверка VM $INSTANCE"
if ! gcloud compute instances describe "$INSTANCE" --zone="$ZONE" --project="$PROJECT" &>/dev/null; then
  echo "VM '$INSTANCE' не найдена в $ZONE (project $PROJECT)" >&2
  exit 1
fi

REMOTE="${USER}@${INSTANCE}:${REMOTE_PATH}/"
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
BACKUP=""
if [[ -d "$DEST" && "$(ls -A "$DEST" 2>/dev/null)" ]]; then
  BACKUP="$ROOT/import/backups/gcp-production-$STAMP"
fi

step "Параметры"
echo "  Проект:    $PROJECT"
echo "  VM:        $INSTANCE ($ZONE)"
echo "  Удалённо:  $REMOTE_PATH"
echo "  Локально:  $DEST"
[[ -n "$BACKUP" ]] && echo "  Бэкап:     $BACKUP"

if $DRY_RUN; then
  echo ""
  echo "[dry-run] Команда:"
  echo "  gcloud compute scp --recurse --zone=$ZONE --project=$PROJECT \\"
  echo "    ${USER}@${INSTANCE}:${REMOTE_PATH} $(dirname "$DEST")/"
  exit 0
fi

mkdir -p "$(dirname "$DEST")" "$ROOT/import/backups"

if [[ -n "$BACKUP" ]]; then
  step "Бэкап текущего import/gcp-production"
  mkdir -p "$BACKUP"
  cp -a "$DEST/." "$BACKUP/"
  echo "Сохранено в $BACKUP"
fi

step "Выгрузка с сервера (может занять несколько минут)"
rm -rf "$DEST"
mkdir -p "$(dirname "$DEST")"

# scp рекурсивно: remote dir → local parent (не создаём $DEST заранее)
gcloud compute scp --recurse \
  --zone="$ZONE" \
  --project="$PROJECT" \
  "${USER}@${INSTANCE}:${REMOTE_PATH}" \
  "$(dirname "$DEST")/"

# gcloud scp кладёт папку northcat-project рядом — переименуем если нужно
PULLED="$(dirname "$DEST")/$(basename "$REMOTE_PATH")"
if [[ -d "$PULLED" && "$PULLED" != "$DEST" ]]; then
  mv "$PULLED" "$DEST"
fi

# если scp положил внутрь существующей пустой папки — поднять на уровень
NESTED="$DEST/$(basename "$REMOTE_PATH")"
if [[ -d "$NESTED" ]]; then
  shopt -s dotglob nullglob
  mv "$NESTED"/* "$DEST"/
  rmdir "$NESTED"
fi

step "Метаданные выгрузки"
META="$DEST/.gcp-pull-meta.json"
cat > "$META" <<EOF
{
  "pulled_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "instance": "$INSTANCE",
  "zone": "$ZONE",
  "project": "$PROJECT",
  "remote_path": "$REMOTE_PATH",
  "local_dest": "$DEST"
}
EOF

step "Готово"
echo "Код с GCP: $DEST"
echo ""
echo "Дальше:"
echo "  1. Сравни:  ./scripts/gcp-diff-production.sh"
echo "  2. Редактируй в import/gcp-production/ (или копию)"
echo "  3. Сливай:  см. import/README.md § «Слияние в монорепо»"
echo ""
echo "⚠️  Не коммить .env, settings.json, bot-data/ — они в .gitignore"
