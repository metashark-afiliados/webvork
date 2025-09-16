// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identity/Step0Client.tsx
/**
 * @file Step0Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 0.
 *              v2.1.0 (DX Enhancement): Pre-rellena el formulario con valores
 *              de prueba para agilizar el flujo de desarrollo y pruebas.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { step0Schema, type Step0Data } from "../../_schemas/step0.schema";
import { useCampaignDraft } from "../../_hooks";
import { useWizard } from "../../_context/WizardContext";
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
  const { goToNextStep } = useWizard();

  const form = useForm<Step0Data>({
    resolver: zodResolver(step0Schema),
    // --- [INICIO] MEJORA DE DX: VALORES POR DEFECTO ---
    defaultValues: {
      baseCampaignId: draft.baseCampaignId ?? baseCampaigns[0] ?? "",
      variantName: draft.variantName ?? "Test Variant",
      seoKeywords: draft.seoKeywords ?? "test, keywords, for, seo",
      affiliateNetwork: draft.affiliateNetwork ?? "webvork",
      affiliateUrl: draft.affiliateUrl ?? "https://example.com/offer/123",
    },
    // --- [FIN] MEJORA DE DX: VALORES POR DEFECTO ---
  });

  const onSubmit = (data: Step0Data) => {
    updateDraft(data);
    goToNextStep();
  };

  // Sincronización con el borrador persistido (sin cambios)
  useEffect(() => {
    form.reset({
      baseCampaignId: draft.baseCampaignId ?? baseCampaigns[0] ?? "",
      variantName: draft.variantName ?? "Test Variant",
      seoKeywords: draft.seoKeywords ?? "test, keywords, for, seo",
      affiliateNetwork: draft.affiliateNetwork ?? "webvork",
      affiliateUrl: draft.affiliateUrl ?? "https://example.com/offer/123",
    });
  }, [draft, baseCampaigns, form.reset]);

  return (
    <Step0Form
      form={form}
      content={content}
      baseCampaigns={baseCampaigns}
      onSubmit={onSubmit}
    />
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identity/Step0Client.tsx
