import { authTempMiddleware } from '../middlewares/authMiddleware'
import {
  changeListColor,
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

router.patch('/reorder', authTempMiddleware, reorderList)
router.patch('/change-color', authTempMiddleware, changeListColor)

export default router
