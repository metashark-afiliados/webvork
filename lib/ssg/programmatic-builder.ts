// lib/ssg/programmatic-builder.ts
/**
 * @file programmatic-builder.ts
 * @description Utilidad de bajo nivel para invocar el build de Next.js.
 *              NO es una Server Action.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only"; // Asegura que solo se use en el servidor.
import { spawn } from "child_process";
import { logger } from "@/lib/logging";

export function runScopedNextBuild(
  campaignId: string,
  variantId: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    logger.info("Iniciando proceso de build de Next.js...", {
      campaignId,
      variantId,
    });

    const buildProcess = spawn("pnpm", ["next", "build"], {
      env: {
        ...process.env,
        BUILD_TARGET_CAMPAIGN_ID: campaignId,
        BUILD_TARGET_VARIANT_ID: variantId,
      },
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
        logger.error(
          `El proceso de build de Next.js ha fallado con el código de salida: ${code}`
        );
        reject(
          new Error(
            `Next.js build failed.\n--- STDERR ---\n${stderr || "No stderr output."}`
          )
        );
      }
    });

    buildProcess.on("error", (err) => {
      logger.error("No se pudo iniciar el proceso de build de Next.js.", {
        err,
      });
      reject(new Error(`Failed to start the build process: ${err.message}`));
    });
  });
}
// lib/ssg/programmatic-builder.ts
