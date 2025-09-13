// components/ui/DynamicIcon.tsx
/**
 * @file DynamicIcon.tsx
 * @description SSoT para el renderizado dinámico de iconos de lucide-react.
 *              Este componente es la única vía autorizada para mostrar iconos,
 *              garantizando consistencia, rendimiento (code-splitting) y seguridad de tipos.
 *              - v16.0.0: Resuelve el error TS7053 mejorando la resiliencia de la
 *                lógica de fallback contra fallos de inferencia de tipos de TS.
 *                Se unifica el flujo de carga para ser más DRY y robusto.
 * @version 16.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/ui/DynamicIcon.tsx.md
 */
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
  FALLBACK_ICON_NAME: "HelpCircle", // SSoT para el icono de fallback (PascalCase)
};

/**
 * @function pascalToKebab
 * @description Convierte una cadena en PascalCase a kebab-case. Es una función pura.
 * @param {string} str - La cadena de entrada (ej. "FlaskConical").
 * @returns {string} La cadena convertida (ej. "flask-conical").
 */
const pascalToKebab = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

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

  // Determina qué nombre de icono cargar, priorizando el solicitado.
  // Si el icono solicitado no existe en el manifiesto, usa el fallback.
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

  // Carga el componente de icono de forma dinámica.
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

// Se utiliza React.memo para optimizar, ya que los iconos raramente cambian sus props.
export default memo(DynamicIcon);
// components/ui/DynamicIcon.tsx
