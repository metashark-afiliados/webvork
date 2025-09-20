// scripts/validation/validate-theme-fragments.ts
/**
 * @file validate-theme-fragments.ts
 * @description Guardián de Integridad de Temas. Audita los `campaign.map.json`
 *              y reporta cualquier inconsistencia o desviación de la SSoT.
 * @version 2.0.0 (Normalization Engine)
 * @author RaZ Podestá - MetaShark Tech
 */
import { promises as fs } from "fs";
import * as path from "path";
import chalk from "chalk";
import { parseThemeNetString } from "@/shared/lib/theming/theme-utils";
import { netTracePrefixToPathMap } from "@/shared/lib/config/theming.config";
import { logger } from "@/shared/lib/logging";

const CAMPAIGNS_DIR = path.resolve(process.cwd(), "content/campaigns");
const FRAGMENTS_DIR = path.resolve(process.cwd(), "content/theme-fragments");

async function validateAllCampaignThemes() {
  logger.startGroup(
    "🛡️  Iniciando Guardián de Integridad de Temas (v2.0 - Normalization Engine)..."
  );
  let totalErrors = 0;

  try {
    const campaignDirs = await fs.readdir(CAMPAIGNS_DIR);

    for (const campaignId of campaignDirs) {
      const campaignPath = path.join(CAMPAIGNS_DIR, campaignId);
      const campaignStat = await fs.stat(campaignPath);
      if (!campaignStat.isDirectory()) continue;

      console.log(
        chalk.cyan(`\n🔎 Auditando Campaña: ${chalk.bold(campaignId)}`)
      );

      const mapPath = path.join(campaignPath, "campaign.map.json");
      try {
        const mapContent = await fs.readFile(mapPath, "utf-8");
        const campaignMap = JSON.parse(mapContent);

        for (const variantId in campaignMap.variants) {
          const variant = campaignMap.variants[variantId];
          if (!variant.theme) continue;

          const themePlan = parseThemeNetString(variant.theme);
          const requiredPrefixes = ["cp", "ft", "rd"];
          let variantErrors = 0;

          // 1. Validar existencia de fragmentos
          for (const prefix of requiredPrefixes) {
            const name = themePlan[prefix];
            if (!name) {
              logger.error(
                `[Guardián] ¡Anomalía! Falta el prefijo '${prefix}' en el trazo NET.`,
                { Campaña: campaignId, Variante: variant.name }
              );
              variantErrors++;
              continue;
            }

            const dir = netTracePrefixToPathMap[prefix];
            const fragmentPath = path.join(
              FRAGMENTS_DIR,
              dir,
              `${name}.${dir}.json`
            );

            try {
              await fs.access(fragmentPath);
            } catch {
              logger.error(`[Guardián] ¡Fragmento no encontrado!`, {
                Campaña: campaignId,
                Variante: variant.name,
                "Trazo NET": variant.theme,
                "Fragmento Faltante": `${prefix}-${name}`,
                "Ruta Esperada": path.relative(process.cwd(), fragmentPath),
              });
              variantErrors++;
            }
          }

          // 2. Proponer normalización (si no hay errores de existencia)
          if (variantErrors === 0) {
            const normalizedNet = requiredPrefixes
              .map((p) => `${p}-${themePlan[p]}`)
              .join(".");
            if (variant.theme !== normalizedNet) {
              console.log(
                chalk.yellow(
                  `   - [NORMALIZACIÓN SUGERIDA] Variante: "${variant.name}"`
                )
              );
              console.log(chalk.red(`     - Actual:  "${variant.theme}"`));
              console.log(chalk.green(`     - Sugerido: "${normalizedNet}"\n`));
            }
          }
          totalErrors += variantErrors;
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        logger.warn(
          `No se pudo procesar ${path.relative(process.cwd(), mapPath)}. Causa: ${errorMessage}`
        );
      }
    }

    logger.endGroup();

    if (totalErrors > 0) {
      console.error(
        chalk.red.bold(
          `\n❌ Auditoría fallida. Se encontraron ${totalErrors} errores críticos de congruencia.`
        )
      );
      process.exit(1);
    } else {
      console.log(
        chalk.green.bold(
          "\n✅ Auditoría completada. Todos los temas son congruentes y están normalizados."
        )
      );
    }
  } catch (error) {
    logger.error("Error fatal durante la validación de temas:", { error });
    process.exit(1);
  }
}

validateAllCampaignThemes();
// scripts/validation/validate-theme-fragments.ts
