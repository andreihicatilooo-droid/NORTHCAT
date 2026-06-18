# 🏗️ Архитектурные решения

Главные решения, которые приняли и почему.

## ❌ (TODO) MONOREPO vs MICROSERVICES

**Статус:** ⏳ В процессе решения  
**Deadline:** 20.06  
**Вопрос:** В `/knowledge/brain/questions.md`

---

## ❌ (TODO) DATABASE CHOICE

**Статус:** ⏳ В процессе решения  
**Deadline:** 18.06  
**Варианты:**
- PostgreSQL (relational, ACID, good for structured data)
- MongoDB (document, flexible, good for rapid iteration)

---

## ✅ (РЕШЕНО) TECH STACK

**Решено:** 14.06.2026  
**Решение:**
- **Frontend:** Next.js 14+ (React, TypeScript)
- **Backend:** Node.js + Express (или Fastify)
- **Database:** PostgreSQL (выбрали за ACID + структурированность)
- **Infrastructure:** Docker + Kubernetes (scalability)
- **CI/CD:** GitHub Actions
- **Messaging:** Telegram Bot (MVP)
- **AI:** Claude AI via MCP integration

**Почему:**
- Next.js: Full-stack, great DX, SSR/SSG
- Node.js: JavaScript everywhere, huge ecosystem
- PostgreSQL: Reliable, structured data, great for salon management
- Docker: Reproducible environments
- Telegram: Instant reach, no install friction

**Документация:** Нужно создать детальную архитектурную диаграмму

---

## ❌ (TODO) AUTHENTICATION STRATEGY

**Статус:** ⏳ Очередь на решение  
**Deadline:** 30.06

Варианты:
1. JWT tokens (stateless, scalable)
2. Sessions + Redis (stateful, simpler for small teams)
3. OAuth (Google, GitHub, Telegram)

---

## ❌ (TODO) PAYMENT PROCESSING

**Статус:** ⏳ Очередь на решение  
**Deadline:** 15.07

Варианты:
1. Stripe (полнофункциональный, хороший API)
2. LuxHost API (если есть интеграция)
3. PayPal (простой, но меньше контроля)

---

**Последнее обновление:** 14.06.2026
