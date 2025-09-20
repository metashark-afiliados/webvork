// RUTA: shared/lib/schemas/i18n.schema.ts
/**
 * @file i18n.schema.ts
 * @description Aparato ensamblador y SSoT para el contrato del diccionario i18n.
 * @version 20.1.0 (Holistic Schema Integrity - Suite Composer Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/shared/lib/logging";

// --- GRUPO 1: Schemas Globales y de Páginas del Portal ---
import { GlobalsLocaleSchema } from "@/shared/lib/schemas/globals.schema";
import { StorePageLocaleSchema } from "@/shared/lib/schemas/pages/store-page.schema";
import { TextPageContentSchema } from "@/shared/lib/schemas/pages/text-page.schema";
import { NotFoundPageLocaleSchema } from "@/shared/lib/schemas/pages/not-found-page.schema";

// --- GRUPO 2: Schemas de Páginas del Developer Command Center (DCC) ---
import { DevDashboardLocaleSchema } from "@/shared/lib/schemas/pages/dev-dashboard.schema";
import { DevLoginPageLocaleSchema } from "./pages/dev-login-page.schema";
import { DevTestPageLocaleSchema } from "@/shared/lib/schemas/pages/dev-test-page.schema";
import { CampaignSuiteLocaleSchema } from "@/shared/lib/schemas/pages/dev-campaign-suite.schema";
import { BaviHomePageLocaleSchema } from "./pages/bavi-home-page.schema";
import { BaviAssetExplorerLocaleSchema } from "./pages/bavi-asset-explorer.i18n.schema";
import { RaZPromptsHomePageLocaleSchema } from "./pages/raz-prompts-home-page.schema";

// --- GRUPO 3: Schemas de Componentes de Layout y UI ---
import { HeaderLocaleSchema } from "./components/header.schema";
import { FooterLocaleSchema } from "./components/footer.schema";
import { CookieConsentBannerLocaleSchema } from "./components/cookie-consent-banner.schema";
import { DevHeaderLocaleSchema } from "./components/dev/dev-header.schema";
import { DevHomepageHeaderLocaleSchema } from "./components/dev/dev-homepage-header.schema";
import { DevRouteMenuLocaleSchema } from "./components/dev/dev-route-menu.schema";
import { ToggleThemeLocaleSchema } from "./components/toggle-theme.schema";
import { LanguageSwitcherLocaleSchema } from "./components/language-switcher.schema";
import { PageHeaderLocaleSchema } from "./components/page-header.schema";
import { CartLocaleSchema } from "./components/cart.schema";
import { ValidationErrorLocaleSchema } from "./components/validation-error.schema";
// --- INICIO DE CORRECCIÓN ---
import { SuiteStyleComposerLocaleSchema } from "./components/dev/suite-style-composer.schema";
// --- FIN DE CORRECCIÓN ---

// --- GRUPO 4: Schemas de Componentes de Sección ---
import { BenefitsSectionLocaleSchema } from "./components/benefits-section.schema";
import { CommunitySectionLocaleSchema } from "./components/community-section.schema";
import { ContactSectionLocaleSchema } from "./components/contact-section.schema";
import { DoubleScrollingBannerLocaleSchema } from "./components/double-scrolling-banner.schema";
import { FaqAccordionLocaleSchema } from "./components/faq-accordion.schema";
import { FeaturedArticlesCarouselLocaleSchema } from "./components/featured-articles-carousel.schema";
import { FeaturesSectionLocaleSchema } from "./components/features-section.schema";
import { GuaranteeSectionLocaleSchema } from "./components/guarantee-section.schema";
import { HeroLocaleSchema } from "./components/hero.schema";
import { HeroNewsLocaleSchema } from "./components/hero-news.schema";
import { IngredientAnalysisLocaleSchema } from "./components/ingredient-analysis.schema";
import { NewsGridLocaleSchema } from "./components/news-grid.schema";
import { OrderSectionLocaleSchema } from "./components/order-section.schema";
import { PricingSectionLocaleSchema } from "./components/pricing-section.schema";
import { ProductShowcaseLocaleSchema } from "./components/product-showcase.schema";
import { ScrollingBannerLocaleSchema } from "./components/scrolling-banner.schema";
import { ServicesSectionLocaleSchema } from "./components/services-section.schema";
import { SocialProofLogosLocaleSchema } from "./components/social-proof-logos.schema";
import { SponsorsSectionLocaleSchema } from "./components/sponsors-section.schema";
import { TeamSectionLocaleSchema } from "./components/team-section.schema";
import { TestimonialCarouselSectionLocaleSchema } from "./components/testimonial-carousel-section.schema";
import { TestimonialGridLocaleSchema } from "./components/testimonial-grid.schema";
import { ThumbnailCarouselLocaleSchema } from "./components/thumbnail-carousel.schema";

// --- GRUPO 5: Schemas de Ecosistemas Adicionales (BAVI, RaZPrompts) ---
import { BaviUploaderLocaleSchema } from "./bavi/bavi-uploader.i18n.schema";
import { PromptCreatorLocaleSchema } from "./raz-prompts/prompt-creator.i18n.schema";
import { PromptVaultLocaleSchema } from "./raz-prompts/prompt-vault.i18n.schema";
import { DockLocaleSchema } from "@/components/razBits/Dock/dock.schema";
import { LightRaysLocaleSchema } from "@/components/razBits/LightRays/light-rays.schema";
import { MagicBentoLocaleSchema } from "@/components/razBits/MagicBento/magic-bento.schema";

logger.trace("[Schema i18n v20.1] Ensamblando schema maestro optimizado...");

export const i18nSchema = z
  .object({
    ...GlobalsLocaleSchema.shape,
    ...StorePageLocaleSchema.shape,
    ...NotFoundPageLocaleSchema.shape,
    aboutPage: TextPageContentSchema.optional(),
    privacyPage: TextPageContentSchema.optional(),
    termsPage: TextPageContentSchema.optional(),
    cookiesPage: TextPageContentSchema.optional(),
    ...DevDashboardLocaleSchema.shape,
    ...DevLoginPageLocaleSchema.shape,
    ...DevTestPageLocaleSchema.shape,
    ...CampaignSuiteLocaleSchema.shape,
    ...BaviHomePageLocaleSchema.shape,
    ...BaviAssetExplorerLocaleSchema.shape,
    ...RaZPromptsHomePageLocaleSchema.shape,
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
    // --- INICIO DE CORRECCIÓN ---
    ...SuiteStyleComposerLocaleSchema.shape,
    // --- FIN DE CORRECCIÓN ---
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
    ...BaviUploaderLocaleSchema.shape,
    ...PromptCreatorLocaleSchema.shape,
    ...PromptVaultLocaleSchema.shape,
    ...DockLocaleSchema.shape,
    ...LightRaysLocaleSchema.shape,
    ...MagicBentoLocaleSchema.shape,
  })
  .passthrough();

export type Dictionary = z.infer<typeof i18nSchema>;
