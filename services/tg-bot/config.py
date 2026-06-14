"""
Конфигурация и хранилище настроек NORTHCAT-бота.

Настройки настройщика хранятся в settings.json и могут меняться
оператором через команду /setup без перезапуска бота.
"""

import json
import os
from dataclasses import dataclass
from pathlib import Path

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:  # python-dotenv не обязателен в проде
    pass

BASE_DIR = Path(__file__).resolve().parent
# Каталог для изменяемых данных (settings.json). В Docker сюда монтируется том.
# Можно переопределить через переменную окружения DATA_DIR.
DATA_DIR = Path(os.getenv("DATA_DIR", BASE_DIR / "data"))
DATA_DIR.mkdir(parents=True, exist_ok=True)
SETTINGS_PATH = DATA_DIR / "settings.json"

DEFAULT_SETTINGS = {
    "webapp_url": "https://northcat.top/miniapp.html",
    "site": "https://northcat.top",
    "operator": "@N0RTHCAT",
    "address": "г. Москва, ул. Тёмная, 13",
    "phone": "+7 (999) 013-13-13",
    "email": "ink@northcat.top",
    "hours": "Ежедневно 12:00 — 22:00",
    "hiring": True,
}


@dataclass
class Config:
    bot_token: str
    operator_chat_id: int


def load_config() -> Config:
    token = os.getenv("BOT_TOKEN", "").strip()
    if not token:
        raise RuntimeError(
            "BOT_TOKEN не задан. Скопируйте .env.example в .env и укажите токен бота."
        )
    operator_raw = os.getenv("OPERATOR_CHAT_ID", "0").strip()
    try:
        operator_id = int(operator_raw)
    except ValueError:
        operator_id = 0
    return Config(bot_token=token, operator_chat_id=operator_id)


def _read() -> dict:
    if SETTINGS_PATH.exists():
        try:
            data = json.loads(SETTINGS_PATH.read_text(encoding="utf-8"))
            merged = {**DEFAULT_SETTINGS, **data}
            return merged
        except (json.JSONDecodeError, OSError):
            pass
    return dict(DEFAULT_SETTINGS)


def get_settings() -> dict:
    return _read()


def save_settings(partial: dict) -> dict:
    current = _read()
    current.update(partial)
    SETTINGS_PATH.write_text(
        json.dumps(current, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return current
