// lib/schemas/templates/template.schema.ts
/**
 * @file template.schema.ts
 * @description SSoT para el contrato de datos de las plantillas de campaña.
 * @version 2.0.0 (Architectural Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
// --- [INICIO DE CORRECCIÓN DE RUTA Y ARQUITECTURA] ---
// Se importa desde la SSoT de schemas canónicos en `lib/`, no desde `app/`.
import {
  HeaderConfigSchema,
  FooterConfigSchema,
  LayoutConfigSchema,
  ThemeConfigSchema,
  ContentDataSchema,
} from "@/lib/schemas/campaigns/draft.schema";
// --- [FIN DE CORRECCIÓN DE RUTA Y ARQUITECTURA] ---

// Metadatos de una plantilla en el manifiesto
export const TemplateMetadataSchema = z.object({
  templateId: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string().datetime(),
  previewImage: z.string().optional(),
});

// Estructura completa del archivo de manifiesto
export const TemplatesManifestSchema = z.array(TemplateMetadataSchema);

// Estructura de un archivo de plantilla individual
export const CampaignTemplateSchema = z.object({
  templateId: z.string(),
  name: z.string(),
  description: z.string(),
  sourceCampaignId: z.string(),
  headerConfig: HeaderConfigSchema,
  footerConfig: FooterConfigSchema,
  layoutConfig: LayoutConfigSchema,
  themeConfig: ThemeConfigSchema,
  contentData: ContentDataSchema,
});

export type CampaignTemplate = z.infer<typeof CampaignTemplateSchema>;
export type TemplateMetadata = z.infer<typeof TemplateMetadataSchema>;
// lib/schemas/templates/template.schema.ts
