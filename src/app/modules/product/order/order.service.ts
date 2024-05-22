import { TOrder } from './order.interface'
import { Order } from './order.model'

async function insertOrderInToDB(order: TOrder) {
  return await Order.create(order)
}
async function getAllOrdersFromDB(email: string) {
  if (!email) return await Order.find()

  const result = await Order.find({
    email: { $regex: email, $options: 'i' },
  })

  if (result.length) {
    return result
  }

  throw new Error(`Orders not found with this email - '${email}'`)
}

export const orderService = {
  insertOrderInToDB,
  getAllOrdersFromDB,
}
