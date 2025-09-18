// lib/schemas/pages/dev-campaign-suite.schema.ts
/**
 * @file dev-campaign-suite.schema.ts
 * @description Esquema de Zod y SSoT para el contenido i18n de la SDC.
 *              v5.4.0 (Definitive i18n Schema Flexibility): Asegura que el schema
 *              superior sea completamente parcial para permitir archivos i18n vacíos
 *              o incompletos en desarrollo sin generar errores de validación `Required`.
 * @version 5.4.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

export const CampaignSuiteLocaleSchema = z.object({
  campaignSuitePage: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      step0: z
        .object({
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
        })
        .optional(),
      step1: z
        .object({
          title: z.string(),
          description: z.string(),
          headerSwitchLabel: z.string(),
          footerSwitchLabel: z.string(),
          headerGalleryTitle: z.string(),
          footerGalleryTitle: z.string(),
          galleryDescriptions: z.record(z.string()),
        })
        .optional(),
      step2: z
        .object({
          title: z.string(),
          description: z.string(), // Corregido a 'description' para consistencia
          libraryTitle: z.string(),
          canvasTitle: z.string(),
          addSectionButtonText: z.string(),
          emptyLibraryText: z.string(),
          emptyCanvasText: z.string(),
          nextButtonText: z.string(),
        })
        .optional(),
      step3: z
        .object({
          title: z.string(),
          description: z.string(),
          themeSelectorTitle: z.string(),
          colorsLabel: z.string(),
          fontsLabel: z.string(),
          radiiLabel: z.string(),
          colorsPlaceholder: z.string(),
          fontsPlaceholder: z.string(),
          radiiPlaceholder: z.string(),
          nextButtonText: z.string(),
        })
        .optional(),
      step4: z
        .object({
          title: z.string(),
          description: z.string(),
          emptyStateTitle: z.string(),
          emptyStateDescription: z.string(),
          editButtonText: z.string(),
          nextButtonText: z.string(),
        })
        .optional(),
      step5: z
        .object({
          title: z.string(),
          description: z.string(),
          summaryTitle: z.string(),
          summaryPlaceholder: z.string(),
          publishButtonText: z.string(),
          packageButtonText: z.string(),
          deleteButtonText: z.string(),
          templateButtonText: z.string(),
          deleteDialog: z.object({
            title: z.string(),
            description: z.string(),
            cancelButton: z.string(),
            confirmButton: z.string(),
          }),
          templateDialog: z.object({
            title: z.string(),
            description: z.string(),
            nameLabel: z.string(),
            namePlaceholder: z.string(),
            descriptionLabel: z.string(),
            descriptionPlaceholder: z.string(),
            saveButton: z.string(),
            cancelButton: z.string(),
          }),
        })
        .optional(),
    })
    .optional(), // <-- AHORA EL OBJETO campaignSuitePage ES COMPLETAMENTE OPCIONAL
});
