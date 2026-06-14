#!/usr/bin/env bash
# =============================================================================
#  GitHub Roadmap: labels, milestones, issues, Projects v2
#
#  Источник правды: docs/project/INDEX.md, ROADMAP.md
#
#  Использование:
#    ./scripts/github-roadmap-setup.sh              # issues + milestones
#    ./scripts/github-roadmap-setup.sh --project    # + GitHub Project board
#
#  Для Projects v2 нужен scope project:
#    gh auth refresh -s project,read:project
# =============================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO="${GITHUB_REPOSITORY:-andreihicatilooo-droid/NORTHCAT}"
OWNER="${REPO%%/*}"
CREATE_PROJECT=false

for arg in "$@"; do
  case "$arg" in
    --project) CREATE_PROJECT=true ;;
    -h|--help)
      sed -n '2,15p' "$0" | sed 's/^# \{0,2\}//'
      exit 0
      ;;
  esac
done

step() { printf "\n\033[36m=== %s ===\033[0m\n" "$1"; }

ensure_label() {
  local name="$1" color="$2" desc="$3"
  if gh label list --repo "$REPO" --json name --jq ".[] | select(.name==\"$name\")" | grep -q .; then
    echo "  label exists: $name"
  else
    gh label create "$name" --repo "$REPO" --color "$color" --description "$desc" --force >/dev/null
    echo "  + label: $name"
  fi
}

ensure_milestone() {
  local title="$1" due="$2" desc="$3"
  local num
  num=$(gh api "repos/$REPO/milestones" --jq ".[] | select(.title==\"$title\") | .number" | head -1)
  if [[ -n "$num" ]]; then
    echo "  milestone exists: $title (#$num)" >&2
    echo "$num"
    return
  fi
  num=$(gh api "repos/$REPO/milestones" -f title="$title" -f due_on="${due}T12:00:00Z" -f description="$desc" --jq .number)
  echo "  + milestone: $title (#$num)" >&2
  echo "$num"
}

issue_exists() {
  local id="$1"
  gh issue list --repo "$REPO" --search "in:title \"$id\"" --json title --jq '.[].title' | grep -q "^$id:"
}

create_issue() {
  local id="$1" title="$2" body="$3" labels="$4" milestone="$5"
  if issue_exists "$id"; then
    echo "  exists: $id"
    gh issue list --repo "$REPO" --search "in:title \"$id\"" --json number --jq '.[0].number'
    return
  fi
  local url num
  url=$(gh issue create --repo "$REPO" \
    --title "$id: $title" \
    --body "$body" \
    --label "$labels" \
    --milestone "$milestone")
  num="${url##*/}"
  echo "  + issue #$num: $id"
  echo "$num"
}

step "Labels"
ensure_label "priority/P0" "b60205" "Критично — блокер"
ensure_label "priority/P1" "d93f0b" "Важно"
ensure_label "priority/P2" "fbca04" "Можно отложить"
ensure_label "type/task" "1d76db" "Задача"
ensure_label "type/bug" "d73a4a" "Баг"
ensure_label "type/debt" "5319e7" "Техдолг"
ensure_label "type/gap" "e99695" "Пробел"
ensure_label "type/idea" "c5def5" "Идея"
ensure_label "area/infra" "006b75" "Infrastructure"
ensure_label "area/website" "0e8a16" "Website"
ensure_label "area/tg-bot" "7057ff" "Telegram bot"
ensure_label "area/design" "f4587e" "Design / brand"
ensure_label "area/docs" "0075ca" "Documentation"
ensure_label "area/database" "bfd4f2" "Database"
ensure_label "area/salon-api" "bfdadc" "Salon API"
ensure_label "phase/1-foundation" "ededed" "Phase 1: Foundation & Design"
ensure_label "phase/1.5-production" "f9d0c4" "Phase 1.5: Production fix"
ensure_label "phase/2-mvp" "c2e0c6" "Phase 2: MVP"
ensure_label "phase/3-integration" "d4c5f9" "Phase 3: Integration"
ensure_label "phase/4-scale" "e6e6e6" "Phase 4: Scale"

step "Milestones"
M1=$(ensure_milestone "Phase 1: Foundation & Design" "2026-06-25" "Дизайн, VISUAL_IDENTITY, планирование")
M15=$(ensure_milestone "Phase 1.5: Production fix" "2026-06-20" "Docker fix, GCP sync, docs, публикация")
M2=$(ensure_milestone "Phase 2: MVP Infrastructure" "2026-07-31" "CI, DB, Salon API, backend заявок")
M3=$(ensure_milestone "Phase 3: Integration" "2026-09-30" "Claude/MCP, Jira, monitoring")
M4=$(ensure_milestone "Phase 4: Production scale" "2026-10-31" "Full launch, admin panel")

