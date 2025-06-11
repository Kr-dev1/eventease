import { z } from "zod";

export const signUpSchema = z.object({
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
  name: z
    .string()
    .trim()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(25, "Username can be at most 25 characters long")
    .refine((val) => val.trim().length > 0, {
      message: "Username cannot be only whitespace",
    })
    .refine((val) => /^[a-zA-Z\s'-]+$/.test(val), {
      message:
        "Username can only contain letters, spaces, hyphens, and apostrophes",
    }),
});
