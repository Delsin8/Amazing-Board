import {
  createBoard,
  getAllBoards,
  getOneBoard,
} from '../controllers/boardController'
import express from 'express'

const router = express.Router()

router.post('/', createBoard)
router.get('/:id', getOneBoard)
router.get('/', getAllBoards)

export default router
