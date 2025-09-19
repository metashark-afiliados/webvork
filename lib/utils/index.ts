// lib/utils/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para las utilidades del proyecto.
 * @version 4.5.0 (Keyword Normalizer Export)
 * @author RaZ Podestá - MetaShark Tech
 */
import { logger } from "@/lib/logging";

export * from "@/lib/utils/cn";
export * from "@/lib/utils/draft.utils";
export * from "@/lib/utils/keyword-normalizer";
// Las utilidades 'merge' y 'theme.utils' ahora se importan directamente
// desde sus módulos para garantizar la resolución en el build.

logger.trace(
  "[Observabilidad] Módulo de utilidades (index.ts) v4.5.0 cargado."
);
