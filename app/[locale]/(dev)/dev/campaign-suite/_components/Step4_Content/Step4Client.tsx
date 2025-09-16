// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Client.tsx
/**
 * @file Step4Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 4 (Contenido).
 *              v3.3.0: Se asegura que el callback `onUpdateContent` pasado a
 *              Step4Form cumpla con el nuevo contrato de datos unificado.
 * @version 3.3.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { useCampaignDraft } from "../../_hooks";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { Step4Form } from "./Step4Form";
import type { Locale } from "@/lib/i18n.config";
import { useWizard } from "../../_context/WizardContext";

type Step4Content = NonNullable<Dictionary["campaignSuitePage"]>["step4"];

interface Step4ClientProps {
  content: Step4Content;
}

export function Step4Client({ content }: Step4ClientProps): React.ReactElement {
  logger.info(
    "[Step4Client] Renderizando (Contenedor de Lógica, Contrato Corregido)"
  );

  const { draft, updateSectionContent } = useCampaignDraft();
  const { goToNextStep, goToPrevStep } = useWizard();
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const handleEditSection = (sectionName: string) =>
    setEditingSection(sectionName);
  const handleCloseEditor = () => setEditingSection(null);

  // La firma de esta función ya era correcta, ahora se alinea con el hijo.
  const handleUpdateContent = (
    sectionName: string,
    locale: Locale,
    field: string,
    value: any
  ) => {
    updateSectionContent(sectionName, locale, field, value);
  };

  const handleNext = () => goToNextStep();

  return (
    <Step4Form
      content={content}
      draft={draft}
      onEditSection={handleEditSection}
      onCloseEditor={handleCloseEditor}
      editingSection={editingSection}
      onUpdateContent={handleUpdateContent} // Ahora la firma coincide con la prop de Step4Form
      onBack={goToPrevStep}
      onNext={handleNext}
      isPending={false}
    />
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Client.tsx
