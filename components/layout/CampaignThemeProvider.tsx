// RUTA: components/layout/CampaignThemeProvider.tsx
/**
 * @file CampaignThemeProvider.tsx
 * @description Componente de Servidor que inyecta las variables CSS de un tema de
 *              campaña directamente en el <head> del documento HTML. Esta técnica
 *              es crucial para prevenir el FOUC (Flash of Unstyled Content),
 *              asegurando que los estilos correctos estén disponibles desde el
 *              primer renderizado del servidor.
 * @version 3.2.0 (Holistic Elite Compliance)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import type { AssembledTheme } from "@/shared/lib/schemas/theming/assembled-theme.schema";
import { generateCssVariablesFromTheme } from "@/shared/lib/theming/theme-utils";
import { logger } from "@/shared/lib/logging";

/**
 * @interface CampaignThemeProviderProps
 * @description Contrato de props para el proveedor de tema.
 */
interface CampaignThemeProviderProps {
  /**
   * @prop theme - El objeto de tema completo y ensamblado, validado contra AssembledThemeSchema.
   */
  theme: AssembledTheme;
  /**
   * @prop children - Los componentes hijos (generalmente el layout de la página de campaña)
   *       a los que se aplicará este tema.
   */
  children: React.ReactNode;
}

/**
 * @component CampaignThemeProvider
 * @description Un componente de servidor que no renderiza un wrapper div, sino que
 *              inyecta una etiqueta <style> en el servidor con todas las variables
 *              CSS necesarias para el tema de la campaña.
 * @param {CampaignThemeProviderProps} props - Las propiedades del componente.
 * @returns {React.ReactElement}
 */
export function CampaignThemeProvider({
  theme,
  children,
}: CampaignThemeProviderProps): React.ReactElement {
  logger.info(
    "[CampaignThemeProvider] Inyectando tema de campaña en el servidor (v3.2)."
  );

  // Llama a la utilidad soberana para generar la cadena de CSS.
  const styleRule = generateCssVariablesFromTheme(theme);

  return (
    <>
      {/*
        Esta etiqueta <style> se renderiza en el servidor como parte del HTML inicial.
        `dangerouslySetInnerHTML` es seguro aquí porque el contenido (`styleRule`)
        es generado por nuestro propio código controlado y no por entrada del usuario.
      */}
      {styleRule && <style dangerouslySetInnerHTML={{ __html: styleRule }} />}
      {children}
    </>
  );
}
