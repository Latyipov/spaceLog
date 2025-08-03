import { z } from "zod";

export const EntrySchema = z.object({
  id: z.string().uuid(),
  date: z.string().nonempty(),
  title: z.string().nonempty(),
  explanation: z.string(),
  url: z.string().url().nullable(),
  hdurl: z.string().url().nullable().optional(),
  media_type: z.enum(["image", "video", "other"]).nullable(),
  comment: z.string().optional().nullable(),
  tags: z.array(z.string()).nullable(),
  type: z.string().min(4),
});

export const createEntrySchema = EntrySchema.omit({ id: true });

export const updateEntrySchema = EntrySchema.pick({
  id: true,
  comment: true,
  tags: true,
  type: true,
});

export const GetByIdOrDeleteEntrySchema = EntrySchema.pick({ id: true });

export type Entry = z.infer<typeof EntrySchema>;
export type CreateEntry = z.infer<typeof createEntrySchema>;
export type UpdateEntry = z.infer<typeof updateEntrySchema>;
export type GetOrDeleteEntry = z.infer<typeof GetByIdOrDeleteEntrySchema>;
