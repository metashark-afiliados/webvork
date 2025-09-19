// app/[locale]/(dev)/dev/_components/SuiteStyleComposer/SuiteColorsTab.tsx
/**
 * @file SuiteColorsTab.tsx
 * @description Aparato atómico para la pestaña de colores.
 *              v1.1.0 (Type Contract Sync): Alineado con el contrato de tipo SSoT 'LoadedFragments'.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { logger } from "@/lib/logging";
import type { LoadedFragments } from "./useSuiteStyleComposer"; // <-- Se importa el tipo SSoT

interface SuiteColorsTabProps {
  allThemeFragments: LoadedFragments; // <-- Se utiliza el tipo SSoT
  selectedColorPreset: string;
  onColorPresetChange: (value: string) => void;
  content: {
    selectThemeLabel: string;
    colorFilterPlaceholder: string;
    defaultPresetName: string;
  };
}

export function SuiteColorsTab({
  allThemeFragments,
  selectedColorPreset,
  onColorPresetChange,
  content,
}: SuiteColorsTabProps): React.ReactElement {
  logger.trace("[SuiteColorsTab] Renderizando pestaña de colores (v1.1).");

  const colorOptions = useMemo(
    () => [
      { label: content.defaultPresetName, value: "default-dcc" },
      ...Object.keys(allThemeFragments.colors).map((name) => ({
        label: name,
        value: name,
      })),
    ],
    [allThemeFragments.colors, content.defaultPresetName]
  );

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <Label htmlFor="color-preset">{content.selectThemeLabel}</Label>
        <Select value={selectedColorPreset} onValueChange={onColorPresetChange}>
          <SelectTrigger>
            <SelectValue placeholder={content.colorFilterPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {colorOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
