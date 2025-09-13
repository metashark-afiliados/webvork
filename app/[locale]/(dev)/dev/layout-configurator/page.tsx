// app/[locale]/page.tsx
/**
 * @file page.tsx
 * @description Punto de entrada y página de inicio (Homepage) del portal.
 *              Resuelve el error 404 en la ruta raíz.
 * @version 1.0.0
 * @author Gemini AI - Asistente de IA de Google
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { HeroNews } from "@/sections/HeroNews";
import { NewsGrid } from "@/sections/NewsGrid";
import { SocialProofLogos } from "@/sections/SocialProofLogos";
import { CommunitySection } from "@/sections/CommunitySection";
import type { Dictionary } from "@/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";

interface HomePageProps {
  params: { locale: Locale };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  // Obtenemos el diccionario completo para el locale actual.
  // La lógica antifrágil asegura que obtendremos el contenido validado.
  const dictionary: Partial<Dictionary> = await getDictionary(locale);

  return (
    <>
      {/* 
        Ensamblamos la página de inicio utilizando las secciones
        cuyo contenido está definido en el diccionario global.
      */}
      {dictionary.heroNews && <HeroNews content={dictionary.heroNews} />}
      {dictionary.socialProofLogos && (
        <SocialProofLogos content={dictionary.socialProofLogos} />
      )}
      {dictionary.newsGrid && (
        <NewsGrid content={dictionary.newsGrid} locale={locale} />
      )}
      {dictionary.communitySection && (
        <CommunitySection content={dictionary.communitySection} />
      )}
    </>
  );
}
