import { Request, Response } from 'express'
import User, { IUser } from '../models/User'

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

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error })
  }
}
