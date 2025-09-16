// app/[locale]/(dev)/dev/campaign-suite/_hooks/useCampaignDraft.ts
/**
 * @file useCampaignDraft.ts
 * @description Hook de Zustand para gestionar el estado del borrador de la campaña.
 *              v8.2.0 (Code Hygiene): Se eliminan todas las importaciones no utilizadas
 *              para resolver los errores de linting y mejorar la limpieza del código.
 * @version 8.2.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { StateCreator } from "zustand";
import { logger } from "@/lib/logging";
import { generateDraftId } from "@/lib/utils/draft.utils";
import { stepsConfig } from "../_config/wizard.config";
import { initialCampaignDraftState } from "../_config/draft.initial-state";
// --- [INICIO DE CORRECCIÓN DE HIGIENE] ---
// Se importan únicamente los tipos que se usan directamente en este archivo.
import type { CampaignDraftState } from "../_types/draft.types";
// Las importaciones de 'Locale', 'CampaignDraft' y 'set' han sido eliminadas.
// --- [FIN DE CORRECCIÓN DE HIGIENE] ---

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
  updateSectionContent: (sectionName, locale, field, value: unknown) => {
    logger.trace("[useCampaignDraft] Actualizando contenido de sección...", {
      sectionName,
      locale,
      field,
      value,
    });
    set((state) => {
      const newContentData = { ...state.draft.contentData };
      if (!newContentData[sectionName]) {
        newContentData[sectionName] = {};
      }
      if (!newContentData[sectionName][locale]) {
        newContentData[sectionName][locale] = {};
      }
      (newContentData[sectionName][locale] as Record<string, unknown>)[field] =
        value;
      return { draft: { ...state.draft, contentData: newContentData } };
    });
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
