// lib/config/sections.config.ts
/**
 * @file sections.config.ts
 * @description SSoT (Single Source of Truth) para la configuración de secciones.
 *              Implementa el "Patrón de Registro" donde se mapea un nombre de sección
 *              a su componente React y a la clave correspondiente en el diccionario de i18n.
 *              Esta configuración es consumida por el SectionRenderer para renderizar dinámicamente las páginas.
 * @version 14.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";

// --- Importaciones de Componentes de Sección (Rutas Canónicas SSoT) ---
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { DoubleScrollingBanner } from "@/components/sections/DoubleScrollingBanner";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { Hero } from "@/components/sections/Hero";
import { HeroNews } from "@/components/sections/HeroNews";
import { IngredientAnalysis } from "@/components/sections/IngredientAnalysis";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { OrderSection } from "@/components/sections/OrderSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { ThumbnailCarousel } from "@/components/sections/ThumbnailCarousel";

logger.trace("[sections.config] Módulo de configuración de secciones cargado.");

/**
 * @interface SectionConfigEntry
 * @description Define el contrato para cada entrada en el registro de secciones.
 * @property {React.ComponentType<any>} component - La referencia al componente React a renderizar.
 * @property {keyof Dictionary} dictionaryKey - La clave del diccionario que contiene los datos de esta sección.
 */
interface SectionConfigEntry {
  component: React.ComponentType<any>;
  dictionaryKey: keyof Dictionary;
}

/**
 * @const sectionsConfig
 * @description El registro central de todas las secciones disponibles en la aplicación.
 *              Este objeto es la SSoT que el SectionRenderer utiliza para construir las páginas dinámicamente.
 */
export const sectionsConfig = {
  BenefitsSection: {
    component: BenefitsSection,
    dictionaryKey: "benefitsSection",
  },
  ContactSection: {
    component: ContactSection,
    dictionaryKey: "contactSection",
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
  Hero: { component: Hero, dictionaryKey: "hero" },
  HeroNews: { component: HeroNews, dictionaryKey: "heroNews" },
  IngredientAnalysis: {
    component: IngredientAnalysis,
    dictionaryKey: "ingredientAnalysis",
  },
  NewsGrid: { component: NewsGrid, dictionaryKey: "newsGrid" },
  OrderSection: { component: OrderSection, dictionaryKey: "orderSection" },
  ProductShowcase: {
    component: ProductShowcase,
    dictionaryKey: "productShowcase",
  },
  SocialProofLogos: {
    component: SocialProofLogos,
    dictionaryKey: "socialProofLogos",
  },
  TestimonialGrid: {
    component: TestimonialGrid,
    dictionaryKey: "testimonialGrid",
  },
  ThumbnailCarousel: {
    component: ThumbnailCarousel,
    dictionaryKey: "thumbnailCarousel",
  },
} as const satisfies Record<string, SectionConfigEntry>;

/**
 * @type SectionName
 * @description Deriva un tipo de unión de todos los nombres de sección registrados,
 *              proporcionando seguridad de tipos para el layout de las campañas.
 */
export type SectionName = keyof typeof sectionsConfig;
// lib/config/sections.config.ts
