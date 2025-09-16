// components/layout/AppProviders.tsx
/**
 * @file AppProviders.tsx
 * @description Componente proveedor del lado del cliente.
 *              v4.0.0 (Alias Unification & Import Fix): Se corrige la ruta
 *              de importación del schema de i18n.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import { useProducerLogic } from "@/hooks/useProducerLogic";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { CookieConsentBanner } from "./CookieConsentBanner";
// --- [INICIO DE CORRECCIÓN DE RUTA] ---
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- [FIN DE CORRECCIÓN DE RUTA] ---
import { defaultLocale, type Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";

interface AppProvidersProps {
  children: React.ReactNode;
  locale?: Locale;
  cookieConsentContent: Dictionary["cookieConsentBanner"];
}

export default function AppProviders({
  children,
  locale,
  cookieConsentContent,
}: AppProvidersProps): React.ReactElement {
  logger.info("[AppProviders] Inicializando proveedores de cliente...");
  useProducerLogic();
  const { preferences, setPreference } = useUserPreferences();

  const safeLocale = locale || defaultLocale;

  useEffect(() => {
    if (safeLocale && preferences.locale !== safeLocale) {
      logger.info(
        `Sincronizando locale de URL ('${safeLocale}') con preferencias de usuario.`
      );
      setPreference("locale", safeLocale);
    }
  }, [safeLocale, preferences.locale, setPreference]);

  return (
    <>
      {children}
      {cookieConsentContent && (
        <CookieConsentBanner
          message={cookieConsentContent.message}
          acceptButtonText={cookieConsentContent.acceptButtonText}
          rejectButtonText={cookieConsentContent.rejectButtonText}
          policyLinkText={cookieConsentContent.policyLinkText}
          policyLinkHref={`/${safeLocale}/cookies`}
        />
      )}
    </>
  );
}
// components/layout/AppProviders.tsx
