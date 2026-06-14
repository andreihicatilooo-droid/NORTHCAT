#!/usr/bin/env bash
# Сравнение import/gcp-production/ с текущим монорепо (services/website, services/tg-bot)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GCP="${GCP_IMPORT_DEST:-$ROOT/import/gcp-production}"

if [[ ! -d "$GCP" ]]; then
  echo "Нет выгрузки: $GCP" >&2
  echo "Сначала: ./scripts/gcp-pull-production.sh" >&2
  exit 1
fi

echo "=== GCP production → монорепо ==="
echo "Источник: $GCP"
echo ""

# Типичная структура на сервере: всё в одной папке (website + bot/)
WEB_SRC="$GCP"
BOT_SRC="$GCP/bot"

# Если на сервере бот в корне как отдельные файлы
if [[ ! -d "$BOT_SRC" && -f "$GCP/bot.py" ]]; then
  BOT_SRC="$GCP"
fi

compare_dir() {
  local label="$1"
  local left="$2"
  local right="$3"
  if [[ ! -d "$left" ]]; then
    echo "[$label] Пропуск — нет $left"
    return
  fi
  if [[ ! -d "$right" ]]; then
    echo "[$label] Пропуск — нет $right"
    return
  fi
  echo "--- $label ---"
  echo "  GCP:  $left"
  echo "  Repo: $right"
  diff -qr "$left" "$right" \
    --exclude='.env' \
    --exclude='settings.json' \
    --exclude='.gcp-pull-meta.json' \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='bot-data' \
    --exclude='__pycache__' \
    2>/dev/null || true
  echo ""
}

# Website: на сервере часто корень northcat-project = сайт
compare_dir "website (корень GCP vs services/website)" "$WEB_SRC" "$ROOT/services/website"

if [[ -d "$BOT_SRC" || -f "$GCP/bot/bot.py" || -f "$GCP/bot.py" ]]; then
  BOT_GCP="${GCP}/bot"
  [[ -f "$GCP/bot.py" && ! -d "$GCP/bot" ]] && BOT_GCP="$GCP"
  compare_dir "tg-bot (GCP/bot vs services/tg-bot)" "$BOT_GCP" "$ROOT/services/tg-bot"
fi

echo "=== Только на GCP (новые файлы в корне, без bot/) ==="
for f in "$GCP"/*; do
  base=$(basename "$f")
  [[ "$base" == "bot" ]] && continue
  [[ "$base" == ".gcp-pull-meta.json" ]] && continue
  [[ -e "$ROOT/services/website/$base" ]] && continue
  echo "  + $base"
done

echo ""
echo "Подсказка: полный diff файла:"
echo "  diff import/gcp-production/index.html services/website/index.html"
