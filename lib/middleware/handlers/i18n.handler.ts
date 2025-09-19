// lib/middleware/handlers/i18n.handler.ts
/**
 * @file i18n.handler.ts
 * @description Manejador de middleware atómico para la internacionalización de rutas.
 *              v3.0.0 (Elite Observability): Refactorizado para proporcionar un logging
 *              de alta verbosidad, registrando la ruta procesada y la acción específica
 *              tomada (omisión o redirección) con contexto completo.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { NextResponse } from "next/server";
import {
  supportedLocales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n.config";
import { getLocaleFromBrowser } from "@/lib/i18n/locale-detector";
import { type MiddlewareHandler } from "../engine/pipeline";
import { logger } from "@/lib/logging";

const localePathnameRegex = new RegExp(
  `^/(${supportedLocales.join("|")})(/.*)?$`,
  "i"
);

export const i18nHandler: MiddlewareHandler = (req, res) => {
  const { pathname } = req.nextUrl;

  // --- [INICIO DE MEJORA DE OBSERVABILIDAD] ---
  if (localePathnameRegex.test(pathname)) {
    logger.trace(`[i18nHandler] Ruta ya localizada. Omitiendo acción.`, {
      pathname,
    });
    return res;
  }
  // --- [FIN DE MEJORA DE OBSERVABILIDAD] ---

  let detectedLocale: Locale;
  if (process.env.NEXT_PUBLIC_SITE_LOCALE) {
    detectedLocale = defaultLocale;
  } else {
    detectedLocale = getLocaleFromBrowser(req);
  }

  const newUrl = new URL(`/${detectedLocale}${pathname}`, req.url);

  // --- [INICIO DE MEJORA DE OBSERVABILIDAD] ---
  logger.info(
    `[i18nHandler] Ruta no localizada. Redirigiendo para añadir prefijo de locale.`,
    {
      from: pathname,
      to: newUrl.toString(),
      detectedLocale: detectedLocale,
    }
  );
  // --- [FIN DE MEJORA DE OBSERVABILIDAD] ---

  return NextResponse.redirect(newUrl, 308);
};
