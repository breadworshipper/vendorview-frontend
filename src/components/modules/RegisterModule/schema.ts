import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email().min(1, {
    message: `Required`,
  }),
  name: z.string().min(1, {
    message: `Required`,
  }),
  password: z.string().min(1, {
    message: `Required`,
  }),
});
