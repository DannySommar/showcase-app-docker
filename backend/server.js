import express from 'express'
import cors from 'cors'
import { postsRouter } from './routes/posts.js'
import { createTables } from './database/createTables.js'
import { seedTables } from './database/seedTables.js'

const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json())

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

initializeDatabase().then(() => {

  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
  }).on('error', (err) => {
    console.error('Failed to start server:', err)
  })

})