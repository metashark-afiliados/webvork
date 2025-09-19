// app/[locale]/(dev)/dev/campaign-suite/_config/wizard.config.ts
/**
 * @file wizard.config.ts
 * @description SSoT para la configuración del asistente de la SDC.
 * @version 10.0.0 (Holistic Type Alignment): Se alinea la configuración con
 *              la nueva arquitectura de props "envueltas", logrando una
 *              seguridad de tipos completa y resolviendo todos los errores TS2322.
 * @version 10.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import type { ComponentType } from "react";
import { z } from "zod";
import type { StepProps } from "../_types/step.types";
import { logger } from "@/lib/logging";
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
} from "@/lib/schemas/campaigns/steps";

logger.trace("[wizard.config] Cargando SDC v10.0 (Holistic Type Alignment).");

export interface StepDefinition<TContent extends z.ZodRawShape> {
  readonly id: number;
  readonly titleKey: string;
  readonly Component: ComponentType<StepProps<z.infer<z.ZodObject<TContent>>>>;
  readonly i18nPath: string;
  readonly schema: z.ZodObject<TContent>;
}

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
