# 🔀 Git Workflow для NORTHCAT

Полная документация по Git Flow для проекта NORTHCAT.

---

## 🌳 Структура веток

```
main (PRODUCTION - stable, ready to deploy)
  ↑
  └─ develop (STAGING - integration point)
      ↑
      ├─ feature/website (Landing, Portfolio, Booking)
      ├─ feature/tg-bot (Commands, Claude AI, State Management)
      ├─ feature/salon-api (REST API endpoints, Auth)
      ├─ feature/database (Migrations, Schemas, Seeds)
      └─ feature/infrastructure (Docker, CI/CD, K8s, Monitoring)
```

---

## 📋 Текущие ветки

### Основные ветки (long-lived)
```
✅ main          - Production (стабильный код)
✅ develop       - Staging (интеграция фич)
```

### Feature ветки (работающие на фичах)
```
✅ feature/website         - Website разработка
✅ feature/tg-bot          - TG Bot разработка
✅ feature/salon-api       - API разработка
✅ feature/database        - Database разработка
✅ feature/infrastructure  - Infrastructure разработка
```

---

## 🚀 Git Flow Workflow

### 1️⃣ НАЧАТЬ РАБОТУ НА FEATURE

**Когда начинаешь новую фичу:**

```bash
# 1. Обновить develop
git checkout develop
git pull origin develop

# 2. Перейти на нужную feature ветку
git checkout feature/website

# 3. Убедиться что в синхе с develop
git pull origin develop

# Готово! Можешь начинать работу
```

### 2️⃣ ВО ВРЕМЯ РАЗРАБОТКИ

**Коммитить регулярно:**

```bash
# Просмотреть изменения
git status

# Добавить файлы
git add .

# Коммитить на русском
git commit -m "описание: что сделал на feature/website

- Добавил компонент Header
- Создал страницу /portfolio
- Настроил Tailwind CSS"

# Пушить на remote
git push origin feature/website
```

### 3️⃣ КОГДА FEATURE ГОТОВА

**Мержить в develop:**

```bash
# 1. Обновить develop
git checkout develop
git pull origin develop

# 2. Мержить feature ветку (без fast-forward)
git merge --no-ff feature/website -m "слить: объединить feature/website в develop

Добавлены:
- Landing page с hero section
- Portfolio галерея с фильтрацией
- Booking system
- Contact form"

# 3. Пушить на remote
git push origin develop

# 4. (Опционально) Удалить локальную feature ветку
git branch -d feature/website
```

### 4️⃣ КОГДА DEVELOP ГОТОВ К PRODUCTION

**Мержить в main (релиз):**

```bash
# 1. Убедиться что на develop
git checkout develop
git pull origin develop

# 2. Мержить в main
git checkout main
git pull origin main
git merge --no-ff develop -m "релиз: выпустить версию 1.0.0

Features:
- Website MVP (landing, portfolio, booking)
- Salon API (clients, appointments, services)
- TG Bot (commands, booking, Claude AI)
- Database migrations

Breaking Changes: None"

# 3. Создать tag для версии
git tag -a v1.0.0 -m "Version 1.0.0 - MVP Release"

# 4. Пушить на remote
git push origin main
git push origin v1.0.0

# 5. Вернуться на develop для следующего спринта
git checkout develop
git pull origin develop
```

---

## 📝 Примеры коммитов

### Format коммитов

```
<тип>: <описание>

<подробное описание если нужно>
```

### Типы коммитов
- `документация:` - Docs updates
- `функция:` - New features
- `инфраструктура:` - Setup/config
- `исправление:` - Bug fixes
- `улучшение:` - Improvements
- `рефактор:` - Code refactoring
- `тест:` - Test updates
- `слить:` - Merge commits

### Примеры

```bash
# Feature коммит
git commit -m "функция: добавить страницу /portfolio

- Grid gallery с lazy loading
- Filter by style и artist
- Lightbox для images"

# Bug fix
git commit -m "исправление: исправить баг в booking форме

- Date picker теперь правильно показывает доступное время
- Validation для контактных данных
- Email notification отправляется"

# Merge коммит
git commit -m "слить: объединить feature/website в develop

Website MVP готов для интеграции"

# Infrastructure
git commit -m "инфраструктура: добавить Docker конфигурацию

- docker-compose.yml для local development
- Dockerfiles для всех сервисов
- .dockerignore files"
```

---

## 🔄 Синхронизация веток

### Обновить feature ветку из develop

Если develop содержит важные изменения:

