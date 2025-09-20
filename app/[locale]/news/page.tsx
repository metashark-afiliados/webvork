// app/[locale]/news/page.tsx
/**
 * @file page.tsx
 * @description Página de archivo del blog. Orquesta la composición de secciones
 *              de élite y cumple con los 7 Pilares de Calidad.
 * @version 2.0.0 (Holistic Elite Compliance)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";
import { PageHeader } from "@/components/layout/PageHeader";
import { FeaturedArticlesCarousel } from "@/components/sections/FeaturedArticlesCarousel";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { DeveloperErrorDisplay } from "@/components/dev";
import { notFound } from "next/navigation";

interface NewsArchivePageProps {
  params: { locale: Locale };
}

export default async function NewsArchivePage({
  params: { locale },
}: NewsArchivePageProps) {
  logger.info(
    `[NewsArchivePage] Renderizando v2.0 (Elite Compliance) para locale: ${locale}`
  );

  const { dictionary, error } = await getDictionary(locale);
  // --- [INICIO DE CORRECCIÓN DE LÓGICA] ---
  const pageContent = dictionary.newsGrid; // Esta es la clave correcta para el PageHeader y la cuadrícula
  // --- [FIN DE CORRECCIÓN DE LÓGICA] ---
  const carouselContent = dictionary.featuredArticlesCarousel;
  const communityContent = dictionary.communitySection;

  // --- Pilar III: Guardia de Resiliencia Robusta ---
  if (error || !pageContent) {
    const errorMessage =
      "Fallo al cargar el contenido i18n para la página de Noticias.";
    logger.error(`[NewsArchivePage] ${errorMessage}`, { error });
    if (process.env.NODE_ENV === "production") {
      return notFound();
    }
    return (
      <DeveloperErrorDisplay
        context="NewsArchivePage"
        errorMessage={errorMessage}
        errorDetails={error || "La clave 'newsGrid' falta en el diccionario."}
      />
    );
  }

  return (
    <>
      {/* --- [INICIO DE CORRECCIÓN DE LÓGICA] --- */}
      <PageHeader content={pageContent} />
      {carouselContent && (
        <FeaturedArticlesCarousel content={carouselContent} />
      )}
      <NewsGrid content={pageContent} locale={locale} />
      {communityContent && <CommunitySection content={communityContent} />}
      {/* --- [FIN DE CORRECCIÓN DE LÓGICA] --- */}
    </>
  );
}
// app/[locale]/news/page.tsx
