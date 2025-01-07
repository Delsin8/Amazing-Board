import { authMiddleware } from '../middlewares/authMiddleware'
import {
  createBoard,
  getAllBoards,
  getOneBoard,
} from '../controllers/boardController'
import express from 'express'

const router = express.Router()

router.post('/', authMiddleware, createBoard)
router.get('/:id', authMiddleware, getOneBoard)
router.get('/', getAllBoards)

export default router
