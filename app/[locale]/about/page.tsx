// app/[locale]/about/page.tsx
/**
 * @file page.tsx
 * @description Página "Sobre Nosotros", ahora como un simple consumidor de datos.
 *              v3.0.0 (Alias Unification): Rutas de importación refactorizadas
 *              para usar el alias raíz único `@/*`.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { PageHeader } from "@/components/layout/PageHeader";
import { TextSection } from "@/components/sections/TextSection";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";

interface AboutPageProps {
  params: { locale: Locale };
}

export default async function AboutPage({
  params: { locale },
}: AboutPageProps) {
  logger.info(`[AboutPage] Renderizando para locale: ${locale}`);

  const { dictionary } = await getDictionary(locale);
  const content = dictionary.aboutPage;

  if (!content) {
    logger.error(
      `[AboutPage] Contenido para 'aboutPage' no encontrado para locale: ${locale}.`
    );
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-destructive">Contenido no disponible.</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <TextSection content={content.content} />
    </>
  );
}
// app/[locale]/about/page.tsx
