// components/layout/AppProviders.tsx
/**
 * @file AppProviders.tsx
 * @description Componente proveedor del lado del cliente.
 *              - v3.0.0: Integra el hook `useUserPreferences` para sincronizar
 *                el locale de la URL con las preferencias persistentes del usuario.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import { useProducerLogic } from "@/hooks/useProducerLogic";
import { useUserPreferences } from "@/hooks/useUserPreferences"; // <-- [1] IMPORTAR NUEVO HOOK
import { CookieConsentBanner } from "./CookieConsentBanner";
import type { Dictionary } from "@/schemas/i18n.schema";
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
  const { preferences, setPreference } = useUserPreferences(); // <-- [2] INVOCAR HOOK

  const safeLocale = locale || defaultLocale;

  // --- [3] EFECTO DE SINCRONIZACIÓN ---
  // Este efecto se asegura de que el locale actual (de la URL) se guarde
  // en las preferencias del usuario si es diferente al que ya está guardado.
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
