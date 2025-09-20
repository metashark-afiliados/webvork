// components/ui/Tooltip.tsx
/**
 * @file Tooltip.tsx
 * @description Sistema de componentes de Tooltip de élite, accesible y animado.
 *              Basado en Radix UI para una accesibilidad robusta (WAI-ARIA) y
 *              en Framer Motion para una experiencia de usuario (UX) pulida.
 *              Cumple con la Directiva 003: Manifiesto de Calidad de Componentes.
 * @version 1.0.0
 * @author shadcn/ui (Base), RaZ Podestá - MetaShark Tech (Nivelación de Élite)
 */
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { logger } from "@/shared/lib/logging";

/**
 * @component TooltipProvider
 * @description Proveedor de contexto global para los tooltips. Controla el
 *              delay y otras configuraciones para todos los tooltips descendientes.
 *              Debe envolver la raíz de la aplicación o la sección que contendrá tooltips.
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * @component Tooltip
 * @description Componente raíz que envuelve un `TooltipTrigger` y un `TooltipContent`.
 *              Gestiona el estado de apertura/cierre.
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * @component TooltipTrigger
 * @description El elemento que, al ser enfocado o recibir un hover, dispara la
 *              aparición del tooltip. Utiliza `asChild` para fusionarse con su
 *              hijo, permitiendo que cualquier elemento sea un activador.
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * @component TooltipContent
 * @description El contenido del tooltip que aparece. Ha sido nivelado con
 *              `framer-motion` para una animación de aparición sutil y elegante.
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  // El logging se coloca aquí, ya que es el componente que se renderiza dinámicamente.
  logger.trace("[Observabilidad] Renderizando TooltipContent");

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content ref={ref} sideOffset={sideOffset} {...props}>
        {/* AnimatePresence permite la animación de salida del tooltip. */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div
              className={cn(
                "z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
                className
              )}
            >
              {props.children}
            </div>
          </motion.div>
        </AnimatePresence>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
// components/ui/Tooltip.tsx
