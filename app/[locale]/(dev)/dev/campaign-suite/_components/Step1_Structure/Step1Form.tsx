// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1Form.tsx
/**
 * @file Step1Form.tsx
 * @description Componente de Presentación Puro para la UI del Paso 1 (Estructura).
 *              v2.1.0: Corregida la importación de tipos para apuntar a la SSoT atomizada.
 * @version 2.1.0
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
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import type { HeaderConfig, FooterConfig } from "../../_types/draft.types";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
import { DynamicIcon } from "@/components/ui";

type Step1Content = NonNullable<Dictionary["campaignSuitePage"]>["step1"];

interface Step1FormProps {
  content: Step1Content;
  headerConfig: HeaderConfig;
  footerConfig: FooterConfig;
  onHeaderConfigChange: (newConfig: Partial<HeaderConfig>) => void;
  onFooterConfigChange: (newConfig: Partial<FooterConfig>) => void;
  onBack: () => void;
  onNext: () => void;
  isPending: boolean;
}

export function Step1Form({
  content,
  headerConfig,
  footerConfig,
  onHeaderConfigChange,
  onFooterConfigChange,
  onBack,
  onNext,
  isPending,
}: Step1FormProps): React.ReactElement {
  logger.info("Renderizando Step1Form (Presentación Pura)");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>
          Define el marco de la página. La decisión de incluir o no un Header y
          un Footer es una elección estratégica fundamental.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        <div className="space-y-4 p-6 border rounded-lg bg-muted/20">
          <div className="flex items-center space-x-3">
            <Switch
              id="use-header"
              checked={headerConfig.useHeader}
              onCheckedChange={(checked) =>
                onHeaderConfigChange({ useHeader: checked })
              }
              disabled={isPending}
            />
            <Label htmlFor="use-header" className="font-semibold text-lg">
              {content.headerSwitchLabel}
            </Label>
          </div>
          {headerConfig.useHeader && (
            <div className="pl-8 pt-4 border-l-2 border-primary/20 space-y-4">
              <h4 className="font-medium text-foreground">
                {content.headerGalleryTitle}
              </h4>
              <div className="min-h-[100px] flex items-center justify-center border border-dashed rounded-md bg-background">
                <p className="text-sm text-muted-foreground">
                  Galería de Headers y Uploader de Logo (próximamente)...
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 p-6 border rounded-lg bg-muted/20">
          <div className="flex items-center space-x-3">
            <Switch
              id="use-footer"
              checked={footerConfig.useFooter}
              onCheckedChange={(checked) =>
                onFooterConfigChange({ useFooter: checked })
              }
              disabled={isPending}
            />
            <Label htmlFor="use-footer" className="font-semibold text-lg">
              {content.footerSwitchLabel}
            </Label>
          </div>
          {footerConfig.useFooter && (
            <div className="pl-8 pt-4 border-l-2 border-primary/20 space-y-4">
              <h4 className="font-medium text-foreground">
                {content.footerGalleryTitle}
              </h4>
              <div className="min-h-[100px] flex items-center justify-center border border-dashed rounded-md bg-background">
                <p className="text-sm text-muted-foreground">
                  Galería de Footers (próximamente)...
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="ghost" onClick={onBack} disabled={isPending}>
            Retroceder
          </Button>
          <Button onClick={onNext} disabled={isPending}>
            {isPending && (
              <DynamicIcon
                name="LoaderCircle"
                className="mr-2 h-4 w-4 animate-spin"
              />
            )}
            {isPending ? "Guardando..." : "Guardar y Continuar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1Form.tsx
