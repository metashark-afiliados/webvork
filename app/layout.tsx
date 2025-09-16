// app/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Raíz de la Aplicación. SSoT para la estructura HTML base.
 *              Este es el único layout que debe contener las etiquetas <html> y <body>.
 *              Es agnóstico al idioma y su única función es renderizar a sus hijos.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // Log de observabilidad explícito y único para el Layout Raíz.
  logger.info(
    "[Observabilidad][ARQUITECTURA-RAIZ] Renderizando RootLayout (app/layout.tsx)"
  );

  return (
    // El atributo lang será establecido por el layout anidado que sí conoce el locale.
    <html>
      <body>{children}</body>
    </html>
  );
}
// app/layout.tsx
