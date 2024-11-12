import express from 'express'
import cors from 'cors'

import userRoutes from './routes/userRoutes'
import boardRoutes from './routes/boardRoutes'
import listRoutes from './routes/listRoutes'
import cardRoutes from './routes/cardRoutes'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/users', userRoutes)
app.use('/boards', boardRoutes)
app.use('/lists', listRoutes)
app.use('/cards', cardRoutes)

export default app
