import { z } from "zod";

export const loginSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: `Required`,
  }),
  password: z.string().min(1, {
    message: `Required`,
  }),
});
