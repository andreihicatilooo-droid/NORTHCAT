"""
NORTHCAT — Telegram бот-настройщик тату-студии «Северный Кот».

Возможности:
  • /start — меню с кнопкой запуска Web3 Mini App, разделами прайса,
    записи и контактов.
  • Приём заявок и фото-примерок от клиентов и пересылка оператору.
  • Команда /setup — настройщик: оператор студии управляет настройками
    (ссылка на Mini App, контакты, статус набора мастеров) прямо в чате.
  • Приём данных из Mini App (web_app_data).

Запуск:
    pip install -r requirements.txt
    cp .env.example .env   # заполнить BOT_TOKEN и OPERATOR_CHAT_ID
    python bot.py
"""

import asyncio
import json
import logging
import os

from aiogram import Bot, Dispatcher, F
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import Command, CommandStart
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    Message,
    WebAppInfo,
)

from config import load_config, save_settings, get_settings

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("northcat-bot")

config = load_config()
bot = Bot(
    token=config.bot_token,
    default=DefaultBotProperties(parse_mode=ParseMode.HTML),
)
dp = Dispatcher()


# --------------------------------------------------------------------------- #
#  Клавиатуры
# --------------------------------------------------------------------------- #
def main_menu() -> InlineKeyboardMarkup:
    s = get_settings()
    rows = [
        [InlineKeyboardButton(text="🪄 Открыть Mini App", web_app=WebAppInfo(url=s["webapp_url"]))],
        [
            InlineKeyboardButton(text="🖋 Записаться", callback_data="book"),
            InlineKeyboardButton(text="💰 Цены", callback_data="prices"),
        ],
        [
            InlineKeyboardButton(text="◎ Контакты", callback_data="contacts"),
        ],
    ]
    if s.get("hiring"):
        rows.append([InlineKeyboardButton(text="🧷 Аренда места мастеру", callback_data="hire")])
    return InlineKeyboardMarkup(inline_keyboard=rows)


def back_menu() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text="← В меню", callback_data="menu")]]
    )


# --------------------------------------------------------------------------- #
#  Тексты
# --------------------------------------------------------------------------- #
WELCOME = (
    "<b>NORTHCAT — Северный Кот</b> 🐈‍⬛\n\n"
    "Тату-студия: готическая графика, блэкворк и авторские эскизы.\n\n"
    "Выберите раздел или откройте Web3 Mini App, чтобы записаться, "
    "примерить эскиз и закрепить дату депозитом в TON."
)

PRICES_TEXT = (
    "<b>Примерная стоимость тату</b>\n\n"
    "• Минимум — от 3 000 ₽\n"
    "• Средняя (5–15 см) — от 6 000 ₽\n"
    "• Почасовая (объём, рукава) — от 6 000 ₽/час\n"
    "• Проект / рукав — от 25 000 ₽\n\n"
    "Эскиз и консультация при записи — бесплатно. "
    "Точную цену мастер назовёт после согласования эскиза."
)


def contacts_text() -> str:
    s = get_settings()
    return (
        "<b>Контакты NORTHCAT</b>\n\n"
        f"📍 {s['address']}\n"
        f"🕗 {s['hours']}\n"
        f"✆ {s['phone']}\n"
        f"✉ {s['email']}\n"
        f"✈ Telegram: {s['operator']}\n"
        f"◎ Сайт: {s['site']}"
    )


HIRE_TEXT = (
    "<b>Ищем мастеров</b> 🧷\n\n"
    "Сдаём рабочее место на <b>неполный съём студии</b> — есть свободные места.\n"
    "Гибкий график, оборудованное место, поток клиентов, лояльные условия.\n\n"
    "По аренде напишите оператору — кнопка «Контакты»."
)


# --------------------------------------------------------------------------- #
#  Хендлеры команд
# --------------------------------------------------------------------------- #
@dp.message(CommandStart())
async def cmd_start(message: Message) -> None:
    await message.answer(WELCOME, reply_markup=main_menu())


@dp.message(Command("menu"))
async def cmd_menu(message: Message) -> None:
    await message.answer(WELCOME, reply_markup=main_menu())


