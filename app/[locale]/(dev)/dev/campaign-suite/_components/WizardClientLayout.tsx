// app/[locale]/(dev)/dev/campaign-suite/_components/WizardClientLayout.tsx
/**
 * @file WizardClientLayout.tsx
 * @description Orquestador de cliente principal para la SDC. Ahora gestiona
 *              la inicialización del estado del borrador desde la base de datos.
 * @version 11.0.0 (DB Hydration)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { logger } from "@/lib/logging";
import { stepsConfig } from "../_config/wizard.config";
import { useCampaignDraft } from "../_hooks/useCampaignDraft";
import { WizardProvider } from "../_context/WizardContext";
import {
  ProgressContext,
  type ProgressStep,
} from "../_context/ProgressContext";
import { validateStep1 } from "./Step1_Structure";
import { DynamicIcon } from "@/components/ui";

export function WizardClientLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  logger.info(
    "[WizardClientLayout] Renderizando orquestador (v11.0 - DB Hydration)."
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- [INICIO] LÓGICA DE INICIALIZACIÓN Y ESTADO ---
  const { draft, setStep, updateDraft, initializeDraft, isLoading } =
    useCampaignDraft();

  // Dispara la inicialización desde la DB solo una vez al montar.
  useEffect(() => {
    initializeDraft();
  }, [initializeDraft]);
  // --- [FIN] LÓGICA DE INICIALIZACIÓN Y ESTADO ---

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

  // ... (El resto de la lógica de navegación no cambia) ...
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

  // --- [INICIO] RENDERIZADO CONDICIONAL DE CARGA ---
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
  // --- [FIN] RENDERIZADO CONDICIONAL DE CARGA ---

  return (
    <WizardProvider value={wizardContextValue}>
      <ProgressContext.Provider value={progressContextValue}>
        {children}
      </ProgressContext.Provider>
    </WizardProvider>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/WizardClientLayout.tsx
