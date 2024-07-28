import { z } from "zod";

export const vendorSchema = z.object({
  name: z.string().min(1, {
    message: `Required`,
  }),
  description: z.string().min(1, {
    message: `Required`,
  }),
  price: z.union([
    z
      .string()
      .transform((num) => {
        const parsed = Number(num);
        if (isNaN(parsed)) {
          throw new Error("Invalid number");
        }
        return parsed;
      })
      .refine((num) => num >= 0, {
        message: "Price  must be at least 0",
      }),
    z.number().min(0, {
      message: "Price must be at least 0",
    }),
  ]),
  illustration: z.instanceof(File, {
    message: "Illustration must be a file",
  }),
});

export const vendorSchemaArray = z.object({
  vendorArray: z.array(vendorSchema).min(1, {
    message: `You need to add at least 1 item`,
  }),
});
