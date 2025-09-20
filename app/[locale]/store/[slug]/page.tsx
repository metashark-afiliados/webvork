// RUTA: app/[locale]/store/[slug]/page.tsx
/**
 * @file page.tsx
 * @description Página de detalle de producto, con lógica de hidratación de
 *              datos para productos relacionados.
 * @version 2.0.0 (Holistic Elite Compliance & Data Hydration)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ProductInfo } from "@/components/sections/ProductInfo";
import { ProductGrid } from "@/components/sections/ProductGrid";
import type { ProductDetailPageContentSchema } from "@/shared/lib/schemas/pages/product-detail-page.schema";
import {
  ProductCatalogSchema,
  type Product,
} from "@/shared/lib/schemas/entities/product.schema";
import { loadJsonAsset } from "@/shared/lib/i18n/campaign.data.loader";
import type { z } from "zod";

type ProductContent = z.infer<typeof ProductDetailPageContentSchema>;
type ProductCatalogI18n = Partial<
  Record<Locale, z.infer<typeof ProductCatalogSchema>>
>;

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

  const content = dictionary[slug as keyof typeof dictionary] as
    | ProductContent
    | undefined;

  if (!content) {
    logger.error(
      `[ProductDetailPage] Contenido para slug "${slug}" no encontrado.`
    );
    return notFound();
  }

  // --- LÓGICA DE HIDRATACIÓN DE DATOS PARA PRODUCTOS RELACIONADOS ---
  let relatedProducts: Product[] = [];
  try {
    const catalogData = await loadJsonAsset<ProductCatalogI18n>(
      "campaigns",
      `products/catalog.i18n.json`
    );
    const catalogForLocale = catalogData[locale];

    if (catalogForLocale) {
      const validation = ProductCatalogSchema.safeParse(catalogForLocale);
      if (validation.success) {
        const allProducts = validation.data.products;
        const relatedProductIds = (dictionary.storePage?.products ?? [])
          .filter((id) => id !== content.productData.id) // Excluye el producto actual
          .slice(0, 3); // Limita a 3 productos relacionados

        relatedProducts = relatedProductIds
          .map((id) => allProducts.find((p) => p.id === id))
          .filter((p): p is Product => p !== undefined);
      }
    }
  } catch (e) {
    logger.error(
      "[ProductDetailPage] Fallo al cargar o procesar el catálogo para productos relacionados.",
      { error: e }
    );
  }
  // --- FIN DE LA LÓGICA DE HIDRATACIÓN ---

  return (
    <Container className="py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <ProductGallery images={content.galleryImages} />
        <ProductInfo content={content} />
      </div>

      {relatedProducts.length > 0 && dictionary.storePage && (
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            {content.relatedProductsTitle}
          </h2>
          <ProductGrid
            products={relatedProducts}
            locale={locale}
            content={dictionary.storePage}
          />
        </div>
      )}
    </Container>
  );
}
