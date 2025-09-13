// lib/schemas/components/services-section.schema.ts
/**
 * @file services-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente ServicesSection.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

const ServiceItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  isPro: z.boolean(),
});

export type ServiceItem = z.infer<typeof ServiceItemSchema>;

export const ServicesSectionLocaleSchema = z.object({
  servicesSection: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      proLabel: z.string(),
      services: z.array(ServiceItemSchema),
    })
    .optional(),
});
// lib/schemas/components/services-section.schema.ts
