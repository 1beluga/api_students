import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ message: "Email is required" })
      .trim()
      .email({ message: "Invalid email format" })
      .toLowerCase(),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
