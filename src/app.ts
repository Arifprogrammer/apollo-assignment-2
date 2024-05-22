import express, { Application } from 'express'
import cors from 'cors'
import { productRouter } from './app/modules/product/product.route'
import { orderRouter } from './app/modules/product/order/order.routes'

const app: Application = express()

//* middlewares
app.use(express.json())
app.use(cors())

//* routes
app.use('/api', productRouter)
app.use('/api', orderRouter)

//* root response
app.get('/', (req, res) => {
  res.send('Welcome to the EShop!')
})

//* not-found response
app.get('*', (req, res) => {
  res.json({
    success: false,
    message: 'Route not found',
  })
})

export default app
