// frontend/src/lib/schemas/components/cookie-consent-banner.schema.ts
/**
 * @file cookie-consent-banner.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente CookieConsentBanner.
 * @version 1.0.0
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
// frontend/src/lib/schemas/components/cookie-consent-banner.schema.ts
