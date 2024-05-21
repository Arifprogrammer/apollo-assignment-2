import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'working',
    data: 'Great',
  })
})

export default router
