// app/[locale]/(dev)/dev/campaign-suite/create/layout.tsx
/**
 * @file layout.tsx
 * @description Layout orquestador para la Suite de Diseño de Campañas.
 * @version 2.1.0 - Corregido error de tipo TS2322 con aserción de tipo.
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import { useCampaignDraft } from "../_hooks/useCampaignDraft";
import { stepsConfig } from "../_config/wizard.config";
import { ProgressStepper } from "../_components";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { useRouter, usePathname } from "next/navigation";
import type { StepStatus } from "../_components/ProgressStepper"; // Importar el tipo

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { draft, isLoading } = useCampaignDraft();
  const router = useRouter();
  const pathname = usePathname();

  const handleStepClick = (stepId: number) => {
    const locale = pathname.split("/")[1];
    router.push(`/${locale}/dev/campaign-suite/create/${stepId}`);
  };

  const progressSteps = stepsConfig.map((s) => ({
    id: s.id,
    title: s.titleKey,
    // --- INICIO DE CORRECCIÓN: Se añade aserción de tipo para status ---
    status: (draft.completedSteps.includes(s.id)
      ? "completed"
      : draft.step === s.id
        ? "active"
        : "pending") as StepStatus,
    // --- FIN DE CORRECCIÓN ---
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
// app/[locale]/(dev)/dev/campaign-suite/create/layout.tsx
