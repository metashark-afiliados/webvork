// lib/schemas/components/contact-section.schema.ts
/**
 * @file contact-section.schema.ts
 * @description Esquema de Zod para el contenido i18n de la ContactSection y
 *              su subcomponente, el ContactForm.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";

const ContactInfoItemSchema = z.object({
  iconName: LucideIconNameSchema,
  label: z.string(),
  value: z.string(),
});

export const ContactSectionLocaleSchema = z.object({
  contactSection: z
    .object({
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
    })
    .optional(),
});
// lib/schemas/components/contact-section.schema.ts
