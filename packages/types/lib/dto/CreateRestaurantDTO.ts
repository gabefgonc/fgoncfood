import { z } from 'zod';

export const createRestaurantDTO = z.object({
  name: z
    .string()
    .min(1, 'You should provide a name')
    .max(60, "Your restaurant's name should be less than 60 characters long"),
  phoneNumber: z
    .string()
    .regex(
      /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
      'You should provide a valid phone number'
    )
    .trim(),
  email: z.string().email(),
  location_lat: z.number(),
  location_lng: z.number(),
  ownerId: z.string().uuid(),
});

export type CreateRestaurantDTO = z.infer<typeof createRestaurantDTO>;
