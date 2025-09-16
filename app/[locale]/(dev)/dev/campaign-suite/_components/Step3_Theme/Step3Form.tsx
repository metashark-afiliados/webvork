// app/[locale]/(dev)/dev/campaign-suite/_components/Step3_Theme/Step3Form.tsx
/**
 * @file Step3Form.tsx
 * @description Componente de Presentación Puro para la UI del Paso 3 (Tema).
 *              v2.1.0: Corregida la importación de tipos para apuntar a la SSoT atomizada.
 * @version 2.1.0
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
} from "@/components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import type { ThemeConfig } from "../../_types/draft.types";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
import type { DiscoveredFragments } from "../../_actions/getThemeFragments.action";
import { DynamicIcon } from "@/components/ui";

type Step3Content = NonNullable<Dictionary["campaignSuitePage"]>["step3"];

interface Step3FormProps {
  content: Step3Content;
  themeConfig: ThemeConfig;
  themeFragments: DiscoveredFragments | null;
  onThemeConfigChange: (newConfig: Partial<ThemeConfig>) => void;
  onBack: () => void;
  onNext: () => void;
  isPending?: boolean;
}

export function Step3Form({
  content,
  themeConfig,
  themeFragments,
  onThemeConfigChange,
  onBack,
  onNext,
  isPending = false,
}: Step3FormProps): React.ReactElement {
  logger.info("Renderizando Step3Form (Presentación Pura)");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.themeSelectorDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        <div className="space-y-6 p-6 border rounded-lg bg-muted/20">
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              {content.themeSelectorTitle}
            </h3>
          </div>

          {!themeFragments ? (
            <div className="text-center text-destructive py-8">
              <p>Error: No se pudieron cargar las opciones de tema.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label>{content.colorsLabel}</Label>
                <Select
                  value={themeConfig.colorPreset ?? ""}
                  onValueChange={(value) =>
                    onThemeConfigChange({ colorPreset: value })
                  }
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={content.colorsPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {themeFragments.colors.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>{content.fontsLabel}</Label>
                <Select
                  value={themeConfig.fontPreset ?? ""}
                  onValueChange={(value) =>
                    onThemeConfigChange({ fontPreset: value })
                  }
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={content.fontsPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {themeFragments.fonts.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>{content.radiiLabel}</Label>
                <Select
                  value={themeConfig.radiusPreset ?? ""}
                  onValueChange={(value) =>
                    onThemeConfigChange({ radiusPreset: value })
                  }
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={content.radiiPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {themeFragments.radii.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
// app/[locale]/(dev)/dev/campaign-suite/_components/Step3_Theme/Step3Form.tsx
