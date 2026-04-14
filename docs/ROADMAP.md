# Roadmap

## Phase 0: Project bootstrap (this commit)
- Monorepo scaffolding
- Worker + Hono skeleton
- Foundational docs

## Phase 1: Data + webhook ingestion
- Define D1 schema and migrations
- Verify WhatsApp webhook handshake
- Parse incoming messages into normalized event rows

## Phase 2: Logging UX and reliability
- Add message parsing for common patterns ("weight 210.2")
- Implement structured confirmation responses
- Add basic error handling + idempotency for webhook retries

## Phase 3: Analytics
- Create nightly summary worker flow
- LLM-generated weekly report and change detection
- Add configurable alert thresholds

## Phase 4: Expansion
- Add second channel adapter (e.g., SMS)
- Build lightweight web dashboard for historical trends
- Add clinician export format
