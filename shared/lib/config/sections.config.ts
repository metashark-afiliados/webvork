// RUTA: shared/lib/config/sections.config.ts
/**
 * @file sections.config.ts
 * @description SSoT para la configuración de secciones. Define el mapeo entre
 *              un nombre de sección, su componente React, su clave de diccionario
 *              i18n y su contrato de datos (schema de Zod).
 * @version 19.0.0 (Holistic Completion & Hygiene Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
import { type ComponentType, type RefAttributes } from "react";
import { z } from "zod";
import { logger } from "@/shared/lib/logging";
import * as Sections from "@/components/sections";

// Importación de TODOS los schemas de contenido de sección desde su SSoT
import { BenefitsSectionContentSchema } from "@/shared/lib/schemas/components/benefits-section.schema";
import { CommunitySectionContentSchema } from "@/shared/lib/schemas/components/community-section.schema";
import { ContactSectionContentSchema } from "@/shared/lib/schemas/components/contact-section.schema";
import { DoubleScrollingBannerContentSchema } from "@/shared/lib/schemas/components/double-scrolling-banner.schema";
import { FaqAccordionContentSchema } from "@/shared/lib/schemas/components/faq-accordion.schema";
import { FeaturedArticlesCarouselContentSchema } from "@/shared/lib/schemas/components/featured-articles-carousel.schema";
import { FeaturesSectionContentSchema } from "@/shared/lib/schemas/components/features-section.schema";
import { GuaranteeSectionContentSchema } from "@/shared/lib/schemas/components/guarantee-section.schema";
import { HeroContentSchema } from "@/shared/lib/schemas/components/hero.schema";
import { HeroNewsContentSchema } from "@/shared/lib/schemas/components/hero-news.schema";
import { IngredientAnalysisContentSchema } from "@/shared/lib/schemas/components/ingredient-analysis.schema";
import { NewsGridContentSchema } from "@/shared/lib/schemas/components/news-grid.schema";
import { OrderSectionContentSchema } from "@/shared/lib/schemas/components/order-section.schema";
import { PricingSectionContentSchema } from "@/shared/lib/schemas/components/pricing-section.schema";
import { ProductShowcaseContentSchema } from "@/shared/lib/schemas/components/product-showcase.schema";
// --- [INICIO DE CORRECCIÓN DE HIGIENE] ---
// Se elimina la importación no utilizada de 'ScrollingBannerContentSchema'.
// --- [FIN DE CORRECCIÓN DE HIGIENE] ---
import { ServicesSectionContentSchema } from "@/shared/lib/schemas/components/services-section.schema";
import { SocialProofLogosContentSchema } from "@/shared/lib/schemas/components/social-proof-logos.schema";
import { SponsorsSectionContentSchema } from "@/shared/lib/schemas/components/sponsors-section.schema";
import { TeamSectionContentSchema } from "@/shared/lib/schemas/components/team-section.schema";
import { TestimonialCarouselSectionContentSchema } from "@/shared/lib/schemas/components/testimonial-carousel-section.schema";
import { TestimonialGridContentSchema } from "@/shared/lib/schemas/components/testimonial-grid.schema";
import { TextPageContentSchema } from "@/shared/lib/schemas/pages/text-page.schema";
import { ThumbnailCarouselContentSchema } from "@/shared/lib/schemas/components/thumbnail-carousel.schema";

logger.trace(
  "[sections.config] Módulo de configuración de secciones (v19.0) cargado."
);

interface SectionConfigEntry<P> {
  component: ComponentType<P & RefAttributes<HTMLElement>>;
  dictionaryKey: string;
  schema: z.ZodObject<z.ZodRawShape>;
}

function createSectionConfig<P>(
  config: SectionConfigEntry<P>
): SectionConfigEntry<P> {
  return config;
}

export const sectionsConfig = {
  BenefitsSection: createSectionConfig({
    component: Sections.BenefitsSection,
    dictionaryKey: "benefitsSection",
    schema: BenefitsSectionContentSchema,
  }),
  CommunitySection: createSectionConfig({
    component: Sections.CommunitySection,
    dictionaryKey: "communitySection",
    schema: CommunitySectionContentSchema,
  }),
  ContactSection: createSectionConfig({
    component: Sections.ContactSection,
    dictionaryKey: "contactSection",
    schema: ContactSectionContentSchema,
  }),
  DoubleScrollingBanner: createSectionConfig({
    component: Sections.DoubleScrollingBanner,
    dictionaryKey: "doubleScrollingBanner",
    schema: DoubleScrollingBannerContentSchema,
  }),
  FaqAccordion: createSectionConfig({
    component: Sections.FaqAccordion,
    dictionaryKey: "faqAccordion",
    schema: FaqAccordionContentSchema,
  }),
  FeaturedArticlesCarousel: createSectionConfig({
    component: Sections.FeaturedArticlesCarousel,
    dictionaryKey: "featuredArticlesCarousel",
    schema: FeaturedArticlesCarouselContentSchema,
  }),
  FeaturesSection: createSectionConfig({
    component: Sections.FeaturesSection,
    dictionaryKey: "featuresSection",
    schema: FeaturesSectionContentSchema,
  }),
  GuaranteeSection: createSectionConfig({
    component: Sections.GuaranteeSection,
    dictionaryKey: "guaranteeSection",
    schema: GuaranteeSectionContentSchema,
  }),
  Hero: createSectionConfig({
    component: Sections.Hero,
    dictionaryKey: "hero",
    schema: HeroContentSchema,
  }),
  HeroNews: createSectionConfig({
    component: Sections.HeroNews,
    dictionaryKey: "heroNews",
    schema: HeroNewsContentSchema,
  }),
  IngredientAnalysis: createSectionConfig({
    component: Sections.IngredientAnalysis,
    dictionaryKey: "ingredientAnalysis",
    schema: IngredientAnalysisContentSchema,
  }),
  NewsGrid: createSectionConfig({
    component: Sections.NewsGrid,
    dictionaryKey: "newsGrid",
    schema: NewsGridContentSchema,
  }),
  OrderSection: createSectionConfig({
    component: Sections.OrderSection,
    dictionaryKey: "orderSection",
    schema: OrderSectionContentSchema,
  }),
  PricingSection: createSectionConfig({
    component: Sections.PricingSection,
    dictionaryKey: "pricingSection",
    schema: PricingSectionContentSchema,
  }),
  ProductShowcase: createSectionConfig({
    component: Sections.ProductShowcase,
    dictionaryKey: "productShowcase",
    schema: ProductShowcaseContentSchema,
  }),
  ServicesSection: createSectionConfig({
    component: Sections.ServicesSection,
    dictionaryKey: "servicesSection",
    schema: ServicesSectionContentSchema,
  }),
  SocialProofLogos: createSectionConfig({
    component: Sections.SocialProofLogos,
    dictionaryKey: "socialProofLogos",
    schema: SocialProofLogosContentSchema,
  }),
  SponsorsSection: createSectionConfig({
    component: Sections.SponsorsSection,
    dictionaryKey: "sponsorsSection",
    schema: SponsorsSectionContentSchema,
  }),
  TeamSection: createSectionConfig({
    component: Sections.TeamSection,
    dictionaryKey: "teamSection",
    schema: TeamSectionContentSchema,
  }),
  TestimonialCarouselSection: createSectionConfig({
    component: Sections.TestimonialCarouselSection,
    dictionaryKey: "testimonialCarouselSection",
    schema: TestimonialCarouselSectionContentSchema,
  }),
  TestimonialGrid: createSectionConfig({
    component: Sections.TestimonialGrid,
    dictionaryKey: "testimonialGrid",
    schema: TestimonialGridContentSchema,
  }),
  TextSection: createSectionConfig({
    component: Sections.TextSection,
    dictionaryKey: "aboutPage",
    schema: TextPageContentSchema,
  }),
  ThumbnailCarousel: createSectionConfig({
    component: Sections.ThumbnailCarousel,
    dictionaryKey: "thumbnailCarousel",
    schema: ThumbnailCarouselContentSchema,
  }),
} as const;

export type SectionName = keyof typeof sectionsConfig;
