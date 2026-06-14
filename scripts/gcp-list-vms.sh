#!/usr/bin/env bash
# Список VM в Google Cloud. Требует авторизации gcloud.
set -euo pipefail

PROJECT="${GCP_PROJECT:-}"
ZONE="${GCP_ZONE:-}"

if ! command -v gcloud >/dev/null; then
  echo "gcloud не установлен. Установка:"
  echo "  sudo apt-get install -y google-cloud-cli"
  exit 1
fi

if ! gcloud auth list --filter=status:ACTIVE --format='value(account)' 2>/dev/null | grep -q .; then
  echo "Нет активного аккаунта. Выполни:"
  echo "  gcloud auth login"
  echo "или для CI/сервера:"
  echo "  export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json"
  echo "  gcloud auth activate-service-account --key-file=\$GOOGLE_APPLICATION_CREDENTIALS"
  exit 1
fi

if [[ -n "$PROJECT" ]]; then
  gcloud config set project "$PROJECT" --quiet
else
  PROJECT=$(gcloud config get-value project 2>/dev/null || true)
  if [[ -z "$PROJECT" || "$PROJECT" == "(unset)" ]]; then
    echo "Проект не задан. Укажи:"
    echo "  export GCP_PROJECT=your-project-id"
    echo "  gcloud config set project YOUR_PROJECT_ID"
    echo ""
    echo "Доступные проекты:"
    gcloud projects list --format='table(projectId,name)'
    exit 1
  fi
fi

echo "=== Проект: $PROJECT ==="
echo ""

if [[ -n "$ZONE" ]]; then
  gcloud compute instances list --project="$PROJECT" --zones="$ZONE"
else
  gcloud compute instances list --project="$PROJECT"
fi

echo ""
echo "Консоль: https://console.cloud.google.com/compute/instances?project=$PROJECT"
