#!/usr/bin/env bash
# =============================================================================
#  Создание issue-карточек продуктовой дорожной карты NORTHCAT
#  (примерочная + Gemini + аккаунты + биллинг + PWA — см. docs/NORTHCAT-REQUIREMENTS.md)
#
#  Идемпотентно: пропускает карточку, если issue с таким title уже существует.
#  Требует: gh auth (issues:write). Project-board создаётся отдельно — см.
#  scripts/gh-create-project.sh
# =============================================================================
set -euo pipefail
R="${REPO:-andreihicatilooo-droid/NORTHCAT}"

exists() { gh issue list --repo "$R" --state all --limit 200 --json title \
  --jq '.[].title' 2>/dev/null | grep -Fxq "$1"; }

card() {
  local title="$1" milestone="$2" labels="$3" body="$4"
  if exists "$title"; then
    echo "skip (exists): $title"; return
  fi
  gh issue create --repo "$R" \
    --title "$title" \
    --milestone "$milestone" \
    --label "$labels" \
    --body "$body" \
    --jq '.number' 2>/dev/null \
    && echo "created: $title" \
    || gh issue create --repo "$R" --title "$title" --milestone "$milestone" \
         --label "$labels" --body "$body" | tail -1
}

P0="Product P0: Foundation"
P1="Product P1: Core (auth+billing+proxy)"
P2="Product P2: Telegram + Storage"
P3="Product P3: Notifications + Loyalty + PWA"

# ---------- Phase 0 ----------
card "P0-1: Зафиксировать стек backend (Node + PostgreSQL)" "$P0" \
  "track/product,type/task,area/backend,phase/0-foundation,priority/P0" \
"Решение по стеку backend для единого продукта.

**DoD**
- [ ] Подтверждён Node (Express/Fastify) + PostgreSQL
- [ ] Зафиксировано в docs/NORTHCAT-REQUIREMENTS.md §2
- [ ] Версия модели: gemini-2.5-flash-image (Nano Banana)

Ref: tmp.txr Фаза 0, §2"

card "P0-2: Монорепо frontend/backend/infra + перенос виджета и прокси Gemini" "$P0" \
  "track/product,type/epic,area/backend,area/frontend,phase/0-foundation,priority/P0" \
"Свести существующий виджет примерочной и прокси Gemini в монорепо.

**DoD**
- [ ] Структура frontend/ backend/ infra/
- [ ] Виджет примерочной → frontend/fitting-room/
- [ ] Прокси Gemini (Node) → backend/gemini-proxy/
- [ ] Общие типы (user, credits, result) вынесены

Зависит от: #3 (GCP sync), #4 (docker fix)
Ref: M13, Фаза 0"

card "P0-3: БД + базовые миграции (users, sessions, events)" "$P0" \
  "track/product,type/task,area/database,phase/0-foundation,priority/P0" \
"Поднять PostgreSQL и базовые таблицы.

**DoD**
- [ ] Миграция users (id, email, google_id, tg_id, passkey[], role, credits, points, referrer_id, ref_code)
- [ ] Миграция sessions
- [ ] Миграция events
- [ ] postgres в docker-compose

