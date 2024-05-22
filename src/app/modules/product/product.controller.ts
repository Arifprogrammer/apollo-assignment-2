import { Request, Response } from 'express'
import { TProduct } from './product.interface'
import { ProductValidationSchema } from './product.validation'
import { productService } from './product.service'

export async function insertProduct(req: Request, res: Response) {
  try {
    const product: TProduct = req.body
    const validateProduct = ProductValidationSchema.parse(product)
    const result = await productService.insertProductInDB(validateProduct)

    res.json({
      success: true,
      message: 'Product created successfully!',
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

export async function getAllProducts(req: Request, res: Response) {
  try {
    const { searchTerm } = req.query

    const result = await productService.getAllProductsFromDB(
      searchTerm as string,
    )

    res.json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'Products fetched successfully!',
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

export async function getSingleProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params

    const result = await productService.getSingleProductFromDB(
      productId as string,
    )

    res.json({
      success: true,
      message: 'Product fetched successfully!',
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
