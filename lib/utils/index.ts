// lib/utils/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para las utilidades del proyecto.
 *              v4.4.0: Se elimina la exportación de 'theme.utils' para
 *              favorecer la importación directa y resolver un error de build.
 * @version 4.4.0
 * @author RaZ podesta - MetaShark Tech
 */
import { logger } from "@/lib/logging";

export * from "@/lib/utils/cn";
export * from "@/lib/utils/draft.utils";
// Las utilidades 'merge' y 'theme.utils' ahora se importan directamente
// desde sus módulos para garantizar la resolución en el build.

logger.trace(
  "[Observabilidad] Módulo de utilidades (index.ts) v4.4.0 cargado."
);
// lib/utils/index.ts
