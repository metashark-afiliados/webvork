// app/[locale]/(dev)/dev/campaign-suite/_components/WizardClientLayout.tsx
/**
 * @file WizardClientLayout.tsx
 * @description Orquestador de Cliente.
 *              v4.2.0: Corrige la violación de las reglas de los hooks (exhaustive-deps)
 *              envolviendo las funciones de navegación en useCallback y actualizando
 *              las dependencias de useMemo. Esto resuelve el error crítico del cliente.
 * @version 4.2.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import { useCampaignDraft } from "../_hooks";
import { stepsConfig } from "../_config/wizard.config";
import { ProgressStepper, type StepStatus } from "./ProgressStepper";
import DynamicIcon from "@/components/ui/DynamicIcon";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";
import { WizardProvider } from "../_context/WizardContext";

type WizardContent = NonNullable<Dictionary["campaignSuitePage"]>;

interface WizardClientLayoutProps {
  children: React.ReactNode;
  wizardContent: WizardContent;
}

export function WizardClientLayout({
  children,
  wizardContent,
}: WizardClientLayoutProps) {
  logger.info(
    "[WizardClientLayout] Renderizando layout y proveedor de contexto."
  );
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { draft, isLoading, setStep } = useCampaignDraft();
  const { completedSteps } = draft;

  useEffect(() => {
    const stepFromUrl = parseInt(searchParams.get("step") || "0", 10);
    if (!isNaN(stepFromUrl) && draft.step !== stepFromUrl) {
      setStep(stepFromUrl);
    }
  }, [searchParams, draft.step, setStep]);

  // --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
  const navigateToStep = useCallback(
    (stepId: number) => {
      const newUrl = `${pathname}?step=${stepId}`;
      logger.info(`[WizardClientLayout] Navegando a: ${newUrl}`);
      router.push(newUrl, { scroll: false });
    },
    [pathname, router]
  );

  const goToNextStep = useCallback(() => {
    if (draft.step < stepsConfig.length - 1) {
      // Marcar el paso actual como completado antes de navegar
      const newCompletedSteps = [...completedSteps, draft.step].sort(
        (a, b) => a - b
      );
      useCampaignDraft.setState((state) => ({
        draft: {
          ...state.draft,
          completedSteps: [...new Set(newCompletedSteps)],
        },
      }));
      navigateToStep(draft.step + 1);
    }
  }, [draft.step, completedSteps, navigateToStep]);

  const goToPrevStep = useCallback(() => {
    if (draft.step > 0) {
      navigateToStep(draft.step - 1);
    }
  }, [draft.step, navigateToStep]);

  const handleStepClick = (stepId: number) => {
    // Permite navegar a cualquier paso ya completado o al siguiente paso disponible.
    const highestCompleted = Math.max(-1, ...completedSteps);
    if (stepId <= highestCompleted + 1) {
      navigateToStep(stepId);
    }
  };

  const contextValue = useMemo(
    () => ({ goToNextStep, goToPrevStep }),
    [goToNextStep, goToPrevStep]
  );
  // --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

  const progressSteps = useMemo(
    () =>
      stepsConfig.map((s) => ({
        id: s.id,
        title: (wizardContent[s.contentKey] as any)?.title || s.titleKey,
        status: (completedSteps.includes(s.id)
          ? "completed"
          : draft.step === s.id
            ? "active"
            : "pending") as StepStatus,
      })),
    [wizardContent, completedSteps, draft.step]
  );

  return (
    <WizardProvider value={contextValue}>
      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg"
            >
              <DynamicIcon
                name="LoaderCircle"
                className="w-12 h-12 text-primary animate-spin"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Toaster position="bottom-right" richColors />
        <ProgressStepper steps={progressSteps} onStepClick={handleStepClick} />
        {children}
      </div>
    </WizardProvider>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/WizardClientLayout.tsx
