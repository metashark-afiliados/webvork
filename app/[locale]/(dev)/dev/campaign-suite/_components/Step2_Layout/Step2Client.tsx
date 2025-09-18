// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/Step2Client.tsx
/**
 * @file Step2Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 2 (Layout).
 * @version 2.0.0 (Elite Leveling)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { useCampaignDraft } from "../../_hooks";
import type { LayoutConfigItem } from "../../_types/draft.types";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { Step2Form } from "./Step2Form";
import { useWizard } from "../../_context/WizardContext";

type Step2Content = NonNullable<Dictionary["campaignSuitePage"]>["step2"];

interface Step2ClientProps {
  content: Step2Content;
}

export function Step2Client({ content }: Step2ClientProps): React.ReactElement {
  logger.info("[Step2Client] Renderizando contenedor de lógica (v2.0).");

  const { draft, updateDraft } = useCampaignDraft();
  const { goToNextStep, goToPrevStep } = useWizard();

  const onLayoutChange = (newLayout: LayoutConfigItem[]) => {
    logger.trace("[Step2Client] Layout modificado, actualizando borrador...");
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
