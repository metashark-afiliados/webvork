// app/[locale]/(dev)/dev/campaign-suite/_components/StepClientWrapper.tsx
/**
 * @file StepClientWrapper.tsx
 * @description Ensamblador y Renderizador de Pasos.
 *              v12.1.0 (Definitive Generic Type Safety): Alineado con la nueva
 *              arquitectura de configuración genérica.
 * @version 12.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { logger } from "@/lib/logging";
import { stepsConfig } from "../_config/wizard.config";
import type { StepProps } from "../_types/step.types";

interface StepClientWrapperProps {
  stepContent: object;
}

export function StepClientWrapper({
  stepContent,
}: StepClientWrapperProps): React.ReactElement {
  logger.info("Renderizando StepClientWrapper (Arquitectura Genérica Segura)");

  const searchParams = useSearchParams();
  const currentStepId = parseInt(searchParams.get("step") || "0", 10);
  const stepConfig = stepsConfig.find((s) => s.id === currentStepId);

  if (!stepConfig) {
    const errorMessage = `Configuración no encontrada para el paso ${currentStepId}.`;
    logger.error(`[StepClientWrapper] ${errorMessage}`);
    return (
      <div className="text-destructive text-center p-8">{errorMessage}</div>
    );
  }

  // TypeScript ahora entiende que StepComponent espera el tipo genérico con
  // la forma correcta, y que `stepContent` coincide con esa forma.
  const StepComponent = stepConfig.Component as React.ComponentType<
    StepProps<object>
  >;

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
        <StepComponent content={stepContent} />
      </motion.div>
    </AnimatePresence>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/StepClientWrapper.tsx
