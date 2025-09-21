// shared/lib/schemas/i18n.schema.ts
/**
 * @file i18n.schema.ts
 * @description Aparato ensamblador y SSoT para el contrato del diccionario i18n.
 *              Esta es la Constitución de Contenido de toda la aplicación.
 * @version 23.0.0 (Holistic & Complete Assembly)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/shared/lib/logging";

// --- GRUPO 1: Schemas Globales y de Páginas del Portal ---
import { GlobalsLocaleSchema } from "@/shared/lib/schemas/globals.schema";
import { StorePageLocaleSchema } from "@/shared/lib/schemas/pages/store-page.schema";
import { TextPageContentSchema } from "@/shared/lib/schemas/pages/text-page.schema";
import { NotFoundPageLocaleSchema } from "@/shared/lib/schemas/pages/not-found-page.schema";
import { NewsArticlePageLocaleSchema } from "@/shared/lib/schemas/pages/news-article-page.schema";
import { ProductDetailPageLocaleSchema } from "@/shared/lib/schemas/pages/product-detail-page.schema";

// --- GRUPO 2: Schemas de Páginas del Developer Command Center (DCC) ---
import { DevDashboardLocaleSchema } from "@/shared/lib/schemas/pages/dev-dashboard.schema";
import { DevLoginPageLocaleSchema } from "@/shared/lib/schemas/pages/dev-login-page.schema";
import { DevTestPageLocaleSchema } from "@/shared/lib/schemas/pages/dev-test-page.schema";
import { CampaignSuiteLocaleSchema } from "@/shared/lib/schemas/pages/dev-campaign-suite.schema";
import { BaviHomePageLocaleSchema } from "@/shared/lib/schemas/pages/bavi-home-page.schema";
import { BaviAssetExplorerLocaleSchema } from "@/shared/lib/schemas/pages/bavi-asset-explorer.i18n.schema";
import { RaZPromptsHomePageLocaleSchema } from "@/shared/lib/schemas/pages/raz-prompts-home-page.schema";
import { CinematicDemoPageLocaleSchema } from "@/shared/lib/schemas/pages/dev-cinematic-demo-page.schema";

// --- GRUPO 3: Schemas de Componentes de Layout y UI ---
import { HeaderLocaleSchema } from "@/shared/lib/schemas/components/header.schema";
import { FooterLocaleSchema } from "@/shared/lib/schemas/components/footer.schema";
import { CookieConsentBannerLocaleSchema } from "@/shared/lib/schemas/components/cookie-consent-banner.schema";
import { DevHeaderLocaleSchema } from "@/shared/lib/schemas/components/dev/dev-header.schema";
import { DevHomepageHeaderLocaleSchema } from "@/shared/lib/schemas/components/dev/dev-homepage-header.schema";
import { DevRouteMenuLocaleSchema } from "@/shared/lib/schemas/components/dev/dev-route-menu.schema";
import { ToggleThemeLocaleSchema } from "@/shared/lib/schemas/components/toggle-theme.schema";
import { LanguageSwitcherLocaleSchema } from "@/shared/lib/schemas/components/language-switcher.schema";
import { PageHeaderLocaleSchema } from "@/shared/lib/schemas/components/page-header.schema";
import { CartLocaleSchema } from "@/shared/lib/schemas/components/cart.schema";
import { ValidationErrorLocaleSchema } from "@/shared/lib/schemas/components/validation-error.schema";
import { SuiteStyleComposerLocaleSchema } from "@/shared/lib/schemas/components/dev/suite-style-composer.schema";
import { ComponentCanvasHeaderLocaleSchema } from "@/shared/lib/schemas/components/dev/component-canvas-header.schema";
import { ComponentCanvasLocaleSchema } from "@/shared/lib/schemas/components/dev/component-canvas.schema";
import { ShareButtonLocaleSchema } from "@/shared/lib/schemas/components/share-button.schema";

// --- GRUPO 4: Schemas de Componentes de Sección ---
import { BenefitsSectionLocaleSchema } from "@/shared/lib/schemas/components/benefits-section.schema";
import { CommunitySectionLocaleSchema } from "@/shared/lib/schemas/components/community-section.schema";
import { ContactSectionLocaleSchema } from "@/shared/lib/schemas/components/contact-section.schema";
import { DoubleScrollingBannerLocaleSchema } from "@/shared/lib/schemas/components/double-scrolling-banner.schema";
import { FaqAccordionLocaleSchema } from "@/shared/lib/schemas/components/faq-accordion.schema";
import { FeaturedArticlesCarouselLocaleSchema } from "@/shared/lib/schemas/components/featured-articles-carousel.schema";
import { FeaturesSectionLocaleSchema } from "@/shared/lib/schemas/components/features-section.schema";
import { GuaranteeSectionLocaleSchema } from "@/shared/lib/schemas/components/guarantee-section.schema";
import { HeroLocaleSchema } from "@/shared/lib/schemas/components/hero.schema";
import { HeroNewsLocaleSchema } from "@/shared/lib/schemas/components/hero-news.schema";
import { IngredientAnalysisLocaleSchema } from "@/shared/lib/schemas/components/ingredient-analysis.schema";
import { NewsGridLocaleSchema } from "@/shared/lib/schemas/components/news-grid.schema";
import { OrderSectionLocaleSchema } from "@/shared/lib/schemas/components/order-section.schema";
import { PricingSectionLocaleSchema } from "@/shared/lib/schemas/components/pricing-section.schema";
import { ProductShowcaseLocaleSchema } from "@/shared/lib/schemas/components/product-showcase.schema";
import { ScrollingBannerLocaleSchema } from "@/shared/lib/schemas/components/scrolling-banner.schema";
import { ServicesSectionLocaleSchema } from "@/shared/lib/schemas/components/services-section.schema";
import { SocialProofLogosLocaleSchema } from "@/shared/lib/schemas/components/social-proof-logos.schema";
import { SponsorsSectionLocaleSchema } from "@/shared/lib/schemas/components/sponsors-section.schema";
import { TeamSectionLocaleSchema } from "@/shared/lib/schemas/components/team-section.schema";
import { TestimonialCarouselSectionLocaleSchema } from "@/shared/lib/schemas/components/testimonial-carousel-section.schema";
import { TestimonialGridLocaleSchema } from "@/shared/lib/schemas/components/testimonial-grid.schema";
import { ThumbnailCarouselLocaleSchema } from "@/shared/lib/schemas/components/thumbnail-carousel.schema";

// --- GRUPO 5: Schemas de Ecosistemas Adicionales (BAVI, RaZPrompts, razBits) ---
import { BaviUploaderLocaleSchema } from "@/shared/lib/schemas/bavi/bavi-uploader.i18n.schema";
import { PromptCreatorLocaleSchema } from "@/shared/lib/schemas/raz-prompts/prompt-creator.i18n.schema";
import { PromptVaultLocaleSchema } from "@/shared/lib/schemas/raz-prompts/prompt-vault.i18n.schema";
import { DockLocaleSchema } from "@/components/razBits/Dock/dock.schema";
import { LightRaysLocaleSchema } from "@/components/razBits/LightRays/light-rays.schema";
import { MagicBentoLocaleSchema } from "@/components/razBits/MagicBento/magic-bento.schema";

logger.trace("[Schema i18n v23.0] Ensamblando schema maestro completo...");

export const i18nSchema = z
  .object({
    ...GlobalsLocaleSchema.shape,
    ...StorePageLocaleSchema.shape,
    ...NotFoundPageLocaleSchema.shape,
    // Páginas de texto genéricas
    aboutPage: TextPageContentSchema.optional(),
    privacyPage: TextPageContentSchema.optional(),
    termsPage: TextPageContentSchema.optional(),
    cookiesPage: TextPageContentSchema.optional(),
    // Páginas del DCC
    ...DevDashboardLocaleSchema.shape,
    ...DevLoginPageLocaleSchema.shape,
    ...DevTestPageLocaleSchema.shape,
    ...CampaignSuiteLocaleSchema.shape,
    ...BaviHomePageLocaleSchema.shape,
    ...BaviAssetExplorerLocaleSchema.shape,
    ...RaZPromptsHomePageLocaleSchema.shape,
    ...CinematicDemoPageLocaleSchema.shape,
    // Componentes de Layout y UI
    ...HeaderLocaleSchema.shape,
    ...FooterLocaleSchema.shape,
    ...CookieConsentBannerLocaleSchema.shape,
    ...DevHeaderLocaleSchema.shape,
    ...DevHomepageHeaderLocaleSchema.shape,
    ...DevRouteMenuLocaleSchema.shape,
    ...ToggleThemeLocaleSchema.shape,
    ...LanguageSwitcherLocaleSchema.shape,
    ...PageHeaderLocaleSchema.shape,
    ...CartLocaleSchema.shape,
    ...ValidationErrorLocaleSchema.shape,
    ...SuiteStyleComposerLocaleSchema.shape,
    ...ComponentCanvasHeaderLocaleSchema.shape,
    ...ComponentCanvasLocaleSchema.shape,
    ...ShareButtonLocaleSchema.shape,
    // Componentes de Sección
    ...BenefitsSectionLocaleSchema.shape,
    ...CommunitySectionLocaleSchema.shape,
    ...ContactSectionLocaleSchema.shape,
    ...DoubleScrollingBannerLocaleSchema.shape,
    ...FaqAccordionLocaleSchema.shape,
    ...FeaturedArticlesCarouselLocaleSchema.shape,
    ...FeaturesSectionLocaleSchema.shape,
    ...GuaranteeSectionLocaleSchema.shape,
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
    // Ecosistemas Adicionales
    ...BaviUploaderLocaleSchema.shape,
    ...PromptCreatorLocaleSchema.shape,
    ...PromptVaultLocaleSchema.shape,
    ...DockLocaleSchema.shape,
    ...LightRaysLocaleSchema.shape,
    ...MagicBentoLocaleSchema.shape,
  })
  // Permite claves dinámicas para artículos y productos
  .passthrough();

export type Dictionary = z.infer<typeof i18nSchema>;
// shared/lib/schemas/i18n.schema.ts
