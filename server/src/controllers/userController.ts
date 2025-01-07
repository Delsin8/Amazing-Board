import { Request, Response } from 'express'
import User, { IUser } from '../models/User'
import jwt from 'jsonwebtoken'

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  try {
    const user: IUser = new User({ username, email, password })
    await user.save()
    res.status(201).json(user)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const user: IUser | null = await User.findOne({ username })
    if (!user) {
      res.status(401).json({ message: 'Invalid username or password' })
      return
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      res.status(401).json({ message: 'Invalid username or password' })
      return
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: '3d' }
    )
    res.json({ token })
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error })
  }
}
