// lib/schemas/components/cookie-consent-banner.schema.ts // <-- ¡COMENTARIO CORREGIDO!
/**
 * @file cookie-consent-banner.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente CookieConsentBanner.
 *              - v1.1.0: Corrige el comentario de ruta interno para reflejar la
 *                ubicación real del archivo en el proyecto.
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

export const CookieConsentBannerLocaleSchema = z.object({
  cookieConsentBanner: z
    .object({
      message: z.string(),
      acceptButtonText: z.string(),
      rejectButtonText: z.string(),
      policyLinkText: z.string(),
    })
    .optional(),
});
