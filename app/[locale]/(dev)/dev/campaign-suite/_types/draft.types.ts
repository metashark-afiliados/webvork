// app/[locale]/(dev)/dev/campaign-suite/_types/draft.types.ts
/**
 * @file draft.types.ts
 * @description SSoT para los contratos de tipos del borrador de campaña.
 *              v1.2.0 (Holistic Sync): Reemplaza 'any' por 'unknown' en todos
 *              los tipos y elimina las funciones obsoletas 'nextStep' y 'prevStep'
 *              para sincronizar perfectamente con la implementación del hook.
 * @version 1.2.0
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

// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// Se reemplaza 'any' por 'unknown' para máxima seguridad de tipos.
export type ContentData = Record<
  string,
  Partial<Record<Locale, Record<string, unknown>>>
>;
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

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

// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// Se sincroniza la interfaz con la implementación actual del hook.
export interface CampaignDraftState {
  draft: CampaignDraft;
  isLoading: boolean;
  updateDraft: (
    data: Partial<Omit<CampaignDraft, "step" | "completedSteps" | "draftId">>
  ) => void;
  updateSectionContent: (
    sectionName: string,
    locale: Locale,
    field: string,
    value: unknown // Se corrige 'any' por 'unknown'.
  ) => void;
  // 'nextStep' y 'prevStep' se eliminan porque ya no existen en la implementación.
  setStep: (step: number) => void;
  deleteDraft: () => void;
}
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
// app/[locale]/(dev)/dev/campaign-suite/_types/draft.types.ts
