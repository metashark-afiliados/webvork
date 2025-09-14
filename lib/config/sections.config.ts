// lib/config/sections.config.ts
/**
 * @file sections.config.ts
 * @description SSoT para la configuración de secciones.
 *              - v15.2.0 (Resolución de Dependencia Circular): Se elimina la
 *                dependencia del tipo `Dictionary` para romper un ciclo de
 *                importación crítico. La validación de `dictionaryKey` se
 *                delega al ensamblador de schemas.
 * @version 15.2.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
// --- [1] INICIO DE CORRECCIÓN: Se elimina la importación del tipo Dictionary ---
// import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- FIN DE CORRECCIÓN ---
import { logger } from "@/lib/logging";

// --- Importaciones de Componentes de Sección (Inventario Completo SSoT) ---
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { DoubleScrollingBanner } from "@/components/sections/DoubleScrollingBanner";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FeaturedArticlesCarousel } from "@/components/sections/FeaturedArticlesCarousel";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { Hero } from "@/components/sections/Hero";
import { HeroNews } from "@/components/sections/HeroNews";
import { IngredientAnalysis } from "@/components/sections/IngredientAnalysis";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { OrderSection } from "@/components/sections/OrderSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialCarouselSection } from "@/components/sections/TestimonialCarouselSection";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { ThumbnailCarousel } from "@/components/sections/ThumbnailCarousel";

logger.trace("[sections.config] Módulo de configuración de secciones cargado.");

interface SectionConfigEntry {
  component: React.ComponentType<any>;
  // --- [2] INICIO DE CORRECCIÓN: Se relaja el tipo a 'string' para romper el ciclo ---
  // La validación de que esta clave existe en el diccionario se realiza
  // de forma implícita en el ensamblador `i18n.schema.ts`.
  dictionaryKey: string;
  // --- FIN DE CORRECCIÓN ---
}

export const sectionsConfig = {
  BenefitsSection: {
    component: BenefitsSection,
    dictionaryKey: "benefitsSection",
  },
  CommunitySection: {
    component: CommunitySection,
    dictionaryKey: "communitySection",
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
  FeaturedArticlesCarousel: {
    component: FeaturedArticlesCarousel,
    dictionaryKey: "featuredArticlesCarousel",
  },
  FeaturesSection: {
    component: FeaturesSection,
    dictionaryKey: "featuresSection",
  },
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
  PricingSection: {
    component: PricingSection,
    dictionaryKey: "pricingSection",
  },
  ProductShowcase: {
    component: ProductShowcase,
    dictionaryKey: "productShowcase",
  },
  ServicesSection: {
    component: ServicesSection,
    dictionaryKey: "servicesSection",
  },
  SocialProofLogos: {
    component: SocialProofLogos,
    dictionaryKey: "socialProofLogos",
  },
  SponsorsSection: {
    component: SponsorsSection,
    dictionaryKey: "sponsorsSection",
  },
  TeamSection: { component: TeamSection, dictionaryKey: "teamSection" },
  TestimonialCarouselSection: {
    component: TestimonialCarouselSection,
    dictionaryKey: "testimonialCarouselSection",
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

export type SectionName = keyof typeof sectionsConfig;
