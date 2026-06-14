#!/usr/bin/env bash
# Завершить gcloud auth, начатый gcloud-auth-start.sh
set -euo pipefail

FIFO="/tmp/northcat-gcloud-auth.fifo"
OUT="/tmp/northcat-gcloud-auth.out"
PIDFILE="/tmp/northcat-gcloud-auth.pid"

CODE="${1:-}"
if [[ -z "$CODE" ]]; then
  echo "Использование: $0 <verification-code>" >&2
  exit 1
fi

if [[ ! -f "$PIDFILE" ]]; then
  echo "Нет активной сессии. Сначала: ./scripts/gcloud-auth-start.sh" >&2
  exit 1
fi

if [[ ! -p "$FIFO" ]]; then
  echo "FIFO не найден. Запусти заново: ./scripts/gcloud-auth-start.sh" >&2
  exit 1
fi

printf '%s\n' "$CODE" > "$FIFO"

PID="$(cat "$PIDFILE")"
for _ in $(seq 1 60); do
  if ! kill -0 "$PID" 2>/dev/null; then
    break
  fi
  sleep 0.5
done

if [[ -f "$OUT" ]]; then
  tail -5 "$OUT"
fi

if gcloud auth list --filter=status:ACTIVE --format='value(account)' 2>/dev/null | grep -q .; then
  echo ""
  echo "OK: $(gcloud auth list --filter=status:ACTIVE --format='value(account)')"
  rm -f "$FIFO" "$PIDFILE"
  exit 0
fi

echo "Ошибка: вход не завершён. Проверь код и запусти ./scripts/gcloud-auth-start.sh снова." >&2
exit 1
