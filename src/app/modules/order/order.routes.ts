import { Router } from 'express'
import { getAllOrders, insertOrder } from './order.controller'

const router = Router()

router.post('/orders', insertOrder)
router.get('/orders', getAllOrders)

export const orderRouter = router
