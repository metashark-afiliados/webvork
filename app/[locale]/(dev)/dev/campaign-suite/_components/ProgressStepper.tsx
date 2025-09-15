// app/[locale]/(dev)/dev/campaign-suite/_components/ProgressStepper.tsx
/**
 * @file ProgressStepper.tsx
 * @description Componente de UI "Semáforo de Pasos".
 * @version 2.0.0 - Exporta el tipo StepStatus para definir su contrato público.
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import DynamicIcon from "@/components/ui/DynamicIcon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";

// --- INICIO DE CORRECCIÓN: Se exporta el tipo para que sea la SSoT de este contrato ---
export type StepStatus = "completed" | "active" | "pending";
// --- FIN DE CORRECCIÓN ---

interface Step {
  id: number;
  title: string;
  status: StepStatus;
}

interface ProgressStepperProps {
  steps: Step[];
  onStepClick: (stepId: number) => void;
}

// (El resto del código del componente permanece sin cambios)
const statusStyles: Record<
  StepStatus,
  { icon: React.ReactNode; textClass: string }
> = {
  completed: {
    icon: <DynamicIcon name="CheckCircle2" className="text-green-500" />,
    textClass: "text-foreground",
  },
  active: {
    icon: <DynamicIcon name="MoreHorizontal" className="text-yellow-500" />,
    textClass: "text-yellow-500 font-bold",
  },
  pending: {
    icon: <DynamicIcon name="Circle" className="text-muted-foreground/50" />,
    textClass: "text-muted-foreground",
  },
};

export function ProgressStepper({ steps, onStepClick }: ProgressStepperProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Collapsible defaultOpen={true}>
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-2xl w-64">
          <CollapsibleTrigger asChild>
            <button className="flex items-center justify-between w-full p-4 font-bold text-left">
              Progreso del Asistente
              <DynamicIcon name="ChevronsUpDown" className="h-4 w-4" />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="space-y-3 p-4 pt-0">
              {steps.map((step) => (
                <li
                  key={step.id}
                  onClick={() =>
                    step.status !== "pending" && onStepClick(step.id)
                  }
                  className={cn(
                    "flex items-center gap-3 transition-colors p-1 rounded",
                    step.status !== "pending"
                      ? "cursor-pointer hover:bg-muted/50"
                      : "cursor-default"
                  )}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {statusStyles[step.status].icon}
                  </div>
                  <span
                    className={cn(
                      "text-sm",
                      statusStyles[step.status].textClass
                    )}
                  >
                    {step.title}
                  </span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/ProgressStepper.tsx
