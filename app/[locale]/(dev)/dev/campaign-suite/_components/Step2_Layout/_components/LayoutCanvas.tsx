// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/_components/LayoutCanvas.tsx
/**
 * @file LayoutCanvas.tsx
 * @description Aparato atómico para el lienzo de layout reordenable.
 * @version 1.0.0
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
import { logger } from "@/lib/logging";

interface SortableItemProps {
  id: string;
  onRemove: (id: string) => void;
}

function SortableItem({ id, onRemove }: SortableItemProps) {
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
      className="flex items-center justify-between p-3 border rounded-md bg-background shadow-sm touch-none"
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
    </motion.div>
  );
}

interface LayoutCanvasProps {
  activeLayout: LayoutConfigItem[];
  onRemoveSection: (sectionName: string) => void;
  title: string;
}

export function LayoutCanvas({
  activeLayout,
  onRemoveSection,
  title,
}: LayoutCanvasProps) {
  logger.trace("[LayoutCanvas] Renderizando lienzo de layout.");
  return (
    <div className="md:col-span-2 p-4 border rounded-lg bg-muted/20 min-h-[400px]">
      <h3 className="font-semibold mb-4">{title}</h3>
      <AnimatePresence>
        <SortableContext
          items={activeLayout.map((item) => item.name)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {activeLayout.length > 0 ? (
              activeLayout.map((item) => (
                <SortableItem
                  key={item.name}
                  id={item.name}
                  onRemove={onRemoveSection}
                />
              ))
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
