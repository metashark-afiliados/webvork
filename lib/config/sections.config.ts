// frontend/src/lib/config/sections.config.ts
/**
 * @file sections.config.ts
 * @description SSoT para la configuración de secciones. Implementa el "Patrón de Registro".
 *              Este aparato es el mapa central que conecta los nombres de sección (strings
 *              provenientes de los archivos de tema JSON) con los componentes React reales
 *              y sus correspondientes claves en el diccionario de i18n.
 *              Esta arquitectura permite que el SectionRenderer sea dinámico y extensible,
 *              cumpliendo con el Principio Abierto/Cerrado.
 * @version 6.0.0
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
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @interface SectionConfigEntry
 * @description Define el contrato para cada entrada en el registro de secciones.
 */
interface SectionConfigEntry {
  /**
   * @property component - La referencia al componente React. Se usa `React.ComponentType<any>`
   *           porque cada sección tiene su propio contrato de props. La seguridad de tipos
   *           se garantiza en la capa de datos a través de los esquemas de Zod.
   */
  component: React.ComponentType<any>;
  /**
   * @property dictionaryKey - La clave para buscar el objeto de contenido de esta
   *           sección dentro del diccionario i18n global.
   */
  dictionaryKey: keyof Dictionary;
}

/**
 * @constant sectionNames
 * @description La lista canónica y SSoT de todos los nombres de sección disponibles.
 *              Se usa para generar el tipo `SectionName`.
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
] as const;

export type SectionName = (typeof sectionNames)[number];

/**
 * @constant sectionsConfig
 * @description El registro principal de secciones. Mapea un `SectionName` a su
 *              configuración (`SectionConfigEntry`).
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
};
// frontend/src/lib/config/sections.config.ts
