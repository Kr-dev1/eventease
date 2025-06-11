import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  dateTime: z
    .string({
      required_error: "Please select a date and time",
    })
    .min(1, "Date and time is required"),
  location: z
    .string({
      required_error: "Location is required",
    })
    .min(3, "Location must be at least 3 characters"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, "Description must be at least 10 characters"),
  customFields: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});
