// app/[locale]/(dev)/dev/campaign-suite/_types/draft.types.ts
/**
 * @file draft.types.ts
 * @description SSoT para los contratos de tipos del borrador de campaña.
 * @version 2.1.0 (Flexible State Contract Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
import type { Locale } from "@/lib/i18n.config";

export interface HeaderConfig {
  useHeader: boolean;
  componentName: string | null;
  logoPath: string | null;
}

export interface FooterConfig {
  useFooter: boolean;
  componentName: string | null;
}

export interface LayoutConfigItem {
  name: string;
}

export interface ThemeConfig {
  colorPreset: string | null;
  fontPreset: string | null;
  radiusPreset: string | null;
}

export type ContentData = Record<
  string,
  Partial<Record<Locale, Record<string, unknown>>>
>;

export interface CampaignDraft {
  draftId: string | null;
  step: number;
  completedSteps: number[];
  baseCampaignId: string | null;
  variantName: string | null;
  seoKeywords: string | null;
  affiliateNetwork: string | null;
  affiliateUrl: string | null;
  headerConfig: HeaderConfig;
  footerConfig: FooterConfig;
  layoutConfig: LayoutConfigItem[];
  themeConfig: ThemeConfig;
  contentData: ContentData;
}

export interface CampaignDraftState {
  draft: CampaignDraft;
  isLoading: boolean;
  updateDraft: (data: Partial<Omit<CampaignDraft, "step" | "draftId">>) => void;
  updateSectionContent: (
    sectionName: string,
    locale: Locale,
    field: string,
    value: unknown
  ) => void;
  setStep: (step: number) => void;
  deleteDraft: () => void;
}
// app/[locale]/(dev)/dev/campaign-suite/_types/draft.types.ts
