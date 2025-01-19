import User from '../models/User'
import Board from '../models/Board'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import crypto from 'crypto'

interface TokenPayload {
  id: string
  username: string
  iat: number
  exp: number
}

// this version of auth middleware doesn't require user to be authenticated
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    next()
    return
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload
    req.user = { id: decoded.id, username: decoded.username }
    next()
  } catch (error) {
    next()
  }
}

// this version of auth middleware doesn't require user to be authenticated and creates temp user if not authenticated
export const authTempMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    const tempUser = new User({
      username: `temp_${crypto.randomBytes(8).toString('hex')}`,
      isTempUser: true,
      password: crypto.randomBytes(8).toString('hex'),
    })
    await tempUser.save()

    const tempToken = jwt.sign(
      { id: tempUser._id, username: tempUser.username },
      process.env.JWT_SECRET as string,
      { expiresIn: '3d' }
    )

    res.setHeader('Authorization', `Bearer ${tempToken}`)
    req.user = tempUser

    next()
    return
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload
    req.user = { id: decoded.id, username: decoded.username }
    next()
  } catch (error) {
    next()
  }
}

// this version of auth middleware requires user to be authenticated
export const protectedAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization header is required' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload
    req.user = { id: decoded.id, username: decoded.username }
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' })
    return
  }
}

export const isBoardOwner = async (req: any, res: any, next: any) => {
  const board = await Board.findById(req.params.boardId)
  if (!board) return res.status(404).json({ message: 'Board not found' })

  const user = new mongoose.Types.ObjectId(req.user.id as string)
  if (!board.owner?.equals(user)) {
    return res
      .status(403)
      .json({ message: 'Only the board leader can perform this action' })
  }
  next()
}
