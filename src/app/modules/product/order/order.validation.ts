import { z } from 'zod'

export const OrderValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' }),
  productId: z.string().trim(),
  price: z.number().nonnegative({ message: 'Price must be non-negative' }),
  quantity: z.number().positive({ message: 'Quantity must be positive' }),
})
