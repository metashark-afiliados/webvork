// app/[locale]/(dev)/dev/campaign-suite/_components/Step3_Theme/Step3Client.tsx
/**
 * @file Step3Client.tsx
 * @description Contenedor de Cliente para el Paso 3. Ahora actúa como un cargador
 *              de datos inteligente para pre-cargar todos los fragmentos de tema
 *              y pasar el contenido i18n al Compositor de Temas.
 * @version 5.0.0 (Theme Composer i18n & Full Fragment Loading)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCampaignDraft } from "../../_hooks";
import type { ThemeConfig } from "../../_types/draft.types";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { ActionResult } from "@/lib/types/actions.types";
import type { DiscoveredFragments } from "../../_actions/getThemeFragments.action";
import { Step3Form } from "./Step3Form";
import { useWizard } from "../../_context/WizardContext";
import { ThemeComposerModal } from "./_components/ThemeComposerModal";
import type { AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";
import { DynamicIcon } from "@/components/ui";
import { deepMerge } from "@/lib/utils/merge"; // Asegúrate de importar deepMerge
import { AssembledThemeSchema } from "@/lib/schemas/theming/assembled-theme.schema";

type Step3Content = NonNullable<Dictionary["campaignSuitePage"]>["step3"];

interface Step3ClientProps {
  content: Step3Content;
  fragmentsResult: ActionResult<DiscoveredFragments>;
}

// Definimos un tipo para los fragmentos cargados
type LoadedFragments = {
  base: Partial<AssembledTheme>;
  colors: Record<string, Partial<AssembledTheme>>;
  fonts: Record<string, Partial<AssembledTheme>>;
  radii: Record<string, Partial<AssembledTheme>>;
};

export function Step3Client({
  content,
  fragmentsResult,
}: Step3ClientProps): React.ReactElement {
  logger.info(
    "[Step3Client] Renderizando v5.0 (Theme Composer i18n & Full Fragment Loading)."
  );

  const { draft, updateDraft } = useCampaignDraft();
  const { goToNextStep, goToPrevStep } = useWizard();
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [loadedFragments, setLoadedFragments] =
    useState<LoadedFragments | null>(null);
  const [isLoadingFragments, setIsLoadingFragments] = useState(true);

  useEffect(() => {
    const loadAllFragments = async () => {
      if (!fragmentsResult.success) {
        toast.error("Error Crítico", {
          description: "No se pudieron descubrir los fragmentos de tema.",
        });
        setIsLoadingFragments(false);
        return;
      }

      try {
        const fetchFragment = async (
          path: string
        ): Promise<Partial<AssembledTheme>> => {
          try {
            const response = await fetch(path);
            if (!response.ok) {
              logger.warn(
                `[Step3Client] Fallo al cargar fragmento ${path}: ${response.statusText}`
              );
              return {}; // Devolver objeto vacío en caso de error HTTP
            }
            const json = await response.json();
            // Validar cada fragmento individualmente
            const validationResult =
              AssembledThemeSchema.deepPartial().safeParse(json);
            if (!validationResult.success) {
              logger.error(
                `[Step3Client] Fallo de validación para fragmento ${path}`,
                { errors: validationResult.error.flatten() }
              );
              return {}; // Devolver objeto vacío si falla la validación
            }
            return validationResult.data;
          } catch (e) {
            logger.error(
              `[Step3Client] Error al hacer fetch o parsear fragmento ${path}`,
              { error: e }
            );
            return {};
          }
        };

        const basePromise = fetchFragment(
          "/theme-fragments/base/global.theme.json"
        );
        const colorPromises = fragmentsResult.data.colors.map((name) =>
          fetchFragment(`/theme-fragments/colors/${name}.colors.json`).then(
            (data) => ({ name, data })
          )
        );
        const fontPromises = fragmentsResult.data.fonts.map((name) =>
          fetchFragment(`/theme-fragments/fonts/${name}.fonts.json`).then(
            (data) => ({ name, data })
          )
        );
        const radiiPromises = fragmentsResult.data.radii.map((name) =>
          fetchFragment(`/theme-fragments/radii/${name}.radii.json`).then(
            (data) => ({ name, data })
          )
        );

        const [base, colors, fonts, radii] = await Promise.all([
          basePromise,
          Promise.all(colorPromises),
          Promise.all(fontPromises),
          Promise.all(radiiPromises),
        ]);

        const fragments: LoadedFragments = {
          base,
          colors: Object.fromEntries(colors.map((c) => [c.name, c.data])),
          fonts: Object.fromEntries(fonts.map((f) => [f.name, f.data])),
          radii: Object.fromEntries(radii.map((r) => [r.name, r.data])),
        };
        setLoadedFragments(fragments);
      } catch (error) {
        toast.error("Error al cargar datos de tema", {
          description: "Algunos fragmentos no se pudieron cargar.",
        });
        logger.error("[Step3Client] Fallo crítico en loadAllFragments.", {
          error,
        });
      } finally {
        setIsLoadingFragments(false);
      }
    };
    loadAllFragments();
  }, [fragmentsResult]);

  const onThemeConfigChange = (newConfig: Partial<ThemeConfig>) => {
    updateDraft({ themeConfig: { ...draft.themeConfig, ...newConfig } });
  };

  if (isLoadingFragments) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <DynamicIcon
          name="LoaderCircle"
          className="w-8 h-8 animate-spin text-primary"
        />
        <p className="ml-4">Cargando recursos del compositor...</p>
      </div>
    );
  }

  // Preparamos el objeto de contenido para el modal
  const composerContent = {
    composerTitle: content.composerTitle || "Compositor de Temas",
    composerDescription: content.composerDescription || "...",
    composerColorsTab: content.composerColorsTab || "Colores",
    composerTypographyTab: content.composerTypographyTab || "Tipografía",
    composerGeometryTab: content.composerGeometryTab || "Geometría",
    composerSaveButton: content.composerSaveButton || "Aplicar y Guardar Tema",
    composerCancelButton: content.composerCancelButton || "Cancelar",
    createNewPaletteButton:
      content.createNewPaletteButton || "Crear Nueva Paleta",
    createNewFontSetButton:
      content.createNewFontSetButton || "Crear Nuevo Set de Fuentes",
    createNewRadiusStyleButton:
      content.createNewRadiusStyleButton || "Crear Nuevo Estilo de Radio",
    placeholderFontsNone:
      content.placeholderFontsNone || "No hay sets de fuentes disponibles",
    placeholderRadiiNone:
      content.placeholderRadiiNone || "No hay estilos de radio disponibles",
  };

  return (
    <>
      <Step3Form
        content={content}
        themeConfig={draft.themeConfig}
        onBack={goToPrevStep}
        onNext={goToNextStep}
        onLaunchComposer={() => setIsComposerOpen(true)}
      />

      {isComposerOpen && loadedFragments && (
        <ThemeComposerModal
          isOpen={isComposerOpen}
          onClose={() => setIsComposerOpen(false)}
          fragments={loadedFragments}
          currentConfig={draft.themeConfig}
          onSave={onThemeConfigChange}
          content={composerContent} // <-- Pasar el contenido i18n
        />
      )}
    </>
  );
}
