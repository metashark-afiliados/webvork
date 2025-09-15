// lib/schemas/pages/dev-dashboard.schema.ts
/**
 * @file dev-dashboard.schema.ts
 * @description Esquema de Zod para el contenido i18n de la página del Dashboard de Desarrollo.
 *              - v2.1.1 (Verification): Auditado y confirmado como la SSoT correcta
 *                para el contrato de datos del Dev Dashboard.
 * @version 2.1.1
 * @author IA Ingeniera de Software Senior v2.0 (Gemini)
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
        resilienceShowcase: DevToolSchema, // Clave requerida que causaba el fallo en los datos
      }),
    })
    .optional(),
});
// lib/schemas/pages/dev-dashboard.schema.ts
