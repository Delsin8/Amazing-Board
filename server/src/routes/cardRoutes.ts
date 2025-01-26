import { authTempMiddleware } from '../middlewares/authMiddleware'
import {
  createCard,
  getAllCards,
  getOneCard,
  renameCard,
  reorderCard,
} from '../controllers/cardController'
import express from 'express'

const router = express.Router()

router.post('/', createCard)
router.get('/:id', getOneCard)
router.get('/', getAllCards)

router.patch('/reorder', authTempMiddleware, reorderCard)
router.patch('/rename', authTempMiddleware, renameCard)

export default router
