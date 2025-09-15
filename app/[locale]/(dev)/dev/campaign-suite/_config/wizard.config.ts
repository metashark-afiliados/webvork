// app/[locale]/(dev)/dev/campaign-suite/_config/wizard.config.ts
/**
 * @file wizard.config.ts
 * @description SSoT para la configuración del asistente de creación de campañas.
 *              Define los pasos, sus componentes asociados y un contrato estricto
 *              con el esquema del diccionario i18n.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { Step0_Identification } from "../_components/Step0_Identification";
import { Step1_HeaderDesign } from "../_components/Step1_HeaderDesign";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

// --- INICIO DE REFACTORIZACIÓN: Contrato Estricto y Derivación de Tipos ---
// Extraemos el tipo de la sección del diccionario que nos interesa para crear un contrato seguro.
type WizardContentKeys = keyof NonNullable<Dictionary["campaignSuitePage"]>;

// Definimos la estructura de un paso con un contentKey que DEBE existir en el diccionario.
type StepDefinition = {
  readonly id: number;
  readonly titleKey: string;
  readonly contentKey: WizardContentKeys; // Clave estrictamente tipada.
  readonly Component: React.FC<any>;
};
// --- FIN DE REFACTORIZACIÓN ---

export const stepsConfig = [
  {
    id: 0,
    titleKey: "Paso 0: Identificación",
    contentKey: "step0", // TypeScript ahora valida que "step0" existe en el diccionario.
    Component: Step0_Identification,
  },
  {
    id: 1,
    titleKey: "Paso 1: Diseño",
    contentKey: "step1", // TypeScript ahora valida que "step1" existe en el diccionario.
    Component: Step1_HeaderDesign,
  },
] as const satisfies readonly StepDefinition[];

// --- INICIO DE REFACTORIZACIÓN: Se exporta el tipo derivado de la SSoT ---
/**
 * @type StepConfig
 * @description El tipo que representa un único objeto de configuración de paso.
 *              Derivado directamente de la constante `stepsConfig` para garantizar DRY.
 */
export type StepConfig = (typeof stepsConfig)[number];
// --- FIN DE REFACTORIZACIÓN ---
// app/[locale]/(dev)/dev/campaign-suite/_config/wizard.config.ts
