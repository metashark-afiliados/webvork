// app/[locale]/news/[slug]/page.tsx
/**
 * @file page.tsx
 * @description Página de plantilla para un artículo de blog individual.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/layout/PageHeader";
import { TextSection } from "@/components/sections/TextSection";
import type { NewsArticlePageContent } from "@/lib/schemas/pages/news-article-page.schema";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";

interface NewsArticlePageProps {
  params: { locale: Locale; slug: string };
}

// TODO: Implementar generateStaticParams para pre-renderizar todas las rutas de artículos en tiempo de build.

export default async function NewsArticlePage({ params: { locale, slug } }: NewsArticlePageProps) {
  logger.info(`[NewsArticlePage] Renderizando artículo con slug: "${slug}" para locale: ${locale}`);

  const { dictionary } = await getDictionary(locale);

  // Buscamos el contenido del artículo específico usando el slug como clave
  // @ts-ignore - Acceso dinámico a claves del diccionario
  const articleContent: NewsArticlePageContent | undefined = dictionary[slug];

  if (!articleContent) {
    logger.error(`[NewsArticlePage] Contenido para el slug "${slug}" no encontrado.`);
    return notFound();
  }

  const { title, subtitle, author, publishedDate, readTime, category, featuredImageUrl, featuredImageAlt, content } = articleContent;

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />

      <Container className="py-8 max-w-4xl">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
                <Badge variant="secondary">{category}</Badge>
                <span>Por {author}</span>
            </div>
            <span>{publishedDate} · {readTime} min de lectura</span>
        </div>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden my-8">
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
    </>
  );
}
// app/[locale]/news/[slug]/page.tsx
