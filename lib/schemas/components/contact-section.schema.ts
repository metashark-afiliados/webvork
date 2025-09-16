// lib/schemas/components/contact-section.schema.ts
/**
 * @file contact-section.schema.ts
 * @description Esquema de Zod para el contenido i18n de la ContactSection.
 *              - v3.0.0 (Architectural Fix): Desacopla el schema de contenido del schema
 *                de locale para resolver errores de tipo en los consumidores.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo contrato para [ContactSection]");

/**
 * @const ContactInfoItemSchema
 * @description Valida un único item de información de contacto.
 */
const ContactInfoItemSchema = z.object({
  iconName: LucideIconNameSchema,
  label: z.string(),
  value: z.string(),
});

export type ContactInfoItem = z.infer<typeof ContactInfoItemSchema>;

/**
 * @const ContactSectionContentSchema
 * @description La SSoT para la ESTRUCTURA del contenido de la sección. Es un
 *              ZodObject puro y no opcional.
 */
export const ContactSectionContentSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  contactInfo: z.array(ContactInfoItemSchema),
  form: z.object({
    firstNameLabel: z.string(),
    firstNamePlaceholder: z.string(),
    lastNameLabel: z.string(),
    lastNamePlaceholder: z.string(),
    emailLabel: z.string(),
    emailPlaceholder: z.string(),
    subjectLabel: z.string(),
    subjectPlaceholder: z.string(),
    subjectOptions: z.array(z.string()),
    messageLabel: z.string(),
    messagePlaceholder: z.string(),
    submitButtonText: z.string(),
  }),
});

/**
 * @const ContactSectionLocaleSchema
 * @description Valida la clave de nivel superior para un locale específico.
 */
export const ContactSectionLocaleSchema = z.object({
  contactSection: ContactSectionContentSchema.optional(),
});
// lib/schemas/components/contact-section.schema.ts
