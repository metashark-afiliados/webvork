// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Client.tsx
/**
 * @file Step5Client.tsx
 * @description Orquestador de Cliente puro para el Paso 5. Gestiona toda la lógica
 *              de ciclo de vida del borrador (publicar, empaquetar, eliminar, etc.)
 *              y la pasa a los componentes de presentación.
 * @version 12.0.0 (Locale-aware Lifecycle & Elite Compliance)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { logger } from "@/shared/lib/logging";
import { useWizard } from "../../_context/WizardContext";
import { useCampaignLifecycle } from "../../_hooks/use-campaign-lifecycle";
import { useCampaignTemplates } from "../../_hooks/use-campaign-templates";
import { useCampaignDraft } from "../../_hooks/use-campaign-draft";
import { AlertDialog } from "@/components/ui/AlertDialog";
import { Step5Form } from "./Step5Form";
import { DeleteDraftDialog } from "./_components/DeleteDraftDialog";
import { validateDraftForLaunch } from "../../_utils/draft.validator";
import { publishCampaignAction, packageCampaignAction } from "../../_actions";
import { getCurrentLocaleFromPathname } from "@/shared/lib/i18n.utils";
import type { Step5ContentSchema } from "@/shared/lib/schemas/campaigns/steps/step5.schema";
import type { z } from "zod";

type Content = z.infer<typeof Step5ContentSchema>;

interface Step5ClientProps {
  content?: Content;
}

export function Step5Client({ content }: Step5ClientProps): React.ReactElement {
  logger.info("[Step5Client] Renderizando orquestador de lógica v12.0.");

  const pathname = usePathname();
  const locale = getCurrentLocaleFromPathname(pathname);

  const { goToPrevStep } = useWizard();
  const { draft } = useCampaignDraft();
  const { onSaveAsTemplate, isSavingTemplate } = useCampaignTemplates();
  const {
    onDelete,
    isPublishing,
    startPublishTransition,
    isPackaging,
    startPackageTransition,
    isDeleting,
  } = useCampaignLifecycle(locale);

  if (!content) {
    logger.error("[Step5Client] El contenido para el Paso 5 es indefinido.");
    return (
      <div className="text-destructive p-8">
        Error: Faltan datos de contenido para este paso.
      </div>
    );
  }

  const handlePublish = () => {
    logger.startGroup("[Step5Client] Publicando Campaña");
    startPublishTransition(async () => {
      const result = await publishCampaignAction(draft);
      if (result.success) {
        toast.success("¡Campaña publicada con éxito!", {
          description: `La variante ID ${result.data.variantId} se ha guardado en producción.`,
        });
      } else {
        toast.error("Fallo al publicar", { description: result.error });
      }
      logger.endGroup();
    });
  };

  const handlePackage = () => {
    logger.startGroup("[Step5Client] Empaquetando Campaña");
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
      } else {
        toast.error("Fallo al empaquetar", { description: result.error });
      }
      logger.endGroup();
    });
  };

  const checklistItems = validateDraftForLaunch(draft);
  const isReadyForLaunch = checklistItems.every((item) => item.isCompleted);

  return (
    <AlertDialog>
      <Step5Form
        content={content}
        draft={draft}
        onBack={goToPrevStep}
        onPublish={handlePublish}
        onPackage={handlePackage}
        onSaveAsTemplate={onSaveAsTemplate}
        isPublishing={isPublishing}
        isPackaging={isPackaging}
        isDeleting={isDeleting}
        isSavingTemplate={isSavingTemplate}
        isLaunchReady={isReadyForLaunch}
        checklistItems={checklistItems}
      />
      <DeleteDraftDialog
        content={content.deleteDialog}
        onConfirmDelete={onDelete}
      />
    </AlertDialog>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Client.tsx
