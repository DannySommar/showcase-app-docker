import express from 'express'
import cors from 'cors'
import { postsRouter } from './routes/posts.js'
import { authRouter } from './routes/auth.js'
import { createTables } from './database/createTables.js'
import { seedTables } from './database/seedTables.js'
import session from 'express-session'

const PORT = 8000
const app = express()
const secret = process.env.SESSION_SECRET || 'skibidi-toilet'

app.use(cors())
app.use(express.json())

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}))

async function initializeDatabase() {
  try {
    await createTables()
    await seedTables()
    console.log('db created and initializes')
  } catch(err) {
    console.error('db init failed', err)
    process.exit(1)
  }
}

// Test if frontend connected to backend
app.get('/api/hello', (req, res) => {
    res.json({message: 'Hello from the backend'})
})

// My friend had it so it's probably professional
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

app.use('/api/posts', postsRouter)
app.use('/api/auth', authRouter)

initializeDatabase().then(() => {

  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
  }).on('error', (err) => {
    console.error('Failed to start server:', err)
  })

})