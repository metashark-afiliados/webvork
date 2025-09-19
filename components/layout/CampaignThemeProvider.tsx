// src/components/layout/CampaignThemeProvider.tsx
/**
 * @file CampaignThemeProvider.tsx
 * @description Componente de Servidor que inyecta las variables CSS de un tema de
 *              campaña, resolviendo el problema de FOUC (Flash of Unstyled Content).
 * @version 3.1.0 (Function Name Fix)
 * @author RaZ Podestá - MetaShark Tech
 * @see .docs-espejo/components/layout/CampaignThemeProvider.md
 */
import React from "react";
import type { AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";
import { generateCssVariablesFromTheme } from "@/lib/utils/theme.utils";
import { logger } from "@/lib/logging";

interface CampaignThemeProviderProps {
  theme: AssembledTheme;
  children: React.ReactNode;
}

export function CampaignThemeProvider({
  theme,
  children,
}: CampaignThemeProviderProps): React.ReactElement {
  logger.info(
    "[CampaignThemeProvider] Inyectando tema de campaña en el servidor."
  );

  const styleRule = generateCssVariablesFromTheme(theme);

  return (
    <>
      {styleRule && <style dangerouslySetInnerHTML={{ __html: styleRule }} />}
      {children}
    </>
  );
}
