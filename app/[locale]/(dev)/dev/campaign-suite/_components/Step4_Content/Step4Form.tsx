// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Form.tsx
/**
 * @file Step4Form.tsx
 * @description Orquestador de Presentación para el Paso 4.
 *              v5.0.0 (Hyper-Atomization): Refactorizado para ensamblar los
 *              subcomponentes atómicos `SectionList` y `WizardNavigation`.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { CampaignDraft } from "../../_types/draft.types";
import type { Locale } from "@/lib/i18n.config";
import { sectionsConfig } from "@/lib/config/sections.config";
import { ContentEditor } from "./ContentEditor";
import { SectionList } from "./components/SectionList";
import { WizardNavigation } from "../../_components/WizardNavigation";

type Step4Content = NonNullable<Dictionary["campaignSuitePage"]>["step4"];

interface Step4FormProps {
  content: Step4Content;
  draft: CampaignDraft;
  onEditSection: (sectionName: string) => void;
  onCloseEditor: () => void;
  editingSection: string | null;
  onUpdateContent: (sectionName: string, locale: Locale, field: string, value: any) => void;
  onBack: () => void;
  onNext: () => void;
  isPending: boolean;
}

export function Step4Form({
  content,
  draft,
  onEditSection,
  onCloseEditor,
  editingSection,
  onUpdateContent,
  onBack,
  onNext,
  isPending,
}: Step4FormProps): React.ReactElement {
  logger.info("[Step4Form] Orquestando presentación del Paso 4.");

  const editingSectionSchema = editingSection
    ? sectionsConfig[editingSection as keyof typeof sectionsConfig]?.schema
    : null;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
          <CardDescription>{content.contentEditorDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <SectionList
            layoutConfig={draft.layoutConfig}
            onEditSection={onEditSection}
          />
          <WizardNavigation
            onBack={onBack}
            onNext={onNext}
            isPending={isPending}
            nextButtonText="Finalizar y Continuar"
          />
        </CardContent>
      </Card>

      {editingSection && editingSectionSchema && (
        <ContentEditor
          sectionName={editingSection}
          sectionSchema={editingSectionSchema}
          draft={draft}
          onClose={onCloseEditor}
          onUpdateContent={onUpdateContent}
        />
      )}
    </>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Form.tsx
