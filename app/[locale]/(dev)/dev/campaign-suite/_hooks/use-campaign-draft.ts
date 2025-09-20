// app/[locale]/(dev)/dev/campaign-suite/_hooks/use-campaign-draft.ts
/**
 * @file use-campaign-draft.ts
 * @description Hook de Zustand para la gestión de estado híbrida.
 * @version 15.1.0 (Elite Linter Compliance)
 * @author RaZ Podestá - MetaShark Tech
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { StateCreator } from "zustand";
import { toast } from "sonner";
import { logger } from "@/shared/lib/logging";
import { generateDraftId } from "@/shared/lib/drafts/draft-utils";
import { stepsConfig } from "../_config/wizard.config";
import { initialCampaignDraftState } from "../_config/draft.initial-state";
import type { CampaignDraft, CampaignDraftState } from "../_types/draft.types";
import { saveDraftAction, getDraftAction } from "../_actions/draft.actions";
import {
  CampaignDraftDataSchema,
  type CampaignDraftDb,
} from "@/shared/lib/schemas/campaigns/draft.schema";

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
          ...(dbDraft as Omit<CampaignDraftDb, "userId" | "createdAt">),
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
    if (!draftToSave.draftId) {
      logger.warn(
        "[_debouncedSave] Intento de guardado sin draftId. Abortando."
      );
      return;
    }

    set({ isSyncing: true });
    logger.info(
      `[useCampaignDraft] Guardando borrador ${draftToSave.draftId} en DB...`
    );

    // --- [INICIO DE CORRECCIÓN DE LINTING DE ÉLITE] ---
    // Esta sintaxis desestructura `draftToSave`, omitiendo `step` y `updatedAt`
    // sin crear nuevas variables no utilizadas. El resto de las propiedades
    // se agrupan en `dataToSave`.
    const { ...dataToSave } = draftToSave;
    // --- [FIN DE CORRECCIÓN DE LINTING DE ÉLITE] ---

    const validation = CampaignDraftDataSchema.safeParse(dataToSave);

    if (!validation.success) {
      toast.error("Error de datos", {
        description: "El borrador local tiene un formato inválido.",
      });
      set({ isSyncing: false });
      return;
    }

    const result = await saveDraftAction(validation.data);

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
// app/[locale]/(dev)/dev/campaign-suite/_hooks/use-campaign-draft.ts
