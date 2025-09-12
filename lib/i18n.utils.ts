// src/lib/i18n.utils.ts
/**
 * @file i18n.utils.ts
 * @description Aparato de utilidades puras y sin estado para la lógica de i18n.
 *              Refactorizado para incluir documentación exhaustiva TSDoc y formalizar
 *              su rol como SSoT para la manipulación de rutas localizadas.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/lib/i18n.utils.ts.md
 */
import {
  supportedLocales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n.config";

/**
 * @function pathnameHasLocale
 * @description Verifica si una ruta de URL (`pathname`) ya contiene un prefijo de
 *              locale soportado. Es una función pura y síncrona.
 * @param {string} pathname La ruta a verificar (ej. "/es-ES/about").
 * @returns {boolean} `true` si la ruta ya está localizada, `false` en caso contrario.
 * @example
 * pathnameHasLocale("/en-US/store"); // true
 * pathnameHasLocale("/about"); // false
 */
export function pathnameHasLocale(pathname: string): boolean {
  return supportedLocales.some(
    (locale: Locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

/**
 * @function getCurrentLocaleFromPathname
 * @description Extrae el código del locale desde el inicio de una ruta de URL.
 *              Si no se encuentra un locale válido, devuelve el `defaultLocale`
 *              como fallback seguro. Es una función pura y síncrona.
 * @param {string} pathname La ruta de la cual extraer el locale.
 * @returns {Locale} El locale encontrado o el locale por defecto.
 * @example
 * getCurrentLocaleFromPathname("/pt-BR/news/article"); // "pt-BR"
 * getCurrentLocaleFromPathname("/invalid-locale/page"); // "es-ES" (asumiendo que es el default)
 */
export function getCurrentLocaleFromPathname(pathname: string): Locale {
  for (const locale of supportedLocales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return defaultLocale;
}
// src/lib/i18n.utils.ts