// app/[locale]/(dev)/dev/campaign-suite/_components/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para los componentes compartidos del asistente SDC.
 *              - v3.0.0 (Modular Architecture): Limpiado de todas las
 *                exportaciones de componentes de paso, que ahora se gestionan
 *                a través de sus propios módulos.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */

// Se exportan únicamente los componentes de layout y orquestación que son
// genuinamente compartidos a través de toda la SDC.
export * from "./ProgressStepper";
export * from "./StepClientWrapper";
export * from "./WizardClientLayout";

// NO SE EXPORTAN MÁS los componentes de paso desde aquí.
// app/[locale]/(dev)/dev/campaign-suite/_components/index.ts
