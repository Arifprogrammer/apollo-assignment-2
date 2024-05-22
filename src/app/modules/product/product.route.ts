import express from 'express'
import {
  getAllProducts,
  getSingleProduct,
  insertProduct,
} from './product.controller'

const router = express.Router()

router.post('/products', insertProduct)
router.get('/products', getAllProducts)
router.get('/products/:productId', getSingleProduct)

export const productRouter = router
