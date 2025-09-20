// RUTA: lib/utils/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para las utilidades del proyecto.
 *              v5.0.0 (Holistic Integrity Restoration): Corrige todas las rutas
 *              de exportación para alinearse con la SSoT de nomenclatura y la
 *              estructura de directorios soberana, resolviendo errores de build.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { logger } from "@/shared/lib/logging";

// Exporta desde la SSoT canónica de cada utilidad.
export * from "@/shared/lib/utils/cn";
export * from "@/shared/lib/drafts/draft-utils";
export * from "@/shared/lib/search/keyword-normalizer";

// Las utilidades 'merge' y 'theme.utils' se importarán directamente desde
// sus módulos soberanos por los aparatos que las necesiten para mayor claridad
// y para evitar dependencias circulares.

logger.trace(
  "[Observabilidad] Módulo de utilidades (index.ts) v5.0.0 cargado."
);
