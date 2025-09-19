// app/[locale]/(dev)/dev/campaign-suite/create/layout.tsx
/**
 * @file layout.tsx
 * @description Layout de Servidor para la SDC.
 *              v6.1.0 (I18n Prop Drilling): Obtiene el contenido i18n para
 *              la vista previa y lo pasa al layout de cliente.
 * @version 6.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";
import { WizardClientLayout } from "../_components/WizardClientLayout";
// --- [INICIO] REFACTORIZACIÓN: Se importa getDictionary ---
import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n.config";
// --- [FIN] REFACTORIZACIÓN ---

interface WizardLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale }; // <-- Se añade params para obtener el locale
}

export default async function WizardLayout({
  children,
  params, // <-- Se recibe params
}: WizardLayoutProps) {
  logger.info(
    `[WizardLayout] Renderizando layout de la SDC (v6.1 - I18n Prop Drilling).`
  );

  // --- [INICIO] REFACTORIZACIÓN: Obtener y pasar contenido i18n ---
  const { dictionary } = await getDictionary(params.locale);
  const previewContent = {
    loadingTheme:
      dictionary.campaignSuitePage?.preview?.loadingTheme ||
      "Ensamblando tema...",
    errorLoadingTheme:
      dictionary.campaignSuitePage?.preview?.errorLoadingTheme ||
      "Error al cargar el tema.",
  };
  // --- [FIN] REFACTORIZACIÓN ---

  return (
    <WizardClientLayout previewContent={previewContent}>
      {children}
    </WizardClientLayout>
  );
}
