// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/LayoutBuilder.tsx
/**
 * @file LayoutBuilder.tsx
 * @description Componente interactivo para la composición de layouts mediante drag-and-drop.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState } from 'react';
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
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { sectionsConfig } from '@/lib/config/sections.config';
import type { LayoutConfigItem } from '../../_types/draft.types';
import { Button } from '@/components/ui/Button';
import DynamicIcon from '@/components/ui/DynamicIcon';
import { logger } from '@/lib/logging';

const availableSections = Object.keys(sectionsConfig).map(name => ({ id: name, name }));

interface SortableItemProps {
  id: string;
  onRemove: (id: string) => void;
}

function SortableItem({ id, onRemove }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center justify-between p-3 border rounded-md bg-background shadow-sm touch-none">
      <div className="flex items-center gap-2">
        <DynamicIcon name="GripVertical" className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{id}</span>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onRemove(id)}>
        <DynamicIcon name="X" className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}

interface LayoutBuilderProps {
  initialLayout: LayoutConfigItem[];
  onLayoutChange: (newLayout: LayoutConfigItem[]) => void;
  content: {
    libraryTitle: string;
    canvasTitle: string;
  };
}

export function LayoutBuilder({ initialLayout, onLayoutChange, content }: LayoutBuilderProps) {
  logger.info("[LayoutBuilder] Renderizando constructor de layout.");
  const [activeLayout, setActiveLayout] = useState<LayoutConfigItem[]>(initialLayout);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = activeLayout.findIndex(item => item.name === active.id);
      const newIndex = activeLayout.findIndex(item => item.name === over.id);

      const newLayout = [...activeLayout];
      const [removed] = newLayout.splice(oldIndex, 1);
      newLayout.splice(newIndex, 0, removed);

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
    const newLayout = activeLayout.filter(section => section.name !== sectionName);
    setActiveLayout(newLayout);
    onLayoutChange(newLayout);
  };

  const sectionsInLayout = new Set(activeLayout.map(s => s.name));
  const availableSectionsFiltered = availableSections.filter(s => !sectionsInLayout.has(s.name));

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
            {availableSectionsFiltered.map(section => (
              <div key={section.id} className="flex items-center justify-between p-2 border rounded-md bg-background">
                <span className="text-sm font-medium">{section.name}</span>
                <Button variant="outline" size="sm" onClick={() => addSection(section.name)}>
                  Añadir <DynamicIcon name="Plus" className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 p-4 border rounded-lg bg-muted/20 min-h-[400px]">
          <h3 className="font-semibold mb-4">{content.canvasTitle}</h3>
          <SortableContext items={activeLayout.map(item => item.name)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {activeLayout.map(item => (
                <SortableItem key={item.name} id={item.name} onRemove={removeSection} />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
                <div className="flex items-center justify-between p-3 border rounded-md bg-background shadow-xl cursor-grabbing">
                    <div className="flex items-center gap-2">
                        <DynamicIcon name="GripVertical" className="h-5 w-5 text-muted-foreground" />
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
