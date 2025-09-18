// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Form.tsx
/**
 * @file Step5Form.tsx
 * @description Orquestador de presentación puro para el Paso 5, ahora con el
 *              Checklist de Lanzamiento integrado y resumen detallado de la campaña.
 * @version 7.0.0 (Detailed Campaign Summary)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui";
import { logger } from "@/lib/logging";
import {
  CampaignSummary,
  ManagementActions,
  LaunchChecklist,
} from "./_components";
import type { Step5ContentSchema } from "../../_schemas/steps/step5.schema";
import type { z } from "zod";
import type { ChecklistItem } from "../../_utils/draft.validator";
import type { CampaignDraft } from "../../_types/draft.types"; // <-- NUEVA IMPORTACIÓN

type Content = z.infer<typeof Step5ContentSchema>;

interface Step5FormProps {
  content: Content;
  draft: CampaignDraft; // <-- NUEVO: Recibe el borrador completo
  onBack: () => void;
  onPublish: () => void;
  onPackage: () => void;
  onSaveAsTemplate: (name: string, description: string) => void;
  isPublishing: boolean;
  isPackaging: boolean;
  isDeleting: boolean;
  isSavingTemplate: boolean;
  checklistItems: ChecklistItem[];
}

export function Step5Form({
  content,
  draft, // <-- Recibe el borrador
  onBack,
  onPublish,
  onPackage,
  onSaveAsTemplate,
  isPublishing,
  isPackaging,
  isDeleting,
  isSavingTemplate,
  checklistItems,
}: Step5FormProps): React.ReactElement {
  logger.info("[Step5Form] Renderizando orquestador de presentación v7.0.");

  const isReadyForLaunch = checklistItems.every((item) => item.isCompleted);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <CampaignSummary
            draft={draft} // <-- Pasar el borrador a CampaignSummary
            title={content.summaryTitle}
            placeholder={content.summaryPlaceholder}
          />
          <LaunchChecklist
            items={checklistItems}
            title={content.checklistTitle}
          />
        </div>
        <ManagementActions
          onBack={onBack}
          onPublish={onPublish}
          onPackage={onPackage}
          onSaveAsTemplate={onSaveAsTemplate}
          isPublishing={isPublishing}
          isPackaging={isPackaging}
          isDeleting={isDeleting}
          isSavingTemplate={isSavingTemplate}
          isLaunchReady={isReadyForLaunch}
          publishButtonText={content.publishButtonText}
          packageButtonText={content.packageButtonText}
          deleteButtonText={content.deleteButtonText}
          templateButtonText={content.templateButtonText}
          templateDialogContent={content.templateDialog}
        />
      </CardContent>
    </Card>
  );
}
