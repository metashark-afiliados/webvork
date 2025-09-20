// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Form.tsx
/**
 * @file Step5Form.tsx
 * @description Orquestador de presentación puro para el Paso 5.
 * @version 8.0.0 (Absolute Path & Contract Sync)
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
import { logger } from "@/shared/lib/logging";
import {
  CampaignSummary,
  ManagementActions,
  LaunchChecklist,
} from "./_components";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// Se utiliza la ruta absoluta canónica, resolviendo el error TS2307.
import type { Step5ContentSchema } from "@/shared/lib/schemas/campaigns/steps/step5.schema";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
import type { z } from "zod";
import type { ChecklistItem } from "../../_utils/draft.validator";
import type { CampaignDraft } from "../../_types/draft.types";

type Content = z.infer<typeof Step5ContentSchema>;

interface Step5FormProps {
  content: Content;
  draft: CampaignDraft;
  onBack: () => void;
  onPublish: () => void;
  onPackage: () => void;
  onSaveAsTemplate: (name: string, description: string) => void;
  isPublishing: boolean;
  isPackaging: boolean;
  isDeleting: boolean;
  isSavingTemplate: boolean;
  isLaunchReady: boolean;
  checklistItems: ChecklistItem[];
}

export function Step5Form({
  content,
  draft,
  onBack,
  onPublish,
  onPackage,
  onSaveAsTemplate,
  isPublishing,
  isPackaging,
  isDeleting,
  isSavingTemplate,
  isLaunchReady,
  checklistItems,
}: Step5FormProps): React.ReactElement {
  logger.info("[Step5Form] Renderizando orquestador de presentación v8.0.");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <CampaignSummary
            draft={draft}
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
          isLaunchReady={isLaunchReady}
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
// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Form.tsx
