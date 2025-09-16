// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5.tsx
/**
 * @file Step5.tsx
 * @description Ensamblador de Servidor para el Paso 5 de la SDC (Gestión).
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { Step5Client } from "./Step5Client";

interface Step5Props {
  content: NonNullable<Dictionary["campaignSuitePage"]>["step5"];
}

export default async function Step5({
  content,
}: Step5Props): Promise<React.ReactElement> {
  logger.info("[Observabilidad] Renderizando Step5 Ensamblador de Servidor...");
  return <Step5Client content={content} />;
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5.tsx
