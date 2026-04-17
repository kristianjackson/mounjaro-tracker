import { Hono } from 'hono'

type Env = {
  Bindings: {
    DB: D1Database
  }
}

export const analyticsRoutes = new Hono<Env>()

analyticsRoutes.get('/analytics/weekly/:userPhone', async (c) => {
  const userPhone = c.req.param('userPhone')

  const { results } = await c.env.DB.prepare(
    `SELECT metric_date, weight_kg, fasting_glucose_mg_dl, sleep_hours, appetite_score, side_effect_score
     FROM daily_metrics
     WHERE user_phone = ?
       AND metric_date >= date('now', '-7 day')
     ORDER BY metric_date DESC`
  )
    .bind(userPhone)
    .all()

  return c.json({
    userPhone,
    window: '7d',
    rows: results
  })
})

analyticsRoutes.post('/analytics/run-daily', async (c) => {
  // Placeholder for queued LLM summary generation with Workers AI.
  return c.json({ queued: true })
})
