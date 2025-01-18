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
        console.log(data)
        switch (data.actionType) {
          case 'reorder-card':
            console.log('reorder-card')
            io.emit('updatedCardPosition', {
              cardId: data.payload.id,
              listId: data.payload.list,
              position: data.payload.position,
              infoMessage: `Card ${data.payload.name} has been moved by ""`,
            })
            break
          case 'reorder-list':
            console.log('reorder-list')
            io.emit('updatedListPosition', {
              listId: data.payload.id,
              position: data.payload.position,
              infoMessage: `List ${data.payload.name} has been moved by ""`,
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
