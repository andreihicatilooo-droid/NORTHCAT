#!/usr/bin/env bash
# =============================================================================
#  Создать GitHub Project (v2) "NORTHCAT Roadmap" и добавить все карточки
#  продукта (issues с меткой track/product).
#
#  ВАЖНО: интеграционный токен Cursor/Actions НЕ может создавать ProjectsV2
#  ("Resource not accessible by integration"). Запусти этот скрипт ЛОКАЛЬНО
#  под своим аккаунтом с project-scope:
#
#      gh auth login            # выбрать scopes: repo, read:org, project
#      # или: gh auth refresh -s project,read:project
#      ./scripts/gh-create-project.sh
#
#  Идемпотентно по названию проекта.
# =============================================================================
set -euo pipefail

OWNER="${OWNER:-andreihicatilooo-droid}"
REPO="${REPO:-andreihicatilooo-droid/NORTHCAT}"
TITLE="${PROJECT_TITLE:-NORTHCAT Roadmap}"

echo "=== Проверка project-scope ==="
if ! gh project list --owner "$OWNER" >/dev/null 2>&1; then
  echo "Нет доступа к ProjectsV2. Выполни:" >&2
  echo "  gh auth refresh -s project,read:project" >&2
  echo "или залогинься заново с project scope." >&2
  exit 1
fi

# --- Найти или создать проект ---
PNUM=$(gh project list --owner "$OWNER" --format json \
  --jq ".projects[] | select(.title==\"$TITLE\") | .number" 2>/dev/null | head -1 || true)

if [[ -z "${PNUM:-}" ]]; then
  echo "=== Создаю проект «$TITLE» ==="
  PNUM=$(gh project create --owner "$OWNER" --title "$TITLE" \
    --format json --jq '.number')
  echo "Создан проект #$PNUM"
else
  echo "Проект уже есть: #$PNUM"
fi

PURL="https://github.com/users/$OWNER/projects/$PNUM"
echo "URL: $PURL"

# --- Добавить все issue с меткой track/product ---
echo "=== Добавляю карточки (track/product) ==="
mapfile -t URLS < <(gh issue list --repo "$REPO" --label "track/product" \
  --state open --limit 100 --json url --jq '.[].url')

# Плюс ключевые задачи аудита, влияющие на Фазу 0
mapfile -t EXTRA < <(gh issue list --repo "$REPO" --state open --limit 100 \
  --json url,title --jq '.[] | select(.title|test("TASK-020|TASK-011|TASK-016")) | .url')

added=0
for u in "${URLS[@]}" "${EXTRA[@]}"; do
  [[ -z "$u" ]] && continue
  if gh project item-add "$PNUM" --owner "$OWNER" --url "$u" >/dev/null 2>&1; then
    added=$((added+1))
  fi
done
echo "Добавлено элементов: $added"

echo ""
echo "=== Готово ==="
echo "Открой доску: $PURL"
echo "Рекомендация: добавь поле Status (Todo/In progress/Done) и сгруппируй по Milestone."
