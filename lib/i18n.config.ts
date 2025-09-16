// lib/i18n.config.ts
/**
 * @file i18n.config.ts
 * @description SSoT para la configuración estática de internacionalización.
 *              - v5.0.0 (DX & Observability): Refactorizado para una lógica de
 *                validación más clara y con logging explícito, facilitando la
 *                depuración del locale por defecto.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";

export const supportedLocales = ["es-ES", "pt-BR", "en-US", "it-IT"] as const;
export type Locale = (typeof supportedLocales)[number];

const LocaleEnum = z.enum(supportedLocales);

/**
 * @function getValidatedDefaultLocale
 * @description Obtiene y valida el locale por defecto desde las variables de entorno.
 *              Esta es la SSoT para determinar el idioma de fallback de la aplicación.
 * @returns {Locale} El locale por defecto validado.
 */
function getValidatedDefaultLocale(): Locale {
  const envLocale = process.env.NEXT_PUBLIC_SITE_LOCALE;

  if (envLocale) {
    const validation = LocaleEnum.safeParse(envLocale);
    if (validation.success) {
      logger.info(
        `[i18n.config] Usando locale por defecto desde .env: "${validation.data}"`
      );
      return validation.data;
    } else {
      logger.warn(
        `[i18n.config] ADVERTENCIA: El valor de NEXT_PUBLIC_SITE_LOCALE ("${envLocale}") no es válido. Se utilizará el fallback 'it-IT'. Los valores válidos son: ${supportedLocales.join(", ")}.`
      );
    }
  } else {
    logger.trace(
      "[i18n.config] NEXT_PUBLIC_SITE_LOCALE no está definido. Se utilizará el fallback 'it-IT'."
    );
  }

  return "it-IT"; // Fallback definitivo y seguro.
}

export const defaultLocale: Locale = getValidatedDefaultLocale();
