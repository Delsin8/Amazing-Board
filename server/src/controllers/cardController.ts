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

export const reorderCard = async (req: Request, res: Response) => {
  const { cardId, targetPosition } = req.params
  try {
    const card = await Card.findById(cardId)
    if (card) res.json(card)
    else res.status(404)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards', error })
  }
}
