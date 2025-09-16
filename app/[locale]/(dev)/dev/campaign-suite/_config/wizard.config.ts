// app/[locale]/(dev)/dev/campaign-suite/_config/wizard.config.ts
/**
 * @file wizard.config.ts
 * @description SSoT para la configuración del asistente de la SDC.
 *              v4.0.0: Añadido el Paso 5 (Gestión) al flujo del asistente.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { ComponentType } from "react";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { StepProps } from "../_types/step.types";

import { Step0 } from "../_components/Step0_Identity";
import { Step1 } from "../_components/Step1_Structure";
import { Step2 } from "../_components/Step2_Layout";
import { Step3 } from "../_components/Step3_Theme";
import { Step4 } from "../_components/Step4_Content";
import { Step5 } from "../_components/Step5_Management";

type WizardContentKeys = keyof NonNullable<Dictionary["campaignSuitePage"]>;

type StepDefinition<TProps extends StepProps<any>> = {
  readonly id: number;
  readonly titleKey: string;
  readonly contentKey: WizardContentKeys;
  readonly Component: ComponentType<TProps>;
};

const createStep = <TProps extends StepProps<any>>(
  config: StepDefinition<TProps>
): typeof config => config;

export const stepsConfig = [
  createStep({
    id: 0,
    titleKey: "Paso 0: Identificación",
    contentKey: "step0",
    Component: Step0,
  }),
  createStep({
    id: 1,
    titleKey: "Paso 1: Estructura",
    contentKey: "step1",
    Component: Step1,
  }),
  createStep({
    id: 2,
    titleKey: "Paso 2: Layout",
    contentKey: "step2",
    Component: Step2,
  }),
  createStep({
    id: 3,
    titleKey: "Paso 3: Tema",
    contentKey: "step3",
    Component: Step3,
  }),
  createStep({
    id: 4,
    titleKey: "Paso 4: Contenido",
    contentKey: "step4",
    Component: Step4,
  }),
  createStep({
    id: 5,
    titleKey: "Paso 5: Gestión",
    contentKey: "step5",
    Component: Step5,
  }),
] as const;

export type StepConfig = (typeof stepsConfig)[number];
// app/[locale]/(dev)/dev/campaign-suite/_config/wizard.config.ts
