// RUTA: app/[locale]/news/[slug]/page.tsx
/**
 * @file page.tsx
 * @description Página de artículo de blog individual. Orquesta la carga de datos
 *              y la composición de componentes de élite con animación de entrada.
 * @version 2.0.0 (Holistic Elite Compliance & MEA/UX)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import Image from "next/image";
import { getDictionary } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";
import { Container, Badge } from "@/components/ui";
import { PageHeader } from "@/components/layout/PageHeader";
import { TextSection } from "@/components/sections/TextSection";
import { DeveloperErrorDisplay } from "@/components/dev";
import { SectionAnimator } from "@/components/layout/SectionAnimator";
import type { NewsArticlePageContent } from "@/shared/lib/schemas/pages/news-article-page.schema";
import { notFound } from "next/navigation";

interface NewsArticlePageProps {
  params: { locale: Locale; slug: string };
}

// TODO: Implementar generateStaticParams para pre-renderizar todas las rutas de artículos en tiempo de build.

export default async function NewsArticlePage({
  params: { locale, slug },
}: NewsArticlePageProps) {
  logger.info(
    `[NewsArticlePage] Renderizando v2.0 (Elite Compliance) para slug: "${slug}", locale: ${locale}`
  );

  const { dictionary, error } = await getDictionary(locale);

  // --- Pilar III: Guardia de Resiliencia Robusta ---
  if (error) {
    const errorMessage = `Fallo al cargar el diccionario para la página del artículo [slug: ${slug}].`;
    logger.error(`[NewsArticlePage] ${errorMessage}`, { error });
    if (process.env.NODE_ENV === "production") {
      return notFound();
    }
    return (
      <DeveloperErrorDisplay
        context="NewsArticlePage"
        errorMessage={errorMessage}
        errorDetails={error}
      />
    );
  }

  // --- Pilar IV: Seguridad de Tipos (Sin @ts-ignore) ---
  // Se accede de forma segura y se realiza una aserción de tipo después de la comprobación.
  const articleContent = dictionary[slug] as NewsArticlePageContent | undefined;

  if (!articleContent) {
    logger.error(
      `[NewsArticlePage] Contenido para el slug "${slug}" no encontrado en el diccionario.`
    );
    return notFound();
  }

  const {
    title,
    subtitle,
    author,
    publishedDate,
    readTime,
    category,
    featuredImageUrl,
    featuredImageAlt,
    content,
  } = articleContent;

  return (
    <>
      {/* --- Pilar V: Adherencia al Contrato de PageHeader --- */}
      <PageHeader content={{ title, subtitle }} />

      <SectionAnimator>
        <Container className="py-8 max-w-4xl">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{category}</Badge>
              <span>Por {author}</span>
            </div>
            <span>
              {publishedDate} · {readTime} min de lectura
            </span>
          </div>

          <div className="relative w-full aspect-video rounded-lg overflow-hidden my-8 shadow-lg">
            <Image
              src={featuredImageUrl}
              alt={featuredImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>

          <TextSection content={content} spacing="compact" />
        </Container>
      </SectionAnimator>
    </>
  );
}
