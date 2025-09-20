// src/lib/schemas/components/dev/dev-header.schema.ts
/**
 * @file dev-header.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente DevHeader.
 * @version 1.0.0
 * @author IA Ingeniera de Software Senior v2.0
 */
import { z } from "zod";

export const DevHeaderLocaleSchema = z.object({
  devHeader: z
    .object({
      title: z.string(),
    })
    .optional(),
});
// src/lib/schemas/components/dev/dev-header.schema.ts
