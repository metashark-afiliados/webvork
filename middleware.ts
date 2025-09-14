// middleware.ts
/**
 * @file middleware.ts
 * @description Middleware de enrutamiento y SSoT para la internacionalización.
 *              - v6.0.0 (Jerarquía de Decisión DX-First): Refactorizado para priorizar
 *                el `defaultLocale` (del .env) sobre la negociación de idioma del
 *                navegador. Esto otorga control explícito al desarrollador en local,
 *                mientras mantiene la detección automática para producción.
 * @version 6.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  supportedLocales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { logger } from "@/lib/logging";

function getLocaleFromBrowser(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  // @ts-ignore
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages([
    ...supportedLocales,
  ]);
  return matchLocale(languages, [...supportedLocales], defaultLocale) as Locale;
}

const localePathnameRegex = new RegExp(
  `^/(${supportedLocales.join("|")})(/.*)?$`,
  "i"
);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  logger.trace(`[Middleware] Petición entrante: ${pathname}`);

  if (localePathnameRegex.test(pathname)) {
    logger.trace("[Middleware] La ruta ya tiene un locale. Omitiendo.");
    return NextResponse.next();
  }

  // --- INICIO DE REFACTORIZACIÓN: Lógica DX-First ---
  let detectedLocale: Locale;

  // Si NEXT_PUBLIC_SITE_LOCALE está definido en .env, tiene la MÁXIMA prioridad.
  if (process.env.NEXT_PUBLIC_SITE_LOCALE) {
    detectedLocale = defaultLocale; // `defaultLocale` ya lee y valida la variable del .env
    logger.trace(
      `[Middleware] Usando locale forzado desde .env: "${detectedLocale}"`
    );
  } else {
    // Si no, recurrimos a la detección del navegador (comportamiento para producción).
    detectedLocale = getLocaleFromBrowser(request);
    logger.trace(
      `[Middleware] .env no definido. Usando locale detectado del navegador: "${detectedLocale}"`
    );
  }
  // --- FIN DE REFACTORIZACIÓN ---

  const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
  logger.info(`[Middleware] Redirigiendo a: ${newUrl.toString()}`);

  const response = NextResponse.redirect(newUrl, 308); // 308 es una redirección permanente
  response.headers.set("x-middleware-reason", "locale-redirect");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
