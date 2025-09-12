// src/components/sections/ProductGrid.tsx
/**
 * @file ProductGrid.tsx
 * @description Aparato de UI atómico que renderiza la cuadrícula de productos de la tienda.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/sections/ProductGrid.md
 */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { z } from "zod";
import type { StorePageLocaleSchema } from "@/lib/schemas/pages/store-page.schema";

// --- Tipos de Datos ---
type StorePageContent = NonNullable<
  z.infer<typeof StorePageLocaleSchema>["storePage"]
>;
type ProductCardData = StorePageContent["products"][number];

interface ProductGridProps {
  products: ProductCardData[];
  locale: string;
}

/**
 * @component ProductGrid
 * @description Componente de presentación puro para la cuadrícula de productos.
 * @param {ProductGridProps} props Las propiedades que contienen la lista de productos.
 * @returns {React.ReactElement} El elemento JSX de la cuadrícula de productos.
 */
export function ProductGrid({
  products,
  locale,
}: ProductGridProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando ProductGrid");

  return (
    <main className="lg:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product: ProductCardData) => (
          <Link key={product.name} href={product.href} className="block group">
            <div className="overflow-hidden rounded-lg shadow-lg border border-white/5 bg-background/50 backdrop-blur-sm h-full flex flex-col transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
              <div className="relative w-full h-56">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  {product.category}
                </p>
                <h3 className="text-md font-bold text-primary flex-grow">
                  {product.name}
                </h3>
                <p className="mt-4 text-lg font-semibold text-foreground">
                  {new Intl.NumberFormat(locale, {
                    style: "currency",
                    currency: "EUR",
                  }).format(product.price)}
                </p>
                <div className="mt-4 w-full h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium bg-secondary text-secondary-foreground">
                  Ver Detalles
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
// src/components/sections/ProductGrid.tsx
