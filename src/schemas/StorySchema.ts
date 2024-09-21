import { z } from "zod";

export const storySchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file instanceof File, "File is required"),
});
