// app/[locale]/(dev)/dev/campaign-suite/_components/Step3_Theme/Step3.tsx
/**
 * @file Step3.tsx
 * @description Ensamblador de Servidor para el Paso 3 de la SDC (Tema).
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { Step3Client } from "./Step3Client";
import { getThemeFragmentsAction } from "../../_actions/getThemeFragments.action";

interface Step3Props {
  content: NonNullable<Dictionary["campaignSuitePage"]>["step3"];
}

export default async function Step3({
  content,
}: Step3Props): Promise<React.ReactElement> {
  logger.info("[Step3 Ensamblador] Obteniendo datos de servidor...");

  const fragmentsResult = await getThemeFragmentsAction();

  return <Step3Client content={content} fragmentsResult={fragmentsResult} />;
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step3_Theme/Step3.tsx
