# 🔌 MCP Конфигурация для NORTHCAT

Документация по настройке Model Context Protocol (MCP) для проекта NORTHCAT.

---

## 📌 Что такое MCP?

**Model Context Protocol (MCP)** - стандартный протокол для интеграции Claude AI с внешними сервисами и инструментами.

Позволяет Claude:
- Работать с GitHub API
- Автоматизировать git операции
- Создавать и управлять issues/PRs
- Работать с другими сервисами

---

## 🔧 Текущая конфигурация

### Активные MCP Серверы

#### **GitHub MCP**
```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "enabled": true
    }
  }
}
```

**Возможности:**
- Создание и управление issues
- Работа с pull requests
- Чтение содержимого файлов
- Commit операции
- Branch management
- GitHub Actions управление

**Как использовать:**
```
Спроси Claude:
"Создай issue для [задача]"
"Помоги мне с pull request"
"Какой статус CI?"
"Найди код который делает [функцию]"
```

---

## 📁 Файлы конфигурации

### `.claude/mcp.json`
Основная конфигурация MCP серверов.

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

### `.claude/settings.json`
Полные settings для Claude Code с MCP и проектными настройками.

```json
{
  "mcp": {
    "servers": {
      "github": {
        "type": "http",
        "url": "https://api.githubcopilot.com/mcp/",
        "enabled": true
      }
    }
  },
  "project": {
    "name": "NORTHCAT",
    "description": "Татуировочная студия бренд + система управления салоном",
    "language": "ru"
  }
}
```

---

## 🚀 Как использовать GitHub MCP

### Создание Issues

```
Вопрос Claude:
"Создай issue в GitHub для задачи: Финализировать дизайн"

Claude создаст issue с:
- Заголовком на русском
- Описанием на русском
- Labels и projects
```

### Работа с Pull Requests

```
Вопрос Claude:
"Создай pull request для моих изменений дизайна"

Claude поможет:
- Создать PR с описанием
- Добавить правильные labels
- Связать с issues
- Написать PR description на русском
```

### Просмотр статуса CI/CD

```
Вопрос Claude:
"Какой статус GitHub Actions?"
"Где мои failing tests?"
"Помоги разобраться с CI ошибкой"

Claude проверит:
- Статус workflows
- Результаты тестов
- Логи ошибок
```

### Поиск кода в репозитории

```
Вопрос Claude:
"Где в коде функция для бронирования?"
"Найди все использования класса X"
"Покажи мне API endpoints"

Claude найдет и покажет код
```

---

## 🔄 Примеры работы с MCP

### Пример 1: Создание Issue для дизайна

```
ТЫ: "Создай issue для финализации дизайна в GitHub"

CLAUDE:
1. Проверит доступ к GitHub
2. Создаст issue с заголовком:
   "🎨 Финализировать дизайн NORTHCAT"
3. Добавит description:
   - Необходимые задачи
   - Чек-листы
   - Дедлайн (25.06.2026)
4. Установит labels: design, priority:p0
5. Свяжет с project NORTHCAT
6. Вернет ссылку на созданный issue
```

### Пример 2: Создание PR для новых файлов

```
ТЫ: "Давай создадим PR с нашими документами управления"

CLAUDE:
1. Проверит изменения в ветке
2. Создаст PR:
   - Название: "доц: добавить систему управления проектом"
   - Description на русском с деталями
   - Обозначит файлы которые изменились
3. Добавит labels: documentation, project-setup
4. Предложит reviewers
5. Вернет ссылку на PR
```

### Пример 3: Мониторинг CI статуса

```
ТЫ: "Проверь статус моего PR"

CLAUDE:
1. Получит информацию о PR
2. Проверит GitHub Actions workflow
3. Покажет статус:
   - ✅ Tests passed
   - ❌ Linting failed (with details)
   - ⏳ Build in progress
4. Предложит что исправить
5. Даст команды для локального тестирования
```

---

