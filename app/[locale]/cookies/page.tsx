// app/[locale]/cookies/page.tsx
/**
 * @file page.tsx
 * @description Página de Política de Cookies.
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

interface CookiesPageProps {
  params: { locale: Locale };
}

export default async function CookiesPage({
  params: { locale },
}: CookiesPageProps) {
  logger.info(`[CookiesPage] Renderizando para locale: ${locale}`);

  const { dictionary } = await getDictionary(locale);
  const content = dictionary.cookiesPage;

  if (!content) {
    logger.error(
      `[CookiesPage] Contenido 'cookiesPage' no encontrado para locale: ${locale}.`
    );
    return notFound();
  }

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <TextSection content={content.content} />
    </>
  );
}
// app/[locale]/cookies/page.tsx
