import { io } from '../index'
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

export const reorderCard = async (req: Request, res: Response) => {
  const { cardId, position, listId, boardId } = req.body
  try {
    const card = await Card.findById(cardId)
    if (card) {
      card.position = position
      card.list = listId
      await card.save()

      res.json(card)

      const roomInfo = io.sockets.adapter.rooms.get(boardId)
      if (roomInfo) {
        const userIds = Array.from(roomInfo)
        if (userIds.length) sendBoardUpdate('reorder-card', boardId, '', card)
      }
    } else res.status(404).json({ message: 'Card is not found' })
  } catch (error) {
    res.status(500).json({ message: "Error updating card's position", error })
  }
}

export const renameCard = async (req: Request, res: Response) => {
  const { cardId, boardId, name } = req.body
  try {
    const card = await Card.findById(cardId)
    if (card) {
      card.name = name
      await card.save()

      res.json(card)

      const roomInfo = io.sockets.adapter.rooms.get(boardId)
      if (roomInfo) {
        const userIds = Array.from(roomInfo)
        if (userIds.length) sendBoardUpdate('rename-card', boardId, '', card)
      }
    } else res.status(404).json({ message: 'Card is not found' })
  } catch (error) {
    res.status(500).json({ message: "Error updating card's position", error })
  }
}
