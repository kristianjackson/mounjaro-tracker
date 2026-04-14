-- users for chat-based identity
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL UNIQUE,
  display_name TEXT,
  timezone TEXT DEFAULT 'UTC',
  start_date TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- normalized daily metrics for fast trend queries
CREATE TABLE IF NOT EXISTS daily_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_phone TEXT NOT NULL,
  metric_date TEXT NOT NULL,
  weight_kg REAL,
  fasting_glucose_mg_dl REAL,
  sleep_hours REAL,
  appetite_score INTEGER,
  side_effect_score INTEGER,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_phone, metric_date),
  FOREIGN KEY(user_phone) REFERENCES users(phone)
);

-- append-only event log (raw channel events + structured actions)
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  external_id TEXT UNIQUE,
  user_phone TEXT NOT NULL,
  event_type TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_phone) REFERENCES users(phone)
);

-- LLM-generated summaries and recommendations
CREATE TABLE IF NOT EXISTS insights (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_phone TEXT NOT NULL,
  period_start TEXT NOT NULL,
  period_end TEXT NOT NULL,
  insight_text TEXT NOT NULL,
  confidence REAL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_phone) REFERENCES users(phone)
);

CREATE INDEX IF NOT EXISTS idx_events_user_occurred
  ON events(user_phone, occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_metrics_user_date
  ON daily_metrics(user_phone, metric_date DESC);

CREATE INDEX IF NOT EXISTS idx_insights_user_created
  ON insights(user_phone, created_at DESC);
