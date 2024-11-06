import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import boardRoutes from './routes/boardRoutes'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/users', userRoutes)
app.use('/boards', boardRoutes)

export default app
