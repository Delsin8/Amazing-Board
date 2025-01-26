import { sendBoardUpdate } from '../kafka/producers/boardProducer'
import { io, userSocketMap } from '../index'
import List, { IList } from '../models/List'
import { Request, Response } from 'express'

export const createList = async (req: Request, res: Response) => {
  const { name, boardId, color } = req.body
  try {
    const list: IList = new List({ name, board: boardId, color })
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

export const reorderList = async (req: Request, res: Response) => {
  const { listId, position, boardId } = req.body
  try {
    const list = await List.findById(listId)
    if (list) {
      list.position = position
      await list.save()
      res.json(list)

      const roomInfo = io.sockets.adapter.rooms.get(boardId)
      if (roomInfo) {
        const senderSocketId = userSocketMap.get(req.user?.id || '')
        const userIds = Array.from(roomInfo)
        if (userIds.length)
          sendBoardUpdate('reorder-list', boardId, senderSocketId, list)
      }
    } else res.status(404).json({ message: 'List is not found' })
  } catch (error) {
    res.status(500).json({ message: "Error updating list's position", error })
  }
}

export const changeListColor = async (req: Request, res: Response) => {
  const { listId, color, boardId } = req.body
  try {
    const list = await List.findById(listId)
    if (list) {
      list.color = color
      await list.save()
      res.json(list)

      const roomInfo = io.sockets.adapter.rooms.get(boardId)
      if (roomInfo) {
        const senderSocketId = userSocketMap.get(req.user?.id || '')
        const userIds = Array.from(roomInfo)
        if (userIds.length)
          sendBoardUpdate('list-color-update', boardId, senderSocketId, list)
      }
    } else res.status(404).json({ message: 'List is not found' })
  } catch (error) {
    res.status(500).json({ message: "Error updating list's position", error })
  }
}
