// app/[locale]/(dev)/dev/campaign-suite/_components/WizardHeader.tsx
/**
 * @file WizardHeader.tsx
 * @description Header de la SDC, ahora con indicador de estado de sincronización.
 * @version 2.1.0 (Filename Convention Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProgressContext } from "../_context/ProgressContext";
import { useCampaignDraft } from "../_hooks/use-campaign-draft";
import { ProgressStepper } from "./ProgressStepper";
import { DynamicIcon } from "@/components/ui";
import { logger } from "@/lib/logging";

const SyncStatusIndicator = () => {
  const isSyncing = useCampaignDraft((state) => state.isSyncing);
  const updatedAt = useCampaignDraft((state) => state.draft.updatedAt);
  const lastSavedTime = new Date(updatedAt).toLocaleTimeString();

  return (
    <div className="flex items-center text-xs text-muted-foreground w-48 justify-end">
      <AnimatePresence mode="wait">
        {isSyncing ? (
          <motion.div
            key="syncing"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="flex items-center gap-1.5"
          >
            <DynamicIcon
              name="LoaderCircle"
              className="h-3 w-3 animate-spin text-primary"
            />
            <span>Guardando...</span>
          </motion.div>
        ) : (
          <motion.div
            key="saved"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="flex items-center gap-1.5"
          >
            <DynamicIcon name="Check" className="h-3 w-3 text-green-500" />
            <span>Guardado a las {lastSavedTime}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function WizardHeader(): React.ReactElement | null {
  const progressContext = useContext(ProgressContext);

  if (!progressContext) {
    logger.warn(
      "[WizardHeader] No se encontró ProgressContext. El stepper no se renderizará."
    );
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="w-48"></div>
      <div className="flex-grow flex items-center justify-center">
        <ProgressStepper
          steps={progressContext.steps}
          onStepClick={progressContext.onStepClick}
        />
      </div>
      <SyncStatusIndicator />
    </div>
  );
}
