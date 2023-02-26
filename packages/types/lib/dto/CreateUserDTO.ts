import { z } from 'zod';

export const createUserDTO = z
  .object({
    name: z
      .string({ required_error: 'you should provide a name' })
      .min(1, 'you should provide a name')
      .max(50, 'your name should be less than 50 characters long'),
    phoneNumber: z
      .string()
      .regex(
        /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
        'You should provide a valid phone number'
      )
      .trim()
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
