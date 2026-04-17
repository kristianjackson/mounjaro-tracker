# Mounjaro Tracker

Chat-first health tracking app for users taking GLP-1 medications, with a WhatsApp interface, Cloudflare hosting, and Hono-based API services.

## Monorepo Layout

- `apps/api`: Hono API on Cloudflare Workers (webhooks + analytics orchestration)
- `packages/core`: Shared domain types and helpers
- `docs`: Product, architecture, and setup plans

## API Internal Modules

- `src/routes`: HTTP route handlers by concern (`health`, `whatsapp`, `analytics`)
- `src/domain`: parsing + normalization logic
- `src/storage`: D1 repository helpers
- `migrations`: D1 SQL migrations

## Quickstart

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Start local API dev server:
   ```bash
   pnpm dev
   ```
3. Run checks:
   ```bash
   pnpm check
   pnpm check:merge
   ```

## Post-merge sanity checks

When merging branches, run the following before pushing:

```bash
pnpm check:merge
pnpm typecheck
```

This catches unresolved conflict markers and basic TypeScript breakage early.

## Key Docs

- Product vision: `docs/PRD.md`
- Technical architecture: `docs/ARCHITECTURE.md`
- Cloudflare free-build plan: `docs/CLOUDFLARE_FREE_BUILD.md`
- WhatsApp command grammar: `docs/WHATSAPP_COMMAND_GRAMMAR.md`
- Parser test matrix: `docs/PARSER_TEST_MATRIX.md`
- Webhook signature verification guide (step 3): `docs/WEBHOOK_SIGNATURE_VERIFICATION.md`
- Implementation plan: `docs/ROADMAP.md`
- VS Code + MCP setup: `docs/MCP_SETUP_VSCODE.md`
