import { z } from 'zod'

const VariantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
})

const InventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
})

export const ProductValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }).trim(),
  description: z.string({ required_error: 'Description is required.' }).trim(),
  price: z.number().nonnegative(),
  category: z.string({ required_error: 'Category is required.' }).trim(),
  tags: z.string().array().nonempty({
    message: "Tags can't be empty!",
  }),
  variants: z
    .lazy(() => VariantValidationSchema)
    .array()
    .nonempty({
      message: "Variants can't be empty!",
    }),
  inventory: z.lazy(() => InventoryValidationSchema),
})
