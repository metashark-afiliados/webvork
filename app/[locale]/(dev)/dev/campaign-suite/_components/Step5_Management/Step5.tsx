// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5.tsx
/**
 * @file Step5.tsx
 * @description Ensamblador de Servidor para el Paso 5 de la SDC (Gestión).
 * @version 3.0.0 (Holistic Type Alignment): Se alinea con la nueva
 *              arquitectura de props "envueltas".
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";
import { Step5Client } from "./Step5Client";
import type { StepProps } from "../../_types/step.types";
import type { Step5ContentSchema } from "../../../../../../../lib/schemas/campaigns/steps/step5.schema";
import type { z } from "zod";

type Content = z.infer<typeof Step5ContentSchema>;

export default async function Step5({
  content: rawContent,
}: StepProps<{ step5: Content }>): Promise<React.ReactElement> {
  const content = rawContent.step5;
  logger.info("[Step5 Ensamblador] Ensamblando y delegando al cliente (v3.0).");
  return <Step5Client content={content} />;
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5.tsx
