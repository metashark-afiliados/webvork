// src/components/sections/ProductFilters.tsx
/**
 * @file ProductFilters.tsx
 * @description Aparato de UI atómico que renderiza la barra lateral de filtros de la tienda.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see .docs-espejo/components/sections/ProductFilters.md
 */
import React from "react";
import type { z } from "zod";
import type { StorePageLocaleSchema } from "@/lib/schemas/pages/store-page.schema";

// --- Tipos de Datos ---
type StorePageContent = NonNullable<
  z.infer<typeof StorePageLocaleSchema>["storePage"]
>;
type FilterData = StorePageContent["filters"];
type CategoryFilter = FilterData["categories"][number];

interface ProductFiltersProps {
  filters: FilterData;
}

/**
 * @component ProductFilters
 * @description Componente de presentación puro para la barra lateral de filtros.
 * @param {ProductFiltersProps} props Las propiedades que contienen los datos de los filtros.
 * @returns {React.ReactElement} El elemento JSX de la barra lateral.
 */
export function ProductFilters({
  filters,
}: ProductFiltersProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando ProductFilters");

  return (
    <aside className="lg:col-span-1 p-6 bg-background/50 backdrop-blur-sm rounded-lg h-fit border border-white/5">
      <h2 className="text-lg font-bold text-primary mb-4">
        {filters.categoryTitle}
      </h2>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {filters.categories.map((cat: CategoryFilter) => (
          <li
            key={cat.label}
            className="flex justify-between items-center group"
          >
            <a href="#" className="hover:text-foreground transition-colors">
              {cat.label}
            </a>
            <span className="text-xs bg-secondary px-2 py-0.5 rounded-full group-hover:bg-primary group-hover:text-primary-foreground">
              {cat.count}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
// src/components/sections/ProductFilters.tsx
