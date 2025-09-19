// RUTA: app/[locale]/(dev)/dev/campaign-suite/_hooks/use-campaign-templates.ts

/**
 * @file use-campaign-templates.ts
 * @description Hook atómico para encapsular las acciones de gestión de plantillas.
 *              v1.1.0 (Module Resolution Fix): Corrige la ruta de importación de
 *              useCampaignDraft para alinearse con la convención de nomenclatura
 *              kebab-case, resolviendo un error crítico de compilación.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useCampaignDraft } from "./use-campaign-draft"; // <-- RUTA CORREGIDA
import { saveAsTemplateAction } from "../_actions";
import { logger } from "@/lib/logging";

export function useCampaignTemplates() {
  const { draft } = useCampaignDraft();
  const [isSavingTemplate, startSaveTransition] = useTransition();

  const onSaveAsTemplate = (name: string, description: string) => {
    logger.startGroup("[Templates Hook] Guardando como Plantilla");
    startSaveTransition(async () => {
      const result = await saveAsTemplateAction(draft, name, description);
      if (result.success) {
        toast.success("¡Plantilla guardada con éxito!", {
          description: `La plantilla "${name}" (ID: ${result.data.templateId}) ha sido creada.`,
        });
        logger.success("Guardado como plantilla exitoso.", result.data);
      } else {
        toast.error("Fallo al guardar la plantilla", {
          description: result.error,
        });
        logger.error("Fallo al guardar como plantilla.", {
          error: result.error,
        });
      }
      logger.endGroup();
    });
  };

  return {
    onSaveAsTemplate,
    isSavingTemplate,
  };
}
