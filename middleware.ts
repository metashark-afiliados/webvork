// middleware.ts
/**
 * @file middleware.ts
 * @description Middleware de enrutamiento y SSoT para la internacionalización.
 *              - v7.0.0 (Asset Routing Fix): Se refactoriza el matcher para excluir
 *                de forma robusta todas las rutas de archivos estáticos (aquellas
 *                que contienen un "."), resolviendo el bucle de redirección de imágenes.
 * @version 7.0.0
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

  let detectedLocale: Locale;
  if (process.env.NEXT_PUBLIC_SITE_LOCALE) {
    detectedLocale = defaultLocale;
    logger.trace(
      `[Middleware] Usando locale forzado desde .env: "${detectedLocale}"`
    );
  } else {
    detectedLocale = getLocaleFromBrowser(request);
    logger.trace(
      `[Middleware] .env no definido. Usando locale detectado del navegador: "${detectedLocale}"`
    );
  }

  const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
  logger.info(`[Middleware] Redirigiendo a: ${newUrl.toString()}`);

  const response = NextResponse.redirect(newUrl, 308);
  response.headers.set("x-middleware-reason", "locale-redirect");
  return response;
}

export const config = {
  /*
   * --- INICIO DE CORRECCIÓN ---
   * El nuevo matcher ignora todas las rutas que contienen un punto (.),
   * que es una forma robusta de excluir peticiones a archivos (e.g., /img/logo.svg, /favicon.ico).
   * También ignora explícitamente las rutas internas de Next.js y de la API.
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
  /* --- FIN DE CORRECCIÓN --- */
};
