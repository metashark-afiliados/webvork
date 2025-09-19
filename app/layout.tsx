// app/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Raíz de la Aplicación. SSoT para la estructura HTML base.
 *              v7.1 (Canonical Google Fonts): Utiliza la implementación recomendada
 *              de `next/font/google` para el auto-hospedaje automático de fuentes.
 * @version 7.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  logger.info(
    "[Observabilidad][ARQUITECTURA-RAIZ] Renderizando RootLayout (v7.1 - Canonical Google Fonts)"
  );

  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
// app/layout.tsx
