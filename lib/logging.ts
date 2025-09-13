// lib/logging.ts
/**
 * @file logging.ts
 * @description Aparato SSoT para el logging. Es isomórfico (seguro para servidor y cliente),
 *              resolviendo errores de SSR al verificar el entorno antes de usar APIs de navegador.
 *              La exportación unificada 'logger' es la causa de los errores en cascada que se corregirán.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/lib/logging.ts.md
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
  timer: "color: #14b8a6;",
};

/**
 * @function isBrowser
 * @description Verifica de forma segura si el código se está ejecutando en un entorno de navegador.
 * @returns {boolean} True si está en el navegador, false en caso contrario.
 */
const isBrowser = (): boolean => typeof window !== "undefined";

/**
 * @interface Logger
 * @description Define el contrato de la API para nuestro sistema de logging.
 */
interface Logger {
  startGroup: (label: string, style?: string) => void;
  endGroup: () => void;
  success: (message: string, context?: object) => void;
  info: (message: string, context?: object) => void;
  warn: (message: string, context?: object) => void;
  error: (message: string, context?: object) => void;
  trace: (message: string, context?: object) => void;
  time: (label: string) => void;
  timeEnd: (label: string) => void;
  startTrace: (traceName: string) => string;
  traceEvent: (traceId: string, eventName: string, context?: object) => void;
  endTrace: (traceId: string) => void;
}

/**
 * @function getTimestamp
 * @description Genera un timestamp formateado para los logs.
 * @returns {string} El timestamp en formato HH:MM:SS.ms.
 */
const getTimestamp = (): string => {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  const ms = String(now.getMilliseconds()).padStart(3, "0");
  return `${h}:${m}:${s}.${ms}`;
};

const timers = new Map<string, number>();

/**
 * @function logFormatted
 * @description Helper interno para formatear logs, consciente del entorno.
 * @private
 */
function logFormatted(
  icon: string,
  message: string,
  style: string,
  context?: object
) {
  const timestamp = getTimestamp();
  if (isBrowser()) {
    if (context) {
      console.log(
        `%c${timestamp} %c${icon} ${message}`,
        STYLES.timestamp,
        style,
        context
      );
    } else {
      console.log(
        `%c${timestamp} %c${icon} ${message}`,
        STYLES.timestamp,
        style
      );
    }
  } else {
    // Formato simple para el servidor
    const logObject = context ? { ...context } : {};
    console.log(`[${timestamp}] ${icon} ${message}`, logObject);
  }
}

// Implementación para Desarrollo
const developmentLogger: Logger = {
  startGroup: (label, style = STYLES.hook) => {
    const timestamp = getTimestamp();
    if (isBrowser() && console.groupCollapsed) {
      console.groupCollapsed(
        `%c${timestamp} %c▶ ${label}`,
        STYLES.timestamp,
        style
      );
    } else {
      console.log(`[${timestamp}] ▶ GROUP START: ${label}`);
    }
  },
  endGroup: () => {
    if (isBrowser() && console.groupEnd) {
      console.groupEnd();
    }
  },
  success: (message, context) =>
    logFormatted("✔", message, STYLES.success, context),
  info: (message, context) => logFormatted("ℹ", message, STYLES.info, context),
  warn: (message, context) =>
    logFormatted("⚠", message, STYLES.warning, context),
  error: (message, context) =>
    logFormatted("✖", message, STYLES.error, context),
  trace: (message, context) =>
    logFormatted("•", message, STYLES.trace, context),
  time: (label) => {
    if (isBrowser()) {
      timers.set(label, performance.now());
      logFormatted("⏱️", `Timer started: ${label}`, STYLES.timer);
    }
  },
  timeEnd: (label) => {
    if (isBrowser()) {
      const startTime = timers.get(label);
      if (startTime !== undefined) {
        const duration = (performance.now() - startTime).toFixed(2);
        logFormatted(
          "⏱️",
          `Timer ended: ${label} (${duration}ms)`,
          STYLES.timer
        );
        timers.delete(label);
      }
    }
  },
  startTrace: (traceName) => {
    const traceId = `${traceName}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    logFormatted("🔗", `Trace Start: ${traceId}`, STYLES.orchestrator);
    return traceId;
  },
  traceEvent: (traceId, eventName, context) => {
    logFormatted(`➡️ [${traceId}]`, eventName, STYLES.info, context);
  },
  endTrace: (traceId) => {
    logFormatted("🏁", `Trace End: ${traceId}`, STYLES.orchestrator);
  },
};

// Implementación para Producción
const productionLogger: Logger = {
  startGroup: () => {},
  endGroup: () => {},
  success: () => {},
  info: () => {},
  warn: (message, context) => console.warn(`[WARN] ${message}`, context),
  error: (message, context) => console.error(`[ERROR] ${message}`, context),
  trace: () => {},
  time: () => {},
  timeEnd: () => {},
  startTrace: (traceName: string) => traceName,
  traceEvent: () => {},
  endTrace: () => {},
};

/**
 * @const logger
 * @description Exportación unificada del logger. Se selecciona la implementación
 *              adecuada (development o production) en tiempo de build basándose en
 *              la variable de entorno NODE_ENV.
 */
export const logger =
  process.env.NODE_ENV === "development" ? developmentLogger : productionLogger;
// lib/logging.ts
