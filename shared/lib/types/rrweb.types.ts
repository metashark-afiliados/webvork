// RUTA: lib/types/rrweb.types.ts
/**
 * @file rrweb.types.ts
 * @description SSoT interna para los contratos de tipos de la librería rrweb.
 *              Esta abstracción nos hace resilientes a problemas de resolución
 *              del paquete externo `@rrweb/types`, eliminando una fuente
 *              crítica de inestabilidad del build.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */

/**
 * @type eventWithTime
 * @description Contrato de datos para un evento de rrweb. La propiedad `data`
 *              se define como `unknown` para coincidir con la salida real de
 *              la librería y garantizar la seguridad de tipos. Cualquier consumidor
 *              de este dato deberá realizar una validación o aserción de tipo explícita.
 */
export type eventWithTime = {
  type: number;
  data: unknown;
  timestamp: number;
  delay?: number;
};
