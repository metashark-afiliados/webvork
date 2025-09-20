// RUTA: lib/schemas/pages/dev-dashboard.schema.ts

/**
 * @file dev-dashboard.schema.ts
 * @description Esquema de Zod para el contenido i18n de la página del Dashboard de Desarrollo.
 *              v3.0.0 (PageHeader Integration): Integra el schema de contenido
 *              para el componente PageHeader de élite, permitiendo una cabecera
 *              completamente data-driven y con efectos visuales MEA.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { PageHeaderContentSchema } from "../components/page-header.schema";

const DevToolSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const DevDashboardContentSchema = z.object({
  pageHeader: PageHeaderContentSchema,
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
  customizeButton: z.string(),
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
});

export const DevDashboardLocaleSchema = z.object({
  devDashboardPage: DevDashboardContentSchema.optional(),
});
