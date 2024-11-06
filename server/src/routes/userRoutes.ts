import express from 'express'
import { getAllUsers, registerUser } from '../controllers/userController'

const router = express.Router()

router.get('/', getAllUsers)
router.post('/signup', registerUser)

export default router
