import express from 'express'
import { getAllUsers, registerUser, login } from '../controllers/userController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

router.get('/', getAllUsers)
router.post('/signup', registerUser)
router.post('/signin', login)
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello, ${req.user}` })
})

export default router
