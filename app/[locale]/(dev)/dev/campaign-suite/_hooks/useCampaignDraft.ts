// app/[locale]/(dev)/dev/campaign-suite/_hooks/useCampaignDraft.ts
/**
 * @file useCampaignDraft.ts
 * @description Hook de Zustand para gestionar el estado del borrador de la campaña.
 * @version 3.0.0 - Resuelve todos los errores de tipo 'any' con tipado explícito de Zustand.
 * @author RaZ podesta - MetaShark Tech
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logger } from "@/lib/logging";
import type { StateCreator } from "zustand"; // Importación clave para el tipado explícito

export interface CampaignDraft {
  step: number;
  completedSteps: number[];
  baseCampaignId: string | null;
  variantName: string | null;
  seoKeywords: string | null;
  affiliateNetwork: string | null;
  affiliateUrl: string | null;
  header: {
    enabled: boolean;
    logoPath: string | null;
    templateId: string | null;
  };
}

export interface CampaignDraftState {
  draft: CampaignDraft;
  isLoading: boolean;
  updateDraft: (
    data: Partial<Omit<CampaignDraft, "step" | "completedSteps">>
  ) => void;
  completeStep: (stepIndex: number) => void;
  goToStep: (stepIndex: number) => void;
  setIsLoading: (loading: boolean) => void;
  syncStepWithUrl: (stepFromUrl: number) => void;
}

const initialState: CampaignDraft = {
  step: 0,
  completedSteps: [],
  baseCampaignId: null,
  variantName: null,
  seoKeywords: null,
  affiliateNetwork: null,
  affiliateUrl: null,
  header: {
    enabled: true,
    logoPath: null,
    templateId: null,
  },
};

// --- INICIO DE REFACTORIZACIÓN: Se extrae la lógica a una función con tipado explícito ---
// Al tipar `storeCreator` con `StateCreator`, TypeScript conoce los tipos de `set` y `get`
// y puede inferir correctamente todos los tipos de los parámetros internos.
const storeCreator: StateCreator<CampaignDraftState> = (set, get) => ({
  draft: initialState,
  isLoading: false,
  updateDraft: (data) => {
    logger.trace("[useCampaignDraft] Actualizando borrador", { data });
    set((state) => ({ draft: { ...state.draft, ...data } }));
  },
  completeStep: (stepIndex) => {
    set((state) => {
      if (!state.draft.completedSteps.includes(stepIndex)) {
        logger.info(
          `[useCampaignDraft] Marcando paso ${stepIndex} como completado.`
        );
        return {
          draft: {
            ...state.draft,
            completedSteps: [...state.draft.completedSteps, stepIndex].sort(
              (a, b) => a - b
            ),
          },
        };
      }
      return state;
    });
  },
  goToStep: (stepIndex) => {
    logger.info(`[useCampaignDraft] Navegando al paso ${stepIndex}`);
    set((state) => ({ draft: { ...state.draft, step: stepIndex } }));
  },
  setIsLoading: (loading) => set({ isLoading: loading }),
  syncStepWithUrl: (stepFromUrl) => {
    if (get().draft.step !== stepFromUrl) {
      logger.trace(
        `[useCampaignDraft] Sincronizando estado del draft (era ${
          get().draft.step
        }) con la URL (${stepFromUrl})`
      );
      set((state) => ({ draft: { ...state.draft, step: stepFromUrl } }));
    }
  },
});
// --- FIN DE REFACTORIZACIÓN ---

export const useCampaignDraft = create<CampaignDraftState>()(
  persist(storeCreator, {
    name: "campaign-draft-storage",
  })
);
// app/[locale]/(dev)/dev/campaign-suite/_hooks/useCampaignDraft.ts
