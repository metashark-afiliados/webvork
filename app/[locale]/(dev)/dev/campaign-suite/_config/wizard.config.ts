// app/[locale]/(dev)/dev/campaign-suite/_config/wizard.config.ts
/**
 * @file wizard.config.ts
 * @description SSoT para la configuración del asistente de la SDC.
 * @version 10.0.0 (Holistic Type Safety & FSD Alignment): Refactorizado a una
 *              arquitectura de configuración genérica y con seguridad de tipos de
 *              extremo a extremo, garantizando que el schema de cada paso coincida
 *              con las props de su componente.
 * @author RaZ Podestá - MetaShark Tech
 */
import type { ComponentType } from "react";
import { z } from "zod";
import type { StepProps } from "../_types/step.types";
import { logger } from "@/shared/lib/logging";
import {
  Step0,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
} from "../_components/all-steps";
import {
  Step0ContentSchema,
  Step1ContentSchema,
  Step2ContentSchema,
  Step3ContentSchema,
  Step4ContentSchema,
  Step5ContentSchema,
} from "@/shared/lib/schemas/campaigns/steps";

logger.trace("[wizard.config] Cargando SDC v10.0 (Holistic Type Safety).");

/**
 * @interface StepDefinition
 * @description Contrato de tipo genérico para la configuración de un paso.
 * @template TContent - Un objeto de Zod que define la forma del contenido i18n del paso.
 */
export interface StepDefinition<TContent extends z.ZodRawShape> {
  readonly id: number;
  readonly titleKey: string;
  readonly Component: ComponentType<StepProps<z.infer<z.ZodObject<TContent>>>>;
  readonly i18nPath: string; // Mantenido para la carga de datos en `page.tsx`
  readonly schema: z.ZodObject<TContent>;
}

/**
 * @function createStep
 * @description Función de utilidad (identity function) que proporciona inferencia de
 *              tipos para asegurar que el schema y el componente de una definición
 *              de paso estén sincronizados.
 */
const createStep = <TContent extends z.ZodRawShape>(
  config: StepDefinition<TContent>
): StepDefinition<TContent> => config;

export const stepsConfig = [
  createStep({
    id: 0,
    titleKey: "Identificación",
    Component: Step0,
    i18nPath: "messages/pages/dev/campaign-suite/steps/step0.i18n.json",
    schema: z.object({ step0: Step0ContentSchema }),
  }),
  createStep({
    id: 1,
    titleKey: "Estructura",
    Component: Step1,
    i18nPath: "messages/pages/dev/campaign-suite/steps/step1.i18n.json",
    schema: z.object({ step1: Step1ContentSchema }),
  }),
  createStep({
    id: 2,
    titleKey: "Layout",
    Component: Step2,
    i18nPath: "messages/pages/dev/campaign-suite/steps/step2.i18n.json",
    schema: z.object({ step2: Step2ContentSchema }),
  }),
  createStep({
    id: 3,
    titleKey: "Tema",
    Component: Step3,
    i18nPath: "messages/pages/dev/campaign-suite/steps/step3.i18n.json",
    schema: z.object({ step3: Step3ContentSchema }),
  }),
  createStep({
    id: 4,
    titleKey: "Contenido",
    Component: Step4,
    i18nPath: "messages/pages/dev/campaign-suite/steps/step4.i18n.json",
    schema: z.object({ step4: Step4ContentSchema }),
  }),
  createStep({
    id: 5,
    titleKey: "Gestión",
    Component: Step5,
    i18nPath: "messages/pages/dev/campaign-suite/steps/step5.i18n.json",
    schema: z.object({ step5: Step5ContentSchema }),
  }),
] as const;

export type StepConfig = (typeof stepsConfig)[number];
// app/[locale]/(dev)/dev/campaign-suite/_config/wizard.config.ts
