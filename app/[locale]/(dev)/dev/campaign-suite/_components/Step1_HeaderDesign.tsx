// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_HeaderDesign.tsx
/**
 * @file Step1_HeaderDesign.tsx
 * @description UI para el Sub-paso 1.1 de la SDC: Diseño del Encabezado.
 * @version 2.0.0 - Refactorizado para usar el contrato de props común 'StepProps'.
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "@/components/ui/ImageUploader";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { saveCampaignAssetAction } from "../_actions/saveCampaignAsset.action";
import { toast } from "sonner";
import { type StepProps } from "../_types/step.types";

type Step1Content = NonNullable<Dictionary["campaignSuitePage"]>["step1"];

interface Step1Props extends StepProps<Step1Content> {}

export function Step1_HeaderDesign({
  content,
  draft,
  setDraft,
  onBack,
  onNext,
}: Step1Props) {
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    if (!draft.baseCampaignId || !draft.variantName) {
      toast.error("Error de contexto", {
        description:
          "No se ha definido una campaña o variante base en el paso anterior.",
      });
      return {
        success: false,
        error: "ID de campaña o nombre de variante no definidos.",
      };
    }
    const variantId =
      "01_" + draft.variantName.toLowerCase().replace(/\s+/g, "-");

    const result = await saveCampaignAssetAction(
      draft.baseCampaignId,
      variantId,
      formData
    );

    return result;
  };

  const handleLogoUploadSuccess = (path: string) => {
    setDraft({ header: { ...draft.header, logoPath: path } });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            {content.headerConfigTitle}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {content.headerConfigDescription}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-foreground">
            {content.headerGalleryTitle}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {content.headerGalleryDescription}
          </p>
          <div className="mt-4 p-8 bg-muted/50 rounded-lg text-center">
            [Galería Visual de Headers - Placeholder]
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-foreground">
            {content.logoConfigTitle}
          </h3>
          <div className="mt-4">
            <ImageUploader
              onUpload={handleUpload}
              onUploadSuccess={handleLogoUploadSuccess}
              content={{
                dropzoneText: content.logoUploadText,
                dropzoneSubtext: content.logoUploadSubtext,
              }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="outline" onClick={onBack}>
            Retroceder
          </Button>
          <Button onClick={onNext}>Guardar y Continuar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_HeaderDesign.tsx
