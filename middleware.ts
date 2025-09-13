// middleware.ts
/**
 * @file middleware.ts
 * @description Middleware de enrutamiento y SSoT para la internacionalización.
 *              Se ejecuta en el Edge para cada petición entrante y garantiza
 *              que cada ruta esté correctamente prefijada con un locale soportado.
 *              Refactorizado para añadir observabilidad completa y tipado robusto.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
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
import { logger } from "./lib/logging"; // Usamos clientLogger por su seguridad en Edge

/**
 * @function getLocale
 * @description Determina el mejor locale soportado basado en las cabeceras
 *              Accept-Language del usuario. Es una función pura.
 * @param {NextRequest} request - El objeto de la petición entrante.
 * @returns {Locale} El locale más apropiado para el usuario.
 */
function getLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore - Los tipos de negotiator pueden ser incompatibles con los de NextRequest.headers
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages([
    ...supportedLocales,
  ]);

  const locale = matchLocale(languages, [...supportedLocales], defaultLocale);
  return locale as Locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  logger.startGroup(`[Middleware] Petición entrante: ${pathname}`);

  const pathnameIsMissingLocale = supportedLocales.every((locale: Locale) => {
    return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;
  });

  // Si la ruta ya tiene un locale, no hacemos nada.
  if (!pathnameIsMissingLocale) {
    logger.trace("La ruta ya tiene un locale. Omitiendo middleware.");
    logger.endGroup();
    return;
  }

  // Si falta el locale, lo detectamos y redirigimos.
  const locale = getLocale(request);
  logger.info(`Locale faltante. Detectado mejor locale: "${locale}"`);

  const newUrl = new URL(
    `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
    request.url
  );

  logger.trace(`Redirigiendo a: ${newUrl.toString()}`);
  logger.endGroup();

  return NextResponse.redirect(newUrl);
}

export const config = {
  // El matcher se ha optimizado para excluir rutas de API, assets estáticos y
  // archivos de metadatos comunes, aplicando el middleware solo a las páginas.
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|icon.png).*)",
  ],
};
// middleware.ts
