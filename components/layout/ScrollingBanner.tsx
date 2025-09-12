// src/components/layout/ScrollingBanner.tsx
"use client";

import Marquee from "react-fast-marquee";
import { AlertTriangle } from "lucide-react";

/**
 * @file ScrollingBanner.tsx
 * @description Un banner de marquesina que se desplaza horizontalmente en la parte superior del sitio.
 *              Ideal para mostrar mensajes de urgencia o importantes de forma continua.
 * @version 2.1.0
 * @date 2025-09-09
 * @dependencies react-fast-marquee, lucide-react
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
  console.log("[Observabilidad] Renderizando ScrollingBanner");

  return (
    <div className="py-2 text-sm font-bold text-white bg-[--image-banner-alert]">
      <Marquee speed={50} autoFill={true} pauseOnHover={true}>
        <div className="flex items-center mx-12">
          <AlertTriangle className="h-4 w-4 mr-3 flex-shrink-0" />
          <span className="uppercase tracking-wider">{message}</span>
        </div>
      </Marquee>
    </div>
  );
}
// src/components/layout/ScrollingBanner.tsx
