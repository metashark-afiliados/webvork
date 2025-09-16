// components/forms/builder/SchemaFieldRenderer/components/FieldControl/types/field.types.ts
/**
 * @file field.types.ts
 * @description SSoT para los contratos de tipos del módulo FieldControl.
 *              v1.1.0 (Type Safety): Reemplaza 'any' por 'unknown' para forzar
 *              la validación de tipos en los consumidores.
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 */

import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

/**
 * @type FieldComponentProps
 * @description Contrato de props base y genérico para todos los componentes
 *              de campo atómicos (BooleanField, NumberField, etc.).
 */
export type FieldComponentProps<TFieldValues extends FieldValues> = {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  onValueChange: (field: Path<TFieldValues>, value: unknown) => void;
  fieldName: Path<TFieldValues>;
};
// components/forms/builder/SchemaFieldRenderer/components/FieldControl/types/field.types.ts
