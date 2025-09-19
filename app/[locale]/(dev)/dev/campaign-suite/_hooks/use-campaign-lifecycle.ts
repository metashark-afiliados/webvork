// RUTA: app/[locale]/(dev)/dev/campaign-suite/_hooks/use-campaign-lifecycle.ts

/**
 * @file use-campaign-lifecycle.ts
 * @description Hook atómico para encapsular las acciones de ciclo de vida de un borrador de campaña.
 *              v1.1.0 (Module Resolution Fix): Corrige la ruta de importación de
 *              useCampaignDraft para alinearse con la convención de nomenclatura
 *              kebab-case, resolviendo un error crítico de compilación.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCampaignDraft } from "./use-campaign-draft"; // <-- RUTA CORREGIDA
import { publishCampaignAction, packageCampaignAction } from "../_actions";
import { logger } from "@/lib/logging";

export function useCampaignLifecycle() {
  const { draft, deleteDraft, setStep } = useCampaignDraft();
  const router = useRouter();
  const [isPublishing, startPublishTransition] = useTransition();
  const [isPackaging, startPackageTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  const onPublish = () => {
    logger.startGroup("[Lifecycle Hook] Publicando Campaña");
    startPublishTransition(async () => {
      const result = await publishCampaignAction(draft);
      if (result.success) {
        toast.success("¡Campaña publicada con éxito!", {
          description: `La variante ID ${result.data.variantId} se ha guardado en producción.`,
        });
        logger.success("Publicación exitosa.", result.data);
      } else {
        toast.error("Fallo al publicar", { description: result.error });
        logger.error("Fallo en la publicación.", { error: result.error });
      }
      logger.endGroup();
    });
  };

  const onPackage = () => {
    logger.startGroup("[Lifecycle Hook] Empaquetando Campaña");
    startPackageTransition(async () => {
      const result = await packageCampaignAction(draft);
      if (result.success) {
        toast.success("Paquete generado. Iniciando descarga...");
        const link = document.createElement("a");
        link.href = result.data.downloadUrl;
        link.download = `campaign-package-${draft.draftId}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        logger.success("Descarga del paquete iniciada.");
      } else {
        toast.error("Fallo al empaquetar", { description: result.error });
        logger.error("Fallo en el empaquetado.", { error: result.error });
      }
      logger.endGroup();
    });
  };

  const onDelete = () => {
    logger.warn("[Lifecycle Hook] Confirmada la eliminación del borrador.", {
      draftId: draft.draftId,
    });
    startDeleteTransition(() => {
      deleteDraft();
      toast.info("Borrador eliminado. Volviendo al inicio del asistente.");
      const { search, pathname } = window.location;
      const params = new URLSearchParams(search);
      params.set("step", "0");
      router.push(`${pathname}?${params.toString()}`);
      setStep(0);
    });
  };

  return {
    onPublish,
    onPackage,
    onDelete,
    isPublishing,
    isPackaging,
    isDeleting,
  };
}
