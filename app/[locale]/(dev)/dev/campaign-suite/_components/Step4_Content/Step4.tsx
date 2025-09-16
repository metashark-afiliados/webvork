// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4.tsx
/**
 * @file Step4.tsx
 * @description Ensamblador de Servidor para el Paso 4 de la SDC (Contenido).
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { Step4Client } from "./Step4Client";

interface Step4Props {
  content: NonNullable<Dictionary["campaignSuitePage"]>["step4"];
}

export default async function Step4({
  content,
}: Step4Props): Promise<React.ReactElement> {
  logger.info("[Step4 Ensamblador] Ensamblando y delegando al cliente...");
  return <Step4Client content={content} />;
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4.tsx
