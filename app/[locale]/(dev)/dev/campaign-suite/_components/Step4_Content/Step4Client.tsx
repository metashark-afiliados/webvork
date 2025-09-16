// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Client.tsx
/**
 * @file Step4Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 4 (Contenido).
 *              v3.1.0: Refactorizado para consumir el contexto de navegación `useWizard`.
 * @version 3.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useTransition } from "react";
import { useCampaignDraft } from "../../_hooks";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { Step4Form } from "./Step4Form";
import type { Locale } from "@/lib/i18n.config";
import { generateCampaignAssetsAction } from "../../_actions/generateCampaignAssets.action";
import { toast } from "sonner";
import { useWizard } from "../../_context/WizardContext"; // <-- Se consume el nuevo contexto

type Step4Content = NonNullable<Dictionary["campaignSuitePage"]>["step4"];

interface Step4ClientProps {
  content: Step4Content;
}

export function Step4Client({ content }: Step4ClientProps): React.ReactElement {
  logger.info("Renderizando Step4Client (Contenedor de Lógica)");

  const { draft, updateSectionContent } = useCampaignDraft();
  const { goToNextStep, goToPrevStep } = useWizard(); // <-- Se obtienen las acciones de navegación
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleEditSection = (sectionName: string) =>
    setEditingSection(sectionName);
  const handleCloseEditor = () => setEditingSection(null);

  const handleUpdateContent = (locale: Locale, field: string, value: any) => {
    if (editingSection) {
      updateSectionContent(editingSection, locale, field, value);
    }
  };

  // El botón "Siguiente" del Paso 4 ahora navega al Paso 5.
  // La lógica de `handleGenerateAssets` se moverá al Paso 5.
  const handleNext = () => {
    goToNextStep();
  };

  return (
    <Step4Form
      content={content}
      draft={draft}
      onEditSection={handleEditSection}
      onCloseEditor={handleCloseEditor}
      editingSection={editingSection}
      onUpdateContent={handleUpdateContent}
      onBack={goToPrevStep} // <-- Se usa la acción de navegación del contexto
      onNext={handleNext} // <-- Ahora navega al siguiente paso
      isPending={isPending}
    />
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Client.tsx
