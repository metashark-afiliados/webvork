
// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/_components/LayoutCanvas.tsx
/**
 * @file LayoutCanvas.tsx
 * @description Aparato atómico para el lienzo de layout reordenable, ahora con
 *              feedback visual gamificado (MEA/UX) para "Combos Estratégicos".
 * @version 2.0.0 (Strategic Combo Feedback)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";
import React from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import type { LayoutConfigItem } from "../../../_types/draft.types";
import { Button, DynamicIcon } from "@/components/ui";
import { logger } from "@/shared/lib/logging";
import { cn } from "@/shared/lib/utils";

interface SortableItemProps {
  id: string;
  isComboPart: boolean; // Prop para saber si es parte de un combo
  isLastItem: boolean; // Prop para no renderizar el conector en el último ítem
  isNextItemInCombo: boolean; // Prop para saber si el siguiente ítem también es del combo
  onRemove: (id: string) => void;
}

function SortableItem({
  id,
  isComboPart,
  isLastItem,
  isNextItemInCombo,
  onRemove,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={cn(
        "relative flex items-center justify-between p-3 border rounded-md bg-background shadow-sm touch-none transition-all duration-300",
        isComboPart && "border-primary ring-2 ring-primary/50" // Resaltado de ítem en combo
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-2">
        <DynamicIcon
          name="GripVertical"
          className="h-5 w-5 text-muted-foreground cursor-grab"
        />
        <span className="font-medium">{id}</span>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onRemove(id)}>
        <DynamicIcon name="X" className="h-4 w-4 text-destructive" />
      </Button>

      {/* --- MEA/UX: Conector Estratégico --- */}
      {!isLastItem && (
        <div className="absolute left-5 -bottom-3 h-3 w-0.5 bg-border">
          {isNextItemInCombo && (
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1, originY: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}
        </div>
      )}
    </motion.div>
  );
}

interface LayoutCanvasProps {
  activeLayout: LayoutConfigItem[];
  comboSections: Set<string>; // Prop para recibir los combos detectados
  onRemoveSection: (sectionName: string) => void;
  title: string;
}

export function LayoutCanvas({
  activeLayout,
  comboSections,
  onRemoveSection,
  title,
}: LayoutCanvasProps) {
  logger.trace("[LayoutCanvas] Renderizando lienzo de layout (v2.0 - MEA).");
  return (
    <div className="md:col-span-2 p-4 border rounded-lg bg-muted/20 min-h-[400px]">
      <h3 className="font-semibold mb-4">{title}</h3>
      <AnimatePresence>
        <SortableContext
          items={activeLayout.map((item) => item.name)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {activeLayout.length > 0 ? (
              activeLayout.map((item, index) => {
                const isComboPart = comboSections.has(item.name);
                const isNextItemInCombo = isComboPart && index < activeLayout.length - 1 && comboSections.has(activeLayout[index + 1].name);
                return (
                  <SortableItem
                    key={item.name}
                    id={item.name}
                    onRemove={onRemoveSection}
                    isComboPart={isComboPart}
                    isLastItem={index === activeLayout.length - 1}
                    isNextItemInCombo={isNextItemInCombo}
                  />
                );
              })
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground text-center py-10"
              >
                Arrastra o añade secciones aquí para construir tu layout.
              </motion.p>
            )}
          </div>
        </SortableContext>
      </AnimatePresence>
    </div>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/_components/LayoutCanvas.tsx
