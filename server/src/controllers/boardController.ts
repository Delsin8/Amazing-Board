import Board, { IBoard } from '../models/Board'
import { Request, Response } from 'express'
import { sendBoardUpdate } from '../kafka/producers/boardProducer'

export const createBoard = async (req: Request, res: Response) => {
  const { name, owner } = req.body
  try {
    const board: IBoard = new Board({ name, owner })
    await board.save()
    res.status(201).json(board)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const getAllBoards = async (req: Request, res: Response) => {
  try {
    const boards = await Board.find()
    res.json(boards)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching boards', error })
  }
}

export const getOneBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const board = await Board.findById(id)
      .populate({
        path: 'lists',
        populate: { path: 'cards' },
      })
      .exec()

    if (!board) {
      res.status(404).json({ message: 'Board not found' })
      return
    }

    res.json(board)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching board data', error })
  }
}
