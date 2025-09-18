// app/[locale]/(dev)/dev/campaign-suite/_hooks/useCampaignDraft.ts
/**
 * @file useCampaignDraft.ts
 * @description Hook de Zustand para la gestión de estado híbrida.
 * @version 12.1.0 (Definitive Type Guard & Hygiene Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { StateCreator } from "zustand";
import { logger } from "@/lib/logging";
import { generateDraftId } from "@/lib/utils/draft.utils";
import { stepsConfig } from "../_config/wizard.config";
import { initialCampaignDraftState } from "../_config/draft.initial-state";
import type { CampaignDraft, CampaignDraftState } from "../_types/draft.types";
import { saveDraftAction, getDraftAction } from "../_actions/draft.actions";
import { toast } from "sonner";
// --- [INICIO DE CORRECCIÓN: @typescript-eslint/no-unused-vars] ---
// Se elimina la importación no utilizada de 'Locale'.
// --- [FIN DE CORRECCIÓN] ---

let debounceTimeout: NodeJS.Timeout;
const DEBOUNCE_DELAY = 1500;

const storeCreator: StateCreator<CampaignDraftState> = (set, get) => ({
  draft: initialCampaignDraftState,
  isLoading: true,
  isSyncing: false,

  initializeDraft: async () => {
    logger.startGroup("[useCampaignDraft] Inicializando estado...");
    const localDraft = get().draft;
    const result = await getDraftAction();
    let draftToLoad = localDraft;

    if (result.success && result.data.draft) {
      const dbDraft = result.data.draft;
      if (new Date(dbDraft.updatedAt) >= new Date(localDraft.updatedAt)) {
        logger.info("[useCampaignDraft] Hidratando estado desde MongoDB.");
        draftToLoad = {
          ...localDraft,
          ...dbDraft,
          step: localDraft.step,
          updatedAt: dbDraft.updatedAt,
        };
      } else {
        logger.warn(
          "[useCampaignDraft] Caché local es más reciente. Sincronizando con DB."
        );
        get()._debouncedSave(localDraft);
      }
    } else {
      logger.info(
        "[useCampaignDraft] No hay borrador en DB. Usando caché local."
      );
    }
    set({ draft: draftToLoad, isLoading: false });
    logger.endGroup();
  },

  _debouncedSave: async (draftToSave: CampaignDraft) => {
    // --- [INICIO DE CORRECCIÓN DEFINITIVA TS2345] ---
    // Esta guarda de tipo asegura que 'draftToSave.draftId' es un 'string'
    // para el resto del alcance de esta función.
    if (!draftToSave.draftId) {
      logger.warn(
        "[_debouncedSave] Intento de guardado sin draftId. Abortando."
      );
      return;
    }
    // --- [FIN DE CORRECCIÓN DEFINITIVA TS2345] ---

    set({ isSyncing: true });
    logger.info(
      `[useCampaignDraft] Guardando borrador ${draftToSave.draftId} en DB...`
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { step, ...dataToSave } = draftToSave;

    // Ahora 'dataToSave.draftId' es garantizado como 'string', satisfaciendo el contrato.
    const result = await saveDraftAction(dataToSave);

    if (result.success) {
      toast.success("Progreso guardado en la nube.");
      set((state) => ({
        draft: { ...state.draft, updatedAt: result.data.updatedAt },
        isSyncing: false,
      }));
    } else {
      toast.error("Error al guardar en la nube", { description: result.error });
      set({ isSyncing: false });
    }
  },

  _updateAndDebounce: (
    newDraftState: Partial<Omit<CampaignDraft, "draftId" | "step">>
  ) => {
    clearTimeout(debounceTimeout);

    const currentState = get().draft;
    const newDraft: CampaignDraft = {
      ...currentState,
      ...newDraftState,
      updatedAt: new Date().toISOString(),
    };

    if (newDraftState.baseCampaignId && !currentState.draftId) {
      newDraft.draftId = generateDraftId(newDraftState.baseCampaignId);
    }

    set({ draft: newDraft });

    debounceTimeout = setTimeout(() => {
      get()._debouncedSave(newDraft);
    }, DEBOUNCE_DELAY);
  },

  updateDraft: (data) => {
    get()._updateAndDebounce(data);
  },

  updateSectionContent: (sectionName, locale, field, value) => {
    const currentState = get().draft;
    const newContentData = structuredClone(currentState.contentData);

    const sectionLocale = newContentData[sectionName]?.[locale] || {};
    sectionLocale[field] = value;

    if (!newContentData[sectionName]) {
      newContentData[sectionName] = {};
    }
    (newContentData[sectionName] as Record<string, unknown>)[locale] =
      sectionLocale;

    get()._updateAndDebounce({ contentData: newContentData });
  },

  setStep: (step) => {
    if (step >= 0 && step < stepsConfig.length) {
      set((state) => ({ draft: { ...state.draft, step } }));
    }
  },

  deleteDraft: () => {
    logger.warn("[useCampaignDraft] Eliminando borrador de campaña...");
    set({ draft: initialCampaignDraftState, isLoading: false });
    toast.success("Borrador local eliminado.");
  },
});

export const useCampaignDraft = create<CampaignDraftState>()(
  persist(storeCreator, {
    name: "campaign-draft-storage",
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => (state) => {
      if (state) state.isLoading = true;
    },
  })
);
// app/[locale]/(dev)/dev/campaign-suite/_hooks/useCampaignDraft.ts
