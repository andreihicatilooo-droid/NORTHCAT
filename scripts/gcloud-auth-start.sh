#!/usr/bin/env bash
# Запуск gcloud auth в фоне; код — через gcloud-auth-finish.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FIFO="/tmp/northcat-gcloud-auth.fifo"
OUT="/tmp/northcat-gcloud-auth.out"
PIDFILE="/tmp/northcat-gcloud-auth.pid"

if [[ -f "$PIDFILE" ]] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
  echo "Сессия уже запущена (PID $(cat "$PIDFILE"))."
  echo "Ссылка и статус: cat $OUT"
  exit 0
fi

rm -f "$FIFO" "$OUT" "$PIDFILE"
mkfifo "$FIFO"
exec 3<> "$FIFO"

python3 "$ROOT/scripts/gcloud-auth-code.py" < "$FIFO" > "$OUT" 2>&1 &
echo $! > "$PIDFILE"

for _ in $(seq 1 30); do
  if grep -q "verification code" "$OUT" 2>/dev/null; then
    break
  fi
  sleep 0.2
done

cat "$OUT"
echo ""
echo "После входа в Google:"
echo "  ./scripts/gcloud-auth-finish.sh <verification-code>"
