# Product Requirements Document (MVP)

## Vision
Build a chat-first tracking assistant for people using GLP-1 medication (starting with Mounjaro) so they can log and review health changes directly in WhatsApp.

## User Problem
Users want to quickly track changing metrics without opening a full app or dashboard. They need reminders, trend summaries, and clear weekly insights.

## MVP Goals
1. Log key health metrics via WhatsApp messages.
2. Store all entries in a simple, queryable schema.
3. Generate daily/weekly LLM summaries and highlight notable trends.
4. Keep architecture modular so channels (SMS, Telegram, web) can be added later.

## Core Metrics
- Weight
- Fasting glucose
- Sleep hours
- Appetite score (1-10)
- Side effect score (1-10)
- Freeform notes

## Out of Scope (MVP)
- Clinical diagnosis
- Insurance/billing workflows
- Rich frontend dashboard

## Success Criteria
- A user can submit logs in <10 seconds through WhatsApp.
- Daily summary can be generated without manual intervention.
- Data model supports adding a new metric without migration-heavy rewrites.
