// src/lib/utils/cn.ts
/**
 * @file cn.ts
 * @description Aparato de utilidad y SSoT para la fusión de clases de Tailwind CSS.
 *              Combina la flexibilidad de `clsx` para clases condicionales con la
 *              inteligencia de `tailwind-merge` para resolver conflictos de utilidad.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @function cn
 * @description Fusiona inteligentemente clases de Tailwind CSS.
 * @param {...ClassValue[]} inputs - Una secuencia de valores de clase.
 * @returns {string} Una cadena de texto con las clases finales y sin conflictos.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
// src/lib/utils/cn.ts
