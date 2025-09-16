// app/[locale]/page.tsx
/**
 * @file page.tsx
 * @description Página de inicio del portal.
 *              - v1.4.0 (Schema Decoupling Mitigation): Añade guardas de
 *                existencia para cada sección, restaurando la seguridad de
 *                runtime tras la refactorización del i18n.schema.ts.
 * @version 1.4.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { HeroNews } from "@/components/sections/HeroNews";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { CommunitySection } from "@/components/sections/CommunitySection";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";

interface HomePageProps {
  params: { locale: Locale };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  logger.info(
    `[HomePage] Renderizando la página de inicio para locale: ${locale}`
  );

  const { dictionary } = await getDictionary(locale);

  // --- [INICIO] MITIGACIÓN DE TIPO 'ANY' ---
  // Se extraen y verifican explícitamente los datos de cada sección.
  const heroNewsContent = dictionary.heroNews;
  const socialProofLogosContent = dictionary.socialProofLogos;
  const newsGridContent = dictionary.newsGrid;
  const communitySectionContent = dictionary.communitySection;
  // --- [FIN] MITIGACIÓN DE TIPO 'ANY' ---

  // El logging de advertencia se mantiene como una capa secundaria de diagnóstico.
  if (!heroNewsContent)
    logger.warn("[HomePage] Contenido para 'heroNews' no encontrado.");
  if (!socialProofLogosContent)
    logger.warn("[HomePage] Contenido para 'socialProofLogos' no encontrado.");
  if (!newsGridContent)
    logger.warn("[HomePage] Contenido para 'newsGrid' no encontrado.");
  if (!communitySectionContent)
    logger.warn("[HomePage] Contenido para 'communitySection' no encontrado.");

  return (
    <>
      {/* El renderizado ahora es condicional, previniendo errores de runtime */}
      {heroNewsContent && <HeroNews content={heroNewsContent} />}
      {socialProofLogosContent && (
        <SocialProofLogos content={socialProofLogosContent} />
      )}
      {newsGridContent && (
        <NewsGrid content={newsGridContent} locale={locale} />
      )}
      {communitySectionContent && (
        <CommunitySection content={communitySectionContent} />
      )}
    </>
  );
}
// app/[locale]/page.tsx
