// lib/schemas/components/social-proof-logos.schema.ts
/**
 * @file social-proof-logos.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente SocialProofLogos.
 *              Define el contrato para la lista de logos de prueba social.
 *              - v3.0.0: Nomenclatura normalizada para alinearse con la SSoT de `sections.config.ts`,
 *                cambiando la clave principal de `socialProof` a `socialProofLogos`.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

/**
 * @const LogoSchema
 * @description Valida la estructura de un único logo, asegurando que tenga una
 *              ruta de imagen absoluta y un texto alternativo.
 */
const LogoSchema = z.object({
  src: z
    .string()
    .startsWith("/", "La ruta de la imagen debe ser absoluta desde /public."),
  alt: z.string().min(1, "El texto alternativo del logo es requerido."),
});

/**
 * @type Logo
 * @description Infiere el tipo TypeScript para un objeto de logo, promoviendo la reutilización.
 */
export type Logo = z.infer<typeof LogoSchema>;

/**
 * @const SocialProofLogosLocaleSchema
 * @description Valida la estructura del contenido de la sección para un único locale.
 */
export const SocialProofLogosLocaleSchema = z.object({
  /**
   * @property {object} socialProofLogos - Contenedor principal del contenido.
   *                                      Clave normalizada para consistencia arquitectónica.
   */
  socialProofLogos: z
    .object({
      title: z.string(),
      logos: z.array(LogoSchema),
    })
    .optional(),
});

/**
 * @const SocialProofLogosI18nSchema
 * @description Valida la estructura completa del archivo `social-proof-logos.i18n.json`.
 */
export const SocialProofLogosI18nSchema = z.object({
  "es-ES": SocialProofLogosLocaleSchema,
  "pt-BR": SocialProofLogosLocaleSchema,
  "en-US": SocialProofLogosLocaleSchema,
  "it-IT": SocialProofLogosLocaleSchema,
});
// lib/schemas/components/social-proof-logos.schema.ts
