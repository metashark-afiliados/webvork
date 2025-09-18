// app/[locale]/store/page.tsx
/**
 * @file page.tsx
 * @description Página de la Tienda v2.0 (Stripe-Ready).
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductFilters } from "@/components/sections/ProductFilters";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CommunitySection } from "@/components/sections/CommunitySection";

interface StorePageProps {
  params: { locale: Locale };
}

export default async function StorePage({
  params: { locale },
}: StorePageProps) {
  logger.info(`[StorePage v2.0] Renderizando para locale: ${locale}`);

  const { dictionary } = await getDictionary(locale);
  const content = dictionary.storePage;
  const faqContent = dictionary.faqAccordion;
  const communityContent = dictionary.communitySection;

  if (!content) {
    logger.error(
      `[StorePage] Contenido 'storePage' no encontrado para locale: ${locale}.`
    );
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-destructive">
          Contenido de la tienda no disponible.
        </p>
      </div>
    );
  }

  // Extraer todas las etiquetas (tags) únicas de los productos para pasarlas a los filtros
  const allTags = Array.from(new Set(content.products.flatMap((p) => p.tags)));

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <ProductFilters filters={content.filters} allTags={allTags} />
          <ProductGrid products={content.products} locale={locale} />
        </div>
      </Container>

      {faqContent && <FaqAccordion content={faqContent} />}
      {communityContent && <CommunitySection content={communityContent} />}
    </>
  );
}
// app/[locale]/store/page.tsx
