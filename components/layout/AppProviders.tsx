// components/layout/AppProviders.tsx
/**
 * @file AppProviders.tsx
 * @description Orquestador de proveedores del lado del cliente.
 *              v5.0.0: Integración del ThemeProvider para resolver la ausencia
 *              de theming en toda la aplicación. Esta es la solución definitiva.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/layout/theme-provider"; // <-- Importar el ThemeProvider
import { useProducerLogic } from "@/hooks/useProducerLogic";
import { useUserPreferences } from "@/hooks/useUserPreferences";
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
    // --- [INICIO DE LA SOLUCIÓN] ---
    // Envolvemos toda la aplicación con el ThemeProvider.
    // Esto asegura que el contexto de tema (light/dark) esté disponible en todas partes.
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
    // --- [FIN DE LA SOLUCIÓN] ---
  );
}
// components/layout/AppProviders.tsx
