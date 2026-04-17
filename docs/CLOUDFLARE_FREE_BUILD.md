# Cloudflare-first Free Build Plan

This project is now optimized for a Cloudflare-native serverless MVP with the Meta WhatsApp Business Cloud API.

## Core Free-Friendly Stack
- **Hono on Cloudflare Workers**: receives webhooks and exposes API endpoints.
- **Cloudflare D1**: persists users, raw events, and daily metric snapshots.
- **Cloudflare Cron Triggers**: runs daily/weekly summary jobs without extra infra.
- **Cloudflare Email Routing/Workers** (optional): sends digest-style reports by email.
- **Workers AI** (optional): generates natural-language summaries when needed.

## MVP Routes
- `GET /health`: service heartbeat.
- `GET /webhooks/whatsapp`: Meta webhook verification handshake.
- `POST /webhooks/whatsapp`: incoming message ingestion + quick-log parsing.
- `GET /analytics/weekly/:userPhone`: recent 7-day metrics for a user.
- `POST /analytics/run-daily`: placeholder endpoint for queued AI summaries.

## Data Model (D1)
- `users`: one row per WhatsApp user/phone.
- `events`: append-only event log for idempotent webhook processing.
- `daily_metrics`: denormalized per-day metric table for analytics speed.
- `insights`: generated report text and confidence metadata.

## WhatsApp Command Examples
- `weight 209.4`
- `glucose 96`
- `sleep 7.5`
- `appetite 4`
- `sidefx 3`
- Any other text is stored as `notes`.


Use `docs/WHATSAPP_COMMAND_GRAMMAR.md` as the canonical source of parsing behavior when updating parser code or onboarding new commands.

## Suggested Next Steps
1. Add signature verification for incoming Meta webhooks.
2. Add outbound WhatsApp reply adapter for confirmations.
3. Add cron-triggered weekly summaries and optional email digest.
4. Add per-user timezone handling for accurate day bucketing.

## Implementation Artifacts
- Command grammar: `docs/WHATSAPP_COMMAND_GRAMMAR.md`
- Parser test matrix: `docs/PARSER_TEST_MATRIX.md`
- Step 3 signature verification instructions: `docs/WEBHOOK_SIGNATURE_VERIFICATION.md`
