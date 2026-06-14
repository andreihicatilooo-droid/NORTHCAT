# NORTHCAT — Telegram бот-настройщик

Бот тату-студии «Северный Кот»: запись, прайс, контакты, набор
мастеров и запуск Web3 Mini App с депозитом в TON.

## Возможности
- `/start` — меню с кнопкой запуска **Mini App** (`miniapp.html`) и разделами.
- Приём текстовых заявок и фото-примерок → автопересылка **оператору**.
- Приём данных из Mini App (`web_app_data`): заявки и депозиты в TON.
- `/setup ключ значение` — **настройщик** для оператора: меняет ссылку на
  Mini App, контакты студии и статус набора мастеров без перезапуска.

## Установка
```bash
pip install -r requirements.txt
cp .env.example .env        # заполнить BOT_TOKEN и OPERATOR_CHAT_ID
python bot.py
```

## Настройка через /setup (только оператор)
```
/setup                       # показать текущие настройки
/setup hiring on             # включить блок «ищем мастеров»
/setup webapp_url https://northcat.top/miniapp.html
/setup phone +7 (999) 013-13-13
```
Настройки сохраняются в `settings.json`.

## Подключение Mini App
В @BotFather: *Bot Settings → Menu Button → URL* укажите
`https://northcat.top/miniapp.html`. Для TON Connect должен быть доступен
`https://northcat.top/tonconnect-manifest.json`.

> Файл `.env` и `settings.json` не коммитьте — это локальные данные.

---

## Недочёты (аудит 14.06.2026)

| Приоритет | Недочёт | ID |
|-----------|---------|-----|
| **P0** | Путь в `website/docker-compose.yml` не указывает на `services/tg-bot/` | BUG-001 |
| **P0** | Нет `BOT_TOKEN`, `OPERATOR_CHAT_ID` в `.env` | TASK-012 |
| **P1** | Заявки не сохраняются в БД (только Telegram) | DEBT-003 |
| **P1** | README в корне репо описывает Node.js/Telegraf | DEBT-001 |

Реестр: `docs/project/INDEX.md`
