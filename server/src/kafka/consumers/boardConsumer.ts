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
        switch (data.action) {
          case 'update-card-name':
            console.log('action - update-card-name')
            io.emit(
              'updatedCardName',
              `Card ${data.cardId} has been updated with a new name "${data.cardName}"`
            )
            break

          default:
            console.log('no action')
            break
        }
      }
    },
  })
}
