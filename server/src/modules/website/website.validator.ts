import { z } from "zod";

export const websiteSchema = z.object({
  title: z.string().min(1),
  blocks: z.array(z.any()),
  theme: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    fontFamily: z.string(),
    backgroundColor: z.string(),
  }),
});

export type CreateWebsiteInput = z.infer<typeof websiteSchema>;
