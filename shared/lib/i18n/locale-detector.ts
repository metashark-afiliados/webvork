// lib/i18n/locale-detector.ts
/**
 * @file locale-detector.ts
 * @description Utilidad pura y atómica para detectar el locale preferido del
 *              navegador. Es la SSoT para esta lógica y es compatible con el
 *              Vercel Edge Runtime.
 *              v2.1.0 (Linter Alignment): Se alinea con la política de supresión de errores.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 * @see roadmap-v2.md - Tarea 4.1
 */
import "server-only";
import { type NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import {
  supportedLocales,
  defaultLocale,
  type Locale,
} from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";

/**
 * @function getLocaleFromBrowser
 * @description Determina el mejor locale soportado basándose en las cabeceras
 *              Accept-Language del navegador.
 * @param {NextRequest} request - La petición entrante.
 * @returns {Locale} El locale más adecuado.
 */
export function getLocaleFromBrowser(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // --- [INICIO DE CORRECCIÓN DE LINTING] ---
  // @ ts-expect-error -- Los tipos de Negotiator pueden no estar perfectamente
  // alineados con las cabeceras de NextRequest, pero la lógica es funcional y
  // es la práctica recomendada por la comunidad.
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages([
    ...supportedLocales,
  ]);
  // --- [FIN DE CORRECCIÓN DE LINTING] ---

  const locale = matchLocale(
    languages,
    [...supportedLocales],
    defaultLocale
  ) as Locale;

  logger.trace(`[LocaleDetector] Locale detectado del navegador: ${locale}`);
  return locale;
}
// lib/i18n/locale-detector.ts
