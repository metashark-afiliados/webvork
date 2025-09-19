// app/[locale]/(dev)/dev/campaign-suite/_components/WizardClientLayout.tsx
/**
 * @file WizardClientLayout.tsx
 * @description Orquestador de cliente principal para la SDC.
 *              v11.1.0 (I18n Prop Drilling): Ahora obtiene y pasa el contenido
 *              i18n necesario al componente LivePreviewCanvas.
 * @version 11.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { logger } from "@/lib/logging";
import { stepsConfig } from "../_config/wizard.config";
import { useCampaignDraft } from "../_hooks/use-campaign-draft";
import { WizardProvider } from "../_context/WizardContext";
import {
  ProgressContext,
  type ProgressStep,
} from "../_context/ProgressContext";
import { validateStep1 } from "./Step1_Structure";
import { DynamicIcon } from "@/components/ui";

// --- [INICIO] REFACTORIZACIÓN: Se importa el componente LivePreviewCanvas ---
import { LivePreviewCanvas } from "./LivePreviewCanvas";
// --- [FIN] REFACTORIZACIÓN ---

// --- [INICIO] REFACTORIZACIÓN: Se define el contrato de props para el layout ---
interface WizardClientLayoutProps {
  children: React.ReactNode;
  previewContent: {
    loadingTheme: string;
    errorLoadingTheme: string;
  };
}
// --- [FIN] REFACTORIZACIÓN ---

export function WizardClientLayout({
  children,
  previewContent, // <-- Se recibe la nueva prop
}: WizardClientLayoutProps): React.ReactElement {
  logger.info(
    "[WizardClientLayout] Renderizando orquestador (v11.1 - I18n Prop Drilling)."
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const { draft, setStep, updateDraft, initializeDraft, isLoading } =
    useCampaignDraft();

  useEffect(() => {
    initializeDraft();
  }, [initializeDraft]);

  const currentStepId = useMemo(() => {
    const stepParam = searchParams.get("step");
    return stepParam ? parseInt(stepParam, 10) : 0;
  }, [searchParams]);

  useEffect(() => {
    setStep(currentStepId);
  }, [currentStepId, setStep]);

  const handleNavigation = useCallback(
    (newStepId: number) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("step", String(newStepId));
      router.push(`?${newParams.toString()}`);
    },
    [router, searchParams]
  );

  const handleNextStep = useCallback(() => {
    let canAdvance = true;
    if (currentStepId === 1) {
      canAdvance = validateStep1(draft).isValid;
    }

    if (canAdvance) {
      const newCompletedSteps = Array.from(
        new Set([...draft.completedSteps, currentStepId])
      );
      updateDraft({ completedSteps: newCompletedSteps });
      if (currentStepId < stepsConfig.length - 1) {
        handleNavigation(currentStepId + 1);
      }
    }
  }, [currentStepId, draft, updateDraft, handleNavigation]);

  const handlePrevStep = useCallback(() => {
    if (currentStepId > 0) {
      handleNavigation(currentStepId - 1);
    }
  }, [currentStepId, handleNavigation]);

  const handleStepClick = useCallback(
    (stepId: number) => {
      if (
        draft.completedSteps.includes(stepId) ||
        stepId === currentStepId ||
        draft.completedSteps.includes(stepId - 1)
      ) {
        handleNavigation(stepId);
      }
    },
    [draft.completedSteps, currentStepId, handleNavigation]
  );

  const wizardContextValue = useMemo(
    () => ({
      goToNextStep: handleNextStep,
      goToPrevStep: handlePrevStep,
    }),
    [handleNextStep, handlePrevStep]
  );

  const progressSteps: ProgressStep[] = useMemo(
    () =>
      stepsConfig.map((step) => ({
        id: step.id,
        title: step.titleKey,
        status:
          step.id === currentStepId
            ? "active"
            : draft.completedSteps.includes(step.id)
              ? "completed"
              : "pending",
      })),
    [currentStepId, draft.completedSteps]
  );

  const progressContextValue = useMemo(
    () => ({
      steps: progressSteps,
      onStepClick: handleStepClick,
    }),
    [progressSteps, handleStepClick]
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <DynamicIcon
          name="LoaderCircle"
          className="w-12 h-12 animate-spin text-primary"
        />
        <p className="mt-4 text-lg font-semibold text-foreground">
          Cargando tu borrador...
        </p>
        <p className="text-muted-foreground">
          Sincronizando con la base de datos.
        </p>
      </div>
    );
  }

  return (
    <WizardProvider value={wizardContextValue}>
      <ProgressContext.Provider value={progressContextValue}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="lg:col-span-1">{children}</div>
          <div className="lg:col-span-1 h-[calc(100vh-8rem)] hidden lg:block">
            {/* --- [INICIO] REFACTORIZACIÓN: Se pasa la prop 'content' --- */}
            <LivePreviewCanvas content={previewContent} />
            {/* --- [FIN] REFACTORIZACIÓN --- */}
          </div>
        </div>
      </ProgressContext.Provider>
    </WizardProvider>
  );
}
