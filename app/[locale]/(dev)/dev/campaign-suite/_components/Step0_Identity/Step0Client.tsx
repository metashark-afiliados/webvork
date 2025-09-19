// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identity/Step0Client.tsx
/**
 * @file Step0Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 0.
 * @version 2.3.0 (Sovereign Type Contract)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logger } from "@/lib/logging";
import { step0Schema, type Step0Data } from "../../_schemas/step0.schema";
import { useCampaignDraft } from "../../_hooks";
import { useWizard } from "../../_context/WizardContext";
import { Step0Form } from "./Step0Form";
import { Step0ContentSchema } from "@/lib/schemas/campaigns/steps/step0.schema";
import { z } from "zod";

type Step0Content = z.infer<typeof Step0ContentSchema>;

interface Step0ClientProps {
  content?: Step0Content;
  baseCampaigns: string[];
}

export function Step0Client({
  content,
  baseCampaigns,
}: Step0ClientProps): React.ReactElement {
  logger.info("Renderizando Step0Client (Contrato Soberano)");

  if (!content) {
    logger.error("[Step0Client] El contenido para el Paso 0 es indefinido.");
    return <div className="text-destructive p-8">Error: Faltan datos de contenido para este paso.</div>;
  }

  const { draft, updateDraft } = useCampaignDraft();
  const { goToNextStep } = useWizard();

  const form = useForm<Step0Data>({
    resolver: zodResolver(step0Schema),
    defaultValues: {
      baseCampaignId: draft.baseCampaignId ?? baseCampaigns[0] ?? "",
      variantName: draft.variantName ?? "Test Variant",
      seoKeywords: draft.seoKeywords ?? "test, keywords, for, seo",
      affiliateNetwork: draft.affiliateNetwork ?? "webvork",
      affiliateUrl: draft.affiliateUrl ?? "https://example.com/offer/123",
    },
  });

  const onSubmit = (data: Step0Data) => {
    updateDraft(data);
    goToNextStep();
  };

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
