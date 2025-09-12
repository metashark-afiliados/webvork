// src/lib/schemas/pages/dev-dashboard.schema.ts
/**
 * @file dev-dashboard.schema.ts
 * @description Esquema de Zod para el contenido i18n de la página del Dashboard de Desarrollo.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
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
      }),
    })
    .optional(),
});
// src/lib/schemas/pages/dev-dashboard.schema.ts