```bash
# Вариант 1: Merge (сохраняет историю)
git checkout feature/website
git fetch origin
git merge origin/develop

# Вариант 2: Rebase (чистая история)
git checkout feature/website
git fetch origin
git rebase origin/develop
git push origin feature/website --force-with-lease
```

### Синхронизировать все ветки

```bash
# Fetch все изменения
git fetch origin

# Обновить develop
git checkout develop
git pull origin develop

# Обновить каждую feature ветку
for branch in website tg-bot salon-api database infrastructure; do
  git checkout feature/$branch
  git merge origin/develop
done
```

---

## ❌ Когда что-то пошло не так

### Откатить последний коммит

```bash
# Мягкий откат (сохраняет изменения)
git reset --soft HEAD~1

# Жёсткий откат (теряет изменения)
git reset --hard HEAD~1
```

### Откатить merge

```bash
# Если уже мержили
git revert -m 1 <merge-commit-hash>

# Если ещё не пушили
git reset --hard HEAD~1
```

### Восстановить удалённую ветку

```bash
git reflog
git checkout -b feature/website <lost-commit-hash>
git push origin feature/website
```

### Разрешить конфликты при мерже

```bash
# 1. Решить конфликты в редакторе
# 2. Добавить решённые файлы
git add .

# 3. Продолжить мерж
git merge --continue

# или отменить
git merge --abort
```

---

## 📊 Полезные команды

### Просмотр веток

```bash
# Локальные ветки
git branch

# Все ветки
git branch -a

# С последним коммитом
git branch -v

# Только мержанные
git branch --merged

# Только не мержанные
git branch --no-merged
```

### Просмотр коммитов

```bash
# История текущей ветки
git log --oneline -10

# История с граф-визуализацией
git log --graph --oneline --all

# Коммиты между ветками
git log develop..feature/website
```

### Очистка локальных веток

```bash
# Удалить мержанные ветки
git branch -d feature/website

# Удалить локальную копию удалённой ветки
git remote prune origin
```

---

## 🎯 Sprint Workflow

### Начало спринта
```bash
git checkout develop
git pull origin develop
```

### Во время спринта
```bash
# Работа на feature ветках
git checkout feature/website
# ... разработка ...
git add .
git commit -m "описание изменений"
git push origin feature/website
```

### Конец спринта
```bash
# 1. Мержить все готовые фичи в develop
git checkout develop
git merge --no-ff feature/website
git merge --no-ff feature/tg-bot
git push origin develop

# 2. Тестирование на develop
# ...

# 3. Мержить в main для релиза
git checkout main
git merge --no-ff develop
git tag -a v1.1.0 -m "Sprint 1 Release"
git push origin main
git push origin v1.1.0
```

---

## 📌 Best Practices

### DO ✅
- 💚 Коммитить часто (несколько раз в день)
- 💚 Писать понятные сообщения на русском
- 💚 Пушить в develop регулярно
- 💚 Проверять изменения перед пушем
- 💚 Синхронизировать feature с develop
- 💚 Использовать --no-ff для мержей

### DON'T ❌
- ❌ Не коммитить большие изменения за раз
- ❌ Не забывать пушить на remote
- ❌ Не мержить feature напрямую в main
- ❌ Не работать в main (только для тегов)
- ❌ Не переписывать публичную историю (force push)

---

## 🔗 Связь с Claude AI

```
Спроси Claude:
"Помоги мне создать pull request для feature/website"
"Какой сейчас статус feature/tg-bot?"
"Есть ли конфликты при мерже?"
"Покажи мне разницу между feature/website и develop"
```

---

## 📚 Текущее состояние (14 июня 2026)

### Ветки в репозитории
```
✅ main              - Production (ab88ae8)
✅ develop           - Staging (ab88ae8)
✅ feature/website   - В разработке
✅ feature/tg-bot    - В разработке
✅ feature/salon-api - В разработке
✅ feature/database  - В разработке
✅ feature/infrastructure - В разработке
```

### Готовый код в main
```
✅ CLAUDE.md - Основной гайд
✅ Полная документация (10+ файлов)
✅ Структура всех сервисов
✅ MCP интеграция
✅ Database structure
✅ Resources организованы
```

---

## 🚀 Что дальше

1. **Выбрать feature ветку** для работы
2. **Начать разработку** на выбранной ветке
3. **Коммитить регулярно** с понятными сообщениями
4. **Пушить на remote** несколько раз в день
5. **Когда готово** → мержить в develop
6. **После спринта** → мержить в main как релиз

---

**Версия**: 1.0  
**Дата**: 14 июня 2026  
**Git Flow Strategy**: Standard Git Flow для solo разработки
