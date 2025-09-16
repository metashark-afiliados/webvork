// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/Step2Client.tsx
/**
 * @file Step2Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 2 (Layout).
 *              v1.3.0: Restaurado y alineado con la arquitectura de navegación.
 * @version 1.3.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import { useCampaignDraft } from "../../_hooks";
import type { LayoutConfigItem } from "../../_types/draft.types";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- [INICIO DE CORRECCIÓN] ---
import { Step2Form } from "./Step2Form";
import { useWizard } from "../../_context/WizardContext";
// --- [FIN DE CORRECCIÓN] ---

type Step2Content = NonNullable<Dictionary["campaignSuitePage"]>["step2"];

interface Step2ClientProps {
  content: Step2Content;
}

export function Step2Client({ content }: Step2ClientProps): React.ReactElement {
  logger.info("Renderizando Step2Client (Contenedor de Lógica)");

  const { draft, updateDraft } = useCampaignDraft();
  const { goToNextStep, goToPrevStep } = useWizard();

  const onLayoutChange = (newLayout: LayoutConfigItem[]) => {
    updateDraft({
      layoutConfig: newLayout,
    });
  };

  return (
    <Step2Form
      content={content}
      layoutConfig={draft.layoutConfig}
      onLayoutChange={onLayoutChange}
      onBack={goToPrevStep}
      onNext={goToNextStep}
    />
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/Step2Client.tsx
