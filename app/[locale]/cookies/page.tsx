// app/[locale]/cookies/page.tsx
/**
 * @file page.tsx
 * @description Página de Política de Cookies, construida con el estándar de élite.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";
import { PageHeader } from "@/components/layout/PageHeader";
import { TextSection } from "@/components/sections/TextSection";
import { DeveloperErrorDisplay } from "@/components/dev";
import { SectionAnimator } from "@/components/layout/SectionAnimator";
import { notFound } from "next/navigation";

interface CookiesPageProps {
  params: { locale: Locale };
}

export default async function CookiesPage({
  params: { locale },
}: CookiesPageProps) {
  logger.info(`[CookiesPage] Renderizando v1.0 para locale: ${locale}`);

  const { dictionary, error } = await getDictionary(locale);
  const content = dictionary.cookiesPage;

  if (error || !content) {
    const errorMessage =
      "Fallo al cargar el contenido i18n para la página de Política de Cookies.";
    logger.error(`[CookiesPage] ${errorMessage}`, { error });
    if (process.env.NODE_ENV === "production") return notFound();
    return (
      <DeveloperErrorDisplay
        context="CookiesPage"
        errorMessage={errorMessage}
        errorDetails={
          error || "La clave 'cookiesPage' falta en el diccionario."
        }
      />
    );
  }

  return (
    <SectionAnimator>
      <PageHeader content={content} />
      <TextSection content={content.content} />
    </SectionAnimator>
  );
}
// app/[locale]/cookies/page.tsx
