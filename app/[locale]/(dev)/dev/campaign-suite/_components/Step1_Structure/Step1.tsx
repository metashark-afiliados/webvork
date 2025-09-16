// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1.tsx
/**
 * @file Step1.tsx
 * @description Ensamblador de Servidor para el Paso 1 de la SDC (Estructura).
 *              v1.1.0: Corregida la importación para apuntar a Step1Client.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- [INICIO DE CORRECCIÓN] ---
import { Step1Client } from "./Step1Client";
// --- [FIN DE CORRECCIÓN] ---

interface Step1Props {
  content: NonNullable<Dictionary["campaignSuitePage"]>["step1"];
}

export default async function Step1({
  content,
}: Step1Props): Promise<React.ReactElement> {
  logger.info("[Step1 Ensamblador] Ensamblando y delegando al cliente...");
  return <Step1Client content={content} />;
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1.tsx
