import express from 'express'
import cors from 'cors'

const PORT = 8000

const app = express()

app.use(cors())

app.get('/api/hello', (req, res) => {
    res.json({message: 'Hello from the backend'})
})

app.listen(PORT, () => console.log(`server connected on http://localhost:${PORT}`))