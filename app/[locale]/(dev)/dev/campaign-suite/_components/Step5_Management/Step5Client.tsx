// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Client.tsx
/**
 * @file Step5Client.tsx
 * @description Orquestador de Cliente puro para el Paso 5. Ahora consume
 *              hooks de lógica atómicos y pasa el borrador al formulario.
 * @version 9.0.0 (Detailed Campaign Summary Integration)
 * @author RaZ Podestá - MetaShark Tech
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
import type { Step5ContentSchema } from "../../_schemas/steps/step5.schema";
import type { z } from "zod";

type Content = z.infer<typeof Step5ContentSchema>;

interface Step5ClientProps {
  content: Content;
}

export function Step5Client({ content }: Step5ClientProps): React.ReactElement {
  logger.info("[Step5Client] Renderizando orquestador de lógica v9.0.");

  const { goToPrevStep } = useWizard();
  const { draft } = useCampaignDraft();

  // Consumiendo los nuevos hooks atómicos
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
        draft={draft} // <-- Pasar el borrador a Step5Form
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
      <DeleteDraftDialog
        content={content.deleteDialog}
        onConfirmDelete={onDelete}
      />
    </AlertDialog>
  );
}

