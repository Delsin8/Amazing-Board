import List, { IList } from '../models/List'
import { Request, Response } from 'express'

export const createList = async (req: Request, res: Response) => {
  const { name } = req.body
  try {
    const list: IList = new List({ name })
    await list.save()
    res.status(201).json(list)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const getAllLists = async (req: Request, res: Response) => {
  try {
    const boards = await List.find()
    res.json(boards)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching boards', error })
  }
}

export const getOneList = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const board = await List.findById(id)
    if (board) res.json(board)
    else res.status(404)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching boards', error })
  }
}