@dp.message(Command("setup"))
async def cmd_setup(message: Message) -> None:
    """Настройщик. Доступен только оператору студии."""
    if message.from_user.id != config.operator_chat_id:
        await message.answer("Команда доступна только оператору студии.")
        return

    args = (message.text or "").split(maxsplit=2)
    if len(args) < 3:
        s = get_settings()
        await message.answer(
            "<b>Настройщик NORTHCAT</b>\n\n"
            "Использование: <code>/setup ключ значение</code>\n\n"
            "Доступные ключи:\n"
            f"• <code>webapp_url</code> = {s['webapp_url']}\n"
            f"• <code>site</code> = {s['site']}\n"
            f"• <code>operator</code> = {s['operator']}\n"
            f"• <code>address</code> = {s['address']}\n"
            f"• <code>phone</code> = {s['phone']}\n"
            f"• <code>email</code> = {s['email']}\n"
            f"• <code>hours</code> = {s['hours']}\n"
            f"• <code>hiring</code> = {s['hiring']} (on/off)\n\n"
            "Пример: <code>/setup hiring on</code>"
        )
        return

    key, value = args[1].lower(), args[2].strip()
    allowed = {"webapp_url", "site", "operator", "address", "phone", "email", "hours", "hiring"}
    if key not in allowed:
        await message.answer(f"Неизвестный ключ «{key}». Разрешены: {', '.join(sorted(allowed))}.")
        return

    if key == "hiring":
        value = value.lower() in {"on", "1", "true", "да", "yes"}

    save_settings({key: value})
    await message.answer(f"✅ Настройка обновлена: <b>{key}</b> = <code>{value}</code>")


# --------------------------------------------------------------------------- #
#  Callback-кнопки
# --------------------------------------------------------------------------- #
@dp.callback_query(F.data == "menu")
async def cb_menu(call) -> None:
    await call.message.edit_text(WELCOME, reply_markup=main_menu())
    await call.answer()


@dp.callback_query(F.data == "prices")
async def cb_prices(call) -> None:
    await call.message.edit_text(PRICES_TEXT, reply_markup=back_menu())
    await call.answer()


@dp.callback_query(F.data == "contacts")
async def cb_contacts(call) -> None:
    await call.message.edit_text(contacts_text(), reply_markup=back_menu())
    await call.answer()


@dp.callback_query(F.data == "hire")
async def cb_hire(call) -> None:
    await call.message.edit_text(HIRE_TEXT, reply_markup=back_menu())
    await call.answer()


@dp.callback_query(F.data == "book")
async def cb_book(call) -> None:
    await call.message.edit_text(
        "✍️ Опишите идею тату одним сообщением: сюжет, размер, расположение и "
        "желаемую дату. Мы передадим заявку оператору, и он свяжется с вами.",
        reply_markup=back_menu(),
    )
    await call.answer()


# --------------------------------------------------------------------------- #
#  Приём контента от клиентов -> пересылка оператору
# --------------------------------------------------------------------------- #
@dp.message(F.web_app_data)
async def on_webapp_data(message: Message) -> None:
    """Данные из Mini App (запись / депозит)."""
    raw = message.web_app_data.data
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        data = {"raw": raw}

    kind = data.get("type", "unknown")
    if kind == "deposit":
        await message.answer(f"✅ Депозит {data.get('ton')} TON принят. Спасибо! Оператор подтвердит дату.")
        text = f"💎 Депозит из Mini App: {data.get('ton')} TON"
    else:
        await message.answer("✅ Заявка получена! Оператор скоро свяжется с вами.")
        text = "📩 Заявка на запись из Mini App"

    await forward_to_operator(message, header=text)


@dp.message(F.photo)
async def on_photo(message: Message) -> None:
    """Фото от клиента."""
    await message.answer("📸 Фото получено! Передал оператору — он подскажет по эскизу и стоимости.")
    await bot.send_message(
        config.operator_chat_id,
        f"📸 Фото от {user_label(message)}",
    )
    await bot.copy_message(
        chat_id=config.operator_chat_id,
        from_chat_id=message.chat.id,
        message_id=message.message_id,
    )


@dp.message(F.text & ~F.text.startswith("/"))
async def on_text(message: Message) -> None:
    """Свободный текст трактуем как заявку и пересылаем оператору."""
    await message.answer("✅ Спасибо! Передал заявку оператору — он свяжется с вами в Telegram.")
    await forward_to_operator(message, header="📩 Заявка на запись")


# --------------------------------------------------------------------------- #
#  Утилиты
# --------------------------------------------------------------------------- #
def user_label(message: Message) -> str:
    u = message.from_user
    handle = f"@{u.username}" if u.username else f"id{u.id}"
    return f"{u.full_name} ({handle})"


async def forward_to_operator(message: Message, header: str) -> None:
    await bot.send_message(
        config.operator_chat_id,
        f"{header}\nОт: {user_label(message)}",
    )
    await bot.copy_message(
        chat_id=config.operator_chat_id,
        from_chat_id=message.chat.id,
        message_id=message.message_id,
    )


# --------------------------------------------------------------------------- #
#  Точка входа
# --------------------------------------------------------------------------- #
async def main() -> None:
    logger.info("NORTHCAT bot запущен.")
    await dp.start_polling(bot)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Бот остановлен.")
