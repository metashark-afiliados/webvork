// lib/schemas/i18n.schema.ts
/**
 * @file i18n.schema.ts
 * @description Aparato ensamblador y SSoT para el contrato de datos del diccionario i18n.
 *              - v8.0.0: Integra el schema para la nueva Suite de Diseño de Campañas.
 * @version 8.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

// --- Dominio de Schemas: Globales y Páginas ---
import { GlobalsLocaleSchema } from "@/schemas/globals.schema";
import { StorePageLocaleSchema } from "@/schemas/pages/store-page.schema";
import { TextPageLocaleSchema } from "@/schemas/pages/text-page.schema";
import { NotFoundPageLocaleSchema } from "@/schemas/pages/not-found-page.schema";
import { DevDashboardLocaleSchema } from "@/schemas/pages/dev-dashboard.schema";
import { DevCampaignSimulatorLocaleSchema } from "@/schemas/pages/dev-campaign-simulator.schema";
import { DevLayoutConfiguratorLocaleSchema } from "@/schemas/pages/dev-layout-configurator.schema";
import { DevLoginPageLocaleSchema } from "@/schemas/pages/dev-login-page.schema";
import { DevTestPageLocaleSchema } from "@/lib/schemas/pages/dev-test-page.schema";
import { CampaignSuiteLocaleSchema } from "@/lib/schemas/pages/dev-campaign-suite.schema"; // <-- IMPORTACIÓN CLAVE

// --- Dominio de Schemas: Componentes del Portal ---
import { BenefitsSectionLocaleSchema } from "@/schemas/components/benefits-section.schema";
import { CommunitySectionLocaleSchema } from "@/schemas/components/community-section.schema";
import { ContactSectionLocaleSchema } from "@/schemas/components/contact-section.schema";
import { CookieConsentBannerLocaleSchema } from "@/schemas/components/cookie-consent-banner.schema";
import { DoubleScrollingBannerLocaleSchema } from "@/schemas/components/double-scrolling-banner.schema";
import { FaqAccordionLocaleSchema } from "@/schemas/components/faq-accordion.schema";
import { FeaturedArticlesCarouselLocaleSchema } from "@/schemas/components/featured-articles-carousel.schema";
import { FeaturesSectionLocaleSchema } from "@/schemas/components/features-section.schema";
import { FooterLocaleSchema } from "@/schemas/components/footer.schema";
import { GuaranteeSectionLocaleSchema } from "@/schemas/components/guarantee-section.schema";
import { HeaderLocaleSchema } from "@/schemas/components/header.schema";
import { HeroLocaleSchema } from "@/schemas/components/hero.schema";
import { HeroNewsLocaleSchema } from "@/schemas/components/hero-news.schema";
import { IngredientAnalysisLocaleSchema } from "@/schemas/components/ingredient-analysis.schema";
import { NewsGridLocaleSchema } from "@/schemas/components/news-grid.schema";
import { OrderSectionLocaleSchema } from "@/schemas/components/order-section.schema";
import { PricingSectionLocaleSchema } from "@/schemas/components/pricing-section.schema";
import { ProductShowcaseLocaleSchema } from "@/schemas/components/product-showcase.schema";
import { ScrollingBannerLocaleSchema } from "@/schemas/components/scrolling-banner.schema";
import { ServicesSectionLocaleSchema } from "@/schemas/components/services-section.schema";
import { SocialProofLogosLocaleSchema } from "@/schemas/components/social-proof-logos.schema";
import { SponsorsSectionLocaleSchema } from "@/schemas/components/sponsors-section.schema";
import { TeamSectionLocaleSchema } from "@/schemas/components/team-section.schema";
import { TestimonialCarouselSectionLocaleSchema } from "@/schemas/components/testimonial-carousel-section.schema";
import { TestimonialGridLocaleSchema } from "@/schemas/components/testimonial-grid.schema";
import { ThumbnailCarouselLocaleSchema } from "@/schemas/components/thumbnail-carousel.schema";

// --- Dominio de Schemas: Componentes de Desarrollo (DEV) ---
import { DevHeaderLocaleSchema } from "@/schemas/components/dev/dev-header.schema";
import { DevHomepageHeaderLocaleSchema } from "@/schemas/components/dev/dev-homepage-header.schema";
import { DevRouteMenuLocaleSchema } from "@/schemas/components/dev/dev-route-menu.schema";
import { RouteTesterLocaleSchema } from "@/schemas/components/dev/route-tester.schema";

// --- Dominio de Schemas: Componentes Naturalizados (razBits) ---
import { DockLocaleSchema } from "@/razBits/Dock/dock.schema";
import { LightRaysLocaleSchema } from "@/razBits/LightRays/light-rays.schema";
import { MagicBentoLocaleSchema } from "@/razBits/MagicBento/magic-bento.schema";

/**
 * @const i18nSchema
 * @description El esquema maestro que ensambla todos los contratos de datos en una única estructura.
 */
