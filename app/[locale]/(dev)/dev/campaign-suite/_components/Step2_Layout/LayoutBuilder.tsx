// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/LayoutBuilder.tsx
/**
 * @file LayoutBuilder.tsx
 * @description Orquestador de lógica y estado para la composición de layouts.
 * @version 3.1.0 (I18n Integration)
 * @author RaZ Podestá - MetaShark Tech
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
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { sectionsConfig } from "@/shared/lib/config/sections.config";
import type { LayoutConfigItem } from "../../_types/draft.types";
import { logger } from "@/shared/lib/logging";
import { LayoutCanvas } from "./_components/LayoutCanvas";
import { SectionLibrary } from "./_components/SectionLibrary";
import { DynamicIcon } from "@/components/ui";
import type { Step2ContentSchema } from "@/shared/lib/schemas/campaigns/steps/step2.schema";
import type { z } from "zod";

const availableSections = Object.keys(sectionsConfig).map((name) => ({
  id: name,
  name,
}));
type Content = z.infer<typeof Step2ContentSchema>;

interface LayoutBuilderProps {
  initialLayout: LayoutConfigItem[];
  onLayoutChange: (newLayout: LayoutConfigItem[]) => void;
  content: Pick<
    Content,
    | "libraryTitle"
    | "canvasTitle"
    | "addSectionButtonText"
    | "emptyLibraryText"
    | "emptyCanvasText"
  >;
}

export function LayoutBuilder({
  initialLayout,
  onLayoutChange,
  content,
}: LayoutBuilderProps) {
  logger.info("[LayoutBuilder] Renderizando orquestador de layout (v3.1).");
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
        <SectionLibrary
          availableSections={availableSectionsFiltered}
          onAddSection={addSection}
          title={content.libraryTitle}
        />
        <LayoutCanvas
          activeLayout={activeLayout}
          onRemoveSection={removeSection}
          title={content.canvasTitle}
        />
      </div>
      <DragOverlay>
        {activeId ? (
          <div className="flex items-center justify-between p-3 border rounded-md bg-primary/10 shadow-lg touch-none">
            <div className="flex items-center gap-2">
              <DynamicIcon
                name="GripVertical"
                className="h-5 w-5 text-primary"
              />
              <span className="font-bold text-primary">{activeId}</span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/LayoutBuilder.tsx
