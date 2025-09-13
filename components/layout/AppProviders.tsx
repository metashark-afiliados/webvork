// components/layout/AppProviders.tsx
/**
 * @file AppProviders.tsx
 * @description Componente proveedor del lado del cliente.
 *              - v2.0.0 (Resiliencia de Locale): Añade un fallback al `defaultLocale`
 *                para la construcción del enlace de la política de cookies,
 *                previniendo enlaces rotos en páginas de error (ej. 404).
 * @version 2.0.0
 * @author Gemini AI - Asistente de IA de Google
 */
"use client";

import React from "react";
import { useProducerLogic } from "@/hooks/useProducerLogic";
import { CookieConsentBanner } from "./CookieConsentBanner";
import type { Dictionary } from "@/schemas/i18n.schema";
import { defaultLocale, type Locale } from "@/lib/i18n.config"; // Importar defaultLocale
import { logger } from "@/lib/logging";

interface AppProvidersProps {
  children: React.ReactNode;
  locale?: Locale; // El locale ahora puede ser opcional
  cookieConsentContent: Dictionary["cookieConsentBanner"];
}

export default function AppProviders({
  children,
  locale,
  cookieConsentContent,
}: AppProvidersProps): React.ReactElement {
  logger.info("[AppProviders] Inicializando proveedores de cliente...");
  useProducerLogic();

  // --- INICIO DE MODIFICACIÓN: Fallback de Locale ---
  // Si el locale no se proporciona (ej. en una página 404),
  // utilizamos el defaultLocale para construir un enlace funcional.
  const safeLocale = locale || defaultLocale;
  // --- FIN DE MODIFICACIÓN ---

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