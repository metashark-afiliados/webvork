// lib/i18n/locale-detector.ts
/**
 * @file locale-detector.ts
 * @description Utilidad pura y atómica para detectar el locale preferido del
 *              navegador. Es la SSoT para esta lógica y es compatible con el
 *              Vercel Edge Runtime.
 * @version 1.0.0
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
} from "@/lib/i18n.config";
import { logger } from "@/lib/logging";

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

  // @ts-ignore - Los tipos de Negotiator pueden no estar perfectamente alineados
  // con las cabeceras de NextRequest, pero la lógica es funcional.
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages([
    ...supportedLocales,
  ]);

  const locale = matchLocale(
    languages,
    [...supportedLocales],
    defaultLocale
  ) as Locale;

  logger.trace(`[LocaleDetector] Locale detectado del navegador: ${locale}`);
  return locale;
}
// lib/i18n/locale-detector.ts
