// lib/schemas/pages/dev-campaign-suite.schema.ts
/**
 * @file dev-campaign-suite.schema.ts
 * @description Esquema de Zod y SSoT para el contenido i18n de la Suite de Diseño de Campañas.
 *              v5.0.0 (Holistic Contract Sync): Sincronizado con todas las
 *              refactorizaciones de UI, incluyendo las descripciones para los
 *              pasos 0 y 1. Esta es la versión canónica del contrato.
 * @version 5.0.0
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
        description: z.string(),
        baseCampaignLabel: z.string(),
        baseCampaignPlaceholder: z.string(),
        baseCampaignDescription: z.string(),
        variantNameLabel: z.string(),
        variantNamePlaceholder: z.string(),
        seoKeywordsLabel: z.string(),
        seoKeywordsPlaceholder: z.string(),
        seoKeywordsDescription: z.string(),
        affiliateNetworkLabel: z.string(),
        affiliateNetworkPlaceholder: z.string(),
        affiliateUrlLabel: z.string(),
        affiliateUrlPlaceholder: z.string(),
      }),
      step1: z.object({
        title: z.string(),
        description: z.string(),
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
      step5: z.object({
        title: z.string(),
        description: z.string(),
        summaryTitle: z.string(),
        summaryPlaceholder: z.string(),
        publishButtonText: z.string(),
        packageButtonText: z.string(),
        deleteButtonText: z.string(),
        deleteDialog: z.object({
          title: z.string(),
          description: z.string(),
          cancelButton: z.string(),
          confirmButton: z.string(),
        }),
      }),
    })
    .optional(),
});
// lib/schemas/pages/dev-campaign-suite.schema.ts
