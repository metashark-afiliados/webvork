// app/[locale]/store/[slug]/page.tsx
/**
 * @file page.tsx
 * @description Página de detalle de producto.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
// Crearemos estos componentes a continuación
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ProductInfo } from "@/components/sections/ProductInfo";
import { ProductGrid } from "@/components/sections/ProductGrid";
import type { ProductDetailPageContentSchema } from "@/shared/lib/schemas/pages/product-detail-page.schema";
import type { z } from "zod";

type ProductContent = z.infer<typeof ProductDetailPageContentSchema>;

interface ProductDetailPageProps {
  params: { locale: Locale; slug: string };
}

export default async function ProductDetailPage({
  params: { locale, slug },
}: ProductDetailPageProps) {
  logger.info(
    `[ProductDetailPage] Renderizando para slug: "${slug}", locale: ${locale}`
  );

  const { dictionary } = await getDictionary(locale);
  // @ts-ignore - Acceso dinámico al diccionario
  const content: ProductContent | undefined = dictionary[slug];

  if (!content) {
    logger.error(
      `[ProductDetailPage] Contenido para slug "${slug}" no encontrado.`
    );
    return notFound();
  }

  // @ts-ignore
  const relatedProducts =
    dictionary.storePage?.products
      .filter((p) => p.id !== content.productData.id)
      .slice(0, 3) || [];

  return (
    <Container className="py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Componentes de la UI que construiremos */}
        <ProductGallery images={content.galleryImages} />
        <ProductInfo content={content} />
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            {content.relatedProductsTitle}
          </h2>
          {/* <ProductGrid products={relatedProducts} locale={locale} content={dictionary.storePage} /> */}
          <p className="text-center text-muted-foreground">
            (ProductGrid para productos relacionados se implementará)
          </p>
        </div>
      )}
    </Container>
  );
}
// app/[locale]/store/[slug]/page.tsx
