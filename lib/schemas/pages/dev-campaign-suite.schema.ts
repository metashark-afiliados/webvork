// lib/schemas/pages/dev-campaign-suite.schema.ts
/**
 * @file dev-campaign-suite.schema.ts
 * @description Esquema de Zod y SSoT para el contenido i18n de la Suite de Diseño de Campañas.
 *              v4.1.0: Añade el contrato de contenido explícito para el diálogo
 *              de confirmación de eliminación (`deleteDialog`), asegurando que toda la
 *              UI del Paso 5 sea completamente data-driven.
 * @version 4.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

/**
 * @const CampaignSuiteLocaleSchema
 * @description Valida la estructura del contenido para la página de la SDC
 *              en un único locale. Cada clave de paso corresponde a la UI de
 *              ese paso específico en el asistente.
 */
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
      step5: z.object({
        title: z.string(),
        description: z.string(),
        summaryTitle: z.string(),
        summaryPlaceholder: z.string(),
        publishButtonText: z.string(),
        packageButtonText: z.string(),
        deleteButtonText: z.string(),
        // --- INICIO DE MEJORA DE CONTRATO ---
        deleteDialog: z.object({
          title: z.string(),
          description: z.string(),
          cancelButton: z.string(),
          confirmButton: z.string(),
        }),
        // --- FIN DE MEJORA DE CONTRATO ---
      }),
    })
    .optional(),
});
// lib/schemas/pages/dev-campaign-suite.schema.ts
