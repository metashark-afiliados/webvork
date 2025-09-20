// lib/utils/keyword-normalizer.ts
/**
 * @file keyword-normalizer.ts
 * @description Utilidad pura y atómica para normalizar palabras clave para fines de búsqueda.
 *              Incluye singularización, conversión a minúsculas y eliminación de duplicados.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import pluralize from "pluralize";
import { logger } from "@/shared/lib/logging";

/**
 * @function normalizeKeywords
 * @description Procesa un array de palabras clave para optimizarlas para la búsqueda.
 *              - Convierte todas las palabras a minúsculas.
 *              - Singulariza las palabras para manejar variaciones de plural/singular.
 *              - Elimina duplicados.
 *              - Filtra palabras vacías o solo espacios.
 * @param {string[]} keywords El array de palabras clave a normalizar.
 * @returns {string[]} Un nuevo array de palabras clave normalizadas.
 */
export function normalizeKeywords(keywords: string[]): string[] {
  logger.trace(
    `[KeywordNormalizer] Iniciando normalización de ${keywords.length} palabras clave.`
  );

  const normalized = keywords
    .map((keyword) => keyword.trim().toLowerCase()) // Eliminar espacios y convertir a minúsculas
    .filter((keyword) => keyword.length > 0) // Eliminar cadenas vacías
    .map((keyword) => pluralize.singular(keyword)); // Singularizar

  const uniqueKeywords = Array.from(new Set(normalized)); // Eliminar duplicados

  logger.trace(
    `[KeywordNormalizer] Normalización completada. ${uniqueKeywords.length} palabras clave únicas.`
  );
  return uniqueKeywords;
}
