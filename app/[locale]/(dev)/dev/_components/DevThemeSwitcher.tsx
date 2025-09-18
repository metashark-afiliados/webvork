// app/[locale]/(dev)/dev/_components/DevThemeSwitcher.tsx
/**
 * @file DevThemeSwitcher.tsx
 * @description Componente de UI para cambiar el tema visual del Developer Command Center.
 *              Permite seleccionar entre los fragmentos de color, tipografía y geometría disponibles.
 * @version 2.0.0 (Full DCC Theming)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { DynamicIcon } from "@/components/ui";
import { logger } from "@/lib/logging";
import { useTheme } from "next-themes";
import { deepMerge } from "@/lib/utils/merge";
import {
  AssembledThemeSchema,
  type AssembledTheme,
} from "@/lib/schemas/theming/assembled-theme.schema";
import { usePreviewStore } from "../../campaign-suite/_context/PreviewContext";
import type { DiscoveredFragments } from "../../campaign-suite/_actions/getThemeFragments.action";
import type { ThemeConfig } from "../../campaign-suite/_types/draft.types"; // Reutilizamos ThemeConfig

interface DevThemeSwitcherProps {
  allThemeFragments: DiscoveredFragments & { base: Partial<AssembledTheme> }; // Ahora recibe todos los fragments
  content: {
    selectThemeLabel: string;
    selectFontLabel: string;
    selectRadiusLabel: string;
    defaultPresetName: string;
    colorFilterPlaceholder: string;
    fontFilterPlaceholder: string;
    radiusFilterPlaceholder: string;
  };
}

export function DevThemeSwitcher({
  allThemeFragments,
  content,
}: DevThemeSwitcherProps) {
  logger.info("[DevThemeSwitcher] Renderizando (v2.0 - Full DCC Theming)");
  const { theme: systemTheme } = useTheme();
  const { setPreviewTheme } = usePreviewStore();

  // Estado local para la selección de presets
  const [selectedThemeConfig, setSelectedThemeConfig] = useState<ThemeConfig>({
    colorPreset: "default-dcc", // Asumimos este es el default inicial del globals.css
    fontPreset: "minimalist-sans",
    radiusPreset: "rounded",
  });

  // Efecto para aplicar el tema seleccionado al :root del documento
  useEffect(() => {
    const { colorPreset, fontPreset, radiusPreset } = selectedThemeConfig;

    // Recuperar los fragmentos por nombre
    const baseFragment = allThemeFragments.base || {};
    const colorFragment = allThemeFragments.colors[colorPreset || ""] || {};
    const fontFragment = allThemeFragments.fonts[fontPreset || ""] || {};
    const radiusFragment = allThemeFragments.radii[radiusPreset || ""] || {};

    // Fusionar todos los fragmentos
    let finalTheme: Partial<AssembledTheme> = deepMerge(
      deepMerge(baseFragment, colorFragment),
      deepMerge(fontFragment, radiusFragment)
    );

    // Aplicar el modo oscuro si está activo en el sistema
    if (systemTheme === "dark" && finalTheme.colors?.dark) {
      finalTheme.colors = deepMerge(finalTheme.colors, finalTheme.colors.dark);
    }

    const styleElement = document.getElementById("dcc-theme-overrides");
    let styleTag = styleElement as HTMLStyleElement;

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "dcc-theme-overrides";
      document.head.appendChild(styleTag);
    }

    let cssVars = ":root {";
    if (finalTheme.colors) {
      for (const [key, value] of Object.entries(finalTheme.colors)) {
        if (key !== "dark") {
          cssVars += `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`;
        }
      }
    }
    if (finalTheme.fonts) {
      for (const [key, value] of Object.entries(finalTheme.fonts)) {
        cssVars += `--font-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`;
      }
    }
    if (finalTheme.geometry) {
      for (const [key, value] of Object.entries(finalTheme.geometry)) {
        cssVars += `${key}: ${value};`;
      }
    }
    cssVars += "}";

    styleTag.innerHTML = cssVars;

    // Actualizar el preview store para que afecte al LivePreviewCanvas
    const mergedFullTheme = AssembledThemeSchema.parse(finalTheme);
    setPreviewTheme(mergedFullTheme);
  }, [selectedThemeConfig, allThemeFragments, systemTheme, setPreviewTheme]);

  // Opciones para los selectores
  const colorOptions = useMemo(
    () => [
      { name: content.defaultPresetName, value: "default-dcc" }, // El tema base del globals.css
      ...Object.keys(allThemeFragments.colors).map((name) => ({
        name,
        value: name,
      })),
    ],
    [allThemeFragments.colors, content.defaultPresetName]
  );

  const fontOptions = useMemo(
    () => [
      { name: content.defaultPresetName, value: "minimalist-sans" }, // Un default para fonts
      ...Object.keys(allThemeFragments.fonts).map((name) => ({
        name,
        value: name,
      })),
    ],
    [allThemeFragments.fonts, content.defaultPresetName]
  );

  const radiusOptions = useMemo(
    () => [
      { name: content.defaultPresetName, value: "rounded" }, // Un default para radii
      ...Object.keys(allThemeFragments.radii).map((name) => ({
        name,
        value: name,
      })),
    ],
    [allThemeFragments.radii, content.defaultPresetName]
  );

  return (
    <div className="flex items-center gap-4">
      <DynamicIcon name="Palette" className="h-5 w-5 text-primary" />
      <Select
        value={selectedThemeConfig.colorPreset || ""}
        onValueChange={(value) =>
          setSelectedThemeConfig((prev) => ({ ...prev, colorPreset: value }))
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={content.colorFilterPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          {colorOptions.map((preset) => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DynamicIcon name="Type" className="h-5 w-5 text-primary" />
      <Select
        value={selectedThemeConfig.fontPreset || ""}
        onValueChange={(value) =>
          setSelectedThemeConfig((prev) => ({ ...prev, fontPreset: value }))
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={content.fontFilterPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          {fontOptions.map((preset) => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DynamicIcon name="Ruler" className="h-5 w-5 text-primary" />
      <Select
        value={selectedThemeConfig.radiusPreset || ""}
        onValueChange={(value) =>
          setSelectedThemeConfig((prev) => ({ ...prev, radiusPreset: value }))
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={content.radiusFilterPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          {radiusOptions.map((preset) => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
