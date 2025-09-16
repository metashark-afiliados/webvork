// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1Client.tsx
/**
 * @file Step1Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 1 (Estructura).
 *              v2.3.0: Restaurado y alineado con la arquitectura de navegación.
 * @version 2.3.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useTransition } from "react";
import { useCampaignDraft } from "../../_hooks";
import type { HeaderConfig, FooterConfig } from "../../_types/draft.types";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- [INICIO DE CORRECCIÓN] ---
import { Step1Form } from "./Step1Form";
import { useWizard } from "../../_context/WizardContext";
// --- [FIN DE CORRECCIÓN] ---

type Step1Content = NonNullable<Dictionary["campaignSuitePage"]>["step1"];

interface Step1ClientProps {
  content: Step1Content;
}

export function Step1Client({ content }: Step1ClientProps): React.ReactElement {
  logger.info("Renderizando Step1Client (Contenedor de Lógica)");

  const { draft, updateDraft } = useCampaignDraft();
  const { goToNextStep, goToPrevStep } = useWizard();
  const [isPending, startTransition] = useTransition();

  const onHeaderConfigChange = (newConfig: Partial<HeaderConfig>) => {
    updateDraft({
      headerConfig: { ...draft.headerConfig, ...newConfig },
    });
  };

  const onFooterConfigChange = (newConfig: Partial<FooterConfig>) => {
    updateDraft({
      footerConfig: { ...draft.footerConfig, ...newConfig },
    });
  };

  return (
    <Step1Form
      content={content}
      headerConfig={draft.headerConfig}
      footerConfig={draft.footerConfig}
      onHeaderConfigChange={onHeaderConfigChange}
      onFooterConfigChange={onFooterConfigChange}
      onBack={goToPrevStep}
      onNext={goToNextStep}
      isPending={isPending}
    />
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1Client.tsx
