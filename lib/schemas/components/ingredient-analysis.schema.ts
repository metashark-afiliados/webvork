// src/lib/schemas/components/ingredient-analysis.schema.ts
import { z } from "zod";

/**
 * @file ingredient-analysis.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente IngredientAnalysis.
 * @version 2.0.0
 */

// Define la estructura para un único locale.
export const IngredientAnalysisLocaleSchema = z.object({
  ingredientAnalysis: z
    .object({
      title: z.string(),
      ingredients: z.array(
        z.object({ name: z.string(), description: z.string() })
      ),
    })
    .optional(),
});

// Define la estructura completa del archivo .i18n.json.
export const IngredientAnalysisI18nSchema = z.object({
  "es-ES": IngredientAnalysisLocaleSchema,
  "pt-BR": IngredientAnalysisLocaleSchema,
  "en-US": IngredientAnalysisLocaleSchema,
  "it-IT": IngredientAnalysisLocaleSchema,
});
// src/lib/schemas/components/ingredient-analysis.schema.ts
