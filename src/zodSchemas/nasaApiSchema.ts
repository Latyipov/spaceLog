import { z } from "zod";

export const apodSchema = z.object({
  date: z.string(),
  title: z.string(),
  explanation: z.string(),
  url: z.string().url(),
  hdurl: z.string().url().optional(),
  media_type: z.enum(["image", "video"]),
});

export const apodArraySchema = z.array(apodSchema);

export type ApodData = z.infer<typeof apodSchema>;
