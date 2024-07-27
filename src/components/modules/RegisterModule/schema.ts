import { z } from "zod";

export const registerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: `Required`,
  }),
  password: z.string().min(1, {
    message: `Required`,
  }),
  confirmPassword: z.string().min(1, {
    message: `Required`,
  }),
});
