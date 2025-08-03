import { z } from "zod";

export const apodSchema = z.object({
  date: z.string().min(1),
  title: z.string().min(1),
  explanation: z.string(),
  url: z.string().url().optional(),
  hdurl: z.string().url().optional(),
  media_type: z.enum(["image", "video", "other"]),
});

export const apodArraySchema = z.array(apodSchema);

export type ApodData = z.infer<typeof apodSchema>;
