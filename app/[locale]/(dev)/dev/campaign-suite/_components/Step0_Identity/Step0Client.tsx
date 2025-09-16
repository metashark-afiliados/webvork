// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identity/Step0Client.tsx
/**
 * @file Step0Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 0.
 *              v2.0.0: Refactorizado para consumir el contexto de navegación `useWizard`.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { step0Schema, type Step0Data } from "../../_schemas/step0.schema";
import { useCampaignDraft } from "../../_hooks";
import { useWizard } from "../../_context/WizardContext"; // <-- Se consume el nuevo contexto
import { Step0Form } from "./Step0Form";

type Step0Content = NonNullable<Dictionary["campaignSuitePage"]>["step0"];

interface Step0ClientProps {
  content: Step0Content;
  baseCampaigns: string[];
}

export function Step0Client({
  content,
  baseCampaigns,
}: Step0ClientProps): React.ReactElement {
  logger.info("Renderizando Step0Client (Contenedor de Lógica)");

  const { draft, updateDraft } = useCampaignDraft();
  const { goToNextStep, goToPrevStep } = useWizard(); // <-- Se obtienen las acciones de navegación

  const form = useForm<Step0Data>({
    resolver: zodResolver(step0Schema),
    defaultValues: {
      baseCampaignId: draft.baseCampaignId ?? "",
      variantName: draft.variantName ?? "",
      seoKeywords: draft.seoKeywords ?? "",
      affiliateNetwork: draft.affiliateNetwork ?? "",
      affiliateUrl: draft.affiliateUrl ?? "",
    },
  });

  const { reset } = form;

  const onSubmit = (data: Step0Data) => {
    logger.trace(
      "[Step0Client] Formulario válido. Actualizando estado y navegando."
    );
    updateDraft(data);
    goToNextStep(); // <-- Se usa la acción de navegación del contexto
  };

  useEffect(() => {
    if (draft) {
      logger.trace("[Step0Client] Sincronizando formulario con el borrador.");
      reset({
        baseCampaignId: draft.baseCampaignId ?? "",
        variantName: draft.variantName ?? "",
        seoKeywords: draft.seoKeywords ?? "",
        affiliateNetwork: draft.affiliateNetwork ?? "",
        affiliateUrl: draft.affiliateUrl ?? "",
      });
    }
  }, [draft, reset]);

  return (
    <Step0Form
      form={form}
      content={content}
      baseCampaigns={baseCampaigns}
      onSubmit={onSubmit}
      onBack={goToPrevStep} // <-- Se usa la acción de navegación del contexto
      isBackButtonDisabled={draft.step === 0}
    />
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identity/Step0Client.tsx
