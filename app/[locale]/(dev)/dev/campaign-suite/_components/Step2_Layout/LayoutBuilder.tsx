// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/LayoutBuilder.tsx
/**
 * @file LayoutBuilder.tsx
 * @description Componente interactivo y funcional para la composición de layouts.
 *              v2.1.0 (Fluid UX): Se integra Framer Motion para añadir animaciones
 *              suaves al añadir, eliminar y reordenar secciones, mejorando la UX.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion"; // <-- Importar Framer Motion
import { sectionsConfig } from "@/lib/config/sections.config";
import type { LayoutConfigItem } from "../../_types/draft.types";
import { Button, DynamicIcon } from "@/components/ui";
import { logger } from "@/lib/logging";

const availableSections = Object.keys(sectionsConfig).map((name) => ({
  id: name,
  name,
}));

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

  // --- [INICIO DE MEJORA DE UX] ---
  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout // <-- Esta prop activa la magia de las animaciones de layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.9 }}
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
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(id)}
        aria-label={`Eliminar sección ${id}`}
      >
        <DynamicIcon name="X" className="h-4 w-4 text-destructive" />
      </Button>
    </motion.div>
  );
  // --- [FIN DE MEJORA DE UX] ---
}
// ... (resto del código del componente LayoutBuilder sin cambios) ...
interface LayoutBuilderProps {
  initialLayout: LayoutConfigItem[];
  onLayoutChange: (newLayout: LayoutConfigItem[]) => void;
  content: {
    libraryTitle: string;
    canvasTitle: string;
  };
}

export function LayoutBuilder({
  initialLayout,
  onLayoutChange,
  content,
}: LayoutBuilderProps) {
  logger.info("[LayoutBuilder] Renderizando constructor de layout funcional.");
  const [activeLayout, setActiveLayout] =
    useState<LayoutConfigItem[]>(initialLayout);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) =>
    setActiveId(event.active.id as string);

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = activeLayout.findIndex(
        (item) => item.name === active.id
      );
      const newIndex = activeLayout.findIndex((item) => item.name === over.id);
      const newLayout = arrayMove(activeLayout, oldIndex, newIndex);
      setActiveLayout(newLayout);
      onLayoutChange(newLayout);
    }
  };

  const addSection = (sectionName: string) => {
    const newLayout = [...activeLayout, { name: sectionName }];
    setActiveLayout(newLayout);
    onLayoutChange(newLayout);
  };

  const removeSection = (sectionName: string) => {
    const newLayout = activeLayout.filter(
      (section) => section.name !== sectionName
    );
    setActiveLayout(newLayout);
    onLayoutChange(newLayout);
  };

  const sectionsInLayout = new Set(activeLayout.map((s) => s.name));
  const availableSectionsFiltered = availableSections.filter(
    (s) => !sectionsInLayout.has(s.name)
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 p-4 border rounded-lg bg-muted/20">
          <h3 className="font-semibold mb-4">{content.libraryTitle}</h3>
          <div className="space-y-2">
            {availableSectionsFiltered.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between p-2 border rounded-md bg-background"
              >
                <span className="text-sm font-medium">{section.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSection(section.name)}
                >
                  Añadir <DynamicIcon name="Plus" className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
            {availableSectionsFiltered.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">
                Todas las secciones han sido añadidas.
              </p>
            )}
          </div>
        </div>
        <div className="md:col-span-2 p-4 border rounded-lg bg-muted/20 min-h-[400px]">
          <h3 className="font-semibold mb-4">{content.canvasTitle}</h3>
          {/* --- [INICIO DE MEJORA DE UX] --- */}
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
                      onRemove={removeSection}
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
          {/* --- [FIN DE MEJORA DE UX] --- */}
          <DragOverlay>
            {activeId ? (
              <div className="flex items-center justify-between p-3 border rounded-md bg-background shadow-xl cursor-grabbing">
                <div className="flex items-center gap-2">
                  <DynamicIcon
                    name="GripVertical"
                    className="h-5 w-5 text-muted-foreground"
                  />
                  <span className="font-medium">{activeId}</span>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/LayoutBuilder.tsx
