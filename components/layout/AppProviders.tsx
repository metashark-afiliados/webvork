// RUTA: components/layout/AppProviders.tsx
/**
 * @file AppProviders.tsx
 * @description Orquestador de proveedores del lado del cliente.
 *              v5.3.0 (Holistic Integrity Restoration): Corrige la ruta de
 *              importación de ThemeProvider para alinearse con la SSoT de
 *              nomenclatura (PascalCase), resolviendo un error crítico de build.
 * @version 5.3.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
// --- [INICIO DE CORRECCIÓN DE INTEGRIDAD] ---
import { ThemeProvider } from "@/components/layout/ThemeProvider"; // Corregido a PascalCase.tsx
// --- [FIN DE CORRECCIÓN DE INTEGRIDAD] ---
import { useProducerLogic } from "@/hooks/use-producer-logic";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { CookieConsentBanner } from "./CookieConsentBanner";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { defaultLocale, type Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";

interface AppProvidersProps {
  children: React.ReactNode;
  locale?: Locale;
  cookieConsentContent?: Dictionary["cookieConsentBanner"];
}

export default function AppProviders({
  children,
  locale,
  cookieConsentContent,
}: AppProvidersProps): React.ReactElement {
  logger.info("[AppProviders] Inicializando proveedores de cliente (v5.3).");
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
          content={{
            ...cookieConsentContent,
            policyLinkHref: `/${safeLocale}/cookies`,
          }}
        />
      )}
    </ThemeProvider>
  );
}
