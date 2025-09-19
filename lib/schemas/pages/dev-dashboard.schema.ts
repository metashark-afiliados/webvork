// lib/schemas/pages/dev-dashboard.schema.ts
/**
 * @file dev-dashboard.schema.ts
 * @description Esquema de Zod para el contenido i18n de la página del Dashboard de Desarrollo.
 *              v2.3.0 (Suite Style Composer i18n): Añade claves para el nuevo `SuiteStyleComposerModal`.
 * @version 2.3.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

const DevToolSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const DevDashboardLocaleSchema = z.object({
  devDashboardPage: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      tools: z.object({
        componentCanvas: DevToolSchema,
        campaignSimulator: DevToolSchema,
        branding: DevToolSchema,
        resilienceShowcase: DevToolSchema,
      }),
      selectThemeLabel: z.string(),
      selectFontLabel: z.string(),
      selectRadiusLabel: z.string(),
      defaultPresetName: z.string(),
      colorFilterPlaceholder: z.string(),
      fontFilterPlaceholder: z.string(),
      radiusFilterPlaceholder: z.string(),
      customizeButton: z.string(), // <-- NUEVO
      // Claves para el Compositor de Estilos de Suite
      composerTitle: z.string(),
      composerDescription: z.string(),
      composerColorsTab: z.string(),
      composerTypographyTab: z.string(),
      composerGeometryTab: z.string(),
      composerSaveButton: z.string(),
      composerCancelButton: z.string(),
      fontSizeLabel: z.string(),
      fontWeightLabel: z.string(),
      lineHeightLabel: z.string(),
      letterSpacingLabel: z.string(),
      borderRadiusLabel: z.string(),
      borderWidthLabel: z.string(),
      baseSpacingUnitLabel: z.string(),
      inputHeightLabel: z.string(),
    })
    .optional(),
});
