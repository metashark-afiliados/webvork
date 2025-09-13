// lib/schemas/pages/dev-layout-configurator.schema.ts
/**
 * @file dev-layout-configurator.schema.ts
 * @description Esquema de Zod para el contenido i18n de la página del Configurador
 *              de Layouts de Campaña en el DCC.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

/**
 * @const DevLayoutConfiguratorLocaleSchema
 * @description Valida la estructura del contenido para un único locale.
 */
export const DevLayoutConfiguratorLocaleSchema = z.object({
  devLayoutConfiguratorPage: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      selectCampaignLabel: z.string(),
      selectCampaignPlaceholder: z.string(),
      selectVariantLabel: z.string(),
      selectVariantPlaceholder: z.string(),
      activeSectionsTitle: z.string(),
      availableSectionsTitle: z.string(),
      saveButtonText: z.string(),
      savingButtonText: z.string(),
      successMessage: z.string(),
      errorMessage: z.string(),
    })
    .optional(),
});
// lib/schemas/pages/dev-layout-configurator.schema.ts
