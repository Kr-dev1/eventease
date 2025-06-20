import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must include at least one lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must include at least one uppercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must include at least one number",
    })
    .refine((val) => /[@$!%*?&()[\]{}]/.test(val), {
      message: "Password must include at least one special character",
    }),
});