Связано: TASK-016 (#13)
Ref: Фаза 0, M1/M4"

# ---------- Phase 1 ----------
card "M1: Аккаунты и аутентификация (Google OAuth, Telegram Login, Passkey)" "$P1" \
  "track/product,type/epic,area/auth,phase/product-core,priority/P0" \
"Единый аккаунт для сайта, виджета и Mini App.

**DoD**
- [ ] Google OAuth
- [ ] Telegram Login + авто-вход по initData в Mini App
- [ ] Passkey (WebAuthn)
- [ ] httpOnly cookie сессии
- [ ] Привязка нескольких способов входа к одному user (email/tg)

Ref: M1"

card "M2: Кредиты и оплата через оператора (коды)" "$P1" \
  "track/product,type/epic,area/billing,phase/product-core,priority/P0" \
"Коды оплаты, активация, баланс кредитов.

**DoD**
- [ ] Таблица codes (code, credits, status, used_by, used_at, expires_at, created_by)
- [ ] Генерация кодов (номинал/срок/одноразовость)
- [ ] Активация кода → начисление credits
- [ ] Баланс в профиле и боте
- [ ] Точка расширения под автоплатёж

Ref: M2"

card "M3: Прокси Gemini + валидация «удачной генерации» + ретраи + идемпотентность" "$P1" \
  "track/product,type/epic,area/ai-proxy,phase/product-core,priority/P0" \
"Все ИИ-запросы через backend, серверный ключ, биллинг после успеха.

**DoD**
- [ ] Валидация входа (mime/размер/разрешение/число изображений)
- [ ] Проверки выхода: не пустой, размер ≥ мин, не однотонный (дисперсия), соразмерность для transfer
- [ ] safety-block → бесплатно
- [ ] Авто-ретраи ≤3, потом стоп
- [ ] Биллинг по op (cleanup/upscale/transfer/extract/photoEstimate)
- [ ] Идемпотентность по request-id
- [ ] Лимиты N/мин и N/день (антифрод)

Ref: M3, §3.1"

card "UI: подтверждения + чек-листы перед ИИ-операциями" "$P1" \
  "track/product,type/task,area/frontend,phase/product-core,priority/P1" \
"Окна подтверждения и валидация до отправки.

**DoD**
- [ ] Окно перед операцией: превью входа + описание + стоимость
- [ ] Отдельное подтверждение деструктивных действий
- [ ] Чек-лист готовности (фото/эскиз/зона) разблокирует кнопку
- [ ] Предупреждения о возможном плохом результате

Ref: §3.2"

card "M4: Логирование событий и генераций" "$P1" \
  "track/product,type/task,area/backend,phase/product-core,priority/P1" \
"Таблица events + логи действий аккаунта.

**DoD**
- [ ] events (user_id, action, op, model, in_bytes, out_status, credits_spent, latency_ms, error, ip, created_at)
- [ ] Логи входа, активации кода, начисления баллов
- [ ] Сводки доступны ТГ-админке (M10)

Ref: M4"

# ---------- Phase 2 ----------
card "M9: Telegram бот (фото, баланс, коды, Mini App, deep-links)" "$P2" \
  "track/product,type/epic,area/tg-bot,phase/product-tg,priority/P0" \
"Клиентский бот + Mini App с тем же виджетом.

**DoD**
- [ ] /start, открыть Mini App
- [ ] Приём фото эскиза → прокси (очистка/перенос) → ответ
- [ ] Ввод кода оплаты, баланс, мои варианты
- [ ] Inline-кнопки (примерочная, баланс, последний вариант)
- [ ] Авто-вход по initData
- [ ] Deep-link ?start=preview_{id}

Ref: M9"

card "M10: Админка в Telegram (коды, юзеры, статистика, рассылки, логи)" "$P2" \
  "track/product,type/epic,area/admin-bot,phase/product-tg,priority/P0" \
"Полноценная админка по tg_id из списка админов.

**DoD**
- [ ] Коды: создать/список/отозвать
- [ ] Пользователи: поиск, баланс, начислить/списать, бан/лимиты
- [ ] Кешбек: начислить баллы за оплату услуги
- [ ] Статистика: генерации, операции, доходимость, ошибки, расход ключа
- [ ] Каталог эскизов
- [ ] Рассылки по сегментам
- [ ] Логи

Ref: M10"

card "M5: Хранилище Google Drive (uploads/results/sketches/tmp)" "$P2" \
  "track/product,type/epic,area/storage,phase/product-tg,priority/P1" \
"Файлы в Google Drive аккаунта владельца.

**DoD**
- [ ] OAuth владельца (refresh-token) или сервис-аккаунт
- [ ] Структура northcat-data/users/{id}/uploads|results, sketches/, tmp/
- [ ] drive_file_id в БД, отдача прокси-стримом/временной ссылкой
- [ ] Сжатие перед сохранением, чистка tmp
- [ ] Точка расширения на S3 при нехватке квоты

Ref: M5"

card "M6: Шеринг по ссылке /v/{id} + связка с ботом" "$P2" \
  "track/product,type/task,area/frontend,area/tg-bot,phase/product-tg,priority/P1" \
"Короткие ссылки на результат + открытие в боте.

**DoD**
- [ ] Страница /v/{id}: картинка с водяными знаками + дата/тариф
- [ ] Кнопка t.me/<bot>?start=preview_{id}
- [ ] Web Share API оставить как быстрый путь

Ref: M6"

# ---------- Phase 3 ----------
card "M7: Почтовый сервер на домене + транзакционные письма" "$P3" \
  "track/product,type/epic,area/email,phase/product-loyalty,priority/P1" \
"Почта на northcat.top (docker-mailserver) + уведомления.

**DoD**
- [ ] docker-mailserver (Postfix+Dovecot+Rspamd) или SMTP-relay для отправки
- [ ] DNS: MX, SPF, DKIM, DMARC, PTR, TLS
- [ ] Письма: активация кода, низкий баланс, новый результат, кешбек/реферал, ответ админа
- [ ] Решение: свой сервер vs relay (deliverability)

Ref: M7"

card "M8: Рефералы + кешбек баллами" "$P3" \
  "track/product,type/epic,area/loyalty,phase/product-loyalty,priority/P1" \
"Реферальная программа и баллы за оплаченные услуги.

**DoD**
- [ ] ref_code у аккаунта, referrer_id при переходе
- [ ] Бонус обоим при первом действии/оплате
- [ ] Кешбек: баллы за услуги (через админку: клиент X, сумма Y)
- [ ] Таблицы referrals, points_ledger
- [ ] Трата баллов на генерации/скидки

Ref: M8"

card "M11: Шаблоны размещений (зоны тела, пресеты)" "$P3" \
  "track/product,type/task,area/frontend,phase/product-loyalty,priority/P2" \
"Предзаготовки зон тела с масштабом/позицией.

**DoD**
- [ ] Пресеты: зона, координаты, базовый см (предплечье, спина, грудь, кисть…)
- [ ] Выбор шаблона → эскиз сразу подставлен в нужное место/масштаб

Ref: M11"

card "M12: PWA (manifest, service worker, иконки)" "$P3" \
  "track/product,type/task,area/pwa,phase/product-loyalty,priority/P2" \
"Установка на домашний экран + офлайн-оболочка.

**DoD**
- [ ] manifest.json (имя, иконки-сигил, цвета бренда, standalone)
- [ ] Service worker: офлайн-оболочка, кэш статики
- [ ] Иконки и сплэш в фирменном стиле

Ref: M12"

echo ""
echo "=== Готово. Карточки продуктовой дорожной карты созданы. ==="
echo "Project-board: ./scripts/gh-create-project.sh (нужен личный токен с project scope)"
