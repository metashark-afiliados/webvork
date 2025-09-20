// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/Step2Client.tsx
/**
 * @file Step2Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 2 (Layout).
 * @version 2.2.0 (Rules of Hooks & FSD Alignment)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { useCampaignDraft } from "../../_hooks/use-campaign-draft";
import type { LayoutConfigItem } from "../../_types/draft.types";
import { logger } from "@/shared/lib/logging";
import { Step2Form } from "./Step2Form";
import { useWizard } from "../../_context/WizardContext";
import { z } from "zod";
import { Step2ContentSchema } from "@/shared/lib/schemas/campaigns/steps/step2.schema";

type Step2Content = z.infer<typeof Step2ContentSchema>;

interface Step2ClientProps {
  content?: Step2Content;
}

export function Step2Client({ content }: Step2ClientProps): React.ReactElement {
  logger.info(
    "[Step2Client] Renderizando contenedor de lógica (Rules of Hooks Fix)."
  );

  const { draft, updateDraft } = useCampaignDraft();
  const { goToNextStep, goToPrevStep } = useWizard();

  if (!content) {
    logger.error("[Step2Client] El contenido para el Paso 2 es indefinido.");
    return (
      <div className="text-destructive p-8">
        Error: Faltan datos de contenido para este paso.
      </div>
    );
  }

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
