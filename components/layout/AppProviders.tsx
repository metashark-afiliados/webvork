// frontend/src/components/layout/AppProviders.tsx
/**
 * @file AppProviders.tsx
 * @description Componente proveedor del lado del cliente. Encapsula toda la
 *              lógica global que depende de hooks y del entorno del navegador.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/layout/AppProviders.tsx.md
 */
"use client";

import React from "react";
import { useProducerLogic } from "@/hooks/useProducerLogic";
import { CookieConsentBanner } from "./CookieConsentBanner";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

interface AppProvidersProps {
  children: React.ReactNode;
  locale: Locale;
  cookieConsentContent: Dictionary["cookieConsentBanner"];
}

/**
 * @component AppProviders
 * @description Orquesta los proveedores y la lógica global del lado del cliente.
 * @param {AppProvidersProps} props Las propiedades del componente.
 * @returns {React.ReactElement} El elemento JSX que envuelve la aplicación.
 */
export default function AppProviders({
  children,
  locale,
  cookieConsentContent,
}: AppProvidersProps): React.ReactElement {
  clientLogger.info("[AppProviders] Inicializando proveedores de cliente...");

  // Hook soberano que orquesta toda la lógica de tracking del productor.
  useProducerLogic();

  return (
    <>
      {children}
      {cookieConsentContent && (
        <CookieConsentBanner
          message={cookieConsentContent.message}
          acceptButtonText={cookieConsentContent.acceptButtonText}
          rejectButtonText={cookieConsentContent.rejectButtonText}
          policyLinkText={cookieConsentContent.policyLinkText}
          policyLinkHref={`/${locale}/cookies`}
        />
      )}
    </>
  );
}
// frontend/src/components/layout/AppProviders.tsx
