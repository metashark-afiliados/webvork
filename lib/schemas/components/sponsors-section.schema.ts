// lib/schemas/components/sponsors-section.schema.ts
/**
 * @file sponsors-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente SponsorsSection.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";

const SponsorItemSchema = z.object({
  icon: LucideIconNameSchema,
  name: z.string().min(1),
});

export type SponsorItem = z.infer<typeof SponsorItemSchema>;

export const SponsorsSectionLocaleSchema = z.object({
  sponsorsSection: z
    .object({
      title: z.string(),
      sponsors: z.array(SponsorItemSchema),
    })
    .optional(),
});
// lib/schemas/components/sponsors-section.schema.ts
