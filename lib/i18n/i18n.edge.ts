// lib/i18n/i18n.edge.ts
/**
 * @file i18n.edge.ts
 * @description SSoT de carga de activos JSON para el Vercel Edge Runtime.
 *              v2.1.0 (Observability & Linter Fix): Resuelve el error de
 *              variable no utilizada al incluir el objeto de error en el log,
 *              mejorando la calidad del diagnóstico.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { type Locale } from "@/lib/i18n.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";

/**
 * @function loadEdgeJsonAsset
 * @description Utilidad genérica y reutilizable para cargar cualquier activo JSON
 *              desde /public usando fetch. Es Edge-compatible.
 * @template T - El tipo esperado del contenido del JSON.
 * @param {...string[]} pathSegments - Los segmentos de ruta del archivo dentro de /public.
 * @returns {Promise<T>} El contenido del archivo JSON, parseado y tipado.
 * @throws {Error} Si la petición fetch falla o el parseo JSON es incorrecto.
 */
export async function loadEdgeJsonAsset<T>(
  ...pathSegments: string[]
): Promise<T> {
  const finalPath = pathSegments.join("/");
  try {
    // La variable de entorno VERCEL_URL está disponible en producción en Vercel
    // y proporciona la URL de despliegue canónica.
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/${finalPath}`);

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} for path: ${finalPath}`
      );
    }
    return (await response.json()) as T;
  } catch (error) {
    logger.error(`[loadEdgeJsonAsset] Fallo al hacer fetch del activo.`, {
      path: finalPath,
      error,
    });
    // Re-lanzamos el error para que el consumidor pueda manejarlo.
    throw error;
  }
}

/**
 * @function getEdgeDictionary
 * @description Obtiene un diccionario, consumiendo la utilidad genérica.
 *              Es resiliente: en caso de error, devuelve un objeto vacío.
 * @param {Locale} locale - El locale a obtener.
 * @returns {Promise<{ dictionary: Partial<Dictionary> }>}
 */
export async function getEdgeDictionary(
  locale: Locale
): Promise<{ dictionary: Partial<Dictionary> }> {
  try {
    const dictionary = await loadEdgeJsonAsset<Dictionary>(
      "locales",
      `${locale}.json`
    );
    return { dictionary };
  } catch (error) {
    // --- [INICIO DE CORRECCIÓN DE LINTING Y OBSERVABILIDAD] ---
    // Ahora, el objeto de error capturado se pasa al logger.
    logger.error(
      `[i18n.edge] Fallo al obtener el diccionario para '${locale}'. Se devolverá un objeto vacío.`,
      { error }
    );
    // --- [FIN DE CORRECCIÓN DE LINTING Y OBSERVABILIDAD] ---
    return { dictionary: {} };
  }
}
// lib/i18n/i18n.edge.ts
