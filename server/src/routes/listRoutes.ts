import {
  createList,
  getAllLists,
  getOneList,
  reorderList,
} from '../controllers/listController'
import express from 'express'

const router = express.Router()

router.post('/', createList)
router.get('/:id', getOneList)
router.get('/', getAllLists)

router.patch('/reorder', reorderList)

export default router