## 🔐 Аутентификация

### Требуемые разрешения для GitHub MCP:

```
✅ Доступ к репозиторию (andreihicatilooo-droid/NORTHCAT)
✅ Создание и управление issues
✅ Создание и управление pull requests
✅ Чтение содержимого файлов
✅ Просмотр статуса CI/CD
✅ Управление labels и projects
```

### Как проверить доступ:

```
Вопрос Claude:
"Проверь доступ к GitHub репозиторию"

Claude проверит и скажет:
- ✅ Доступ работает
- ❌ Нужны дополнительные разрешения (с инструкциями)
```

---

## 📋 Команды для Claude через GitHub MCP

### Issues

```
// Создание
"Создай issue для [задача]"
"Добавь issue: [описание]"
"Создай bug report для [проблема]"

// Поиск
"Найди все открытые issues"
"Какие issues нужно закрыть?"
"Покажи issues по label: design"

// Управление
"Закрой issue #[number]"
"Добавь label design к issue #[number]"
"Свяжи issue #1 с issue #2"
```

### Pull Requests

```
// Создание
"Создай PR с моими изменениями"
"Напиши PR description на русском"

// Просмотр
"Какой статус моего PR?"
"Покажи diff в PR #[number]"
"Какие замечания в reviews?"

// Управление
"Объедини PR #[number] в main"
"Запроси review для PR"
"Требуется ли что-то ещё для PR?"
```

### Commits & Branches

```
// Информация
"Покажи последние commits"
"Какой статус моей ветки?"
"Есть ли conflicts с main?"

// Операции
"Помоги разрешить merge conflict"
"Создай новую ветку для [feature]"
"Синхронизируй мою ветку с main"
```

### GitHub Actions

```
// Мониторинг
"Какой статус CI/CD?"
"Почему failing тесты?"
"Покажи логи workflow"

// Управление
"Перезапусти workflow"
"Отключи автоматический deploy"
```

---

## 🆘 Troubleshooting

### MCP сервер не подключается

```
Вопрос Claude:
"MCP не работает, помоги разобраться"

Проверка:
1. Интернет соединение
2. Доступ к GitHub
3. Токены аутентификации
4. Файлы конфигурации
```

### Нет доступа к GitHub операциям

```
Решение:
1. Проверить разрешения в GitHub
2. Обновить токены
3. Проверить settings.json
4. Перезагрузить Claude Code
```

### Ошибки при создании Issues/PRs

```
Вопрос Claude:
"Почему я не могу создать issue? [ошибка]"

Claude поможет:
1. Понять что пошло не так
2. Исправить конфигурацию
3. Попробовать снова
```

---

## 📚 Дополнительные MCP Серверы (для будущего)

### Возможные интеграции:

```json
{
  "servers": {
    "github": { /* текущий */ },
    
    "todoist": {
      "type": "http",
      "url": "https://mcp.todoist.com/",
      "enabled": false
    },
    
    "slack": {
      "type": "http", 
      "url": "https://mcp.slack.com/",
      "enabled": false
    },
    
    "stripe": {
      "type": "http",
      "url": "https://mcp.stripe.com/",
      "enabled": false
    }
  }
}
```

---

## 🎯 Best Practices

### DO ✅
- Используй MCP для автоматизации git операций
- Проси Claude помочь с issues/PRs
- Проверяй CI статус перед merge
- Веди операции через Claude

### DON'T ❌
- Не создавай duplicate issues
- Не merge без проверки CI
- Не забывай про descriptions в PR
- Не игнорируй review comments

---

## 🔗 Связанные файлы

- **CLAUDE.md** - Основное руководство
- **AI_MANAGEMENT.md** - Управление проектом
- **.claude/settings.json** - Конфигурация
- **.claude/mcp.json** - MCP конфиг

---

**Версия**: 1.0  
**Дата создания**: 14 июня 2026  
**Управление**: Solo разработчик + Claude AI + GitHub MCP
