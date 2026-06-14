---
id: IDEA-003
type: idea
title: "Architecture diagram для монорепо"
status: inbox
area: docs
priority: P2
created: 2026-06-14
impact: medium
effort: low
---

# IDEA-003: Architecture diagram

## Суть

BACKLOG P0 просит architecture diagram. Сейчас связи между сервисами только в тексте.

## Что показать

```mermaid
flowchart LR
  User --> Website[website nginx]
  User --> TG[Telegram Bot]
  Website --> MiniApp[miniapp.html]
  Website --> NFT[nft-koty]
  TG --> MiniApp
  TG --> Operator[Operator Chat]
  Website -.->|planned| API[salon-api]
  API -.->|planned| DB[(PostgreSQL)]
```

## Где положить

- `docs/architecture.md` или секция в README
- Mermaid в git (рендер на GitHub)

## Оценка

1–2 ч

## Если принято → TASK-022 (создать при принятии)