step "Issues — P0 tasks"
create_issue "TASK-020" "GCP sync → import/ → merge" \
"**Phase 1.5** · P0 · infra

Workflow выгрузки production с \`northcat-server\` и слияния в монорепо.

📄 [TASK-020](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-020-gcp-sync-workflow.md)

## Статус
- [x] gcloud auth
- [x] \`gcp-pull-production.sh\`
- [ ] diff + merge в \`services/\`
- [ ] TASK-011 docker paths

## Команды
\`\`\`bash
./scripts/gcp-pull-production.sh
./scripts/gcp-diff-production.sh
\`\`\`" \
"priority/P0,type/task,area/infra,phase/1.5-production" "Phase 1.5: Production fix"

create_issue "TASK-011" "Починить Docker/monorepo" \
"**Phase 2** · P0 · infra · closes BUG-001

📄 [TASK-011](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-011-fix-monorepo-docker.md)

Зависит от TASK-020. Блокирует TASK-010, TASK-014." \
"priority/P0,type/task,area/infra,phase/1.5-production" "Phase 1.5: Production fix"

create_issue "TASK-012" "Готовность к публикации" \
"**Phase 2** · P0 · website

📄 [TASK-012](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-012-production-readiness.md)

Ключи бота, TON, контент, HTTPS на GCP." \
"priority/P0,type/task,area/website,phase/1.5-production" "Phase 1.5: Production fix"

create_issue "TASK-013" "Синхронизировать документацию" \
"**Phase 1** · P0 · docs · closes DEBT-001

📄 [TASK-013](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-013-sync-documentation.md)" \
"priority/P0,type/task,area/docs,phase/1-foundation" "Phase 1.5: Production fix"

create_issue "BUG-001" "docker-compose → bot/ path broken" \
"**P0** · infra

📄 [BUG-001](https://github.com/$REPO/blob/main/docs/project/bugs/BUG-001-docker-compose-bot-path.md)

\`services/website/docker-compose.yml\` ссылается на \`./bot/\`, бот в \`services/tg-bot/\`.

Закрывается TASK-011." \
"priority/P0,type/bug,area/infra,phase/1.5-production" "Phase 1.5: Production fix"

create_issue "DEBT-001" "Документация ≠ стек" \
"**P0** · docs

📄 [DEBT-001](https://github.com/$REPO/blob/main/docs/project/debt/DEBT-001-docs-stack-mismatch.md)

README описывает Next.js, код — static HTML + Python bot. Закрывается TASK-013." \
"priority/P0,type/debt,area/docs,phase/1-foundation" "Phase 1: Foundation & Design"

step "Issues — P1 tasks"
create_issue "TASK-001" "Настроить планировку проекта" \
"**Phase 1** · active

📄 [TASK-001](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-001-project-planning.md)" \
"priority/P1,type/task,area/docs,phase/1-foundation" "Phase 1: Foundation & Design"

create_issue "TASK-010" "Docker local dev monorepo" \
"📄 [TASK-010](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-010-docker-local-dev.md) · blocked by TASK-011" \
"priority/P1,type/task,area/infra,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "TASK-014" "CI build + smoke" \
"📄 [TASK-014](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-014-ci-build-smoke.md) · closes DEBT-002" \
"priority/P1,type/task,area/infra,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "TASK-015" "Salon API MVP" \
"📄 [TASK-015](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-015-salon-api-mvp.md) · closes GAP-001" \
"priority/P1,type/task,area/salon-api,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "TASK-016" "Database — первая миграция" \
"📄 [TASK-016](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-016-database-initial-migration.md) · closes GAP-002" \
"priority/P1,type/task,area/database,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "TASK-017" "VISUAL_IDENTITY.md" \
"📄 [TASK-017](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-017-visual-identity.md) · due 25.06 · closes GAP-003" \
"priority/P1,type/task,area/design,phase/1-foundation" "Phase 1: Foundation & Design"

create_issue "TASK-018" "Backend заявок" \
"📄 [TASK-018](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-018-bookings-backend.md) · closes DEBT-003" \
"priority/P1,type/task,area/website,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "TASK-019" "Защита admin.html" \
"📄 [TASK-019](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-019-admin-security.md) · closes DEBT-004" \
"priority/P1,type/task,area/website,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "TASK-040" "Экспорт ассетов Canva" \
"📄 [TASK-040](https://github.com/$REPO/blob/main/docs/project/tasks/TASK-040-export-design-assets.md) · due 25.06" \
"priority/P1,type/task,area/design,phase/1-foundation" "Phase 1: Foundation & Design"

step "Issues — debt & gaps"
create_issue "DEBT-002" "CI без build/lint/test" \
"📄 [DEBT-002](https://github.com/$REPO/blob/main/docs/project/debt/DEBT-002-ci-no-build-test.md)" \
"priority/P1,type/debt,area/infra,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "DEBT-003" "Заявки в localStorage" \
"📄 [DEBT-003](https://github.com/$REPO/blob/main/docs/project/debt/DEBT-003-no-backend-localstorage.md)" \
"priority/P1,type/debt,area/website,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "DEBT-004" "Клиентский пароль админки" \
"📄 [DEBT-004](https://github.com/$REPO/blob/main/docs/project/debt/DEBT-004-admin-client-auth.md)" \
"priority/P1,type/debt,area/website,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "GAP-001" "Salon API пуст" \
"📄 [GAP-001](https://github.com/$REPO/blob/main/docs/project/debt/GAP-001-salon-api-empty.md)" \
"priority/P1,type/gap,area/salon-api,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "GAP-002" "Нет миграций БД" \
"📄 [GAP-002](https://github.com/$REPO/blob/main/docs/project/debt/GAP-002-database-empty.md)" \
"priority/P1,type/gap,area/database,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "GAP-003" "Нет VISUAL_IDENTITY" \
"📄 [GAP-003](https://github.com/$REPO/blob/main/docs/project/debt/GAP-003-visual-identity-missing.md)" \
"priority/P1,type/gap,area/design,phase/1-foundation" "Phase 1: Foundation & Design"

create_issue "GAP-004" "Нет root docker-compose" \
"📄 [GAP-004](https://github.com/$REPO/blob/main/docs/project/debt/GAP-004-root-monorepo-tooling.md)" \
"priority/P1,type/gap,area/infra,phase/2-mvp" "Phase 2: MVP Infrastructure"

step "Issues — ideas (P2)"
create_issue "IDEA-001" "Next.js vs static" \
"📄 [IDEA-001](https://github.com/$REPO/blob/main/docs/project/ideas/IDEA-001-nextjs-vs-static.md)" \
"priority/P2,type/idea,area/website,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "IDEA-002" "Очистка медиа" \
"📄 [IDEA-002](https://github.com/$REPO/blob/main/docs/project/ideas/IDEA-002-media-cleanup.md)" \
"priority/P2,type/idea,area/website,phase/2-mvp" "Phase 2: MVP Infrastructure"

create_issue "IDEA-003" "Architecture diagram" \
"📄 [IDEA-003](https://github.com/$REPO/blob/main/docs/project/ideas/IDEA-003-architecture-diagram.md)" \
"priority/P2,type/idea,area/docs,phase/3-integration" "Phase 3: Integration"

if $CREATE_PROJECT; then
  step "GitHub Project v2"
  if ! gh project create --owner "@me" --title "NORTHCAT Roadmap" --format json >/tmp/northcat-project.json 2>/tmp/northcat-project.err; then
    echo "Не удалось создать Project. Нужен scope:" >&2
    echo "  gh auth refresh -s project,read:project" >&2
    cat /tmp/northcat-project.err >&2
    exit 1
  fi
  PROJECT_ID=$(jq -r .id /tmp/northcat-project.json)
  PROJECT_URL=$(jq -r .url /tmp/northcat-project.json)
  echo "Project: $PROJECT_URL"

  REPO_ID=$(gh api "repos/$REPO" --jq .node_id)
  gh api graphql -f query="
    mutation(\$projectId: ID!, \$repoId: ID!) {
      linkProjectV2ToRepository(input: {projectId: \$projectId, repositoryId: \$repoId}) {
        repository { name }
      }
    }" -f projectId="$PROJECT_ID" -f repoId="$REPO_ID"

  echo "Добавь issues в Project вручную или через UI: $PROJECT_URL"
  echo "Рекомендуемые views: Board (Status), Roadmap (Milestone dates), Table (Priority)"
fi

step "Готово"
echo "Issues: https://github.com/$REPO/issues"
echo "Milestones: https://github.com/$REPO/milestones"
echo ""
echo "Roadmap view: https://github.com/$REPO/issues/milestones"
echo "Для GitHub Project board:"
echo "  gh auth refresh -s project,read:project"
echo "  ./scripts/github-roadmap-setup.sh --project"
