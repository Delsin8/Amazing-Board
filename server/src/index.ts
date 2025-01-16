import dotenv from 'dotenv'

import { createServer } from 'node:http'
import { Server } from 'socket.io'

import app from './app'
import connectDB from './config/db'
import { updateCardName } from './controllers/cardController'
import { initializeKafka } from './kafka/kafkaClient'
import { initializeBoardConsumer } from './kafka/consumers/boardConsumer'

dotenv.config()

const server = createServer(app)
const io = new Server(server, {
  path: '/socket-connection',
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 5000

connectDB()

//
;(async () => {
  try {
    await initializeKafka()
    console.log('Kafka initialized.')

    await initializeBoardConsumer(message => {
      console.log(message)
    })
  } catch (error) {
    console.error('Error initializing Kafka:', error)
    process.exit(1)
  }
})()

io.on('connection', socket => {
  // console.log('a user connected - ', socket.id)

  // socket.on('disconnect', () => {
  //   console.log(`user disconnected - ${socket.id}`)
  // })

  socket.on('message', (value: string) => {
    console.log(`message: ${value}`)
  })

  socket.on('updateCardName', (value: { id: string; name: string }) => {
    console.log(`New card: ${value.name}, ${value.id}`)
    updateCardName(value)
  })

  socket.emit('message_response', 'message from server')
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export { server, io }
