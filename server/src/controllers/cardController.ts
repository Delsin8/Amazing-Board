import { sendBoardUpdate } from '../kafka/producers/boardProducer'
import Card, { ICard } from '../models/Card'
import { Request, Response } from 'express'

export const createCard = async (req: Request, res: Response) => {
  const { name } = req.body
  try {
    const card: ICard = new Card({ name })
    await card.save()
    res.status(201).json(card)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find()
    res.json(cards)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards', error })
  }
}

export const getOneCard = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const card = await Card.findById(id)
    if (card) res.json(card)
    else res.status(404)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards', error })
  }
}

// Socket

export const updateCardName = async ({
  id,
  name,
}: {
  id: string
  name: string
}) => {
  try {
    await Card.findByIdAndUpdate(id, { name })

    await sendBoardUpdate('board-consumers', {
      action: 'update-card-name',
      // boardId
      cardId: id,
      cardName: name,
    })
  } catch (error: any) {
    console.log(error?.message)
  }
}
