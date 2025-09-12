// src/components/HOCs/AntiCopyHandler.tsx
"use client";

import React, { useEffect } from "react";

/**
 * @file AntiCopyHandler.tsx
 * @description Componente de Orden Superior (HOC) que blinda a sus hijos contra
 *              la copia de contenido deshabilitando el menú contextual (clic derecho).
 * @version 1.0.0
 * @strategy Este componente cliente aplica listeners de eventos al `document.body`,
 *           siendo la forma correcta de manejar efectos secundarios del navegador
 *           en Next.js App Router sin interferir con el renderizado del servidor.
 */
export function AntiCopyHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.body.addEventListener("contextmenu", disableContextMenu);

    // Función de limpieza para remover el listener cuando el componente se desmonte
    return () => {
      document.body.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez

  return <>{children}</>;
}
// src/components/HOCs/AntiCopyHandler.tsx
