# 📚 Backlog (всё остальное, что будет)

Отсортирован по приоритетам. Берешь задачи сверху для current-sprint.md.

## P1 - КРИТИЧНЫЕ

| Задача | Deadline | Почему P1 | Блокирует |
|--------|----------|----------|-----------|
| Дизайн: утвердить concept сфинкса | 25.06 | Жесткий deadline от клиента | Website design, brand identity |
| Database: написать schema (users, appointments, payments) | 18.06 | Нужна для разработки API | Salon API, TG-Bot |
| Website: Landing page + Gallery layout | 30.06 | Публичное лицо проекта | Launch northcat.top |
| TG-Bot: MVP (booking команды + Claude integration) | 31.07 | Основной канал взаимодействия | Customer engagement |

## P2 - ВЫСОКИЙ ПРИОРИТЕТ

| Задача | Deadline | Почему P2 | Зависит от |
|--------|----------|----------|------------|
| Website: интеграция с Salon API | 15.07 | Нужна для полной функциональности | Database + API |
| Salon API: CRUD для appointments | 15.07 | Core функциональность | Database schema |
| Admin Panel: базовый интерфейс | 20.07 | Управление всем | Database, API |
| Infrastructure: Docker + docker-compose | 30.06 | Воспроизводимость локально | - |
| CI/CD: GitHub Actions базовый flow | 30.06 | Автоматизация deploy | Docker |
| Документация: Architecture decisions | 30.06 | Знаниевая база | Схемы, диаграммы |

## P3 - СРЕДНИЙ ПРИОРИТЕТ

| Задача | Deadline | Почему P3 | Зависит от |
|--------|----------|----------|------------|
| Website: SEO оптимизация | 15.08 | Видимость в поиске | Website готов |
| Website: интеграция платежей (Stripe/LuxHost) | 15.08 | Монетизация | Website + API |
| TG-Bot: advanced команды (/schedule, /portfolio, /reviews) | 31.08 | Enhanced UX | TG-Bot MVP |
| Monitoring: Prometheus + Grafana setup | 30.08 | Видимость проблем | Infrastructure готов |
| Integrations: Zapier + Todoist sync | 30.07 | Синхронизация задач | API готов |
| Database: backups + disaster recovery | 15.08 | Safety | Database production ready |

## P4 - НИЗКИЙ ПРИОРИТЕТ

| Задача | Сложность | Идея |
|--------|-----------|------|
| Website: темная тема toggle | LOW | UX улучшение |
| TG-Bot: бизнес аналитика commands | MEDIUM | Stats для владельца |
| Admin Panel: расширенные отчеты | MEDIUM | BI features |
| Docs: туториалы по использованию | LOW | Onboarding |
| Performance: кеширование (Redis) | MEDIUM | Optimization |
| Mobile app (native) | HIGH | Долгосрочный план |

---

## 🔄 Как работать с backlog

### В начале спринта (каждый понедельник)
```
1. Открой backlog (этот файл)
2. Посмотри P1 и P2 вверху
3. Выбери 3-5 задач
4. Скопируй в current-sprint.md
```

### Во время спринта
```
- Если закончил задачу → архивируй в completed.md
- Если задача сложнее чем ожидал → перемести в next sprint
- Если новая срочная идея → добавь в brain/ideas.md
```

### В конце спринта (каждую пятницу)
```
- Готовые задачи → completed.md
- Незаконченные → обратно в backlog
- Пересчет приоритетов если что-то изменилось
- Планирование следующего спринта
```

---

## 📈 Стратегия

### Неделя 1 (14-20.06) - ФУНДАМЕНТ
- Дизайн концепт утвердить
- Database schema
- Website skeleton
- TG-Bot skeleton

### Неделя 2-3 (21-30.06) - ИНТЕГРАЦИЯ
- API endpoints (основные)
- Website интеграция с API
- Infrastructure готов
- CI/CD готов

### Неделя 4+ (июль) - POLISH
- Advanced features
- Тестирование
- Документация
- Launch preparation

---

## 💭 Примечания

- Если feel burned out → уменьши спринт до 2-3 задач
- Если стоит задача больше недели → раздели на subtasks
- Если не уверен в приоритете → спроси Claude

**Последнее обновление:** 14.06.2026
