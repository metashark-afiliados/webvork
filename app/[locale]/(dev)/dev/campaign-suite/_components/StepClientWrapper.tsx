// app/[locale]/(dev)/dev/campaign-suite/_components/StepClientWrapper.tsx
/**
 * @file StepClientWrapper.tsx
 * @description Compositor del Lado del Cliente.
 * @version 4.1.0 - Corregida importación de tipos y se beneficia del contrato estricto.
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { useCampaignDraft } from "../_hooks/useCampaignDraft";
// --- INICIO DE CORRECCIÓN: Se importa el tipo correcto desde la SSoT ---
import { type StepConfig, stepsConfig } from "../_config/wizard.config";
// --- FIN DE CORRECCIÓN ---
import { AnimatePresence, motion } from "framer-motion";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

type WizardContent = NonNullable<Dictionary["campaignSuitePage"]>;

interface StepClientWrapperProps {
  currentStepId: number;
  stepConfig: StepConfig;
  wizardContent: WizardContent;
  baseCampaigns: string[];
}

export function StepClientWrapper({
  currentStepId,
  stepConfig,
  wizardContent,
  baseCampaigns,
}: StepClientWrapperProps): React.ReactElement {
  logger.info(
    `[StepClientWrapper] Componiendo UI para el paso ${currentStepId}`
  );

  const { draft, updateDraft, completeStep, setIsLoading } = useCampaignDraft();
  const router = useRouter();
  const pathname = usePathname();

  const handleNext = () => {
    logger.trace(
      `[StepClientWrapper] Navegando: Siguiente desde el paso ${currentStepId}`
    );
    completeStep(currentStepId);
    const nextStepIndex = currentStepId + 1;
    if (nextStepIndex < stepsConfig.length) {
      setIsLoading(true);
      const locale = pathname.split("/")[1];
      router.push(`/${locale}/dev/campaign-suite/create/${nextStepIndex}`);
    } else {
      toast.success("¡Asistente completado!", {
        description: "Próximamente: generación de activos.",
      });
    }
  };

  const handleBack = () => {
    logger.trace(
      `[StepClientWrapper] Navegando: Retroceder desde el paso ${currentStepId}`
    );
    if (currentStepId > 0) {
      setIsLoading(true);
      const locale = pathname.split("/")[1];
      router.push(`/${locale}/dev/campaign-suite/create/${currentStepId - 1}`);
    }
  };

  const StepComponent = stepConfig.Component;
  // --- CORRECCIÓN: Esta línea ahora es 100% segura gracias al contrato estricto ---
  const stepContent = wizardContent[stepConfig.contentKey];

  if (
    !stepContent ||
    typeof stepContent !== "object" ||
    !("title" in stepContent)
  ) {
    const errorMessage = `Contenido para '${String(
      stepConfig.contentKey
    )}' no encontrado o inválido en el diccionario.`;
    logger.error(`[StepClientWrapper] ${errorMessage}`);
    return (
      <div className="text-destructive text-center p-8">{errorMessage}</div>
    );
  }

  const stepProps: any = {
    content: stepContent,
    draft: draft,
    setDraft: updateDraft,
    onBack: handleBack,
    onNext: handleNext,
  };

  if (currentStepId === 0) {
    stepProps.baseCampaigns = baseCampaigns;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStepId}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <StepComponent {...stepProps} />
      </motion.div>
    </AnimatePresence>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/StepClientWrapper.tsx
