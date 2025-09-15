// app/[locale]/(dev)/dev/campaign-suite/_schemas/step0.schema.ts
/**
 * @file step0.schema.ts
 * @description Schema de Zod para la validación del formulario del Paso 0.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

export const step0Schema = z.object({
  baseCampaignId: z
    .string()
    .min(1, { message: "Debes seleccionar una campaña base." }),
  variantName: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  seoKeywords: z
    .string()
    .min(5, { message: "Debes añadir al menos una palabra clave." }),
  affiliateNetwork: z
    .string()
    .min(1, { message: "Debes seleccionar una red de afiliados." }),
  affiliateUrl: z
    .string()
    .url({ message: "Por favor, introduce una URL válida." }),
});

export type Step0Data = z.infer<typeof step0Schema>;
// app/[locale]/(dev)/dev/campaign-suite/_schemas/step0.schema.ts
