// RUTA: app/[locale]/about/page.tsx
/**
 * @file page.tsx
 * @description Página "Sobre Nosotros", nivelada a un estándar de élite.
 *              v4.0.0 (Holistic Elite Leveling & MEA): Refactorizada para consumir
 *              el contrato del `PageHeader` de élite y orquestar la animación
 *              de sus componentes hijos (`PageHeader`, `TextSection`) para una
 *              experiencia de usuario fluida y memorable.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";
import { PageHeader } from "@/components/layout/PageHeader";
import { TextSection } from "@/components/sections/TextSection";
import { DeveloperErrorDisplay } from "@/components/dev";
import { notFound } from "next/navigation";

interface AboutPageProps {
  params: { locale: Locale };
}

export default async function AboutPage({
  params: { locale },
}: AboutPageProps) {
  logger.info(
    `[AboutPage] Renderizando v4.0 (Elite & MEA) para locale: ${locale}`
  );

  const { dictionary, error } = await getDictionary(locale);
  const content = dictionary.aboutPage;
  const pageHeaderContent = dictionary.pageHeader; // Asumimos que las páginas de texto usan un header genérico

  if (error || !content || !pageHeaderContent) {
    const errorMessage =
      "Fallo al cargar el contenido i18n para la página 'Sobre Nosotros'.";
    logger.error(`[AboutPage] ${errorMessage}`, { error });
    if (process.env.NODE_ENV === "production") {
      return notFound();
    }
    return (
      <DeveloperErrorDisplay
        context="AboutPage"
        errorMessage={errorMessage}
        errorDetails={
          error ||
          "La clave 'aboutPage' o 'pageHeader' falta en el diccionario."
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        content={{
          title: content.title,
          subtitle: content.subtitle,
          // Ejemplo de cómo se podría configurar un efecto visual sutil para esta página
          lightRays: pageHeaderContent?.lightRays,
        }}
      />
      <TextSection content={content.content} />
    </>
  );
}
