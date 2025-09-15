// app/[locale]/(dev)/dev/campaign-suite/_components/WizardClientLayout.tsx
/**
 * @file WizardClientLayout.tsx
 * @description Componente de cliente para el layout del wizard.
 * @version 2.0.0 - Delega la sincronización de estado al hook 'useCampaignDraft'.
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import { useCampaignDraft } from "../_hooks/useCampaignDraft";
import { stepsConfig } from "../_config/wizard.config";
import { ProgressStepper, type StepStatus } from "./ProgressStepper";
import DynamicIcon from "@/components/ui/DynamicIcon";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";

type WizardContent = NonNullable<Dictionary["campaignSuitePage"]>;

export function WizardClientLayout({
  children,
  content,
  currentStepId,
}: {
  children: React.ReactNode;
  content: WizardContent;
  currentStepId: number;
}) {
  // --- INICIO DE REFACTORIZACIÓN: Se consume la nueva API del hook ---
  const { draft, isLoading, syncStepWithUrl } = useCampaignDraft();
  // --- FIN DE REFACTORIZACIÓN ---
  const router = useRouter();
  const pathname = usePathname();

  // --- INICIO DE REFACTORIZACIÓN: El layout invoca la sincronización en el hook ---
  useEffect(() => {
    syncStepWithUrl(currentStepId);
  }, [currentStepId, syncStepWithUrl]);
  // --- FIN DE REFACTORIZACIÓN ---

  const handleStepClick = (stepId: number) => {
    if (!draft.completedSteps.includes(stepId) && stepId > draft.step) {
      logger.warn(
        `[WizardClientLayout] Bloqueado intento de saltar a paso futuro no completado: ${stepId}`
      );
      return;
    }
    const locale = pathname.split("/")[1];
    router.push(`/${locale}/dev/campaign-suite/create/${stepId}`);
  };

  const progressSteps = stepsConfig.map((s) => ({
    id: s.id,
    title: (content[s.contentKey] as any)?.title || s.titleKey,
    status: (draft.completedSteps.includes(s.id)
      ? "completed"
      : draft.step === s.id
        ? "active"
        : "pending") as StepStatus,
  }));

  return (
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
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/WizardClientLayout.tsx
