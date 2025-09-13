// src/components/layout/CampaignThemeProvider.tsx
/**
 * @file CampaignThemeProvider.tsx
 * @description Componente de Servidor que inyecta las variables CSS de un tema de
 *              campaña, resolviendo el problema de FOUC (Flash of Unstyled Content).
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/layout/CampaignThemeProvider.md
 */
import React from "react";
import type { CampaignData } from "@/lib/i18n/campaign.i18n";
import { generateCampaignThemeVariablesStyle } from "@/lib/utils/theme.utils";
import { logger } from "@/lib/logging";

interface CampaignThemeProviderProps {
  theme: CampaignData["theme"];
  children: React.ReactNode;
}

/**
 * @component CampaignThemeProvider
 * @description Un componente de servidor que aplica un tema específico de campaña
 *              inyectando una etiqueta <style> directamente en el HTML renderizado.
 *              Este enfoque elimina el FOUC al asegurar que las variables CSS
 *              de la campaña estén disponibles desde la carga inicial de la página.
 * @param {CampaignThemeProviderProps} props Las propiedades del componente.
 * @returns {React.ReactElement} Un fragmento que contiene los estilos y los hijos.
 */
export function CampaignThemeProvider({
  theme,
  children,
}: CampaignThemeProviderProps): React.ReactElement {
  logger.info(
    "[CampaignThemeProvider] Inyectando tema de campaña en el servidor."
  );

  // 1. La lógica de generación de CSS se ejecuta en el servidor.
  const styleRule = generateCampaignThemeVariablesStyle(theme);

  return (
    <>
      {/* 2. Si se generan estilos, se inyectan en una etiqueta <style>.
             Esto ocurre durante el Server-Side Rendering (SSR), eliminando FOUC. */}
      {styleRule && <style dangerouslySetInnerHTML={{ __html: styleRule }} />}
      {/* 3. Los componentes hijos se renderizan normalmente. */}
      {children}
    </>
  );
}
// src/components/layout/CampaignThemeProvider.tsx
