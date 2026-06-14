# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**NORTHCAT (Северный Кот)** - Complete digital infrastructure for a dark gothic tattoo studio brand + salon management system.

This is a unified project with two main components:

### 🎨 **Tattoo Studio Brand** (Design & Branding)
- **Website**: northcat.top
- **Type**: Dark gothic tattoo studio brand
- **Visual Identity**: Hot pink (#f4587e) on dark green-black (#0c120e)
- **Design**: Sphinx cat illustration with sacred geometry, blackletter typography
- **Status**: Design deadline 25.06.2026
- **Active Tools**: Todoist (task management), Canva (design), Zapier (integrations)

### 💼 **Salon Management System** (Infrastructure & Services)
- **Database configurations** - Schema, migrations, backups
- **Website/web application** - Frontend and backend code
- **Monitoring & logging** - Observability, alerts, dashboards
- **Infrastructure as Code** - Docker, Kubernetes, CI/CD pipelines
- **Configuration management** - Environment setups, secrets, credentials
- **Telegram Bot** - MVP with Claude AI integration via MCP

This is a monorepo that integrates design, branding, and operational tools.

## Repository Structure

```
NORTHCAT/
├── docs/                   # Architecture docs, setup guides, branding
│   ├── PROJECT_MEMORY.md   # Project status and progress tracking
│   ├── VISUAL_IDENTITY.md  # Brand guidelines (colors, typography, icons)
│   └── RESOURCES_LINKS.md  # Active tools and integrations
├── services/               # Microservices (API, website, admin tools, TG-bot)
│   ├── website/           # northcat.top frontend/backend
│   ├── salon-api/         # Salon management API
│   ├── tg-bot/            # Telegram bot with Claude AI integration
│   └── admin-panel/       # Administrative tools
├── database/              # DB schemas, migrations, seeding
├── design/                # Canva designs, brand assets
│   ├── assets/            # Logo variations, design files
│   └── canva-projects/    # Canva design candidates
├── docker/                # Docker images and docker-compose files
├── k8s/                  # Kubernetes manifests and Helm charts
├── monitoring/           # Prometheus configs, dashboards, alerts
├── scripts/              # Utility scripts for setup and deployment
├── config/               # API keys and integration configs
│   └── API_CONFIG.md     # LuxHost, Todoist, Jira, Canva configs
└── .github/              # GitHub Actions workflows
```

## Common Development Commands

### Getting Started
- Clone: `git clone <repo>`
- Check out the branch: `git checkout claude/cloud-md-file-setup-r9s4v2`
- Pull latest: `git pull origin <branch-name>`

### Website (northcat.top)
- Install dependencies: `npm install` or `yarn install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview production build: `npm run preview`

### Telegram Bot Development
- Install: `npm install` in `services/tg-bot/`
- Dev mode with hot reload: `npm run dev`
- Start bot: `npm start`
- MCP Server setup: Configure Claude AI integration via `/config`
- Test commands: Use `/help` in Telegram to see available commands

### Docker (when services are containerized)
- Build images: `docker-compose build`
- Start services: `docker-compose up -d`
- Stop services: `docker-compose down`
- View logs: `docker-compose logs -f <service-name>`
- Rebuild single service: `docker-compose up -d --build <service-name>`

### Database
- Run migrations: `npm run migrate` or equivalent for chosen DB
- Seed data: `npm run seed`
- Rollback: `npm run rollback`
- View status: `npm run migration:status`

### Testing
- Run all tests: `npm test` or `pytest` depending on language
- Run specific test: `npm test -- path/to/test` or `pytest tests/specific_test.py`
- Watch mode: `npm test -- --watch`
- Coverage: `npm test -- --coverage`

### Code Quality
- Linting: `npm run lint` or equivalent
- Format: `npm run format`
- Type checking: `npm run type-check` (if TypeScript/similar)

### Design & Branding
- Canva designs: https://www.canva.com/d/1WIUhM7eGyk1FpF (pinned candidate)
- Visual identity reference: `docs/VISUAL_IDENTITY.md`
- Brand colors: Hot pink #f4587e, Dark green-black #0c120e

### Deployment
- Deploy to staging: `git push origin <branch>` (triggers CI/CD)
- Deploy to production: Create PR to main branch
- Manual deploy: `npm run deploy` or deployment scripts in `./scripts/`
- Website deployment: Automatic via northcat.top hosting

## Development Practices

### Branch Structure
- **main**: Production-ready code, protected branch
- **claude/\***: Feature branches for Claude Code development
- All changes must be committed and pushed to assigned branches

### Commit Messages
- Use clear, descriptive messages
- Reference issue numbers when applicable
- Format: `<type>: <description>` (e.g., "feat: add TG-bot command", "design: update brand colors")

### Environment Configuration
- Use `.env.example` as template for local `.env`
- Never commit actual `.env` files
- API keys stored in `config/API_CONFIG.md` (not version controlled)
- Use GitHub Secrets for sensitive values in CI/CD

### Code Organization
- Keep services loosely coupled
- Use Docker for service isolation
- Document service dependencies in README files within each service directory
- Use consistent naming conventions across services
- Design assets in `design/` directory with version control

### Tools & Integrations

#### ✅ Active Integrations
- **Todoist**: Task management (Account: Andreihicatilooo, TZ: Europe/Riga)
  - Project 1: "Дизайн NORTHCAT" (7 tasks, board view, deadline 25.06.2026)
  - Project 2: "TG-бот / Агент" (MVP subtasks + extended features)
  - Note: Use `dueString` instead of `deadlineDate` on Free plan
  - Russian date strings work: "завтра", "25 июня"

- **Canva**: Design platform
  - Pinned candidate: https://www.canva.com/d/1WIUhM7eGyk1FpF
  - Status: 3 additional test designs
  - Note: `create-design-from-candidate` needs both `candidate_id` AND `job_id`

- **LuxHost API**: Hosting infrastructure
  - Docs: https://api.luxhost.cc/public/api
  - Key in `config/API_CONFIG.md`

#### ⏳ Pending Setup
- **Jira via Zapier**: Sync 13 Todoist tasks (awaiting OAuth)
  - Target: Task synchronization when OAuth completed
  - Limitation: No project creation via API - create manually first

#### ❌ Deprioritized
- **Figma**: Currently not in use (Starter plan API limitations)

## Key Files to Know

### Documentation & Planning
- **docs/PROJECT_MAP.md**: Visual map of 6 project directions and milestones
- **docs/INITIAL_TASKS.md**: Complete task list across all directions (75+ tasks)
- **docs/BACKLOG.md**: Prioritized backlog for current and next sprints
- **docs/IDEAS.md**: Capture system for new ideas (before they enter BACKLOG)
- **docs/AI_MANAGEMENT.md**: How to use Claude as project manager assistant
- **docs/PROJECT_MEMORY.md**: Full project status and progress tracking
- **docs/COMPLETED.md**: Archive of completed major tasks

### Brand & Design
- **docs/VISUAL_IDENTITY.md**: Brand guidelines, colors, typography, icons
- **design/**: Canva projects and exported assets (once created)

### Infrastructure & Configuration
- **docs/RESOURCES_LINKS.md**: Links to active tools and resources
- **config/API_CONFIG.md**: API keys and integration notes
- **docker-compose.yml**: Local development setup (when created)
- **.env.example**: Environment variables template

### Core Files
- **README.md**: Project overview
- **.gitignore**: Configured for Node.js projects
- **CLAUDE.md**: This file - guidance for Claude Code

### Current Branch
- **Branch**: Working on `claude/cloud-md-file-setup-r9s4v2`

## Project Deadlines & Milestones

| Task | Deadline | Status |
|------|----------|--------|
| Design NORTHCAT (7 tasks) | 25.06.2026 | In Progress |
| Jira OAuth Setup | - | Pending |
| TG-Bot MVP | - | In Development |
| Website Launch | - | Planned |

## Project Management System

This project uses a **solo developer + AI assistant** management approach:

- **docs/PROJECT_MAP.md** - Visual overview of 6 directions and phases
- **docs/INITIAL_TASKS.md** - Complete task list (75+ tasks, all directions)
- **docs/BACKLOG.md** - Sprint planning with P0/P1 prioritization
- **docs/IDEAS.md** - Idea capture system for continuous input
- **docs/AI_MANAGEMENT.md** - How to delegate to Claude for planning/decisions
- **docs/COMPLETED.md** - Archive of completed major tasks (to create)

**Key workflow:**
1. New idea → capture in IDEAS.md
2. Idea refined → move to INITIAL_TASKS.md or BACKLOG.md
3. Ready to work → create task in Todoist
4. In progress → update checkbox
5. Completed → move to COMPLETED.md

See `docs/AI_MANAGEMENT.md` for commands like:
- "What should I do next?"
- "Help me plan the sprint"
- "Show me my progress"

## Next Steps (Immediate)

1. **Setup Current Sprint** (by 28.06.2026)
   - Review BACKLOG.md P0 tasks
   - Create Todoist tasks from INITIAL_TASKS.md
   - Setup local development environment (Docker)

2. **Design Phase** (by 25.06.2026)
   - Complete 7 design tasks
   - Finalize Canva candidate (https://www.canva.com/d/1WIUhM7eGyk1FpF)
   - Export assets in PNG/SVG/PDF

3. **Website & Bot MVP** (by 31.07.2026)
   - Initialize website project (Next.js)
   - Create landing page and basic gallery
   - Register and setup Telegram bot with basic commands

4. **Infrastructure & CI/CD** (by 30.06.2026)
   - Configure Docker for services
   - Setup docker-compose for local dev
   - Create GitHub Actions workflow

5. **Integration & Enhancement** (August onwards)
   - Complete Jira OAuth for Zapier
   - Implement Claude AI/MCP for TG-bot
   - Setup monitoring and logging

## Timezone & Contact Info

- **Timezone**: Europe/Riga (UTC+2/3)
- **Website**: northcat.top
- **Todoist Account**: Andreihicatilooo

## Resources

- **Architecture decisions**: Refer to `docs/` directory
- **Brand guidelines**: See `docs/VISUAL_IDENTITY.md`
- **Project status**: Check `docs/PROJECT_MEMORY.md`
- **Current integrations**: See `docs/RESOURCES_LINKS.md`
