import { z } from "zod";

export const createEntrySchema = z.object({
  date: z.string().min(1),
  title: z.string().min(1),
  explanation: z.string(),
  url: z.string().url(),
  hdurl: z.string().url().optional(),
  media_type: z.enum(["image", "video"]),
  comment: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateEntrySchema = createEntrySchema
  .pick({
    comment: true,
    tags: true,
  })
  .extend({
    id: z.string().uuid(),
  });

export const GetByIdOrDeleteEntrySchema = z.object({
  id: z.string().uuid(),
});

export type CreateEntry = z.infer<typeof createEntrySchema>;
export type UpdateEntry = z.infer<typeof updateEntrySchema>;
export type GetOrDeleteEntry = z.infer<typeof GetByIdOrDeleteEntrySchema>;
