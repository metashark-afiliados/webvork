// components/layout/AppProviders.tsx
/**
 * @file AppProviders.tsx
 * @description Orquestador de proveedores del lado del cliente.
 *              v5.1.0 (Module Resolution Fix): Corrige la ruta de importación
 *              del hook `useProducerLogic` para alinearse con la convención
 *              de nomenclatura `kebab-case` y resolver el error de build.
 * @version 5.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { useProducerLogic } from "@/hooks/use-producer-logic";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { CookieConsentBanner } from "./CookieConsentBanner";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
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
    </ThemeProvider>
  );
}
