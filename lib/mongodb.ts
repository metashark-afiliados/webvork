// lib/mongodb.ts
/**
 * @file mongodb.ts
 * @description SSoT para la conexión a la base de datos de MongoDB.
 *              v2.1.0 (Environment Safety & Production Ready): Implementa una
 *              guardia de seguridad "fail-fast" que previene la ejecución de la
 *              aplicación si las variables de entorno críticas de la base de
 *              datos no están definidas, garantizando la seguridad de tipos
 *              y la resiliencia en tiempo de ejecución.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { MongoClient } from "mongodb";
import { logger } from "@/lib/logging";

// --- [INICIO] GUARDIA DE SEGURIDAD Y VALIDACIÓN DE ENTORNO ---
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

// Esta es la guardia de seguridad a nivel de módulo. Si las variables críticas no están
// definidas, la aplicación lanzará un error inmediatamente al iniciar, previniendo
// fallos impredecibles en tiempo de ejecución.
if (!MONGODB_URI) {
  throw new Error(
    "Error de Configuración Crítico: La variable de entorno MONGODB_URI no está definida. Revisa tu archivo .env."
  );
}
if (!MONGODB_DB_NAME) {
  throw new Error(
    "Error de Configuración Crítico: La variable de entorno MONGODB_DB_NAME no está definida. Revisa tu archivo .env."
  );
}
// --- [FIN] GUARDIA DE SEGURIDAD Y VALIDACIÓN DE ENTORNO ---

let cachedClientPromise: Promise<MongoClient> | null = null;

export async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClientPromise) {
    logger.trace("[MongoDB] Usando conexión de cliente cacheada.");
    return cachedClientPromise;
  }

  logger.info(
    "[MongoDB] Creando nueva conexión de cliente a la base de datos..."
  );

  // Gracias a la guardia de seguridad anterior, TypeScript ahora sabe que
  // MONGODB_URI es un string, lo que resuelve el error TS2345.
  const client = new MongoClient(MONGODB_URI);
  cachedClientPromise = client.connect();

  try {
    await cachedClientPromise;
    logger.success(
      "[MongoDB] Conexión a la base de datos establecida con éxito."
    );
  } catch (e) {
    logger.error("[MongoDB] Fallo al conectar con la base de datos.", { e });
    cachedClientPromise = null; // Resetea la caché en caso de fallo para permitir reintentos.
    throw e;
  }

  return cachedClientPromise;
}
// lib/mongodb.ts
