// lib/schemas/pages/dev-dashboard.schema.ts
/**
 * @file dev-dashboard.schema.ts
 * @description Esquema de Zod para el contenido i18n de la página del Dashboard de Desarrollo.
 *              v2.2.0 (Theme Switcher i18n): Añade claves para el nuevo `DevThemeSwitcher` global.
 * @version 2.2.0
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
      // --- [INICIO DE AÑADIDO: Claves para DevThemeSwitcher] ---
      selectThemeLabel: z.string(),
      selectFontLabel: z.string(),
      selectRadiusLabel: z.string(),
      defaultPresetName: z.string(),
      colorFilterPlaceholder: z.string(),
      fontFilterPlaceholder: z.string(),
      radiusFilterPlaceholder: z.string(),
      // --- [FIN DE AÑADIDO] ---
    })
    .optional(),
});
