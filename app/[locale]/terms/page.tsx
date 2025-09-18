// app/[locale]/terms/page.tsx
/**
 * @file page.tsx
 * @description Página de Términos de Servicio.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";
import { PageHeader } from "@/components/layout/PageHeader";
import { TextSection } from "@/components/sections/TextSection";
import { notFound } from "next/navigation";

interface TermsPageProps {
  params: { locale: Locale };
}

export default async function TermsPage({ params: { locale } }: TermsPageProps) {
  logger.info(`[TermsPage] Renderizando para locale: ${locale}`);

  const { dictionary } = await getDictionary(locale);
  const content = dictionary.termsPage;

  if (!content) {
    logger.error(`[TermsPage] Contenido 'termsPage' no encontrado para locale: ${locale}.`);
    return notFound();
  }

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <TextSection content={content.content} />
    </>
  );
}
// app/[locale]/terms/page.tsx
