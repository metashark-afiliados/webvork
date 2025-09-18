// lib/schemas/raz-prompts/prompt-creator.i18n.schema.ts
/**
 * @file prompt-creator.i18n.schema.ts
 * @description SSoT para el contrato de datos del contenido i18n del componente PromptCreator.
 * @version 2.0.0 (Ideogram Parameters i18n)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

const SesaOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const PromptCreatorContentSchema = z.object({
  titleLabel: z.string(),
  titlePlaceholder: z.string(),
  promptTextLabel: z.string(),
  promptTextPlaceholder: z.string(),
  negativePromptLabel: z.string(), // <-- NUEVO
  negativePromptPlaceholder: z.string(), // <-- NUEVO
  tagsGroupLabel: z.string(),
  parametersGroupLabel: z.string(), // <-- NUEVO
  keywordsLabel: z.string(),
  keywordsPlaceholder: z.string(),
  keywordsDescription: z.string(),
  submitButtonText: z.string(),
  submitButtonLoadingText: z.string(),
  sesaLabels: z.object({
    ai: z.string(),
    sty: z.string(),
    fmt: z.string(),
    typ: z.string(),
    sbj: z.string(),
  }),
  sesaOptions: z.object({
    ai: z.array(SesaOptionSchema),
    sty: z.array(SesaOptionSchema),
    fmt: z.array(SesaOptionSchema),
    typ: z.array(SesaOptionSchema),
    sbj: z.array(SesaOptionSchema),
  }),
  // Nuevas etiquetas y opciones para los parámetros de Ideogram.ai
  renderingSpeedLabel: z.string(), // <-- NUEVO
  renderingSpeedPlaceholder: z.string(), // <-- NUEVO
  renderingSpeedOptions: z.array(SesaOptionSchema), // <-- NUEVO
  styleTypeLabel: z.string(), // <-- NUEVO
  styleTypePlaceholder: z.string(), // <-- NUEVO
  styleTypeOptions: z.array(SesaOptionSchema), // <-- NUEVO
  aspectRatioLabel: z.string(), // <-- NUEVO
  aspectRatioPlaceholder: z.string(), // <-- NUEVO
  aspectRatioOptions: z.array(SesaOptionSchema), // <-- NUEVO
  numImagesLabel: z.string(), // <-- NUEVO
  numImagesPlaceholder: z.string(), // <-- NUEVO
  sizeLabel: z.string(), // <-- NUEVO
  sizePlaceholder: z.string(), // <-- NUEVO
  sizeOptions: z.array(SesaOptionSchema), // <-- NUEVO
});

export const PromptCreatorLocaleSchema = z.object({
  promptCreator: PromptCreatorContentSchema.optional(),
});
