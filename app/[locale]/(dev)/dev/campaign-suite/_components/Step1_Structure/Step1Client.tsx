// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1Client.tsx
/**
 * @file Step1Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 1.
 *              v5.0.0 (Holistic Fix): Corrige la ruta de importación,
 *              se alinea con el contexto de navegación y cambia a una
 *              exportación nombrada para resolver todos los errores.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { useCampaignDraft } from "../../_hooks";
import type { HeaderConfig, FooterConfig } from "../../_types/draft.types";
import { logger } from "@/lib/logging";
// --- [INICIO DE CORRECCIÓN DE RUTA Y ERROR DE LITERAL] ---
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- [FIN DE CORRECCIÓN DE RUTA Y ERROR DE LITERAL] ---
import { Step1Form } from "./Step1Form";
import { useWizard } from "../../_context/WizardContext";

type Step1Content = NonNullable<Dictionary["campaignSuitePage"]>["step1"];

interface Step1ClientProps {
  content: Step1Content;
}

// --- [INICIO DE CORRECCIÓN DE EXPORTACIÓN] ---
export function Step1Client({ content }: Step1ClientProps): React.ReactElement {
  // --- [FIN DE CORRECCIÓN DE EXPORTACIÓN] ---
  logger.info("Renderizando Step1Client (Contenedor de Lógica)");

  const { draft, updateDraft } = useCampaignDraft();
  const { goToNextStep, goToPrevStep } = useWizard();

  const handleHeaderConfigChange = (newConfig: Partial<HeaderConfig>) => {
    updateDraft({
      headerConfig: { ...draft.headerConfig, ...newConfig },
    });
  };

  const handleFooterConfigChange = (newConfig: Partial<FooterConfig>) => {
    updateDraft({
      footerConfig: { ...draft.footerConfig, ...newConfig },
    });
  };

  return (
    <Step1Form
      content={content}
      headerConfig={draft.headerConfig}
      footerConfig={draft.footerConfig}
      onHeaderConfigChange={handleHeaderConfigChange}
      onFooterConfigChange={handleFooterConfigChange}
      onBack={goToPrevStep}
      onNext={goToNextStep}
    />
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1Client.tsx
