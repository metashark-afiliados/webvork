// app/[locale]/news/page.tsx
/**
 * @file page.tsx
 * @description Página de archivo del blog. Ensambla componentes para mostrar
 *              artículos destacados y una cuadrícula de todas las noticias.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";
import { PageHeader } from "@/components/layout/PageHeader";
import { FeaturedArticlesCarousel } from "@/components/sections/FeaturedArticlesCarousel";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { Container } from "@/components/ui";

interface NewsArchivePageProps {
  params: { locale: Locale };
}

export default async function NewsArchivePage({
  params: { locale },
}: NewsArchivePageProps) {
  logger.info(`[NewsArchivePage] Renderizando para locale: ${locale}`);

  const { dictionary } = await getDictionary(locale);

  // Obtenemos los fragmentos de contenido necesarios del diccionario global
  const pageContent = dictionary.newsGrid; // Reutilizamos el título de newsGrid para el header
  const carouselContent = dictionary.featuredArticlesCarousel;
  const gridContent = dictionary.newsGrid;
  const communityContent = dictionary.communitySection;

  if (!pageContent) {
    logger.error(
      `[NewsArchivePage] Contenido 'newsGrid' no encontrado para locale: ${locale}.`
    );
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-bold text-destructive">
          Error de Contenido
        </h1>
        <p>El contenido para la página de noticias no pudo ser cargado.</p>
      </Container>
    );
  }

  return (
    <>
      <PageHeader
        title={pageContent.title}
        subtitle="Explora nuestros últimos artículos sobre bienestar, nutrición y rendimiento." // Subtítulo genérico
      />

      {carouselContent && (
        <FeaturedArticlesCarousel content={carouselContent} />
      )}

      {gridContent && <NewsGrid content={gridContent} locale={locale} />}

      {communityContent && <CommunitySection content={communityContent} />}
    </>
  );
}
// app/[locale]/news/page.tsx
