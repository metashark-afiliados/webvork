// src/lib/i18n.config.ts
/**
 * @file i18n.config.ts
 * @description SSoT para la configuración estática de internacionalización.
 *              Refactorizado para usar Zod.safeParse en la obtención del locale
 *              por defecto, mejorando la robustez y la observabilidad.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/lib/i18n.config.ts.md
 */
import { z } from "zod";

/**
 * @constant supportedLocales
 * @description Define la lista inmutable de todos los idiomas soportados. Es la SSoT
 *              para la validación de rutas y la carga de diccionarios.
 */
export const supportedLocales = ["es-ES", "pt-BR", "en-US", "it-IT"] as const;

/**
 * @type Locale
 * @description Deriva el tipo de los locales soportados, garantizando seguridad de tipos.
 */
export type Locale = (typeof supportedLocales)[number];

/**
 * @constant LocaleEnum
 * @description Schema de Zod para validar que un string es un Locale soportado.
 * @private
 */
const LocaleEnum = z.enum(supportedLocales);

/**
 * @function getValidatedDefaultLocale
 * @description Obtiene y valida el locale por defecto desde las variables de entorno.
 * @private
 * @returns {Locale} El locale por defecto validado.
 */
function getValidatedDefaultLocale(): Locale {
  const envLocale = process.env.NEXT_PUBLIC_SITE_LOCALE;
  const validation = LocaleEnum.safeParse(envLocale);

  if (validation.success) {
    return validation.data;
  }

  // Si la variable de entorno está definida pero es inválida, se loguea una advertencia.
  if (envLocale) {
    console.warn(
      `[i18n.config] ADVERTENCIA: El valor de NEXT_PUBLIC_SITE_LOCALE ("${envLocale}") no es válido. Se utilizará el fallback 'it-IT'. Los valores válidos son: ${supportedLocales.join(", ")}.`
    );
  }

  return "it-IT"; // Fallback definitivo y seguro.
}

/**
 * @constant defaultLocale
 * @description Define el locale por defecto del sitio, obtenido de forma segura.
 */
export const defaultLocale: Locale = getValidatedDefaultLocale();
// src/lib/i18n.config.ts
