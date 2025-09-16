// lib/config/sections.config.ts
/**
 * @file sections.config.ts
 * @description SSoT para la configuración de secciones.
 *              - v16.2.0 (Architectural Fix): Resuelve la cascada de errores TS2740
 *                al consumir los nuevos schemas de contenido puros (ej. BenefitsSectionContentSchema)
 *                en lugar de los schemas de locale opcionales. Esto alinea el
 *                contrato de tipos y estabiliza el SectionRenderer.
 * @version 16.2.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { z } from "zod";
import { logger } from "@/lib/logging";

// --- Importaciones de Componentes de Sección ---
import * as Sections from "@/components/sections";

// --- Importaciones de Schemas de Contenido Puro ---
import { BenefitsSectionContentSchema } from "@/lib/schemas/components/benefits-section.schema";
import { CommunitySectionContentSchema } from "@/lib/schemas/components/community-section.schema";
import { ContactSectionContentSchema } from "@/lib/schemas/components/contact-section.schema";
import { DoubleScrollingBannerContentSchema } from "@/lib/schemas/components/double-scrolling-banner.schema";
import { FaqAccordionContentSchema } from "@/lib/schemas/components/faq-accordion.schema";
import { FeaturedArticlesCarouselContentSchema } from "@/lib/schemas/components/featured-articles-carousel.schema";
import { FeaturesSectionContentSchema } from "@/lib/schemas/components/features-section.schema";
import { GuaranteeSectionContentSchema } from "@/lib/schemas/components/guarantee-section.schema";
import { HeroContentSchema } from "@/lib/schemas/components/hero.schema";
import { HeroNewsContentSchema } from "@/lib/schemas/components/hero-news.schema";
import { IngredientAnalysisContentSchema } from "@/lib/schemas/components/ingredient-analysis.schema";
import { NewsGridContentSchema } from "@/lib/schemas/components/news-grid.schema";
import { OrderSectionContentSchema } from "@/lib/schemas/components/order-section.schema";
import { PricingSectionContentSchema } from "@/lib/schemas/components/pricing-section.schema";
import { ProductShowcaseContentSchema } from "@/lib/schemas/components/product-showcase.schema";
import { ServicesSectionContentSchema } from "@/lib/schemas/components/services-section.schema";
import { SocialProofLogosContentSchema } from "@/lib/schemas/components/social-proof-logos.schema";
import { SponsorsSectionContentSchema } from "@/lib/schemas/components/sponsors-section.schema";
import { TeamSectionContentSchema } from "@/lib/schemas/components/team-section.schema";
import { TestimonialCarouselSectionContentSchema } from "@/lib/schemas/components/testimonial-carousel-section.schema";
import { TestimonialGridContentSchema } from "@/lib/schemas/components/testimonial-grid.schema";
import { ThumbnailCarouselContentSchema } from "@/lib/schemas/components/thumbnail-carousel.schema";

logger.trace(
  "[sections.config] Módulo de configuración de secciones (v16.2) cargado."
);

interface SectionConfigEntry {
  component: React.ComponentType<any>;
  dictionaryKey: string;
  schema: z.ZodObject<any>;
}

export const sectionsConfig = {
  BenefitsSection: {
    component: Sections.BenefitsSection,
    dictionaryKey: "benefitsSection",
    schema: BenefitsSectionContentSchema,
  },
  CommunitySection: {
    component: Sections.CommunitySection,
    dictionaryKey: "communitySection",
    schema: CommunitySectionContentSchema,
  },
  ContactSection: {
    component: Sections.ContactSection,
    dictionaryKey: "contactSection",
    schema: ContactSectionContentSchema,
  },
  DoubleScrollingBanner: {
    component: Sections.DoubleScrollingBanner,
    dictionaryKey: "doubleScrollingBanner",
    schema: DoubleScrollingBannerContentSchema,
  },
  FaqAccordion: {
    component: Sections.FaqAccordion,
    dictionaryKey: "faqAccordion",
    schema: FaqAccordionContentSchema,
  },
  FeaturedArticlesCarousel: {
    component: Sections.FeaturedArticlesCarousel,
    dictionaryKey: "featuredArticlesCarousel",
    schema: FeaturedArticlesCarouselContentSchema,
  },
  FeaturesSection: {
    component: Sections.FeaturesSection,
    dictionaryKey: "featuresSection",
    schema: FeaturesSectionContentSchema,
  },
  GuaranteeSection: {
    component: Sections.GuaranteeSection,
    dictionaryKey: "guaranteeSection",
    schema: GuaranteeSectionContentSchema,
  },
  Hero: {
    component: Sections.Hero,
    dictionaryKey: "hero",
    schema: HeroContentSchema,
  },
  HeroNews: {
    component: Sections.HeroNews,
    dictionaryKey: "heroNews",
    schema: HeroNewsContentSchema,
  },
  IngredientAnalysis: {
    component: Sections.IngredientAnalysis,
    dictionaryKey: "ingredientAnalysis",
    schema: IngredientAnalysisContentSchema,
  },
  NewsGrid: {
    component: Sections.NewsGrid,
    dictionaryKey: "newsGrid",
    schema: NewsGridContentSchema,
  },
  OrderSection: {
    component: Sections.OrderSection,
    dictionaryKey: "orderSection",
    schema: OrderSectionContentSchema,
  },
  PricingSection: {
    component: Sections.PricingSection,
    dictionaryKey: "pricingSection",
    schema: PricingSectionContentSchema,
  },
  ProductShowcase: {
    component: Sections.ProductShowcase,
    dictionaryKey: "productShowcase",
    schema: ProductShowcaseContentSchema,
  },
  ServicesSection: {
    component: Sections.ServicesSection,
    dictionaryKey: "servicesSection",
    schema: ServicesSectionContentSchema,
  },
  SocialProofLogos: {
    component: Sections.SocialProofLogos,
    dictionaryKey: "socialProofLogos",
    schema: SocialProofLogosContentSchema,
  },
  SponsorsSection: {
    component: Sections.SponsorsSection,
    dictionaryKey: "sponsorsSection",
    schema: SponsorsSectionContentSchema,
  },
  TeamSection: {
    component: Sections.TeamSection,
    dictionaryKey: "teamSection",
    schema: TeamSectionContentSchema,
  },
  TestimonialCarouselSection: {
    component: Sections.TestimonialCarouselSection,
    dictionaryKey: "testimonialCarouselSection",
    schema: TestimonialCarouselSectionContentSchema,
  },
  TestimonialGrid: {
    component: Sections.TestimonialGrid,
    dictionaryKey: "testimonialGrid",
    schema: TestimonialGridContentSchema,
  },
  ThumbnailCarousel: {
    component: Sections.ThumbnailCarousel,
    dictionaryKey: "thumbnailCarousel",
    schema: ThumbnailCarouselContentSchema,
  },
} as const satisfies Record<string, SectionConfigEntry>;

export type SectionName = keyof typeof sectionsConfig;
// lib/config/sections.config.ts
