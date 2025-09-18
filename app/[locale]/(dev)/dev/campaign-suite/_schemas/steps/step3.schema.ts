// app/[locale]/(dev)/dev/campaign-suite/_schemas/steps/step3.schema.ts
/**
 * @file step3.schema.ts
 * @description SSoT para el contrato de datos del contenido i18n del Paso 3 de la SDC.
 * @version 2.0.0 (UI Contract Sync)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

export const Step3ContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  themeSelectorTitle: z.string(),
  colorsLabel: z.string(),
  fontsLabel: z.string(),
  radiiLabel: z.string(),
  colorsPlaceholder: z.string(),
  fontsPlaceholder: z.string(),
  radiiPlaceholder: z.string(),
  nextButtonText: z.string(),
});
// app/[locale]/(dev)/dev/campaign-suite/_schemas/steps/step3.schema.ts
