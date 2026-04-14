import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { analyticsRoutes } from './routes/analytics'
import { healthRoutes } from './routes/health'
import { whatsappRoutes } from './routes/whatsapp'

type Env = {
  Bindings: {
    DB: D1Database
    WHATSAPP_VERIFY_TOKEN?: string
  }
}

const app = new Hono<Env>()

app.use('*', logger())
app.route('/', healthRoutes)
app.route('/', whatsappRoutes)
app.route('/', analyticsRoutes)

export default app
