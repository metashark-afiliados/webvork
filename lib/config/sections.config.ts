// lib/config/sections.config.ts
/**
 * @file sections.config.ts
 * @description SSoT para la configuración de secciones.
 *              - v17.0.0 (ForwardRef Compatibility): Refactorizado para ser compatible
 *                con componentes que utilizan React.forwardRef.
 *              - v17.1.0 (Holistic Fix): Resuelve errores de importación, de linting
 *                y de seguridad de tipos, alineando el aparato con la arquitectura SSoT.
 * @version 17.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { type ComponentType, type RefAttributes } from "react";
import { z } from "zod";
import { logger } from "@/lib/logging";
import * as Sections from "@/components/sections";
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
import { TextPageContentSchema } from "@/lib/schemas/pages/text-page.schema";

logger.trace(
  "[sections.config] Módulo de configuración de secciones (v17.1) cargado."
);

interface SectionConfigEntry<P> {
  component: ComponentType<P & RefAttributes<HTMLElement>>;
  dictionaryKey: string;
  schema: z.ZodObject<z.ZodRawShape>; // <-- CORRECCIÓN: 'any' reemplazado por 'ZodRawShape'
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
    dictionaryKey: "aboutPage", // Asumiendo un caso de uso, esto podría variar
    schema: TextPageContentSchema,
  }),
  ThumbnailCarousel: createSectionConfig({
    component: Sections.ThumbnailCarousel,
    dictionaryKey: "thumbnailCarousel",
    schema: ThumbnailCarouselContentSchema,
  }),
} as const;

export type SectionName = keyof typeof sectionsConfig;
// lib/config/sections.config.ts
