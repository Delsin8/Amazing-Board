import { io } from '../../index'
import { createConsumer } from '../kafkaClient'
import KAFKA_TOPICS from '../topics'

let consumer: any

export const initializeBoardConsumer = async (
  onMessage: (data: any) => void
) => {
  consumer = await createConsumer('board-consumers')

  await consumer.subscribe({
    topic: KAFKA_TOPICS.BOARD_UPDATES,
    fromBeginning: false,
  })

  await consumer.run({
    eachMessage: async ({ message }: { message: any }) => {
      const value = message.value?.toString()

      if (value) {
        const data = JSON.parse(value)
        const senderSocket = io.sockets.sockets.get(data.senderId)
        console.log(data)

        switch (data.actionType) {
          case 'reorder-card':
            console.log('reorder-card')
            senderSocket?.to(data.boardId).emit('updatedCardPosition', {
              cardId: data.payload.id,
              listId: data.payload.list,
              position: data.payload.position,
              infoMessage: `Card ${data.payload.name} has been moved by ""`,
            })
            break
          case 'reorder-list':
            console.log('reorder-list')
            senderSocket?.to(data.boardId).emit('updatedListPosition', {
              listId: data.payload.id,
              position: data.payload.position,
              infoMessage: `List ${data.payload.name} has been moved by ""`,
            })
            break
          case 'rename-card':
            console.log('rename-card')
            senderSocket?.to(data.boardId).emit('updatedCardName', {
              cardId: data.payload.id,
              name: data.payload.name,
              infoMessage: `Card has been renamed to "${data.payload.name}"`,
            })
            break
          case 'list-color-update':
            console.log('list-color-update')
            senderSocket?.to(data.boardId).emit('updatedListColor', {
              listId: data.payload.id,
              color: data.payload.color,
              infoMessage: `Card has been renamed to "${data.payload.name}"`,
            })
            break

          default:
            console.log('no action')
            break
        }
      }
    },
  })
}
