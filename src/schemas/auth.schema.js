import { z } from 'zod'

export const registerSchema = z.object({
  username: z.string({
    required_error: 'Username is required'
  }),

  email: z.string({
    required_error: 'Email is required'
  }).email({
    message: 'Invalid Email'
  }),

  password: z.string({
    required_error: 'Password is required'
  }).min(6, {
    message: 'Password must be at least 6 characters'
  }).regex(/.*[A-Z].*/, { message: 'Password must contain at least one UpperCase Character' })
})

export const loginSchema = z.object({
  username: z.string({
    required_error: 'Username is required'
  }).min(3, { message: 'Username must contain at least 3 characters' }),

  password: z.string({
    required_error: 'Password is required'
  }).min(6, {
    message: 'Password must be at least 6 characters'
  }).regex(/.*[A-Z].*/, { message: 'Password must contain at least one UpperCase Character' })

})
