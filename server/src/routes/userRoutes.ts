import express from 'express'
import { getAllUsers, registerUser } from '../controllers/userController'

const router = express.Router()

router.post('/signup', registerUser)
router.post('/', getAllUsers)

export default router
