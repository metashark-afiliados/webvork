// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Client.tsx
/**
 * @file Step5Client.tsx
 * @description Componente Contenedor de Cliente para el Paso 5 (Gestión y Publicación).
 *              v2.9.0 (Holistic Refactor): Implementa la arquitectura de importación directa
 *              para componentes de UI, corrige la ruta del schema i18n y se alinea con
 *              el contrato de contenido actualizado para el diálogo de eliminación.
 *              Esta es la solución definitiva a los errores de resolución y de tipo.
 * @version 2.9.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCampaignDraft } from "../../_hooks";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { Step5Form } from "./Step5Form";
import { publishCampaignAction, packageCampaignAction } from "../../_actions";
import { useWizard } from "../../_context/WizardContext";

// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// Se importa cada componente de AlertDialog directamente desde su archivo fuente SSoT.
// Esto elimina la dependencia del frágil "barrel file" y resuelve los errores TS2305/TS2307.
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

/**
 * @type Step5Content
 * @description Define el tipo de contenido i18n específico para el Paso 5.
 */
type Step5Content = NonNullable<Dictionary["campaignSuitePage"]>["step5"];

/**
 * @interface Step5ClientProps
 * @description Define el contrato de props para el Step5Client.
 */
interface Step5ClientProps {
  content: Step5Content;
}

/**
 * @component Step5Client
 * @description El "cerebro" del Paso 5. Orquesta las acciones de publicación,
 *              empaquetado y eliminación, gestionando los estados de carga y
 *              el feedback al usuario.
 * @param {Step5ClientProps} props - Las propiedades del componente.
 * @returns {React.ReactElement}
 */
export function Step5Client({ content }: Step5ClientProps): React.ReactElement {
  logger.info(
    "[Step5Client] Renderizando (Contenedor de Lógica, Arch. Directa)"
  );

  const { draft, deleteDraft, setStep } = useCampaignDraft();
  const { goToPrevStep } = useWizard();
  const router = useRouter();
  const [isPublishing, startPublishTransition] = useTransition();
  const [isPackaging, startPackageTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  const handlePublish = () => {
    logger.startGroup("[Step5Client] Iniciando acción: Publicar Campaña");
    startPublishTransition(async () => {
      const result = await publishCampaignAction(draft);
      if (result.success) {
        toast.success("Campaña publicada con éxito!", {
          description: `La variante ID ${result.data.variantId} está ahora en vivo.`,
        });
        logger.success("[Step5Client] Publicación exitosa.", result.data);
      } else {
        toast.error("Fallo al publicar", { description: result.error });
        logger.error("[Step5Client] Fallo en la publicación.", {
          error: result.error,
        });
      }
      logger.endGroup();
    });
  };

  const handlePackage = () => {
    logger.startGroup("[Step5Client] Iniciando acción: Empaquetar Campaña");
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
        logger.success("[Step5Client] Descarga del paquete iniciada.");
      } else {
        toast.error("Fallo al empaquetar", { description: result.error });
        logger.error("[Step5Client] Fallo en el empaquetado.", {
          error: result.error,
        });
      }
      logger.endGroup();
    });
  };

  const handleDeleteConfirm = () => {
    logger.warn("[Step5Client] Confirmada la eliminación del borrador.", {
      draftId: draft.draftId,
    });
    startDeleteTransition(() => {
      deleteDraft();
      toast.info("Borrador eliminado. Volviendo al inicio del asistente.");
      navigateToStep(0);
    });
  };

  const navigateToStep = (step: number) => {
    const { search, pathname } = window.location;
    const params = new URLSearchParams(search);
    params.set("step", step.toString());
    router.push(`${pathname}?${params.toString()}`);
    setStep(step);
  };

  return (
    <AlertDialog>
      <Step5Form
        content={content}
        onBack={goToPrevStep}
        onPublish={handlePublish}
        onPackage={handlePackage}
        onDelete={() => {}} // La acción la dispara el trigger
        isPublishing={isPublishing}
        isPackaging={isPackaging}
        isDeleting={isDeleting}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* Se consume el contrato de datos i18n actualizado */}
          <AlertDialogTitle>{content.deleteDialog.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {content.deleteDialog.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {content.deleteDialog.cancelButton}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm}>
            {content.deleteDialog.confirmButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Client.tsx
