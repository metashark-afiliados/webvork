// app/[locale]/(dev)/dev/page.tsx
/**
 * @file page.tsx
 * @description Página de entrada única (SPA) para la SDC.
 *              v12.1.0 (Definitive Generic Type Safety): Alineado con la nueva
 *              arquitectura de configuración genérica.
 * @version 12.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { Suspense } from "react";
import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { logger } from "@/shared/lib/logging";
import type { Locale } from "@/shared/lib/i18n.config";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import { StepClientWrapper } from "@/app/[locale]/(dev)/dev/campaign-suite/_components";
import {
  stepsConfig,
  type StepConfig, // Se importa el tipo para seguridad
} from "@/app/[locale]/(dev)/dev/campaign-suite/_config/wizard.config";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

interface CreatePageProps {
  params: { locale: Locale };
  searchParams: { step?: string };
}

export default async function CreatePage({
  params: { locale },
  searchParams,
}: CreatePageProps) {
  const currentStepId = parseInt(searchParams?.step || "0", 10);

  // --- [INICIO DE CORRECCIÓN DE TIPO] ---
  const stepConfig = stepsConfig.find(
    (s: StepConfig) => s.id === currentStepId
  );
  // --- [FIN DE CORRECCIÓN DE TIPO] ---

  if (!stepConfig) {
    logger.error(
      `[CreatePage] Configuración no encontrada para el paso ${currentStepId}. Redirigiendo a 404.`
    );
    return notFound();
  }

  logger.info(
    `[CreatePage] Renderizando. Locale: [${locale}], Paso: [${currentStepId}]`
  );

  let stepContent: object | null = null;
  let error: string | null = null;
  try {
    const i18nFilePath = path.join(process.cwd(), stepConfig.i18nPath);
    const fileContent = await fs.readFile(i18nFilePath, "utf-8");
    const i18nData = JSON.parse(fileContent);
    const contentForLocale = i18nData[locale];

    if (!contentForLocale) {
      throw new Error(`Contenido para locale '${locale}' no encontrado.`);
    }

    const validation = stepConfig.schema.safeParse(contentForLocale);

    if (!validation.success) {
      console.error(validation.error.flatten().fieldErrors);
      throw new Error(`Validación de Zod fallida.`);
    }

    stepContent = validation.data;
  } catch (e) {
    error = `No se pudo cargar o validar el contenido para el paso ${currentStepId}.`;
    logger.error(`[CreatePage] ${error}`, { error: e });
  }

  if (error || !stepContent) {
    return (
      <div className="text-destructive p-8 text-center">
        <h2 className="font-bold text-lg">Error al Cargar el Paso</h2>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Cargando asistente...</div>}>
      <StepClientWrapper stepContent={stepContent} />
    </Suspense>
  );
}
// app/[locale]/(dev)/dev/page.tsx
