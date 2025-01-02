import { getProducer } from '../kafkaClient'
import KAFKA_TOPICS from '../topics'

export const sendBoardUpdate = async (boardId: string, data: any) => {
  const producer = getProducer()

  if (!producer) {
    throw new Error('Producer not initialized. Call initializeProducer first.')
  }

  await producer.send({
    topic: KAFKA_TOPICS.BOARD_UPDATES,
    messages: [
      {
        key: boardId,
        value: JSON.stringify(data),
      },
    ],
  })
}
