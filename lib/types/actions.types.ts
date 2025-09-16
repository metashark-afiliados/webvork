// lib/types/actions.types.ts
/**
 * @file actions.types.ts
 * @description SSoT para los contratos de datos de retorno de las Server Actions.
 *              v2.0.0 - Se exportan los tipos atómicos SuccessResult y ErrorResult
 *              para permitir la tipificación explícita y robusta en los consumidores.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

/**
 * @type SuccessResult<T>
 * @description Representa el resultado de una operación exitosa.
 * @property {true} success - Indicador de éxito.
 * @property {T} data - El payload de datos de la operación.
 */
export type SuccessResult<T> = {
  success: true;
  data: T;
};

/**
 * @type ErrorResult
 * @description Representa el resultado de una operación fallida.
 * @property {false} success - Indicador de fallo.
 * @property {string} error - Un mensaje de error o una clave i18n.
 */
export type ErrorResult = {
  success: false;
  error: string;
};

/**
 * @type ActionResult<T>
 * @description Un tipo de unión discriminada que representa el resultado de
 *              cualquier Server Action. Debe ser el tipo de retorno de toda
 *              acción que pueda fallar.
 * @template T - El tipo del payload de datos en caso de éxito.
 */
export type ActionResult<T> = SuccessResult<T> | ErrorResult;
// lib/types/actions.types.ts
