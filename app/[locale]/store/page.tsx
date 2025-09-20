// RUTA: app/[locale]/store/page.tsx
/**
 * @file page.tsx
 * @description Página de la Tienda. Orquesta la visualización de productos,
 *              filtros y secciones de soporte. Erradica el uso de 'any' para
 *              una seguridad de tipos absoluta.
 * @version 4.1.0 (Holistic Type Safety & Elite Compliance)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import type { z } from "zod";
import { getDictionary } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductFilters } from "@/components/sections/ProductFilters";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { DeveloperErrorDisplay } from "@/components/dev";
import { notFound } from "next/navigation";
import { loadJsonAsset } from "@/shared/lib/i18n/campaign.data.loader";
import {
  ProductCatalogSchema,
  type Product,
} from "@/shared/lib/schemas/entities/product.schema";

// --- SSoT DE TIPO PARA EL ARCHIVO DE CATÁLOGO ---
type ProductCatalogI18n = Partial<
  Record<Locale, z.infer<typeof ProductCatalogSchema>>
>;

interface StorePageProps {
  params: { locale: Locale };
}

export default async function StorePage({
  params: { locale },
}: StorePageProps) {
  logger.info(
    `[StorePage] Renderizando v4.1 (Holistic Type Safety) para locale: ${locale}`
  );

  const { dictionary, error } = await getDictionary(locale);
  const content = dictionary.storePage;
  const faqContent = dictionary.faqAccordion;
  const communityContent = dictionary.communitySection;

  if (error || !content) {
    const errorMessage =
      "Fallo al cargar el contenido i18n para la página de la Tienda.";
    logger.error(`[StorePage] ${errorMessage}`, { error });
    if (process.env.NODE_ENV === "production") {
      return notFound();
    }
    return (
      <DeveloperErrorDisplay
        context="StorePage"
        errorMessage={errorMessage}
        errorDetails={error || "La clave 'storePage' falta en el diccionario."}
      />
    );
  }

  // --- LÓGICA DE HIDRATACIÓN DE DATOS CON SEGURIDAD DE TIPOS ---
  let productsToShow: Product[] = [];
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
        productsToShow = content.products
          .map((productId) => allProducts.find((p) => p.id === productId))
          .filter((p): p is Product => p !== undefined);
      } else {
        throw validation.error;
      }
    } else {
      logger.warn(
        `[StorePage] No se encontró catálogo de productos para el locale: ${locale}`
      );
    }
  } catch (e) {
    logger.error(
      "[StorePage] Fallo crítico al cargar o validar el catálogo de productos.",
      {
        error: e,
      }
    );
    if (process.env.NODE_ENV !== "production") {
      return (
        <DeveloperErrorDisplay
          context="StorePage - Product Catalog Hydration"
          errorMessage="No se pudo cargar o validar 'content/products/catalog.i18n.json'."
          errorDetails={e instanceof Error ? e : null}
        />
      );
    }
  }

  const allTags = Array.from(
    new Set(
      productsToShow.flatMap((p) => [
        p.categorization.primary,
        ...(p.categorization.secondary || []),
      ])
    )
  );

  return (
    <>
      <PageHeader content={content} />
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <ProductFilters filters={content.filters} allTags={allTags} />
          <ProductGrid
            products={productsToShow}
            locale={locale}
            content={content}
          />
        </div>
      </Container>
      {faqContent && <FaqAccordion content={faqContent} />}
      {communityContent && <CommunitySection content={communityContent} />}
    </>
  );
}
