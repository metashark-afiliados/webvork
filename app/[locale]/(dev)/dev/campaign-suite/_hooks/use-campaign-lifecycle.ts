// app/[locale]/(dev)/dev/campaign-suite/_hooks/use-campaign-lifecycle.ts
/**
 * @file use-campaign-lifecycle.ts
 * @description Hook atómico para gestionar los estados de transición de las
 *              acciones de ciclo de vida de la campaña.
 * @version 3.1.0 (Code Hygiene Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCampaignDraft } from "./use-campaign-draft";
import { logger } from "@/shared/lib/logging";
import { routes } from "@/shared/lib/navigation";
import type { Locale } from "@/shared/lib/i18n.config";

export function useCampaignLifecycle(locale: Locale) {
  // --- [INICIO DE CORRECCIÓN DE HIGIENE] ---
  // Se elimina 'setStep' de la desestructuración ya que no se utiliza.
  const { deleteDraft } = useCampaignDraft();
  // --- [FIN DE CORRECCIÓN DE HIGIENE] ---
  const router = useRouter();
  const [isPublishing, startPublishTransition] = useTransition();
  const [isPackaging, startPackageTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  const onDelete = () => {
    logger.warn("[Lifecycle Hook] Confirmada la eliminación del borrador.");
    startDeleteTransition(async () => {
      await deleteDraft();
      toast.info("Borrador eliminado. Reiniciando asistente.");
      router.push(routes.devCampaignSuiteCreate.path({ locale }));
      router.refresh();
    });
  };

  return {
    onDelete,
    isPublishing,
    startPublishTransition,
    isPackaging,
    startPackageTransition,
    isDeleting,
  };
}
// app/[locale]/(dev)/dev/campaign-suite/_hooks/use-campaign-lifecycle.ts
