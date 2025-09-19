// lib/middleware/handlers/i18n.handler.ts
/**
 * @file i18n.handler.ts
 * @description Manejador de middleware atómico para la internacionalización de rutas.
 *              Refactorizado para consumir la utilidad pura `locale-detector`.
 * @version 2.1.0 (Improved Observability)
 * @author RaZ Podestá - MetaShark Tech
 * @see roadmap-v2.md - Tarea 4.2
 */
import { NextRequest, NextResponse } from "next/server";
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

/**
 * @const i18nHandler
 * @description El manejador de middleware que garantiza que cada ruta esté localizada.
 */
export const i18nHandler: MiddlewareHandler = (req, res) => {
  const { pathname } = req.nextUrl;

  // 1. Si la ruta ya tiene un locale, no hacemos nada.
  if (localePathnameRegex.test(pathname)) {
    // --- [INICIO DE MEJORA DE LOGGING] ---
    logger.trace(
      `[i18nHandler] Ruta ya localizada. Omitiendo redirección.`,
      { pathname }
    );
    // --- [FIN DE MEJORA DE LOGGING] ---
    return res;
  }

  // 2. Determinar el locale a utilizar, delegando a la SSoT.
  let detectedLocale: Locale;
  if (process.env.NEXT_PUBLIC_SITE_LOCALE) {
    detectedLocale = defaultLocale;
  } else {
    detectedLocale = getLocaleFromBrowser(req);
  }

  // 3. Construir la nueva URL y cortocircuitar el pipeline.
  const newUrl = new URL(`/${detectedLocale}${pathname}`, req.url);
  logger.info(`[i18nHandler] Redirigiendo a: ${newUrl.toString()}`);

  return NextResponse.redirect(newUrl, 308);
};
// lib/middleware/handlers/i18n.handler.ts
