import {
  createCard,
  getAllCards,
  getOneCard,
  reorderCard,
} from '../controllers/cardController'
import express from 'express'

const router = express.Router()

router.post('/', createCard)
router.get('/:id', getOneCard)
router.get('/', getAllCards)

router.patch('/reorder', reorderCard)

export default router
