// app/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Raíz de la Aplicación. SSoT para la estructura HTML base.
 *              Este es el único layout que debe contener las etiquetas <html> y <body>.
 *              Ahora precarga Google Fonts para su uso en theming.
 * @version 4.0.0 (Google Fonts Preload)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";
import { Inter, Poppins } from "next/font/google"; // <-- Importar Google Fonts
import "./globals.css";

// --- [INICIO DE CONFIGURACIÓN DE GOOGLE FONTS] ---
// Configurar las fuentes de Google
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
// --- [FIN DE CONFIGURACIÓN DE GOOGLE FONTS] ---

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  logger.info(
    "[Observabilidad][ARQUITECTURA-RAIZ] Renderizando RootLayout (app/layout.tsx)"
  );

  return (
    // Aplicar las variables CSS de las fuentes a la etiqueta html
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      {" "}
      {/* <-- Aplicar variables de fuente */}
      <body>{children}</body>
    </html>
  );
}
