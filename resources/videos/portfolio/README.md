# NORTHCAT Portfolio Videos

Видео-контент для портфолио и маркетинга NORTHCAT.

## Содержимое

### `northcat-portfolio.mp4` (2.1MB)
- Основное видео портфолио NORTHCAT
- Формат: MP4 (H.264 codec)
- Размер: 2.1MB (оптимизировано для web)
- Может использоваться на сайте, в Telegram боте, социальных сетях

## Характеристики

| Параметр | Значение |
|----------|----------|
| **Формат** | MP4 (H.264) |
| **Размер файла** | 2.1MB |
| **Рекомендуемое разрешение** | 1280x720p (Full HD) |
| **Назначение** | Веб-портфолио |

## Использование

### На Website
```html
<!-- HTML5 Video Player -->
<video width="100%" controls poster="/images/thumbnail.jpg">
  <source src="/resources/videos/portfolio/northcat-portfolio.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

### В Telegram Боте
```python
# Python telegram-bot
video_path = 'resources/videos/portfolio/northcat-portfolio.mp4'
context.bot.send_video(chat_id=chat_id, video=open(video_path, 'rb'))
```

### На Социальных Сетях
- Instagram: конвертировать в 9:16 (Story) или 1:1 (Square)
- TikTok: обрезать или использовать 15-60 сек фрагмент
- YouTube: загрузить как полное видео

## Оптимизация

Для мобильных устройств создать несколько версий:
- `northcat-portfolio-mobile.mp4` (480p, < 1MB)
- `northcat-portfolio-hd.mp4` (1080p, < 5MB)

---

**Дата добавления**: 18.06.2026
**Размер**: 2.1MB
**Формат**: MP4 (H.264)
