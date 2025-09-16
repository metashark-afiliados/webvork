// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/Step5Form.tsx
/**
 * @file Step5Form.tsx
 * @description Componente de Presentación Puro para la UI del Paso 5 (Gestión).
 * @version 1.0.0
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
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import DynamicIcon from "@/components/ui/DynamicIcon";

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
  onDelete,
  isPublishing,
  isPackaging,
  isDeleting,
}: Step5FormProps): React.ReactElement {
  logger.info("[Observabilidad] Renderizando Step5Form (Presentación Pura)");

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
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={isAnyActionPending}
            >
              {isDeleting && (
                <DynamicIcon
                  name="LoaderCircle"
                  className="mr-2 h-4 w-4 animate-spin"
                />
              )}
              {content.deleteButtonText}
            </Button>
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
