// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identity/Step0.tsx
/**
 * @file Step0.tsx
 * @description Ensamblador y Cargador de Datos para el Paso 0 de la SDC.
 *              v3.0.0 (Holistic Type Alignment): Se alinea con la nueva
 *              arquitectura de props "envueltas", desenvolviendo el contenido
 *              antes de pasarlo al cliente.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { logger } from "@/shared/lib/logging";
import { Step0Client } from "./Step0Client";
import { getBaseCampaignsAction } from "../../_actions";
import { DynamicIcon } from "@/components/ui";
import type { StepProps } from "../../_types/step.types";
import type { Step0ContentSchema } from "@/shared/lib/schemas/campaigns/steps/step0.schema";
import type { z } from "zod";

type Content = z.infer<typeof Step0ContentSchema>;

export default function Step0({
  content: rawContent,
}: StepProps<{ step0: Content }>): React.ReactElement {
  const content = rawContent.step0;
  const [baseCampaigns, setBaseCampaigns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      logger.info("[Step0] Obteniendo campañas base desde el servidor...");
      const result = await getBaseCampaignsAction();
      if (result.success) {
        setBaseCampaigns(result.data);
      } else {
        toast.error("Error de Carga", { description: result.error });
      }
      setIsLoading(false);
    };
    fetchCampaigns();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <DynamicIcon name="LoaderCircle" className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return <Step0Client content={content} baseCampaigns={baseCampaigns} />;
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identity/Step0.tsx
