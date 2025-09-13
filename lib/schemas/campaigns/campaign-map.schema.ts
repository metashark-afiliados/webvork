// lib/schemas/campaigns/campaign-map.schema.ts
/**
 * @file campaign-map.schema.ts
 * @description Aparato de Schema y SSoT para el contrato de datos del archivo `campaign.map.json`.
 *              Define la estructura que todo manifiesto de mapeo de activos debe cumplir.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

/**
 * @const CampaignVariantMapSchema
 * @description Valida el objeto para una única variante dentro del mapa.
 */
const CampaignVariantMapSchema = z.object({
  name: z.string().min(1, "El nombre de la variante es requerido."),
  description: z.string().min(1, "La descripción de la variante es requerida."),
  theme: z
    .string()
    .min(1, "La ruta al archivo de tema es requerida.")
    .endsWith(".json", "La ruta del tema debe ser un archivo .json."),
  content: z
    .string()
    .min(1, "La ruta al archivo de contenido es requerida.")
    .endsWith(".json", "La ruta de contenido debe ser un archivo .json."),
});

/**
 * @const CampaignMapSchema
 * @description Valida la estructura completa del archivo `campaign.map.json`.
 */
export const CampaignMapSchema = z.object({
  productId: z.string().min(1, "El productId es requerido."),
  campaignName: z.string().min(1, "El campaignName es requerido."),
  description: z.string().optional(),
  variants: z.record(z.string(), CampaignVariantMapSchema),
});

/**
 * @type CampaignMap
 * @description Infiere el tipo de TypeScript desde el schema de Zod.
 */
export type CampaignMap = z.infer<typeof CampaignMapSchema>;

/**
 * @type CampaignVariantMap
 * @description Infiere el tipo de TypeScript para una única variante del mapa.
 */
export type CampaignVariantMap = z.infer<typeof CampaignVariantMapSchema>;
// lib/schemas/campaigns/campaign-map.schema.ts
