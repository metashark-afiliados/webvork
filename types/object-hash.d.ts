// types/object-hash.d.ts
/**
 * @file object-hash.d.ts
 * @description Archivo de declaración de módulo local para la librería `object-hash`.
 *              Resolución final del error `TS7016` y advertencia de `no-explicit-any`,
 *              proporcionando un tipado robusto para su uso en scripts.
 * @version 1.1.0 (Type Safety Final)
 * @author RaZ Podestá - MetaShark Tech
 */
declare module "object-hash" {
  /**
   * Genera un hash consistente para cualquier objeto JavaScript.
   * @param object El objeto a hashear. Se usa `unknown` para permitir cualquier tipo.
   * @param options Opciones de configuración para el hashing. Se usa `Record<string, unknown>`
   *                para permitir opciones arbitrarias de forma segura.
   * @returns El hash del objeto como una cadena de texto.
   */
  function objectHash(
    object: unknown,
    options?: Record<string, unknown>
  ): string;
  export = objectHash;
}
