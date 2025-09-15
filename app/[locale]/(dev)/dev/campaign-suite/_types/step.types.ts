// app/[locale]/(dev)/dev/campaign-suite/_types/step.types.ts
/**
 * @file step.types.ts
 * @description SSoT para los tipos y contratos compartidos entre los pasos del asistente.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { CampaignDraft } from "../_hooks/useCampaignDraft";

/**
 * @interface StepProps
 * @description El contrato de props base que TODO componente de paso debe extender.
 *              Define las propiedades comunes para la navegación y la gestión del estado.
 */
export interface StepProps<TContent> {
  content: TContent;
  draft: CampaignDraft;
  setDraft: (
    data: Partial<Omit<CampaignDraft, "step" | "completedSteps">>
  ) => void;
  onBack: () => void;
  onNext: () => void;
}
// app/[locale]/(dev)/dev/campaign-suite/_types/step.types.ts
