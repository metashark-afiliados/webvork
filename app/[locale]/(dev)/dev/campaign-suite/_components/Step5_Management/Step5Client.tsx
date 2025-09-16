// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Client.tsx
/**
 * @file Step5Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 5 (Gestión).
 *              v2.3.0: Añade la importación faltante del componente Button.
 * @version 2.3.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { useCampaignDraft } from "../../_hooks";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { Step5Form } from "./Step5Form";
import { publishCampaignAction, packageCampaignAction } from "../../_actions";
import { useWizard } from "../../_context/WizardContext";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import { Button } from "@/components/ui/Button";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

type Step5Content = NonNullable<Dictionary["campaignSuitePage"]>["step5"];

interface Step5ClientProps {
  content: Step5Content;
}

export function Step5Client({ content }: Step5ClientProps): React.ReactElement {
  logger.info(
    "[Observabilidad] Renderizando Step5Client (Contenedor de Lógica)"
  );

  const { draft, deleteDraft, setStep } = useCampaignDraft();
  const { goToPrevStep } = useWizard();
  const [isPublishing, startPublishTransition] = useTransition();
  const [isPackaging, startPackageTransition] = useTransition();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePublish = () => {
    startPublishTransition(async () => {
      logger.info("Invocando acción para publicar campaña...", {
        draftId: draft.draftId,
      });
      const result = await publishCampaignAction(draft);

      if (result.success) {
        toast.success("¡Campaña Publicada!", {
          description: `La variante con ID ${result.data.variantId} ha sido guardada y estará disponible en el próximo despliegue.`,
        });
      } else {
        toast.error("Error al Publicar", { description: result.error });
      }
    });
  };

  const handlePackage = () => {
    startPackageTransition(async () => {
      logger.info("Invocando acción para empaquetar campaña...", {
        draftId: draft.draftId,
      });
      toast.info("Generando paquete...", {
        description: "Este proceso puede tardar unos minutos.",
      });
      const result = await packageCampaignAction(draft);

      if (result.success) {
        toast.success("Paquete Generado", {
          description: "La descarga de tu campaña estática comenzará en breve.",
        });
        const link = document.createElement("a");
        link.href = result.data.downloadUrl;
        link.setAttribute("download", `campaign-${draft.draftId}.zip`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error("Error al Empaquetar", { description: result.error });
      }
    });
  };

  const confirmDelete = () => {
    logger.warn("Confirmada la eliminación del borrador.", {
      draftId: draft.draftId,
    });
    deleteDraft();
    toast.info("Borrador eliminado. Volviendo al inicio del asistente.");
    setShowDeleteConfirm(false);
    setStep(0);
  };

  return (
    <>
      <Step5Form
        content={content}
        onBack={goToPrevStep}
        onPublish={handlePublish}
        onPackage={handlePackage}
        onDelete={() => setShowDeleteConfirm(true)}
        isPublishing={isPublishing}
        isPackaging={isPackaging}
        isDeleting={false}
      />

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-background p-6 rounded-lg shadow-xl border">
            <h3 className="text-lg font-bold">Confirmar Eliminación</h3>
            <p className="text-sm text-muted-foreground mt-2">
              ¿Estás seguro? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="ghost"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Client.tsx
