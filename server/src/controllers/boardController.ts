import Board, { IBoard } from '../models/Board'
import { Request, Response } from 'express'

export const createBoard = async (req: Request, res: Response) => {
  const { name } = req.body
  try {
    const board: IBoard = new Board({ name })
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
  const { id } = req.params
  try {
    const board = await Board.findById(id)
    if (board) res.json(board)
    else res.status(404)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching boards', error })
  }
}
