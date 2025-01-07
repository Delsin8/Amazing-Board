import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { BoardAccessibility } from '../types/common'
import Board, { IBoard } from '../models/Board'

export const createBoard = async (req: Request, res: Response) => {
  const { body, user } = req
  const hasUser = Boolean(user?.id)

  console.log(user)

  try {
    const accessibility =
      !hasUser || body.accessibility === BoardAccessibility.Public
        ? BoardAccessibility.Public
        : BoardAccessibility.Private

    const allowedUsers = []
    if (accessibility === BoardAccessibility.Private && hasUser)
      allowedUsers.push(user!.id)

    console.log(user?.id, body.title, accessibility, allowedUsers)

    const board: IBoard = new Board({
      owner: user?.id,
      title: body.title,
      description: body.description,
      accessibility,
      allowedUsers,
    })

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
    let user = null
    if (req.user?.id) user = new mongoose.Types.ObjectId(req.user.id)

    const board = await Board.findById(req.params.id)
      .select('accessibility allowedUsers')
      .lean()

    if (!board) {
      res.status(404).json({ message: 'Board not found' })
      return
    }

    if (
      board.accessibility === BoardAccessibility.Public ||
      (user && board.allowedUsers.some(allowedUser => allowedUser.equals(user)))
    ) {
      const boardData = await Board.findById(id)
        .populate({
          path: 'lists',
          populate: { path: 'cards' },
        })
        .exec()

      res.status(200).json(boardData)
      return
    } else {
      res.status(403).json({ message: 'Access denied' })
      return
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching board data', error })
  }
}
