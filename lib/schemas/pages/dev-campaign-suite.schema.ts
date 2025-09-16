// lib/schemas/pages/dev-campaign-suite.schema.ts
/**
 * @file dev-campaign-suite.schema.ts
 * @description Esquema de Zod y SSoT para el contenido de la SDC.
 *              v4.0.0: Añadido el contrato de contenido para el Paso 5: Gestión.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

export const CampaignSuiteLocaleSchema = z.object({
  campaignSuitePage: z
    .object({
      title: z.string(),
      subtitle: z.string(),
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
      step1: z.object({
        title: z.string(),
        headerSwitchLabel: z.string(),
        footerSwitchLabel: z.string(),
        headerGalleryTitle: z.string(),
        footerGalleryTitle: z.string(),
        logoConfigTitle: z.string(),
        logoUploadText: z.string(),
        logoUploadSubtext: z.string(),
      }),
      step2: z.object({
        title: z.string(),
        layoutBuilderTitle: z.string(),
        layoutBuilderDescription: z.string(),
        libraryTitle: z.string(),
        canvasTitle: z.string(),
      }),
      step3: z.object({
        title: z.string(),
        themeSelectorTitle: z.string(),
        themeSelectorDescription: z.string(),
        colorsLabel: z.string(),
        fontsLabel: z.string(),
        radiiLabel: z.string(),
        colorsPlaceholder: z.string(),
        fontsPlaceholder: z.string(),
        radiiPlaceholder: z.string(),
      }),
      step4: z.object({
        title: z.string(),
        contentEditorTitle: z.string(),
        contentEditorDescription: z.string(),
      }),
      // --- INICIO DE MEJORA: Contrato de contenido para el Paso 5 ---
      step5: z.object({
        title: z.string(),
        description: z.string(),
        summaryTitle: z.string(),
        summaryPlaceholder: z.string(),
        publishButtonText: z.string(),
        packageButtonText: z.string(),
        deleteButtonText: z.string(),
      }),
      // --- FIN DE MEJORA ---
    })
    .optional(),
});
// lib/schemas/pages/dev-campaign-suite.schema.ts
