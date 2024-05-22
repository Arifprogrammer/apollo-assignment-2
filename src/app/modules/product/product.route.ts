import express from 'express'
import {
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  insertProduct,
  updateProduct,
} from './product.controller'

const router = express.Router()

router.post('/products', insertProduct)
router.get('/products', getAllProducts)
router.get('/products/:productId', getSingleProduct)
router.put('/products/:productId', updateProduct)
router.delete('/products/:productId', deleteProduct)

export const productRouter = router
