// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Client.tsx
/**
@file Step5Client.tsx
@description Orquestador de Cliente puro para el Paso 5.
@version 9.1.0 (Resilience Guard & Sovereign Contract)
@author RaZ Podestá - MetaShark Tech
*/
"use client";
import React from "react";
import { logger } from "@/lib/logging";
import { useWizard } from "../../_context/WizardContext";
import { useCampaignLifecycle } from "../../_hooks/useCampaignLifecycle";
import { useCampaignTemplates } from "../../_hooks/useCampaignTemplates";
import { AlertDialog } from "@/components/ui/AlertDialog";
import { Step5Form } from "./Step5Form";
import { DeleteDraftDialog } from "./_components/DeleteDraftDialog";
import { validateDraftForLaunch } from "../../_utils/draft.validator";
import { useCampaignDraft } from "../../_hooks/useCampaignDraft";
import { Step5ContentSchema } from "@/lib/schemas/campaigns/steps/step5.schema";
import { z } from "zod";
type Content = z.infer<typeof Step5ContentSchema>;
interface Step5ClientProps {
  content?: Content;
}
export function Step5Client({ content }: Step5ClientProps): React.ReactElement {
  logger.info("[Step5Client] Renderizando orquestador de lógica v9.1.");
  // --- [INICIO] GUARDIA DE RESILIENCIA ---
  if (!content) {
    logger.error("[Step5Client] El contenido para el Paso 5 es indefinido.");
    return (
      <div className="text-destructive p-8">
        Error: Faltan datos de contenido para este paso.
      </div>
    );
  }
  // --- [FIN] GUARDIA DE RESILIENCIA ---
  const { goToPrevStep } = useWizard();
  const { draft } = useCampaignDraft();
  const {
    onPublish,
    onPackage,
    onDelete,
    isPublishing,
    isPackaging,
    isDeleting,
  } = useCampaignLifecycle();
  const { onSaveAsTemplate, isSavingTemplate } = useCampaignTemplates();
  const checklistItems = validateDraftForLaunch(draft);
  const isReadyForLaunch = checklistItems.every((item) => item.isCompleted);
  return (
    <AlertDialog>
      <Step5Form
        content={content}
        draft={draft}
        onBack={goToPrevStep}
        onPublish={onPublish}
        onPackage={onPackage}
        onSaveAsTemplate={onSaveAsTemplate}
        isPublishing={isPublishing}
        isPackaging={isPackaging}
        isDeleting={isDeleting}
        isSavingTemplate={isSavingTemplate}
        isLaunchReady={isReadyForLaunch}
        checklistItems={checklistItems}
      />
      {/* El acceso a content.deleteDialog ahora es seguro gracias a la guardia */}
      <DeleteDraftDialog
        content={content.deleteDialog}
        onConfirmDelete={onDelete}
      />
    </AlertDialog>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Client.tsx
