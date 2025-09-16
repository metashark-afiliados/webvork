// app/[locale]/(dev)/dev/campaign-suite/_components/StepClientWrapper.tsx
/**
 * @file StepClientWrapper.tsx
 * @description Ensamblador y Renderizador de Pasos. Refactorizado para ser un
 *              orquestador puro, agnóstico a los datos específicos de cada paso.
 * @version 10.0.0 (Data Flow Decoupling)
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import { useCampaignDraft } from "../_hooks/useCampaignDraft";
import { AnimatePresence, motion } from "framer-motion";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { stepsConfig } from "../_config/wizard.config";

type WizardContent = NonNullable<Dictionary["campaignSuitePage"]>;

// --- MEJORA: Se elimina la prop baseCampaigns, simplificando el contrato ---
interface StepClientWrapperProps {
  wizardContent: WizardContent;
}

export function StepClientWrapper({
  wizardContent,
}: StepClientWrapperProps): React.ReactElement {
  logger.info("Renderizando StepClientWrapper (Orquestador Puro)");

  const { draft } = useCampaignDraft();
  const currentStepId = draft.step;
  const stepConfig = stepsConfig[currentStepId];

  if (!stepConfig) {
    const errorMessage = `Configuración no encontrada para el paso ${currentStepId}.`;
    logger.error(`[StepClientWrapper] ${errorMessage}`);
    return (
      <div className="text-destructive text-center p-8">{errorMessage}</div>
    );
  }

  const StepComponent = stepConfig.Component;
  const stepContent =
    wizardContent[stepConfig.contentKey as keyof typeof wizardContent];

  if (!stepContent || typeof stepContent !== "object") {
    const errorMessage = `Contenido para '${String(
      stepConfig.contentKey
    )}' no encontrado o inválido.`;
    logger.error(`[StepClientWrapper] ${errorMessage}`);
    return (
      <div className="text-destructive text-center p-8">{errorMessage}</div>
    );
  }

  // --- MEJORA: La inyección de props ahora es universal ---
  // Los datos específicos del servidor ahora son cargados por los propios
  // componentes ensambladores de paso (ej. Step0.tsx).
  const componentProps = {
    content: stepContent,
  };

  logger.success(
    `[StepClientWrapper] Renderizando paso ${currentStepId}: ${stepConfig.titleKey}`
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStepId}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* @ts-ignore */}
        <StepComponent {...componentProps} />
      </motion.div>
    </AnimatePresence>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/StepClientWrapper.tsx
