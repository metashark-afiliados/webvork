// app/[locale]/page.tsx
/**
 * @file page.tsx
 * @description Página de inicio del portal.
 *              v1.5.0 (Code Hygiene): Se elimina la importación no utilizada
 *              de 'Dictionary' para cumplir con las reglas de ESLint.
 * @version 1.5.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/shared/lib/i18n";
import { HeroNews } from "@/components/sections/HeroNews";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { CommunitySection } from "@/components/sections/CommunitySection";
import type { Locale } from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";

interface HomePageProps {
  params: { locale: Locale };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  logger.info(
    `[HomePage] Renderizando la página de inicio para locale: ${locale}`
  );

  const { dictionary } = await getDictionary(locale);

  const heroNewsContent = dictionary.heroNews;
  const socialProofLogosContent = dictionary.socialProofLogos;
  const newsGridContent = dictionary.newsGrid;
  const communitySectionContent = dictionary.communitySection;

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
