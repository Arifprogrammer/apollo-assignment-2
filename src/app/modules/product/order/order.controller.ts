import { Request, Response } from 'express'
import { TOrder } from './order.interface'
import { orderService } from './order.service'
import { OrderValidationSchema } from './order.validation'

export async function insertOrder(req: Request, res: Response) {
  try {
    const order: TOrder = req.body
    const validateOrder = OrderValidationSchema.parse(order) //* validating by using zod
    const result = await orderService.insertOrderInToDB(validateOrder)

    res.json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const { email } = req.query
    const result = await orderService.getAllOrdersFromDB(email as string)

    res.json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}
