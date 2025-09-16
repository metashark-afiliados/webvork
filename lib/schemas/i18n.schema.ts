// lib/schemas/i18n.schema.ts
/**
 * @file i18n.schema.ts
 * @description Aparato ensamblador y SSoT para el contrato de datos del diccionario i18n.
 *              - v12.4.0 (Deprecation Cleanup): Se elimina la importación y fusión
 *                del schema obsoleto `DevLayoutConfiguratorLocaleSchema`, completando
 *                la erradicación del módulo `layout-configurator`.
 * @version 12.4.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";

// --- Importaciones de Schemas Globales y de Páginas ---
import { GlobalsLocaleSchema } from "@/lib/schemas/globals.schema";
import { StorePageLocaleSchema } from "@/lib/schemas/pages/store-page.schema";
import { TextPageLocaleSchema } from "@/lib/schemas/pages/text-page.schema";
import { NotFoundPageLocaleSchema } from "@/lib/schemas/pages/not-found-page.schema";
import { DevDashboardLocaleSchema } from "@/lib/schemas/pages/dev-dashboard.schema";
import { DevCampaignSimulatorLocaleSchema } from "@/lib/schemas/pages/dev-campaign-simulator.schema";
import { DevLoginPageLocaleSchema } from "@/lib/schemas/pages/dev-login-page.schema";
import { DevTestPageLocaleSchema } from "@/lib/schemas/pages/dev-test-page.schema";
import { CampaignSuiteLocaleSchema } from "@/lib/schemas/pages/dev-campaign-suite.schema";

// --- Importaciones de Schemas de Componentes ---
import { BenefitsSectionLocaleSchema } from "./components/benefits-section.schema";
import { CommunitySectionLocaleSchema } from "./components/community-section.schema";
import { ContactSectionLocaleSchema } from "./components/contact-section.schema";
import { CookieConsentBannerLocaleSchema } from "./components/cookie-consent-banner.schema";
import { DoubleScrollingBannerLocaleSchema } from "./components/double-scrolling-banner.schema";
import { FaqAccordionLocaleSchema } from "./components/faq-accordion.schema";
import { FeaturedArticlesCarouselLocaleSchema } from "./components/featured-articles-carousel.schema";
import { FeaturesSectionLocaleSchema } from "./components/features-section.schema";
import { FooterLocaleSchema } from "./components/footer.schema";
import { GuaranteeSectionLocaleSchema } from "./components/guarantee-section.schema";
import { HeaderLocaleSchema } from "./components/header.schema";
import { HeroLocaleSchema } from "./components/hero.schema";
import { HeroNewsLocaleSchema } from "./components/hero-news.schema";
import { IngredientAnalysisLocaleSchema } from "./components/ingredient-analysis.schema";
import { NewsGridLocaleSchema } from "./components/news-grid.schema";
import { OrderSectionLocaleSchema } from "./components/order-section.schema";
import { PricingSectionLocaleSchema } from "./components/pricing-section.schema";
import { ProductShowcaseLocaleSchema } from "./components/product-showcase.schema";
import { ServicesSectionLocaleSchema } from "./components/services-section.schema";
import { SocialProofLogosLocaleSchema } from "./components/social-proof-logos.schema";
import { SponsorsSectionLocaleSchema } from "./components/sponsors-section.schema";
import { TeamSectionLocaleSchema } from "./components/team-section.schema";
import { TestimonialCarouselSectionLocaleSchema } from "./components/testimonial-carousel-section.schema";
import { TestimonialGridLocaleSchema } from "./components/testimonial-grid.schema";
import { ThumbnailCarouselLocaleSchema } from "./components/thumbnail-carousel.schema";
import { ScrollingBannerLocaleSchema } from "./components/scrolling-banner.schema";
import { DevRouteMenuLocaleSchema } from "./components/dev/dev-route-menu.schema";
import { DevHeaderLocaleSchema } from "./components/dev/dev-header.schema";
import { DevHomepageHeaderLocaleSchema } from "./components/dev/dev-homepage-header.schema";

// Importaciones de Schemas de razBits
import { DockLocaleSchema } from "@/components/razBits/Dock/dock.schema";
import { LightRaysLocaleSchema } from "@/components/razBits/LightRays/light-rays.schema";
import { MagicBentoLocaleSchema } from "@/components/razBits/MagicBento/magic-bento.schema";

logger.trace(
  "[Schema i18n v12.4] Ensamblando schema tras limpieza de módulos obsoletos..."
);

export const i18nSchema = z
  .object({
    // --- Páginas y Globales ---
    ...GlobalsLocaleSchema.shape,
    storePage: StorePageLocaleSchema.shape.storePage.unwrap(),
    aboutPage: TextPageLocaleSchema.optional(),
    privacyPage: TextPageLocaleSchema.optional(),
    termsPage: TextPageLocaleSchema.optional(),
    ...NotFoundPageLocaleSchema.shape,
    ...DevDashboardLocaleSchema.shape,
    ...DevCampaignSimulatorLocaleSchema.shape,
    ...DevLoginPageLocaleSchema.shape,
    ...DevTestPageLocaleSchema.shape,
    ...CampaignSuiteLocaleSchema.shape,

    // --- Ensamblaje de Schemas de Componentes ---
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
    ...NewsGridLocaleSchema.shape,
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
    ...DevRouteMenuLocaleSchema.shape,
    ...DevHeaderLocaleSchema.shape,
    ...DevHomepageHeaderLocaleSchema.shape,

    // --- Ensamblaje de Schemas de razBits ---
    ...DockLocaleSchema.shape,
    ...LightRaysLocaleSchema.shape,
    ...MagicBentoLocaleSchema.shape,
  })
  .passthrough();

export type Dictionary = z.infer<typeof i18nSchema>;
// lib/schemas/i18n.schema.ts
