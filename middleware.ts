// middleware.ts
/**
 * @file middleware.ts
 * @description Middleware de enrutamiento y SSoT para la internacionalización.
 *              - v5.0.0: Fortalece el matcher para excluir de forma robusta
 *                todos los archivos estáticos y assets (rutas con '.'),
 *                resolviendo la redirección incorrecta de imágenes.
 * @version 5.0.0
 * @author Gemini AI - Asistente de IA de Google
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

function getLocale(request: NextRequest): Locale {
  // ... (la función getLocale permanece sin cambios)
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  // @ts-ignore
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages([
    ...supportedLocales,
  ]);
  const locale = matchLocale(languages, [...supportedLocales], defaultLocale);
  return locale as Locale;
}

const localePathnameRegex = new RegExp(
  `^/(${supportedLocales.join("|")})(/.*)?$`,
  "i"
);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`[Middleware] Petición entrante: ${pathname}`);

  if (localePathnameRegex.test(pathname)) {
    console.log("[Middleware] La ruta ya tiene un locale. Omitiendo.");
    return NextResponse.next();
  }

  const locale = getLocale(request);
  console.log(
    `[Middleware] Locale faltante. Detectado mejor locale: "${locale}"`
  );

  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  console.log(`[Middleware] Redirigiendo a: ${newUrl.toString()}`);
  const response = NextResponse.redirect(newUrl, 308);
  response.headers.set("x-middleware-reason", "locale-redirect");
  return response;
}

export const config = {
  // --- INICIO DE MODIFICACIÓN: Matcher Fortalecido ---
  // Esta nueva expresión regular negativa excluye:
  // - /api/
  // - /_next/static/
  // - /_next/image/
  // - cualquier ruta que contenga un punto (.), lo que excluye eficazmente
  //   todos los archivos estáticos como .svg, .png, favicon.ico, etc.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
  // --- FIN DE MODIFICACIÓN ---
};
