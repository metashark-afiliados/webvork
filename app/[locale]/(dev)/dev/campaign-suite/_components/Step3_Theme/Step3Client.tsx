// app/[locale]/(dev)/dev/campaign-suite/_components/Step3_Theme/Step3Client.tsx
/**
 * @file Step3Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 3 (Tema).
 *              v1.3.0: Refactorizado para consumir el contexto de navegación `useWizard`.
 * @version 1.3.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import { toast } from "sonner";
import { useCampaignDraft } from "../../_hooks";
import type { ThemeConfig } from "../../_types/draft.types";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { ActionResult } from "@/lib/types/actions.types";
import type { DiscoveredFragments } from "../../_actions/getThemeFragments.action";
import { Step3Form } from "./Step3Form";
import { useWizard } from "../../_context/WizardContext"; // <-- Se consume el nuevo contexto

type Step3Content = NonNullable<Dictionary["campaignSuitePage"]>["step3"];

interface Step3ClientProps {
  content: Step3Content;
  fragmentsResult: ActionResult<DiscoveredFragments>;
}

export function Step3Client({
  content,
  fragmentsResult,
}: Step3ClientProps): React.ReactElement {
  logger.info("Renderizando Step3Client (Contenedor de Lógica)");

  const { draft, updateDraft } = useCampaignDraft();
  const { goToNextStep, goToPrevStep } = useWizard(); // <-- Se obtienen las acciones de navegación

  if (!fragmentsResult.success) {
    toast.error("Error Crítico", {
      description:
        fragmentsResult.error || "No se pudieron cargar las opciones de tema.",
    });
  }

  const onThemeConfigChange = (newConfig: Partial<ThemeConfig>) => {
    updateDraft({
      themeConfig: { ...draft.themeConfig, ...newConfig },
    });
  };

  return (
    <Step3Form
      content={content}
      themeConfig={draft.themeConfig}
      themeFragments={fragmentsResult.success ? fragmentsResult.data : null}
      onThemeConfigChange={onThemeConfigChange}
      onBack={goToPrevStep} // <-- Se usa la acción de navegación del contexto
      onNext={goToNextStep} // <-- Se usa la acción de navegación del contexto
    />
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step3_Theme/Step3Client.tsx
