// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Client.tsx
/**
 * @file Step4Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 4 (Contenido).
 *              v3.4.0 (Type Safety): Se alinea la firma de 'handleUpdateContent'
 *              con el nuevo contrato de tipo seguro que utiliza 'unknown'.
 * @version 3.4.0
 * @author RaZ Podestá - MetaShark Tech
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
    "[Step4Client] Renderizando (Contenedor de Lógica, Contrato Seguro)"
  );

  const { draft, updateSectionContent } = useCampaignDraft();
  const { goToNextStep, goToPrevStep } = useWizard();
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const handleEditSection = (sectionName: string) =>
    setEditingSection(sectionName);
  const handleCloseEditor = () => setEditingSection(null);

  // --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
  const handleUpdateContent = (
    sectionName: string,
    locale: Locale,
    field: string,
    value: unknown // El tipo ahora es 'unknown'
  ) => {
    updateSectionContent(sectionName, locale, field, value);
  };
  // --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

  const handleNext = () => goToNextStep();

  return (
    <Step4Form
      content={content}
      draft={draft}
      onEditSection={handleEditSection}
      onCloseEditor={handleCloseEditor}
      editingSection={editingSection}
      onUpdateContent={handleUpdateContent}
      onBack={goToPrevStep}
      onNext={handleNext}
      isPending={false}
    />
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Client.tsx
