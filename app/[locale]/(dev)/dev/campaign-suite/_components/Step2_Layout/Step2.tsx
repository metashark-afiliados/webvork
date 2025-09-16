// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/Step2.tsx
/**
 * @file Step2.tsx
 * @description Ensamblador de Servidor para el Paso 2 de la SDC (Layout).
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { Step2Client } from "./Step2Client";

interface Step2Props {
  content: NonNullable<Dictionary["campaignSuitePage"]>["step2"];
}

export default async function Step2({
  content,
}: Step2Props): Promise<React.ReactElement> {
  logger.info("[Step2 Ensamblador] Ensamblando y delegando al cliente...");
  return <Step2Client content={content} />;
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/Step2.tsx
