// app/[locale]/(dev)/dev/campaign-suite/_config/draft.initial-state.ts
/**
 * @file draft.initial-state.ts
 * @description SSoT para el estado inicial del borrador de campaña.
 * @version 3.0.0 (FSD Architecture Alignment)
 * @author RaZ Podestá - MetaShark Tech
 */
import type { CampaignDraft } from "../_types/draft.types";

export const initialCampaignDraftState: CampaignDraft = {
  draftId: null,
  step: 0,
  completedSteps: [],
  baseCampaignId: null,
  variantName: null,
  seoKeywords: null,
  affiliateNetwork: null,
  affiliateUrl: null,
  headerConfig: { useHeader: true, componentName: null, logoPath: null },
  footerConfig: { useFooter: true, componentName: null },
  layoutConfig: [],
  themeConfig: {
    colorPreset: null,
    fontPreset: null,
    radiusPreset: null,
    themeOverrides: {}, // Asegurar que el objeto exista
  },
  contentData: {},
  updatedAt: new Date(0).toISOString(),
};
// app/[locale]/(dev)/dev/campaign-suite/_config/draft.initial-state.ts
