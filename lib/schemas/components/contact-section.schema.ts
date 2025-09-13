// lib/schemas/components/contact-section.schema.ts
/**
 * @file contact-section.schema.ts
 * @description Esquema de Zod para el contenido i18n de la ContactSection.
 *              - v2.0.0 (Fortalecimiento de Contrato): Se exporta el tipo
 *                `ContactInfoItem` para que pueda ser consumido de forma
 *                segura por el componente, resolviendo el error TS2305 y
 *                mejorando la seguridad de tipos.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";

/**
 * @const ContactInfoItemSchema
 * @description Valida un único item de información de contacto.
 */
const ContactInfoItemSchema = z.object({
  iconName: LucideIconNameSchema,
  label: z.string(),
  value: z.string(),
});

// --- INICIO DE CORRECCIÓN: Se exporta el tipo para su consumo externo ---
/**
 * @type ContactInfoItem
 * @description Infiere y exporta el tipo TypeScript para un item de contacto.
 */
export type ContactInfoItem = z.infer<typeof ContactInfoItemSchema>;
// --- FIN DE CORRECCIÓN ---

/**
 * @const ContactSectionLocaleSchema
 * @description Valida la estructura completa del contenido de la sección para un locale.
 */
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
