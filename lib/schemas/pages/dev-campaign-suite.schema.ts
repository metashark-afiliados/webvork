// lib/schemas/pages/dev-campaign-suite.schema.ts
/**
 * @file dev-campaign-suite.schema.ts
 * @description Esquema de Zod para el contenido de la Suite de Diseño de Campañas.
 * @version 1.0.0
 * @author IA Ingeniera de Software Senior v2.0 (Gemini)
 */
import { z } from "zod";

export const CampaignSuiteLocaleSchema = z.object({
  campaignSuitePage: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      // Textos para Paso 0
      step0: z.object({
        title: z.string(),
        baseCampaignLabel: z.string(),
        baseCampaignPlaceholder: z.string(),
        variantNameLabel: z.string(),
        variantNamePlaceholder: z.string(),
        seoKeywordsLabel: z.string(),
        seoKeywordsPlaceholder: z.string(),
        affiliateNetworkLabel: z.string(),
        affiliateNetworkPlaceholder: z.string(),
        affiliateUrlLabel: z.string(),
        affiliateUrlPlaceholder: z.string(),
      }),
      // Textos para Paso 1
      step1: z.object({
        title: z.string(),
        // Sub-paso 1.1: Header
        headerConfigTitle: z.string(),
        headerConfigDescription: z.string(),
        includeHeaderLabel: z.string(),
        headerGalleryTitle: z.string(),
        headerGalleryDescription: z.string(),
        logoConfigTitle: z.string(),
        logoUploadText: z.string(),
        logoUploadSubtext: z.string(),
      }),
    })
    .optional(),
});
// lib/schemas/pages/dev-campaign-suite.schema.ts
