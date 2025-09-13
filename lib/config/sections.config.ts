// lib/config/sections.config.ts
/**
 * @file sections.config.ts
 * @description SSoT para la configuración de secciones. Implementa el "Patrón de Registro".
 *              Este aparato es el mapa central que conecta los nombres de sección con los
 *              componentes React reales y sus claves en el diccionario i18n. Su correcta
 *              sincronización con el schema i18n global es crítica para la integridad
 *              del sistema de renderizado.
 * @version 8.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/lib/config/sections.config.ts.md
 */
import React from "react";
import { Hero } from "@/components/sections/Hero";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { IngredientAnalysis } from "@/components/sections/IngredientAnalysis";
import { ThumbnailCarousel } from "@/components/sections/ThumbnailCarousel";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { DoubleScrollingBanner } from "@/components/sections/DoubleScrollingBanner";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { OrderSection } from "@/components/sections/OrderSection";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { HeroNews } from "@/components/sections/HeroNews";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { CommunitySection } from "@/components/layout/sections/community";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @interface SectionConfigEntry
 * @description Define el contrato para cada entrada en el registro de secciones.
 */
interface SectionConfigEntry {
  /** El componente de React a renderizar. */
  component: React.ComponentType<any>;
  /** La clave en el objeto Dictionary que contiene el contenido para este componente. */
  dictionaryKey: keyof Dictionary;
}

/**
 * @const sectionNames
 * @description SSoT para los nombres válidos de las secciones. Usado para el tipo `SectionName`.
 */
export const sectionNames = [
  "Hero",
  "SocialProofLogos",
  "BenefitsSection",
  "IngredientAnalysis",
  "ThumbnailCarousel",
  "TestimonialGrid",
  "DoubleScrollingBanner",
  "FaqAccordion",
  "GuaranteeSection",
  "OrderSection",
  "NewsGrid",
  "HeroNews",
  "ProductShowcase",
  "CommunitySection",
] as const;

/**
 * @type SectionName
 * @description Un tipo unión de todos los nombres de sección válidos.
 */
export type SectionName = (typeof sectionNames)[number];

/**
 * @const sectionsConfig
 * @description El registro central. Mapea un `SectionName` a su componente y su `dictionaryKey`.
 *              Este objeto permite al `SectionRenderer` renderizar dinámicamente cualquier sección
 *              basada en una simple cadena de texto proveniente del manifiesto de tema de la campaña.
 */
export const sectionsConfig: Record<SectionName, SectionConfigEntry> = {
  Hero: { component: Hero, dictionaryKey: "hero" },
  SocialProofLogos: {
    component: SocialProofLogos,
    dictionaryKey: "socialProof",
  },
  BenefitsSection: {
    component: BenefitsSection,
    dictionaryKey: "benefitsSection",
  },
  IngredientAnalysis: {
    component: IngredientAnalysis,
    dictionaryKey: "ingredientAnalysis",
  },
  ThumbnailCarousel: {
    component: ThumbnailCarousel,
    dictionaryKey: "thumbnailCarousel",
  },
  TestimonialGrid: {
    component: TestimonialGrid,
    dictionaryKey: "testimonialGrid",
  },
  DoubleScrollingBanner: {
    component: DoubleScrollingBanner,
    dictionaryKey: "doubleScrollingBanner",
  },
  FaqAccordion: { component: FaqAccordion, dictionaryKey: "faqAccordion" },
  GuaranteeSection: {
    component: GuaranteeSection,
    dictionaryKey: "guaranteeSection",
  },
  OrderSection: { component: OrderSection, dictionaryKey: "orderForm" },
  NewsGrid: { component: NewsGrid, dictionaryKey: "newsGrid" },
  HeroNews: { component: HeroNews, dictionaryKey: "heroNews" },
  ProductShowcase: {
    component: ProductShowcase,
    dictionaryKey: "productShowcase",
  },
  CommunitySection: {
    component: CommunitySection,
    dictionaryKey: "communitySection", // Este mapeo ahora es válido.
  },
};
// lib/config/sections.config.ts
