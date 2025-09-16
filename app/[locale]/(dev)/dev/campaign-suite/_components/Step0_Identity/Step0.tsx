// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identity/Step0.tsx
/**
 * @file Step0.tsx
 * @description Ensamblador y Cargador de Datos para el Paso 0 de la SDC.
 *              v2.2.0: Corrige la importación de DynamicIcon.
 * @version 2.2.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { Step0Client } from "./Step0Client";
import { getBaseCampaignsAction } from "../../_actions";
import { DynamicIcon } from "@/components/ui"; // <-- CORRECCIÓN

interface Step0Props {
  content: NonNullable<Dictionary["campaignSuitePage"]>["step0"];
}

export default function Step0({ content }: Step0Props): React.ReactElement {
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
