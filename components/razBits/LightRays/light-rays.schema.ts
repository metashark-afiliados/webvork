// src/components/razBits/LightRays/light-rays.schema.ts
/**
 * @file light-rays.schema.ts
 * @description Esquema de Zod para la configuración del componente LightRays.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

export const RaysOriginSchema = z.enum([
  "top-center",
  "top-left",
  "top-right",
  "right",
  "left",
  "bottom-center",
  "bottom-right",
  "bottom-left",
]);

// Define el contrato para el objeto de configuración del efecto visual
export const LightRaysConfigSchema = z.object({
  raysOrigin: RaysOriginSchema.default("top-center"),
  raysColor: z.string().default("primary"), // Clave de color semántica
  raysSpeed: z.number().min(0).default(1.5),
  lightSpread: z.number().min(0).default(0.8),
  rayLength: z.number().min(0).default(1.2),
  pulsating: z.boolean().default(false),
  fadeDistance: z.number().min(0).max(1).default(1.0),
  saturation: z.number().min(0).max(1).default(1.0),
  followMouse: z.boolean().default(true),
  mouseInfluence: z.number().min(0).max(1).default(0.1),
  noiseAmount: z.number().min(0).max(1).default(0.1),
  distortion: z.number().min(0).max(1).default(0.05),
});

// Define la clave de nivel superior para el diccionario i18n
export const LightRaysLocaleSchema = z.object({
  lightRays: LightRaysConfigSchema.optional(),
});
// src/components/razBits/LightRays/light-rays.schema.ts
