# Mounjaro Tracker

Chat-first health tracking app for users taking GLP-1 medications, with a WhatsApp interface, Cloudflare hosting, and Hono-based API services.

## Monorepo Layout

- `apps/api`: Hono API on Cloudflare Workers (webhooks + analytics orchestration)
- `packages/core`: Shared domain types and helpers
- `docs`: Product, architecture, and setup plans

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
   ```

## Key Docs

- Product vision: `docs/PRD.md`
- Technical architecture: `docs/ARCHITECTURE.md`
- Implementation plan: `docs/ROADMAP.md`
- VS Code + MCP setup: `docs/MCP_SETUP_VSCODE.md`
