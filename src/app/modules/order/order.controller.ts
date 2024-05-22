import { Request, Response } from 'express'
import { TOrder } from './order.interface'
import { orderService } from './order.service'
import { OrderValidationSchema } from './order.validation'
import { productService } from '../product/product.service'
import { TInventory, TProduct } from '../product/product.interface'

function getProductInventoryData(inventory: TInventory, quantity: number) {
  return {
    inventory: {
      quantity: inventory.quantity - quantity,
      inStock: inventory.inStock,
    },
  }
}

function getProductStockData(inventory: TInventory) {
  return {
    inventory: {
      quantity: inventory.quantity,
      inStock: false,
    },
  }
}

export async function insertOrder(req: Request, res: Response) {
  try {
    const order: TOrder = req.body
    const validateOrder = OrderValidationSchema.parse(order) //* validating by using zod
    const { productId } = order
    const product: TProduct =
      await productService.getSingleProductFromDB(productId)

    if (product.inventory.quantity < order.quantity) {
      return res.json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      })
    }

    const result = await orderService.insertOrderInToDB(validateOrder)
    const { inventory: updatedInventory } =
      await productService.updateProductInDB(
        productId,
        getProductInventoryData(product.inventory, order.quantity),
      )

    if (updatedInventory.quantity === 0) {
      await productService.updateProductInDB(
        productId,
        getProductStockData(updatedInventory),
      )
    }

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
