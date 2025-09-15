import express from 'express'
import cors from 'cors'
import { postsRouter } from './routes/posts.js'

const PORT = 8000
const app = express()

app.use(cors())

app.use(express.static('public')) // load frontend pages from public folder

// Test if frontend connected to backend
app.get('/api/hello', (req, res) => {
    res.json({message: 'Hello from the backend'})
})

app.use('/api/posts', postsRouter)

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
}).on('error', (err) => {
  console.error('Failed to start server:', err)
})