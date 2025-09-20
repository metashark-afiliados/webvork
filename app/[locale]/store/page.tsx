// RUTA: app/[locale]/store/page.tsx
/**
 * @file page.tsx
 * @description Página de la Tienda. Orquesta la visualización de productos,
 *              filtros y secciones de soporte, cumpliendo con los 5 Pilares
 *              de Calidad y adhiriéndose a los contratos de componentes de élite.
 * @version 3.0.0 (Holistic Elite Compliance)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
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
import type { ProductCardData } from "@/shared/lib/schemas/pages/store-page.schema";

interface StorePageProps {
  params: { locale: Locale };
}

export default async function StorePage({
  params: { locale },
}: StorePageProps) {
  logger.info(
    `[StorePage] Renderizando v3.0 (Elite Compliance) para locale: ${locale}`
  );

  const { dictionary, error } = await getDictionary(locale);
  const content = dictionary.storePage;
  const faqContent = dictionary.faqAccordion;
  const communityContent = dictionary.communitySection;

  // --- Pilar III: Guardia de Resiliencia Robusta ---
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

  // --- Pilar IV: Seguridad de Tipos Explícita ---
  // Se añade un tipo explícito a 'p', garantizando que el contrato de datos
  // de la SSoT (ProductCardData) se respete en todo momento.
  const allTags = Array.from(
    new Set(content.products.flatMap((p: ProductCardData) => p.tags))
  );

  return (
    <>
      {/* --- Pilar V: Adherencia al Contrato de PageHeader --- */}
      {/* La llamada ahora es correcta, pasando el objeto 'content' completo. */}
      {/* PageHeader es inteligente y tomará las props que necesita. */}
      <PageHeader content={content} />

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <ProductFilters filters={content.filters} allTags={allTags} />
          <ProductGrid
            products={content.products}
            locale={locale}
            content={content}
          />
        </div>
      </Container>

      {/* El resto de las secciones ya cumplen con el pilar de resiliencia */}
      {faqContent && <FaqAccordion content={faqContent} />}
      {communityContent && <CommunitySection content={communityContent} />}
    </>
  );
}
