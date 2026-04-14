# Architecture

## Stack
- Runtime/API: Hono on Cloudflare Workers
- Database: Cloudflare D1 (SQLite)
- Async processing: Cloudflare Queues (phase 2)
- Object storage: Cloudflare R2 (optional)
- LLM analytics: external model API called from Worker jobs

## Monorepo Structure
- `apps/api`: HTTP entrypoints, webhook handling, orchestration
- `packages/core`: shared domain models and parsing utilities
- `docs`: planning and operational playbooks

## Module Boundaries
1. `channels/*` (future): adapters for WhatsApp / SMS / Telegram
2. `domain/*`: metric normalization and validation
3. `storage/*`: D1 repository methods
4. `analytics/*`: prompt construction + trend summarization

## Deployment
- Single Worker for MVP
- Environments: `dev`, `staging`, `prod`
- Secret management via Wrangler secrets

## Security & Compliance Notes
- Avoid storing unnecessary PHI.
- Encrypt sensitive provider tokens.
- Add retention/deletion strategy before production launch.
