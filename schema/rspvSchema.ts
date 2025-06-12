import { z } from "zod";

export const rsvpSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name is limited to 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name is limited to 50 characters"),
  email: z.string().email("Invalid email address"),
  attending: z.enum(["yes", "no", "maybe"], {
    required_error: "Please select if you are attending",
  }),
  message: z.string().max(200).optional(),
});
