// src/components/ui/DynamicIcon.tsx
/**
 * @file DynamicIcon.tsx
 * @description Componente para renderizar dinámicamente iconos de lucide-react.
 *              - v15.0.0: Resuelve un bug crítico en la lógica de conversión
 *                `pascalToKebab`, asegurando la correcta generación de nombres de
 *                archivo para la importación dinámica de iconos.
 * @version 15.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { FunctionComponent } from "react";
import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { cn } from "@/lib/utils";
import { type LucideIconName } from "@/config/lucide-icon-names";

const DYNAMIC_ICON_CONFIG = {
  DEFAULT_SIZE: 24,
  DEFAULT_PROPS: {
    strokeWidth: 2,
    "aria-hidden": true,
    focusable: false,
  },
};

// <<-- SOLUCIÓN DE INGENIERÍA: Función de conversión robusta y corregida -->>
/**
 * @function pascalToKebab
 * @description Convierte una cadena en PascalCase a kebab-case.
 * @param {string} str - La cadena de entrada (ej. "FlaskConical").
 * @returns {string} La cadena convertida (ej. "flask-conical").
 */
const pascalToKebab = (str: string) => {
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
  const kebabCaseName = pascalToKebab(name) as keyof typeof dynamicIconImports;

  // Valida que el icono convertido exista en el manifiesto
  if (!dynamicIconImports[kebabCaseName]) {
    console.error(
      `[DynamicIcon] Icono no encontrado: ${name} (convertido a ${kebabCaseName})`
    );
    // Renderiza un icono de fallback visible para facilitar la depuración
    const FallbackIcon = dynamic(dynamicIconImports["help-circle"]);
    return <FallbackIcon color="red" {...props} />;
  }

  const LucideIcon = dynamic(dynamicIconImports[kebabCaseName], {
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

  const combinedClassName = cn("lucide-icon", className);

  return (
    <LucideIcon
      {...DYNAMIC_ICON_CONFIG.DEFAULT_PROPS}
      {...props}
      className={combinedClassName}
    />
  );
};

export default DynamicIcon;
// src/components/ui/DynamicIcon.tsx
