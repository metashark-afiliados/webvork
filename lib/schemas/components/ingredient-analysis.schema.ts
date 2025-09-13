// lib/schemas/components/ingredient-analysis.schema.ts
/**
 * @file ingredient-analysis.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente IngredientAnalysis.
 *              - v3.0.0: Exporta el tipo `Ingredient` para seguridad de tipos en el componente.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

/**
 * @const IngredientSchema
 * @description Valida un único ingrediente con su nombre y descripción.
 */
const IngredientSchema = z.object({
  name: z.string(),
  description: z.string(),
});

/**
 * @type Ingredient
 * @description Infiere el tipo TypeScript para un objeto de ingrediente. SSoT para este contrato.
 */
export type Ingredient = z.infer<typeof IngredientSchema>;

/**
 * @const IngredientAnalysisLocaleSchema
 * @description Valida la estructura para un único locale.
 */
export const IngredientAnalysisLocaleSchema = z.object({
  ingredientAnalysis: z
    .object({
      title: z.string(),
      ingredients: z.array(IngredientSchema),
    })
    .optional(),
});

/**
 * @const IngredientAnalysisI18nSchema
 * @description Valida la estructura completa del archivo .i18n.json.
 */
export const IngredientAnalysisI18nSchema = z.object({
  "es-ES": IngredientAnalysisLocaleSchema,
  "pt-BR": IngredientAnalysisLocaleSchema,
  "en-US": IngredientAnalysisLocaleSchema,
  "it-IT": IngredientAnalysisLocaleSchema,
});
// lib/schemas/components/ingredient-analysis.schema.ts
