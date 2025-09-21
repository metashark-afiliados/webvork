// app/[locale]/(dev)/dev/campaign-suite/_hooks/use-campaign-templates.ts
/**
 * @file use-campaign-templates.ts
 * @description Hook atómico para encapsular la lógica de cliente de la gestión de plantillas.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useCampaignDraft } from "./use-campaign-draft";
import { saveAsTemplateAction } from "../_actions";
import { logger } from "@/shared/lib/logging";

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
      } else {
        toast.error("Fallo al guardar la plantilla", {
          description: result.error,
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
// app/[locale]/(dev)/dev/campaign-suite/_hooks/use-campaign-templates.ts
