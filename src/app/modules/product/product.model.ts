import { Schema, model } from 'mongoose'
import { TInventory, TProduct, TVariants } from './product.interface'

const VariantSchema = new Schema<TVariants>(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
)

const InventorySchema = new Schema<TInventory>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
)

const ProductSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
    validate: {
      validator: (value: string) => {
        return value.length > 0
      },
      message: 'Product name cannot be empty.',
    },
  },
  description: {
    type: String,
    required: [true, 'Product description is required.'],
  },
  price: {
    type: Number,
    min: 0,
    required: [true, 'Product price is required.'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required.'],
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required.'],
  },
  variants: {
    type: [VariantSchema],
    required: [true, 'Product variants are required.'],
  },
  inventory: {
    type: InventorySchema,
    required: [true, 'Product inventory details are required.'],
  },
})

export const Product = model<TProduct>('Product', ProductSchema)
