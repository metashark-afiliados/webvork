// lib/logging.ts
/**
 * @file logging.ts
 * @description Aparato SSoT para el logging del lado del cliente.
 *              - v5.0.0 (Élite): Introduce funcionalidades avanzadas para una
 *                observabilidad de élite en desarrollo:
 *                - Medición de rendimiento con `time()` y `timeEnd()`.
 *                - Trazabilidad de flujos de ejecución con `startTrace()`.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 */

const STYLES = {
  orchestrator: "color: #8b5cf6; font-weight: bold;",
  hook: "color: #3b82f6; font-weight: bold;",
  success: "color: #22c55e; font-weight: bold;",
  info: "color: #60a5fa;",
  warning: "color: #f59e0b;",
  error: "color: #ef4444; font-weight: bold;",
  trace: "color: #a1a1aa;",
  timestamp: "color: #64748b;",
  timer: "color: #14b8a6;", // Verde azulado para timers
};

/**
 * @interface ClientLogger
 * @description Contrato para el logger del lado del cliente.
 */
interface ClientLogger {
  startGroup: (label: string, style?: string) => void;
  endGroup: () => void;
  success: (message: string, context?: object) => void;
  info: (message: string, context?: object) => void;
  warn: (message: string, context?: object) => void;
  error: (message: string, context?: object) => void;
  trace: (message: string, context?: object) => void;
  /**
   * Inicia un temporizador de alta precisión.
   * @param label - Un identificador único para el temporizador.
   */
  time: (label: string) => void;
  /**
   * Detiene un temporizador y registra la duración.
   * @param label - El identificador del temporizador a detener.
   */
  timeEnd: (label: string) => void;
  /**
   * Inicia una nueva traza para agrupar logs relacionados.
   * @param traceName - Un nombre descriptivo para la traza (ej. "user-login").
   * @returns Un ID de traza único para pasar a `traceEvent`.
   */
  startTrace: (traceName: string) => string;
  /**
   * Registra un evento dentro de una traza existente.
   * @param traceId - El ID devuelto por `startTrace`.
   * @param eventName - El nombre del evento (ej. "form-validation-success").
   * @param context - Datos adicionales sobre el evento.
   */
  traceEvent: (traceId: string, eventName: string, context?: object) => void;
  /**
   * Marca el final de una traza.
   * @param traceId - El ID de la traza a finalizar.
   */
  endTrace: (traceId: string) => void;
}

const getTimestamp = (): string => {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  const ms = String(now.getMilliseconds()).padStart(3, "0");
  return `${h}:${m}:${s}.${ms}`;
};

const formatMessage = (
  icon: string,
  message: string,
  style: string,
  context?: object
) => {
  const timestamp = getTimestamp();
  if (context) {
    console.log(
      `%c${timestamp} %c${icon} ${message}`,
      STYLES.timestamp,
      style,
      context
    );
  } else {
    console.log(`%c${timestamp} %c${icon} ${message}`, STYLES.timestamp, style);
  }
};

// --- Implementación para Desarrollo ---
const timers = new Map<string, number>();

const developmentLogger: ClientLogger = {
  startGroup: (label, style = STYLES.hook) => {
    const timestamp = getTimestamp();
    console.groupCollapsed(
      `%c${timestamp} %c▶ ${label}`,
      STYLES.timestamp,
      style
    );
  },
  endGroup: () => console.groupEnd(),
  success: (message, context) =>
    formatMessage("✔", message, STYLES.success, context),
  info: (message, context) => formatMessage("ℹ", message, STYLES.info, context),
  warn: (message, context) =>
    formatMessage("⚠", message, STYLES.warning, context),
  error: (message, context) =>
    formatMessage("✖", message, STYLES.error, context),
  trace: (message, context) =>
    formatMessage("•", message, STYLES.trace, context),
  time: (label) => {
    timers.set(label, performance.now());
    formatMessage("⏱️", `Timer started: ${label}`, STYLES.timer);
  },
  timeEnd: (label) => {
    const startTime = timers.get(label);
    if (startTime !== undefined) {
      const duration = (performance.now() - startTime).toFixed(2);
      formatMessage(
        "⏱️",
        `Timer ended: ${label} (${duration}ms)`,
        STYLES.timer
      );
      timers.delete(label);
    } else {
      formatMessage("⏱️", `Timer '${label}' no encontrado.`, STYLES.warning);
    }
  },
  startTrace: (traceName) => {
    const traceId = `${traceName}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    formatMessage("🔗", `Trace Start: ${traceId}`, STYLES.orchestrator);
    return traceId;
  },
  traceEvent: (traceId, eventName, context) => {
    formatMessage(`➡️ [${traceId}]`, eventName, STYLES.info, context);
  },
  endTrace: (traceId) => {
    formatMessage("🏁", `Trace End: ${traceId}`, STYLES.orchestrator);
  },
};

// --- Implementación para Producción ---
const productionLogger: ClientLogger = {
  startGroup: () => {},
  endGroup: () => {},
  success: () => {},
  info: () => {},
  warn: () => {},
  error: (message, context) => {
    // Se mantiene el console.error en producción, ya que es el único nivel
    // de log que Vercel captura por defecto en sus funciones de cliente.
    console.error(`[ERROR] ${message}`, context);
  },
  trace: () => {},
  time: () => {},
  timeEnd: () => {},
  startTrace: (traceName: string) => traceName,
  traceEvent: () => {},
  endTrace: () => {},
};

export const clientLogger =
  process.env.NODE_ENV === "development" ? developmentLogger : productionLogger;
// lib/logging.ts
