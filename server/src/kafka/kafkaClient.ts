import { Consumer, Kafka, Producer } from 'kafkajs'

let producer: Producer
let consumers: Map<string, Consumer> = new Map()

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})

export const initializeKafka = async () => {
  producer = kafka.producer()
  await producer.connect()
  console.log('Kafka producer connected.')
}

export const getProducer = (): Producer => {
  if (!producer) {
    throw new Error('Producer not initialized. Call initializeKafka first.')
  }
  return producer
}

export const createConsumer = async (groupId: string): Promise<Consumer> => {
  if (consumers.has(groupId)) {
    throw new Error(`Consumer with groupId ${groupId} already exists.`)
  }
  const consumer = kafka.consumer({ groupId })

  await consumer.connect()
  consumers.set(groupId, consumer)
  console.log(`Kafka consumer for groupId "${groupId}" connected.`)
  return consumer
}

export const getConsumer = (groupId: string): Consumer => {
  const consumer = consumers.get(groupId)
  if (!consumer) {
    throw new Error(`Consumer with groupId ${groupId} not initialized.`)
  }
  return consumer
}
