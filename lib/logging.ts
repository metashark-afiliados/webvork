// lib/logging.ts
/**
 * @file logging.ts
 * @description Aparato SSoT para el logging. Isomórfico y con formato de élite.
 *              v8.0.0 (Holistic Restoration): Restaura la funcionalidad completa
 *              de logging para el navegador (groups, timers, success) que fue
 *              eliminada en v7, manteniendo el logging estructurado para el servidor.
 *              Esta es la versión definitiva y completa.
 * @version 8.0.0
 * @author RaZ Podestá - MetaShark Tech
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

const isBrowser = (): boolean => typeof window !== "undefined";

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

const getTimestamp = (): string => {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  const ms = String(now.getMilliseconds()).padStart(3, "0");
  return `${h}:${m}:${s}.${ms}`;
};

const timers = new Map<string, number>();

function logFormatted(
  level: "SUCCESS" | "INFO" | "WARN" | "ERROR" | "TRACE",
  icon: string,
  message: string,
  style: string,
  context?: object
) {
  const timestamp = getTimestamp();
  if (isBrowser()) {
    console.log(
      `%c[${timestamp}] %c${icon} ${message}`,
      STYLES.timestamp,
      style,
      ...(context ? [context] : [])
    );
  } else {
    // Logging estructurado y simple para el servidor
    console.log(`[${level}] ${message}`, context || "");
  }
}

// Implementación COMPLETA para Desarrollo
const developmentLogger: Logger = {
  startGroup: (label, style = STYLES.hook) => {
    const timestamp = getTimestamp();
    if (isBrowser() && console.groupCollapsed) {
      console.groupCollapsed(
        `%c[${timestamp}] %c▶ ${label}`,
        STYLES.timestamp,
        style
      );
    } else {
      console.log(`[GROUP START] ${label}`);
    }
  },
  endGroup: () => {
    if (isBrowser() && console.groupEnd) {
      console.groupEnd();
    }
  },
  success: (message, context) =>
    logFormatted("SUCCESS", "✅", message, STYLES.success, context),
  info: (message, context) =>
    logFormatted("INFO", "ℹ️", message, STYLES.info, context),
  warn: (message, context) =>
    logFormatted("WARN", "⚠️", message, STYLES.warning, context),
  error: (message, context) =>
    logFormatted("ERROR", "❌", message, STYLES.error, context),
  trace: (message, context) =>
    logFormatted("TRACE", "•", message, STYLES.trace, context),
  time: (label) => {
    if (isBrowser()) {
      timers.set(label, performance.now());
    }
  },
  timeEnd: (label) => {
    if (isBrowser()) {
      const startTime = timers.get(label);
      if (startTime !== undefined) {
        const duration = (performance.now() - startTime).toFixed(2);
        logFormatted(
          "INFO",
          "⏱️",
          `Timer [${label}]: ${duration}ms`,
          STYLES.timer
        );
        timers.delete(label);
      }
    }
  },
  startTrace: (traceName) => {
    const traceId = `${traceName}-${Math.random().toString(36).substring(2, 9)}`;
    logFormatted("TRACE", "🔗", `Trace Start: ${traceId}`, STYLES.orchestrator);
    return traceId;
  },
  traceEvent: (traceId, eventName, context) => {
    logFormatted("TRACE", `➡️ [${traceId}]`, eventName, STYLES.info, context);
  },
  endTrace: (traceId) => {
    logFormatted("TRACE", "🏁", `Trace End: ${traceId}`, STYLES.orchestrator);
  },
};

// Implementación para Producción (sin cambios, solo lo esencial)
const productionLogger: Logger = {
  startGroup: () => {},
  endGroup: () => {},
  success: () => {},
  info: () => {},
  warn: (message, context) => console.warn(`[WARN] ${message}`, context || ""),
  error: (message, context) =>
    console.error(`[ERROR] ${message}`, context || ""),
  trace: () => {},
  time: () => {},
  timeEnd: () => {},
  startTrace: (traceName: string) => traceName,
  traceEvent: () => {},
  endTrace: () => {},
};

export const logger =
  process.env.NODE_ENV === "development" ? developmentLogger : productionLogger;
// lib/logging.ts
