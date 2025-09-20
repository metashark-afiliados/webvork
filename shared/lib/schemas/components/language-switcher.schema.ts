// RUTA: lib/schemas/components/language-switcher.schema.ts

/**
 * @file language-switcher.schema.ts
 * @description SSoT para el contrato de datos del contenido i18n del componente LanguageSwitcher.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

export const LanguageSwitcherContentSchema = z.object({
  ariaLabel: z.string().min(1, "La etiqueta ARIA es requerida."),
  languages: z.object({
    "it-IT": z.string(),
    "es-ES": z.string(),
    "en-US": z.string(),
    "pt-BR": z.string(),
  }),
});

export const LanguageSwitcherLocaleSchema = z.object({
  languageSwitcher: LanguageSwitcherContentSchema.optional(),
});
