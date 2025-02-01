import {
  authTempMiddleware,
  isBoardOwner,
  protectedAuthMiddleware,
} from '../middlewares/authMiddleware'
import {
  addAllowedUser,
  createBoard,
  getAllBoards,
  getOneBoard,
  removeAllowedUser,
} from '../controllers/boardController'

import express from 'express'

const router = express.Router()

router.post('/', authTempMiddleware, createBoard)
router.get('/:id', authTempMiddleware, getOneBoard)
router.get('/', getAllBoards)

router.post(
  '/:boardId/allowed-users/:userId',
  protectedAuthMiddleware,
  isBoardOwner,
  addAllowedUser
)
router.delete(
  '/:boardId/allowed-users/:userId',
  protectedAuthMiddleware,
  isBoardOwner,
  removeAllowedUser
)

export default router
