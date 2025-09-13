// src/components/sections/IngredientAnalysis.tsx
/**
 * @file IngredientAnalysis.tsx
 * @description Sección de Análisis de Ingredientes.
 *              - v2.0.0: Refactorizado para adherirse al contrato de props unificado
 *                del `SectionRenderer`, aceptando un único prop `content`.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { Container } from "@/components/ui/Container";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

// --- INICIO DE CORRECCIÓN: Contrato de Props Unificado ---
interface IngredientAnalysisProps {
  content: Dictionary["ingredientAnalysis"];
}
// --- FIN DE CORRECCIÓN ---

/**
 * @component IngredientAnalysis
 * @description Renderiza una sección informativa sobre los ingredientes.
 * @param {IngredientAnalysisProps} props Las propiedades con el contenido.
 * @returns {React.ReactElement | null} El elemento JSX que representa la sección.
 */
export function IngredientAnalysis({
  content,
}: IngredientAnalysisProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando IngredientAnalysis");

  if (!content) {
    logger.warn(
      "[IngredientAnalysis] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  // Desestructuración de datos desde el objeto `content`.
  const { title, ingredients } = content;

  return (
    <section className="py-16 sm:py-24 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 sm:text-4xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="p-6 border border-white/10 rounded-lg text-center transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-primary mb-2">
                {ingredient.name}
              </h3>
              <p className="text-foreground/80">{ingredient.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
// src/components/sections/IngredientAnalysis.tsx
