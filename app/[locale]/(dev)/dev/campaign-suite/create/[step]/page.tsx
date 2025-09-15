// app/[locale]/(dev)/dev/campaign-suite/create/[step]/page.tsx
/**
 * @file page.tsx
 * @description Proveedor de datos de servidor para un paso del asistente SDC.
 *              Obtiene todos los datos de servidor y el constructor del componente
 *              y los delega al StepClientWrapper para su composición en el cliente.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { logger } from "@/lib/logging";
import type { Locale } from "@/lib/i18n.config";
import { stepsConfig } from "../../_config/wizard.config";
import { StepClientWrapper } from "../../_components";
import { getAllCampaignsAndVariants } from "@/lib/dev/campaign.utils";

interface StepPageProps {
  params: { locale: Locale; step: string };
}

export default async function StepPage({ params }: StepPageProps) {
  const stepId = parseInt(params.step, 10);
  const stepConfig = stepsConfig.find((s) => s.id === stepId);

  if (isNaN(stepId) || !stepConfig) {
    logger.error(`[StepPage] Paso no encontrado o inválido: ${params.step}`);
    return notFound();
  }

  logger.info(`[StepPage] Proveyendo datos de servidor para el paso ${stepId}`);

  // 1. Carga de todos los datos necesarios en el servidor.
  const { dictionary } = await getDictionary(params.locale);
  const wizardContent = dictionary.campaignSuitePage;
  const campaigns = await getAllCampaignsAndVariants();
  const baseCampaigns = Array.from(new Set(campaigns.map((c) => c.campaignId)));

  if (!wizardContent) {
    const errorMsg =
      "Contenido del Asistente (wizardContent) no encontrado en el diccionario.";
    logger.error(`[StepPage] ${errorMsg}`);
    return <div>Error: {errorMsg}</div>;
  }

  // 2. Delegar la composición y renderizado al componente de cliente,
  //    pasándole los datos de servidor y el *constructor* del componente.
  return (
    <StepClientWrapper
      currentStepId={stepId}
      stepConfig={stepConfig}
      wizardContent={wizardContent}
      baseCampaigns={baseCampaigns}
    />
  );
}
// app/[locale]/(dev)/dev/campaign-suite/create/[step]/page.tsx
