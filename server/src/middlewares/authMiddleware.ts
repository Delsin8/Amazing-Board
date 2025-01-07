import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

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
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next()
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
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
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
    req.user = { id: decoded.id, username: decoded.username }
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' })
    return
  }
}
