# 🤝 NORTHCAT Гайд для контрибьюторов

Спасибо за интерес к проекту NORTHCAT! Мы строим тёмный готический бренд татуировочной студии с цифровыми инструментами. Для разработчиков, дизайнеров и авторов документации есть место здесь.

---

## 📋 Кодекс поведения

Мы строим приветливую и инклюзивную среду для всех контрибьюторов. Пожалуйста:

- 🤝 Будьте вежливы и профессиональны
- 🌈 Приветствуйте разнообразие мнений и фона
- 💭 Сосредоточьтесь на конструктивной обратной связи
- 📢 Сообщайте о любых проблемах поведения лидеру проекта

---

## 🚀 Начало работы

### 1. Форкировать репозиторий
```bash
# Посетить https://github.com/andreihicatilooo-droid/northcat
# Нажать кнопку "Fork"
```

### 2. Клонировать ваш форк
```bash
git clone https://github.com/[ваше-имя]/northcat.git
cd northcat
```

### 3. Добавить upstream remote
```bash
git remote add upstream https://github.com/andreihicatilooo-droid/northcat.git
git fetch upstream
```

### 4. Создать feature ветку
```bash
# Выбрать из существующих feature веток или создать новую
git checkout feature/website
# или
git checkout -b feature/your-feature develop
```

---

## 📝 Гайдлайны для коммитов

### Формат сообщения коммита

**Все коммиты на РУССКОМ языке!**

```
<тип>: <описание на русском>

<подробное описание если нужно>
```

### Типы коммитов
- `функция:` - Новая функциональность
- `исправление:` - Bug fix
- `документация:` - Изменения в документации
- `стиль:` - Форматирование кода
- `рефактор:` - Рефакторинг кода
- `тест:` - Добавление тестов
- `инфраструктура:` - Build процесс, зависимости

### Области (scope)
- `website` - Код сайта
- `bot` - Код TG бота
- `api` - REST API код
- `database` - БД миграции и схемы
- `docs` - Документация
- `design` - Design ассеты

### Примеры

```
функция(website): добавить страницу /portfolio

- Создал grid gallery с lazy loading
- Добавил фильтрацию по стилям
- Интегрировал с API

исправление(bot): исправить ошибку в booking форме

- Date picker теперь правильно показывает доступное время
- Добавлена валидация контактных данных
- Отправка email работает

документация: обновить CONTRIBUTING.md

- Добавлены гайдлайны на русском
- Расширены примеры коммитов
- Уточнена структура PR
```

---

## 🔀 Процесс Pull Request

### 1. Обновить develop ветку
```bash
git fetch origin
git rebase origin/develop
```

### 2. Сделать изменения
- Следовать стайл-гайду
- Добавить тесты для новых фич
- Обновить документацию
- Делать atomic commits (логически связанные)

### 3. Пушить на свой форк
```bash
git push origin feature/website
```

### 4. Создать Pull Request
- Перейти на GitHub
- Нажать "Compare & pull request"
- Написать описание PR на русском
- Убедиться что базовая ветка - `develop`

### 5. PR Template

```markdown
## 📝 Описание

[Объясните что вы сделали и почему]

## 🎯 Тип изменения

- [ ] Новая функция
- [ ] Bug fix
- [ ] Документация
- [ ] Рефакторинг

## ✅ Чек-лист

- [ ] Мой код следует гайдам стиля
- [ ] Я обновил документацию
- [ ] Я добавил тесты
- [ ] Все тесты проходят

## 📸 Скриншоты (если UI изменения)

[Добавить скриншоты если нужно]
```

---

## 💡 Гайдлайны разработки

### Git Flow Branches

```
main (production)
  └─ develop (staging)
      ├─ feature/website
      ├─ feature/tg-bot
      ├─ feature/salon-api
      ├─ feature/database
      └─ feature/infrastructure
```

### Работа на feature ветке

```bash
# 1. Начать с develop
git checkout develop
git pull origin develop

# 2. Перейти на feature ветку
git checkout feature/website

# 3. Во время работы - коммитить часто
git add .
git commit -m "функция: что я сделал

- Пункт 1
- Пункт 2"

# 4. Пушить регулярно
git push origin feature/website

# 5. Когда готово - мерж в develop
git checkout develop
git merge --no-ff feature/website
git push origin develop
```

---

## 📚 Структура проекта

```
NORTHCAT/
├── services/
│   ├── website/          # Next.js сайт
│   ├── tg-bot/           # Telegraf бот
│   └── salon-api/        # Express API
├── resources/            # Дизайн, фото, видео
├── database/             # Миграции
├── docs/                 # Документация
├── GIT_WORKFLOW.md       # Git Flow гайд
├── CLAUDE.md             # Claude Code гайд
└── README.md             # Основной файл
```

---

## 🧪 Тестирование

### Перед тем как сделать PR

```bash
# Лinting
npm run lint

# Type checking (если TypeScript)
npm run type-check

# Tests
npm test

# Build
npm run build
```

---

## 📖 Документирование кода

### Комментарии в коде

```javascript
// Только если ПОЧЕМУ неочевидно
// Хорошо: сложный алгоритм, workaround для бага
// Плохо: "это переменная x"

// ✅ ХОРОШО
// Используем setTimeout вместо Promise для совместимости со старыми браузерами
setTimeout(() => { ... }, 0)

// ❌ ПЛОХО
// Установить timeout
setTimeout(() => { ... }, 0)
```

### Документирование функций

```typescript
/**
 * Получить список клиентов с фильтрацией
 * @param filters - объект с фильтрами
 * @param limit - максимум результатов (по умолчанию 10)
 * @returns Массив клиентов
 */
function getClients(filters: FilterObject, limit: number = 10) {
  // ...
}
```

---

## 🆘 Помощь и вопросы

- 📖 Читай CLAUDE.md для основной информации
- 🗺️ Смотри PROJECT_MAP.md для обзора проекта
- 💬 Спроси Claude: "Как мне начать разработку feature/website?"
- 🐛 Открыто Issue для багов (с описанием и шагами воспроизведения)

---

## 🎉 Спасибо!

Спасибо за интерес и за то что помогаешь улучшать NORTHCAT! 🖤

**Помни: все коммиты и документация на русском языке!** 🇷🇺

---

**Версия**: 1.0  
**Дата**: 14 июня 2026  
**Язык**: Русский 🇷🇺
