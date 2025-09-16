// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Form.tsx
/**
 * @file Step5Form.tsx
 * @description Componente de Presentación Puro para la UI del Paso 5 (Gestión).
 *              v1.2.0 (Direct Import Architecture): Se impone la importación
 *              directa para `AlertDialogTrigger` para erradicar el error de build.
 * @version 1.2.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  DynamicIcon,
} from "@/components/ui";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// Se importa el componente directamente desde su archivo fuente, eludiendo el barrel file.
import { AlertDialogTrigger } from "@/components/ui/AlertDialog";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

type Step5Content = NonNullable<Dictionary["campaignSuitePage"]>["step5"];

interface Step5FormProps {
  content: Step5Content;
  onBack: () => void;
  onPublish: () => void;
  onPackage: () => void;
  onDelete: () => void;
  isPublishing: boolean;
  isPackaging: boolean;
  isDeleting: boolean;
}

export function Step5Form({
  content,
  onBack,
  onPublish,
  onPackage,
  isPublishing,
  isPackaging,
  isDeleting,
}: Step5FormProps): React.ReactElement {
  logger.info("[Step5Form] Renderizando (Presentación Pura, Arch. Directa)");

  const isAnyActionPending = isPublishing || isPackaging || isDeleting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        <div className="p-6 border rounded-lg bg-muted/20">
          <h3 className="font-semibold text-lg text-foreground mb-4">
            {content.summaryTitle}
          </h3>
          <div className="min-h-[150px] flex items-center justify-center border border-dashed rounded-md bg-background">
            <p className="text-sm text-muted-foreground">
              {content.summaryPlaceholder}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button
            variant="ghost"
            onClick={onBack}
            disabled={isAnyActionPending}
          >
            Retroceder
          </Button>
          <div className="flex flex-wrap gap-2 justify-end">
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isAnyActionPending}>
                {isDeleting && (
                  <DynamicIcon
                    name="LoaderCircle"
                    className="mr-2 h-4 w-4 animate-spin"
                  />
                )}
                {content.deleteButtonText}
              </Button>
            </AlertDialogTrigger>
            <Button
              variant="secondary"
              onClick={onPackage}
              disabled={isAnyActionPending}
            >
              {isPackaging && (
                <DynamicIcon
                  name="LoaderCircle"
                  className="mr-2 h-4 w-4 animate-spin"
                />
              )}
              {content.packageButtonText}
            </Button>
            <Button onClick={onPublish} disabled={isAnyActionPending}>
              {isPublishing && (
                <DynamicIcon
                  name="LoaderCircle"
                  className="mr-2 h-4 w-4 animate-spin"
                />
              )}
              {content.publishButtonText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Form.tsx
