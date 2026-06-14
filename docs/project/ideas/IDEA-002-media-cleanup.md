---
id: IDEA-002
type: idea
title: "Очистка неиспользуемых медиа в ресурсы/"
status: inbox
area: website
priority: P2
created: 2026-06-14
impact: low
effort: low
---

# IDEA-002: Очистка медиа в ресурсы/

## Суть

В `services/website/ресурсы/` есть дубликаты и неиспользуемые видео (~8.5 МБ).

## Файлы к удалению (на усмотрение владельца)

- `video_2026-06-07_01-33-44.mp4` (~5.5 МБ)
- `video_2026-06-07_01-33-48.mp4` (~3 МБ)
- Дубликаты `cat_circle.jpg`, `cat_full.jpg`, `typography.jpg`, `promo.mp4`

## Команда

```bash
rm -f services/website/ресурсы/video_2026-06-07_01-33-44.mp4 \
      services/website/ресурсы/video_2026-06-07_01-33-48.mp4
```

## Когда

Вместе с TASK-012/S9 или отдельно за 15 мин.

## Если принято → шаг TASK-012/S9
