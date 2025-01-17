import {
  createCard,
  getAllCards,
  getOneCard,
} from '../controllers/cardController'
import express from 'express'

const router = express.Router()

router.post('/', createCard)
router.get('/:id', getOneCard)
router.get('/', getAllCards)

router.patch('/reorder', getAllCards)

export default router
