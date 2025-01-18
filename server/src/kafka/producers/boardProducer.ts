import { getProducer } from '../kafkaClient'
import KAFKA_TOPICS from '../topics'

export const sendBoardUpdate = async (
  actionType: string,
  boardId: string,
  senderId: string,
  payload: any
) => {
  const producer = getProducer()

  if (!producer) {
    throw new Error('Producer not initialized. Call initializeProducer first.')
  }

  await producer.send({
    topic: KAFKA_TOPICS.BOARD_UPDATES,
    messages: [
      {
        value: JSON.stringify({ boardId, senderId, actionType, payload }),
      },
    ],
  })
}
