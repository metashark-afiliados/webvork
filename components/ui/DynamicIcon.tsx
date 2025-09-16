// components/ui/DynamicIcon.tsx
/**
 * @file DynamicIcon.tsx
 * @description SSoT para el renderizado dinámico de iconos de lucide-react.
 *              v18.0.0: Cambia a una exportación nombrada para resolver una
 *              cascada de errores de importación en toda la aplicación.
 * @version 18.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { FunctionComponent, memo } from "react";
import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { cn } from "@/lib/utils";
import { type LucideIconName } from "@/config/lucide-icon-names";
import { logger } from "@/lib/logging";

const DYNAMIC_ICON_CONFIG = {
  // ... (contenido sin cambios)
  DEFAULT_SIZE: 24,
  DEFAULT_PROPS: { strokeWidth: 2, "aria-hidden": true, focusable: false },
  FALLBACK_ICON_NAME: "HelpCircle",
};

const pascalToKebab = (str: string): string => {
  // ... (contenido sin cambios)
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
};

interface DynamicIconProps extends LucideProps {
  name: LucideIconName;
}

const DynamicIconComponent: FunctionComponent<DynamicIconProps> = ({
  name,
  className,
  ...props
}) => {
  // ... (lógica interna sin cambios)
  const kebabCaseName = pascalToKebab(name);
  const fallbackKebabCaseName = pascalToKebab(
    DYNAMIC_ICON_CONFIG.FALLBACK_ICON_NAME
  );
  const iconToLoad = (
    Object.keys(dynamicIconImports).includes(kebabCaseName)
      ? kebabCaseName
      : fallbackKebabCaseName
  ) as keyof typeof dynamicIconImports;
  if (
    iconToLoad === fallbackKebabCaseName &&
    kebabCaseName !== fallbackKebabCaseName
  ) {
    logger.warn(
      `[DynamicIcon] Icono "${name}" no encontrado. Usando fallback.`
    );
  }
  const LucideIcon = dynamic(dynamicIconImports[iconToLoad], {
    loading: () => (
      <div
        style={{
          width: props.size ?? DYNAMIC_ICON_CONFIG.DEFAULT_SIZE,
          height: props.size ?? DYNAMIC_ICON_CONFIG.DEFAULT_SIZE,
        }}
        className="animate-pulse bg-muted/50 rounded-md"
      />
    ),
  });
  return (
    <LucideIcon
      {...DYNAMIC_ICON_CONFIG.DEFAULT_PROPS}
      {...props}
      className={cn("lucide-icon", className)}
    />
  );
};

// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// Se utiliza una exportación nombrada explícita y memoizada.
export const DynamicIcon = memo(DynamicIconComponent);
// Se elimina la exportación por defecto.
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

// components/ui/DynamicIcon.tsx
