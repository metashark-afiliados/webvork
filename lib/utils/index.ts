// lib/utils/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para las utilidades del proyecto.
 *              v4.3.0: Corregidas las rutas de importación para usar alias absolutos,
 *              garantizando la coherencia y previniendo errores de resolución.
 * @version 4.3.0
 * @author RaZ podesta - MetaShark Tech
 */
import { logger } from "@/lib/logging";

// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// Todas las importaciones ahora usan el alias raíz '@' para máxima robustez.
export * from "@/lib/utils/cn";
export * from "@/lib/utils/theme.utils";
export * from "@/lib/utils/draft.utils";
export * from "@/lib/utils/merge";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

logger.trace(
  "[Observabilidad] Módulo de utilidades (index.ts) v4.3.0 cargado."
);
// lib/utils/index.ts
