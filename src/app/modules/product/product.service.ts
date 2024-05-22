import { TProduct } from './product.interface'
import { Product } from './product.model'

async function insertProductInDB(product: TProduct) {
  return await Product.create(product)
}

async function getAllProductsFromDB(searchTerm: string) {
  if (!searchTerm) return await Product.find()

  return await Product.find({
    $or: [
      {
        name: { $regex: searchTerm, $options: 'i' },
      },
      {
        description: { $regex: searchTerm, $options: 'i' },
      },
      {
        category: { $regex: searchTerm, $options: 'i' },
      },
    ],
  })
}

async function getSingleProductFromDB(productId: string) {
  //   if (!searchTerm) return await Product.find()

  return await Product.find()
}

export const productService = {
  insertProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
}
