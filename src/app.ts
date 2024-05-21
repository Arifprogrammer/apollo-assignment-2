import express, { Application } from 'express'
import cors from 'cors'
import productRouter from './app/modules/product/product.route'

const app: Application = express()

//* middlewares
app.use(express.json())
app.use(cors())

//* routes
app.use('/api/v1/product', productRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the EShop!')
})

app.get('*', (req, res) => {
  res.json({
    success: false,
    message: 'Route not found',
  })
})

export default app
