// components/layout/ScrollingBanner.tsx
"use client";

import Marquee from "react-fast-marquee";
// import { AlertTriangle } from "lucide-react"; // <-- ELIMINADO
import DynamicIcon from "@/components/ui/DynamicIcon"; // <-- AÑADIDO: Importación de DynamicIcon
import { logger } from "@/lib/logging"; // Añadido para observabilidad

/**
 * @file ScrollingBanner.tsx
 * @description Un banner de marquesina que se desplaza horizontalmente en la parte superior del sitio.
 *              Ideal para mostrar mensajes de urgencia o importantes de forma continua.
 *              - v2.2.0: Mejora la consistencia del sistema de iconos al reemplazar la
 *                importación directa de `AlertTriangle` por el componente `DynamicIcon`.
 * @version 2.2.0
 * @date 2025-09-09
 * @dependencies react-fast-marquee, @/components/ui/DynamicIcon
 *
 * @param {string} message - El mensaje de texto que se mostrará en el banner.
 */

interface ScrollingBannerProps {
  message: string;
}

/**
 * @component ScrollingBanner
 * @description Renderiza un banner animado con un mensaje. Es un componente cliente
 *              debido a la dependencia `react-fast-marquee` para la animación.
 * @param {ScrollingBannerProps} props Las propiedades del componente.
 * @returns {React.ReactElement} El elemento JSX que representa el banner.
 */
export function ScrollingBanner({
  message,
}: ScrollingBannerProps): React.ReactElement {
  logger.info(
    "[Observabilidad] Renderizando ScrollingBanner (Client Component)"
  ); // Observabilidad actualizada

  return (
    <div className="py-2 text-sm font-bold text-white bg-[--image-banner-alert]">
      <Marquee speed={50} autoFill={true} pauseOnHover={true}>
        <div className="flex items-center mx-12">
          <DynamicIcon
            name="AlertTriangle"
            className="h-4 w-4 mr-3 flex-shrink-0"
          />{" "}
          {/* <-- USO DE DYNAMICICON */}
          <span className="uppercase tracking-wider">{message}</span>
        </div>
      </Marquee>
    </div>
  );
}
