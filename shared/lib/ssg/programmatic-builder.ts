// shared/lib/ssg/programmatic-builder.ts
/**
 * @file programmatic-builder.ts
 * @description Utilidad de bajo nivel para invocar el build de Next.js de forma programática y contextual.
 * @version 2.0.0 (Context-Aware & FSD Aligned)
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import { spawn } from "child_process";
import { logger } from "@/shared/lib/logging";

export function runScopedNextBuild(
  campaignId: string,
  variantId: string,
  tempContentDir?: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    logger.info("Iniciando proceso de build de Next.js...", {
      campaignId,
      variantId,
      isScoped: !!tempContentDir,
    });

    const env = { ...process.env };
    env.BUILD_TARGET_CAMPAIGN_ID = campaignId;
    env.BUILD_TARGET_VARIANT_ID = variantId;
    if (tempContentDir) {
      env.SSG_CONTENT_OVERRIDE_DIR = tempContentDir;
      logger.trace(
        `Build usará directorio de contenido temporal: ${tempContentDir}`
      );
    }

    const buildProcess = spawn("pnpm", ["next", "build"], {
      env: env,
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });

    let stderr = "";
    buildProcess.stdout.on("data", (data: Buffer) => {
      logger.trace(`[Next Build - STDOUT]: ${data.toString().trim()}`);
    });
    buildProcess.stderr.on("data", (data: Buffer) => {
      const line = data.toString().trim();
      logger.error(`[Next Build - STDERR]: ${line}`);
      stderr += line + "\n";
    });

    buildProcess.on("close", (code) => {
      if (code === 0) {
        logger.success(
          "El proceso de build de Next.js ha finalizado con éxito."
        );
        resolve();
      } else {
        const errorMessage = `El proceso de build de Next.js ha fallado con el código de salida: ${code}`;
        logger.error(errorMessage);
        reject(
          new Error(
            `${errorMessage}\n--- STDERR ---\n${stderr || "No stderr output."}`
          )
        );
      }
    });

    buildProcess.on("error", (err) => {
      const errorMessage = "No se pudo iniciar el proceso de build de Next.js.";
      logger.error(errorMessage, { err });
      reject(new Error(`${errorMessage}: ${err.message}`));
    });
  });
}
// shared/lib/ssg/programmatic-builder.ts
