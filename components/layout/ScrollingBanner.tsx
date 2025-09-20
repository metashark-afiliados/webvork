// components/layout/ScrollingBanner.tsx
/**
 * @file ScrollingBanner.tsx
 * @description Un banner de marquesina que se desplaza horizontalmente.
 *              v2.3.0: Sincroniza el nombre del icono con la SSoT actualizada.
 * @version 2.3.0
 */
"use client";

import Marquee from "react-fast-marquee";
import { DynamicIcon } from "@/components/ui";
import { logger } from "@/shared/lib/logging";

interface ScrollingBannerProps {
  message: string;
}

export function ScrollingBanner({
  message,
}: ScrollingBannerProps): React.ReactElement {
  logger.info(
    "[Observabilidad] Renderizando ScrollingBanner (Client Component)"
  );

  return (
    <div className="py-2 text-sm font-bold text-white bg-[--image-banner-alert]">
      <Marquee speed={50} autoFill={true} pauseOnHover={true}>
        <div className="flex items-center mx-12">
          {/* --- [INICIO DE CORRECCIÓN] --- */}
          {/* 'AlertTriangle' ahora es 'TriangleAlert'. */}
          <DynamicIcon
            name="TriangleAlert"
            className="h-4 w-4 mr-3 flex-shrink-0"
          />
          {/* --- [FIN DE CORRECCIÓN] --- */}
          <span className="uppercase tracking-wider">{message}</span>
        </div>
      </Marquee>
    </div>
  );
}
// components/layout/ScrollingBanner.tsx
