import {
  createList,
  getAllLists,
  getOneList,
} from '../controllers/listController'
import express from 'express'

const router = express.Router()

router.post('/', createList)
router.get('/:id', getOneList)
router.get('/', getAllLists)

export default router
