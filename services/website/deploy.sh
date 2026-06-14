#!/usr/bin/env bash
# ===================================================================
#  NORTHCAT — развёртывание в Docker (Linux / macOS)
#  Использование:
#    ./deploy.sh            # собрать и запустить всё
#    ./deploy.sh down       # остановить и удалить контейнеры
#    ./deploy.sh logs       # показать логи
#    ./deploy.sh rebuild    # пересобрать без кэша и перезапустить
#  Переменные:
#    WEB_PORT=9000 ./deploy.sh   # сайт на другом порту
# ===================================================================
set -euo pipefail
cd "$(dirname "$0")"

WEB_PORT="${WEB_PORT:-8080}"
export WEB_PORT

step() { printf "\n\033[35m=== %s ===\033[0m\n" "$1"; }

# --- Определяем команду compose ---
if docker compose version >/dev/null 2>&1; then
  COMPOSE="docker compose"
elif docker-compose version >/dev/null 2>&1; then
  COMPOSE="docker-compose"
else
  echo "Docker Compose не найден. Установите Docker: https://docs.docker.com/get-docker/" >&2
  exit 1
fi

# --- Проверка Docker ---
step "Проверка Docker"
if ! docker info >/dev/null 2>&1; then
  echo "Docker не запущен. Запустите демон Docker и повторите." >&2
  exit 1
fi
echo "Docker работает."

ACTION="${1:-up}"

case "$ACTION" in
  down)
    step "Остановка и удаление контейнеров"
    $COMPOSE down
    echo "Готово."
    exit 0
    ;;
  logs)
    step "Логи (Ctrl+C для выхода)"
    $COMPOSE logs -f --tail=100
    exit 0
    ;;
esac

# --- Проверка .env бота ---
step "Проверка конфигурации бота"
if [ ! -f bot/.env ]; then
  if [ -f bot/.env.example ]; then
    cp bot/.env.example bot/.env
    echo "Создан bot/.env из шаблона."
  else
    touch bot/.env
  fi
  echo "ВНИМАНИЕ: заполните bot/.env (BOT_TOKEN, OPERATOR_CHAT_ID)." >&2
fi
if ! grep -qE 'BOT_TOKEN=\S+' bot/.env || grep -q 'your_token_here' bot/.env; then
  echo "ВНИМАНИЕ: BOT_TOKEN не задан — сайт поднимется, бот будет падать до настройки токена." >&2
fi

# --- Сборка ---
step "Сборка образов"
if [ "$ACTION" = "rebuild" ]; then
  $COMPOSE build --no-cache
else
  $COMPOSE build
fi

# --- Запуск ---
step "Запуск контейнеров"
$COMPOSE up -d

sleep 2
step "Статус"
$COMPOSE ps

echo
echo "Готово!"
echo "Сайт:       http://localhost:${WEB_PORT}"
echo "NFT-коты:   http://localhost:${WEB_PORT}/nft-koty/"
echo "Mini App:   http://localhost:${WEB_PORT}/miniapp.html"
echo "Логи:       ./deploy.sh logs"
echo "Остановить: ./deploy.sh down"
