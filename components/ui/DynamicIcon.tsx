// components/ui/DynamicIcon.tsx
/**
 * @file DynamicIcon.tsx
 * @description SSoT para el renderizado dinámico de iconos de lucide-react.
 *              - v17.1.0: Corrige un error crítico en la función `pascalToKebab`
 *                cuya expresión regular defectuosa generaba nombres de icono inválidos
 *                (ej. '-arrow-right'), causando que todos los iconos fallaran en cargarse.
 * @version 17.1.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/ui/DynamicIcon.tsx.md
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
  DEFAULT_SIZE: 24,
  DEFAULT_PROPS: {
    strokeWidth: 2,
    "aria-hidden": true,
    focusable: false,
  },
  FALLBACK_ICON_NAME: "HelpCircle",
};

/**
 * @function pascalToKebab
 * @description Convierte una cadena en PascalCase a kebab-case de forma robusta.
 * @param {string} str - La cadena de entrada (ej. "ArrowRight", "ALargeSmall").
 * @returns {string} La cadena convertida (ej. "arrow-right", "a-large-small").
 */
// --- [INICIO DE CORRECCIÓN: Expresión regular robusta] ---
const pascalToKebab = (str: string): string => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // Inserta guion entre minúscula/número y mayúscula
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // Inserta guion entre mayúsculas seguidas (ej. `MyAPI` -> `my-api`)
    .toLowerCase(); // Convierte todo a minúsculas
};
// --- [FIN DE CORRECCIÓN] ---

interface DynamicIconProps extends LucideProps {
  name: LucideIconName;
}

const DynamicIcon: FunctionComponent<DynamicIconProps> = ({
  name,
  className,
  ...props
}) => {
  console.log(`[Observabilidad] Renderizando DynamicIcon: ${name}`);

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
      `[DynamicIcon] Icono "${name}" (kebab: ${kebabCaseName}) no encontrado. Usando fallback: "${DYNAMIC_ICON_CONFIG.FALLBACK_ICON_NAME}".`
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
        aria-label="Cargando icono"
      />
    ),
  });

  const combinedClassName = cn("lucide-icon", className);

  return (
    <LucideIcon
      {...DYNAMIC_ICON_CONFIG.DEFAULT_PROPS}
      {...props}
      className={combinedClassName}
    />
  );
};

export default memo(DynamicIcon);
// components/ui/DynamicIcon.tsx
