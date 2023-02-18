import { z } from 'zod';

export const createUserDTO = z
  .object({
    name: z
      .string({ required_error: 'you should provide a name' })
      .min(1, 'you should provide a name')
      .max(50, 'your name should be less than 50 characters long'),
    phoneNumber: z
      .string({ required_error: 'you should provide a phone number' })
      .min(10, 'Your phone number should be at least 10 characters long')
      .max(50, 'your phone number should be less than 50 characters long')
      .optional(),
    email: z
      .string({ required_error: 'you should provide an e-mail address' })
      .email()
      .optional(),
    password: z
      .string({ required_error: 'you should provide a password' })
      .min(1, 'you should provide a password')
      .max(80, 'Your password should be less than 80 characters long'),
  })
  .refine(input => {
    if (!input.phoneNumber && !input.email) {
      return false;
    }
    return true;
  });
export type CreateUserDTO = z.infer<typeof createUserDTO>;
