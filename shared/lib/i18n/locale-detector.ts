// shared/lib/i18n/locale-detector.ts
/**
 * @file locale-detector.ts
 * @description Utilidad pura y atómica para detectar el locale preferido del
 *              navegador. Es la SSoT para esta lógica y es compatible con el
 *              Vercel Edge Runtime.
 * @version 3.0.0 (Holistic Elite Compliance & Linter Alignment)
 * @author RaZ Podestá - MetaShark Tech
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

  // --- [INICIO DE REFACTORIZACIÓN DE LINTING Y CALIDAD] ---
  // ts-expect-error - Los tipos de 'Negotiator' y los de 'NextRequest' para las
  // cabeceras no están perfectamente alineados. Sin embargo, esta es la forma
  // canónica y recomendada por la comunidad para implementar la negociación de
  // idiomas. Aceptamos este error de tipo esperado como un compromiso técnico
  // para utilizar la herramienta estándar de la industria.
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages([
    ...supportedLocales,
  ]);
  // --- [FIN DE REFACTORIZACIÓN DE LINTING Y CALIDAD] ---

  const locale = matchLocale(
    languages,
    [...supportedLocales],
    defaultLocale
  ) as Locale;

  logger.trace(
    `[LocaleDetector] Locale detectado del navegador: "${locale}".`,
    {
      "Accept-Language": request.headers.get("accept-language"),
      languages,
    }
  );

  return locale;
}
// shared/lib/i18n/locale-detector.ts
