// lib/schemas/components/team-section.schema.ts
/**
 * @file team-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente TeamSection.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";

const SocialNetworkSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  icon: LucideIconNameSchema,
});

const TeamMemberSchema = z.object({
  imageUrl: z.string().startsWith("/"),
  firstName: z.string(),
  lastName: z.string(),
  positions: z.array(z.string()),
  socialNetworks: z.array(SocialNetworkSchema),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

export const TeamSectionLocaleSchema = z.object({
  teamSection: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      members: z.array(TeamMemberSchema),
    })
    .optional(),
});
// lib/schemas/components/team-section.schema.ts
