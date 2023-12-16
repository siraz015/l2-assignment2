import { z } from 'zod';

const userSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.tuple([z.string(), z.string()]),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
});

export default userSchema;
