// app/[locale]/(dev)/dev/campaign-suite/_hooks/useCampaignDraft.ts
/**
 * @file useCampaignDraft.ts
 * @description Hook de Zustand para gestionar el estado del borrador de la campaña.
 *              v8.0.0 (SoC Refactor): Se elimina la lógica de navegación (nextStep, prevStep)
 *              para adherirse al Principio de Responsabilidad Única.
 * @version 8.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { StateCreator } from "zustand";
import { logger } from "@/lib/logging";
import { generateDraftId } from "@/lib/utils/draft.utils";
import { stepsConfig } from "../_config/wizard.config";
import type { Locale } from "@/lib/i18n.config";
import { initialCampaignDraftState } from "../_config/draft.initial-state";
import type { CampaignDraft } from "../_types/draft.types";

// Interfaz de estado sin nextStep y prevStep
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
    value: any
  ) => void;
  setStep: (step: number) => void;
  deleteDraft: () => void;
}

const storeCreator: StateCreator<CampaignDraftState> = (set) => ({
  draft: initialCampaignDraftState,
  isLoading: true,
  updateDraft: (data) => {
    logger.trace("[useCampaignDraft] Actualizando borrador (general)...", {
      data,
    });
    set((state) => {
      const newDraft = { ...state.draft, ...data };
      if (data.baseCampaignId && !state.draft.draftId) {
        newDraft.draftId = generateDraftId(data.baseCampaignId);
      }
      return { draft: newDraft };
    });
  },
  updateSectionContent: (sectionName, locale, field, value) => {
    // ... lógica sin cambios ...
  },
  setStep: (step) => {
    if (step >= 0 && step < stepsConfig.length) {
      logger.info(`[useCampaignDraft] Sincronizando estado al paso ${step}.`);
      set((state) => ({ draft: { ...state.draft, step } }));
    }
  },
  deleteDraft: () => {
    logger.warn("[useCampaignDraft] Eliminando borrador de campaña...");
    set({ draft: initialCampaignDraftState, isLoading: false });
  },
});

export const useCampaignDraft = create<CampaignDraftState>()(
  persist(storeCreator, {
    name: "campaign-draft-storage",
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => (state) => {
      if (state) state.isLoading = false;
    },
  })
);
// app/[locale]/(dev)/dev/campaign-suite/_hooks/useCampaignDraft.ts