export const i18nSchema = z.object({
  // Fusión de Globales y Páginas
  ...GlobalsLocaleSchema.shape,
  storePage: StorePageLocaleSchema.shape.storePage.unwrap(),
  aboutPage: TextPageLocaleSchema.optional(),
  privacyPage: TextPageLocaleSchema.optional(),
  termsPage: TextPageLocaleSchema.optional(),
  ...NotFoundPageLocaleSchema.shape,

  // Fusión de Páginas de Desarrollo
  ...DevDashboardLocaleSchema.shape,
  ...DevCampaignSimulatorLocaleSchema.shape,
  ...DevLayoutConfiguratorLocaleSchema.shape,
  ...DevLoginPageLocaleSchema.shape,
  ...DevTestPageLocaleSchema.shape,
  ...CampaignSuiteLocaleSchema.shape, // <-- FUSIÓN DE LA NUEVA SUITE

  // Fusión de Componentes del Portal
  ...BenefitsSectionLocaleSchema.shape,
  ...CommunitySectionLocaleSchema.shape,
  ...ContactSectionLocaleSchema.shape,
  ...CookieConsentBannerLocaleSchema.shape,
  ...DoubleScrollingBannerLocaleSchema.shape,
  ...FaqAccordionLocaleSchema.shape,
  ...FeaturedArticlesCarouselLocaleSchema.shape,
  ...FeaturesSectionLocaleSchema.shape,
  ...FooterLocaleSchema.shape,
  ...GuaranteeSectionLocaleSchema.shape,
  ...HeaderLocaleSchema.shape,
  ...HeroLocaleSchema.shape,
  ...HeroNewsLocaleSchema.shape,
  ...IngredientAnalysisLocaleSchema.shape,
  newsGrid: NewsGridLocaleSchema.shape.newsGrid.unwrap(),
  ...OrderSectionLocaleSchema.shape,
  ...PricingSectionLocaleSchema.shape,
  ...ProductShowcaseLocaleSchema.shape,
  ...ScrollingBannerLocaleSchema.shape,
  ...ServicesSectionLocaleSchema.shape,
  ...SocialProofLogosLocaleSchema.shape,
  ...SponsorsSectionLocaleSchema.shape,
  ...TeamSectionLocaleSchema.shape,
  ...TestimonialCarouselSectionLocaleSchema.shape,
  ...TestimonialGridLocaleSchema.shape,
  ...ThumbnailCarouselLocaleSchema.shape,

  // Fusión de Componentes de Desarrollo
  ...DevHeaderLocaleSchema.shape,
  ...DevHomepageHeaderLocaleSchema.shape,
  ...DevRouteMenuLocaleSchema.shape,
  ...RouteTesterLocaleSchema.shape,

  // Fusión de Componentes razBits
  ...DockLocaleSchema.shape,
  ...LightRaysLocaleSchema.shape,
  ...MagicBentoLocaleSchema.shape,
});

/**
 * @type Dictionary
 * @description Infiere el tipo TypeScript completo para el diccionario de un locale.
 *              Esta es la SSoT para el tipado del contenido en toda la aplicación.
 */
export type Dictionary = z.infer<typeof i18nSchema>;
// lib/schemas/i18n.schema.ts
