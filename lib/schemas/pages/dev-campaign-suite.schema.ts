// lib/schemas/pages/dev-campaign-suite.schema.ts
/**
 * @file dev-campaign-suite.schema.ts
 * @description Esquema de Zod y SSoT para el contenido i18n de la SDC.
 * @version 7.0.0 (Architectural Fix): Corrige la dependencia circular
 *              importando los schemas de los pasos desde su ubicación canónica en lib/.
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import {
  Step0ContentSchema,
  Step1ContentSchema,
  Step2ContentSchema,
  Step3ContentSchema,
  Step4ContentSchema,
  Step5ContentSchema,
} from "../campaigns/steps"; // <-- RUTA CORREGIDA
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

export const CampaignSuiteLocaleSchema = z.object({
  campaignSuitePage: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      step0: Step0ContentSchema.optional(),
      step1: Step1ContentSchema.optional(),
      step2: Step2ContentSchema.optional(),
      step3: Step3ContentSchema.optional(),
      step4: Step4ContentSchema.optional(),
      step5: Step5ContentSchema.optional(),
    })
    .optional(),
});
