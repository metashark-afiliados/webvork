// src/components/sections/IngredientAnalysis.tsx
import React from "react";
import { Container } from "@/components/ui/Container";

/**
 * @file IngredientAnalysis.tsx
 * @description Sección de Análisis de Ingredientes. Muestra una cuadrícula
 *              que detalla los componentes clave del producto para educar
 *              al usuario y construir credibilidad.
 * @version 1.0.0
 * @date 2025-09-09
 * @dependencies react, @/components/ui/Container
 *
 * @prop {string} title - El título principal de la sección.
 * @prop {Array<{name: string, description: string}>} ingredients - Array de objetos, cada uno representando un ingrediente.
 */

interface Ingredient {
  name: string;
  description: string;
}

interface IngredientAnalysisProps {
  title: string;
  ingredients: Ingredient[];
}

/**
 * @component IngredientAnalysis
 * @description Renderiza una sección informativa sobre los ingredientes.
 * @param {IngredientAnalysisProps} props Las propiedades con el contenido.
 * @returns {React.ReactElement} El elemento JSX que representa la sección.
 */
export function IngredientAnalysis({
  title,
  ingredients,
}: IngredientAnalysisProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando IngredientAnalysis");

  return (
    <section className="py-16 sm:py-24 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 sm:text-4xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
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
